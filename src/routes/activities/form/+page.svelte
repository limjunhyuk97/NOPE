<script lang="ts">
	import { toast, user } from '$lib/stores';
	import { enhance } from '$app/forms';
	import Icon from '$lib/Icon.svelte';
	import Details from '$lib/components/activities/form/Details.svelte';
	import Queires from '$lib/components/activities/form/Queries.svelte';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	// 'upload_details'(활동 상세 정보) -> 'upload_queries'(활동 질문 정보)
	const WRITE_DETAILS = 'upload_details';
	const WRITE_QUERIES = 'upload_queries';

	let phase = Symbol.for(WRITE_DETAILS);
	const isInDetail = (phase: symbol) => {
		return phase === Symbol.for(WRITE_DETAILS);
	};

	// 활동 생성 페이지 상태 변경
	const changePhaseHandler = (nextPhase: symbol) => {
		return (e: Event) => {
			phase = nextPhase;
		};
	};

	// 활동 생성 완료

	beforeUpdate(() => {
		if (!$user) {
			goto('/');
			$toast = '로그인을 먼저 해주세요!';
		}
	});
</script>

<form
	method="POST"
	use:enhance={({ form, data, cancel }) => {
		console.log(data);
		return ({ result }) => {};
	}}
	class="flex flex-col items-center gap-6 w-full h-full lg:p-10 py-14 px-6 text-lg"
>
	<!-- 활동 상세 정보 -->
	<div class={isInDetail(phase) ? 'w-full' : 'w-full hidden'}>
		<Details activityTypes={data.activityTypes} />
	</div>
	<!-- 활동 설문지 -->
	<div class={isInDetail(phase) ? 'w-full h-full hidden' : 'w-full h-full'}>
		<Queires />
	</div>
	<!-- 생성자 id -->
	{#if isInDetail(phase)}
		<button
			class="flex w-fit pb-6 text-xl"
			on:click|preventDefault={changePhaseHandler(Symbol.for(WRITE_QUERIES))}
			>다음 단계로 <span><Icon icon="chevron-right" /></span></button
		>
	{:else}
		<div class="flex gap-12 pb-6 text-xl">
			<button on:click|preventDefault={changePhaseHandler(Symbol.for(WRITE_DETAILS))} class="flex"
				><span><Icon icon="chevron-left" /> </span>이전 단계로
			</button>
			<button class="flex">활동 생성 완료 <span><Icon icon="chevron-right" /></span></button>
		</div>
	{/if}
</form>

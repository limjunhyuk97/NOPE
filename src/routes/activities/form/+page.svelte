<script lang="ts">
	import { toast, user } from '$lib/stores';
	import { enhance } from '$app/forms';
	import Details from '$lib/components/activities/form/Details.svelte';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	export let data;

	// 'upload_details' -> 'upload_queries'
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
	use:enhance={({ form, data, cancel }) => {}}
	class="flex flex-col gap-6 w-full h-full py-12 px-6 text-lg"
>
	<div class={isInDetail(phase) ? '' : 'hidden'}>
		<Details activityTypes={data.activityTypes} />
	</div>
	<div class={isInDetail(phase) ? 'hidden' : ''} />
	{#if isInDetail(phase)}
		<button
			class="pb-12 text-lg"
			on:click|preventDefault={changePhaseHandler(Symbol.for(WRITE_QUERIES))}>다음 단계로</button
		>
	{:else}
		<button class="pb-12 text-lg">활동 생성 완료</button>
	{/if}
</form>

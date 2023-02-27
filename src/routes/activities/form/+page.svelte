<script lang="ts">
	import { toast, user } from '$lib/stores';
	import Icon from '$lib/Icon.svelte';
	import Details from '$lib/template/activities/Details.svelte';
	import Queires from '$lib/template/activities/Queries.svelte';
	import Image from '$lib/molecules/Image.svelte';
	import Select from '$lib/molecules/Select.svelte';
	import Input from '$lib/molecules/Input.svelte';
	import Calendar from '$lib/molecules/Calendar.svelte';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	// 업로드할 데이터
	export let thumbnail: string | null,
		activity_type: string,
		title: string,
		end_at = new Date(),
		start_at = new Date();

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

<div class="flex flex-col items-center gap-6 w-full h-full lg:p-10 py-14 px-6 text-lg">
	<!-- 활동 상세 정보 -->
	<div class={isInDetail(phase) ? 'w-full' : 'w-full hidden'}>
		<Details>
			<Image slot="thumbnail" bind:result={thumbnail} />
			<Select
				slot="activity_type"
				title="활동 타입"
				name=""
				options={data.activityTypes}
				trueValue="id"
				namedValue="type_kor"
				bind:result={activity_type}
			/>
			<Input slot="title" bind:result={title} title="활동명" />
			<Calendar slot="start_at" bind:result={start_at} title="시작일" />
			<Calendar slot="end_at" bind:result={end_at} minimum={start_at} title="종료일" />
		</Details>
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
</div>

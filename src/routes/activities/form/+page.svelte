<script lang="ts">
	import { toast, user } from '$lib/stores';
	import Icon from '$lib/Icon.svelte';
	import Details from '$lib/template/activities/Details.svelte';
	import Queires from '$lib/template/activities/Queries.svelte';
	import Image from '$lib/molecules/Image.svelte';
	import Select from '$lib/molecules/Select.svelte';
	import Input from '$lib/molecules/Input.svelte';
	import Calendar from '$lib/molecules/Calendar.svelte';
	import TextArea from '$lib/molecules/TextArea.svelte';
	import Editor from '$lib/molecules/Editor.svelte';
	import Radio from '$lib/molecules/Radio.svelte';
	import { _createActivity } from './+page';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	// 업로드할 데이터
	export let thumbnail: string,
		activity_type: string,
		title: string,
		end_at = new Date(),
		start_at = new Date(),
		short_details = '',
		details = '',
		recruiting: boolean,
		status: string,
		queries: string[] = [];

	$: if (start_at > end_at) end_at = start_at;

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

	// 지원 가능 여부 값
	const optionForRecruit = [
		{ innerText: '예', value: true },
		{ innerText: '아니오', value: false }
	];

	// 현재 활동 진행 상태 : pending, started
	const optionForStatus = [
		{ innerText: '시작 전 대기', value: 'pending' },
		{ innerText: '시작됨', value: 'started' }
	];

	// 질문 생성 핸들러
	const createQueries = (value: string) => {
		if (value === '') {
			$toast = '내용을 입력해주세요!';
			return;
		}
		queries = [...queries, value];
	};

	// 질문 제거
	const deleteQueries = (deleteTarget: string) => {
		return (event: Event) => {
			queries = queries.filter((query) => query !== deleteTarget);
		};
	};

	// 활동 등록
	const createActivities = async (e: Event) => {
		const response = await _createActivity({
			owner_id: $user?.id,
			thumbnail,
			activity_type,
			title,
			start_at,
			end_at,
			short_details,
			details,
			recruiting,
			status,
			queries
		});
		if (response) {
			goto(`/activities/form/done?id=${response.id}`);
		}
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
			<Image slot="thumbnail" bind:image_id={thumbnail} title="활동 썸네일" />
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
			<Calendar slot="end_at" bind:result={end_at} title="종료일" />
			<TextArea
				slot="short_details"
				bind:result={short_details}
				constraint={210}
				help="메인 페이지에 노출되는 활동 정보 중 하나입니다.<br /> 활동에 대한 간단한 설명을 적어주세요!"
				title="간단한 설명"
			/>
			<Editor
				slot="details"
				bind:result={details}
				title="상세설명"
				help="활동 상세 페이지에서 노출되는 활동 상세 정보입니다.<br /> 활동에 대한 구체적인 설명을 적어주세요!"
			/>
			<Radio
				slot="recruiting"
				options={optionForRecruit}
				bind:result={recruiting}
				title="지원 가능 여부"
			/>
			<Radio slot="status" options={optionForStatus} bind:result={status} title="활동 진행 상태" />
		</Details>
	</div>
	<!-- 활동 설문지 -->
	<div class={isInDetail(phase) ? 'w-full h-full hidden' : 'w-full h-full'}>
		<Queires>
			<TextArea
				slot="query_input"
				constraint={1000}
				rows={22}
				title=""
				submission="생성하기"
				submithandler={createQueries}
			/>
			<div slot="query_details" class="py-4">
				<h2 class="mb-4 text-xl font-semibold">등록된 질문 ({queries.length})</h2>
				<div class="flex flex-col gap-4 w-full">
					{#each queries as query, idx}
						<h3>질문 {idx + 1}</h3>
						<p class="relative w-full h-fit p-2 text-left break-words rounded-lg bg-gray-100">
							<span>{query}</span>
							<button
								class="absolute top-2 right-2 bg-white rounded-full"
								on:click|preventDefault={deleteQueries(query)}><Icon icon="x" /></button
							>
						</p>
					{/each}
				</div>
			</div>
		</Queires>
	</div>
	{#if isInDetail(phase)}
		<button
			class="flex w-fit pb-6 text-xl font-semibold"
			on:click|preventDefault={changePhaseHandler(Symbol.for(WRITE_QUERIES))}
			>다음 단계로 <span><Icon icon="chevron-right" /></span></button
		>
	{:else}
		<div class="flex gap-12 pb-6 text-xl font-semibold">
			<button
				on:click|preventDefault={changePhaseHandler(Symbol.for(WRITE_DETAILS))}
				class="flex ml-5"
				><span><Icon icon="chevron-left" /> </span>이전 단계로
			</button>
			<button class="flex" on:click|preventDefault|once={createActivities}
				>활동 생성 완료 <span><Icon icon="chevron-right" /></span></button
			>
		</div>
	{/if}
</div>

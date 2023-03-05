<script lang="ts">
	import { _createAnswer } from './+page';
	import { toast } from '$lib/stores';
	import Warn from '$lib/components/modal/Warn.svelte';
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	import TextArea from '$lib/molecules/TextArea.svelte';
	import { user } from '$lib/stores';
	import { showModal } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { beforeUpdate } from 'svelte';
	export let data;

	const queries = data.queries;
	const title = data.title.title;
	const activity_id = data.activity_id;

	const answers = queries.map((query: { id: string; question: string }) => {
		return { content: '', query_id: query.id, query: query.question };
	});

	const generateQuestion = (id: number, query: string) => id + 1 + '. ' + query;

	const submitAnswer = async () => {
		const reponse = await _createAnswer({ user_id: $user?.id, activity_id, answers });
		if (reponse) {
			goto(`/activities/${activity_id}/application/done?id=${reponse.msg}`);
		}
	};

	const submitHandler = (event: Event) => {
		if (answers.length > 0) {
			showModal({
				component: Warn,
				data: {
					title: '한번 작성한 지원서는 수정이 불가능해요!',
					subtitle: '작성하신 내용은 아래와 같습니다. 한번 더 확인 부탁드릴게요!',
					answers,
					handleConfirm: submitAnswer
				}
			});
		} else submitAnswer();
	};

	beforeUpdate(() => {
		if (!$user) {
			goto('/');
			$toast = '로그인을 먼저 해주세요!';
		}
	});
</script>

<div class="w-full lg:p-10 py-14 px-6">
	<ContentLayer {title} hasBack={true}>
		<div class="flex flex-col gap-8 mt-12">
			<h2 class="text-xl font-bold">지원서 작성</h2>
			{#if answers.length > 0}
				{#each answers as answer, id}
					<TextArea
						title={generateQuestion(id, answer.query)}
						constraint={400}
						submithandler={() => {}}
						bind:result={answer.content}
					/>
				{/each}
			{:else}
				<div class="flex justify-center items-center w-full h-72 rounded bg-gray-100 ">
					<h3 class="font-semibold">질문이 없습니다! 🤗 바로 지원해주세요~</h3>
				</div>
			{/if}
			<button
				on:click|preventDefault={submitHandler}
				class="flex justify-center w-full text-xl font-semibold hover:underline">지원서 제출</button
			>
		</div>
	</ContentLayer>
</div>

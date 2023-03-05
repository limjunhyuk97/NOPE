<script lang="ts">
	import { _createAnswer } from './+page';
	import { toast } from '$lib/stores';
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	import TextArea from '$lib/molecules/TextArea.svelte';
	import { user } from '$lib/stores';
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

	const submitHandler = async (event: Event) => {
		const reponse = await _createAnswer({ user_id: $user?.id, activity_id, answers });
		if (reponse) {
			$toast = '지원 성공!';
			goto(`/activities/${activity_id}/application/done?id=${reponse.msg}`);
		}
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
				on:click|preventDefault|once={submitHandler}
				class="flex justify-center w-full text-xl font-semibold hover:underline">지원서 제출</button
			>
		</div>
	</ContentLayer>
</div>

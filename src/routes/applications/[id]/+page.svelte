<script lang="ts">
	import PageWrapper from '$lib/template/PageWrapper.svelte';
	import Back from '$lib/Back.svelte';
	import { applyStatusColor, applyStatus } from '$lib/utils';
	export let data;

	const participant = data.answer[0];
	const answers = participant.activity_answers;
</script>

<PageWrapper>
	<div class="flex items-start gap-2 mt-8 mb-4 text-2xl font-bold">
		<Back />
		<h1>{participant.activities.title} 지원서</h1>
	</div>
	<div class="mt-12">
		<h1 class="text-xl font-bold">작성하신 내용</h1>
	</div>
	<div class="flex flex-col gap-8 mt-12">
		{#if answers.length > 0}
			{#each answers as answer, idx}
				<div>
					<h2 class="font-semibold">{idx + 1}. {answer.activity_forms.question}</h2>
					<p class="min-h-[144px] p-2 mt-2 bg-gray-100 rounded">{answer.answer}</p>
				</div>
			{/each}
		{:else}
			<div class="flex justify-center items-center w-full h-36 rounded bg-gray-100 font-semibold">
				질문 / 응답이 없습니다! 😊
			</div>
		{/if}
	</div>
	<div class="flex flex-col">
		<h2 class="text-xl font-bold mt-12">지원 결과</h2>
		<span class="text-2xl mt-8 font-bold {applyStatusColor(participant.status)}"
			>{applyStatus(participant.status)}</span
		>
	</div>
</PageWrapper>

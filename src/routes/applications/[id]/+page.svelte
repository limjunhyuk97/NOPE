<script lang="ts">
	import PageWrapper from '$lib/template/PageWrapper.svelte';
	import Back from '$lib/Back.svelte';
	export let data;

	const participant = data.answer[0];
	const answers = participant.activity_answers;

	const convertStatus = (status: string) => {
		if (status === 'super') return '수락됨';
		if (status === 'admin') return '수락됨';
		if (status === 'granted') return '수락됨';
		if (status === 'quit') return '수락됨 (탈퇴)';
		if (status === 'denied') return '거절됨';
		if (status === 'pending') return '대기중';
	};

	const convertTextColor = (status: string) => {
		if (status === 'super') return 'text-green-600';
		if (status === 'admin') return 'text-green-600';
		if (status === 'granted') return 'text-green-600';
		if (status === 'quit') return 'text-green-600';
		if (status === 'denied') return 'text-red-500';
		if (status === 'pending') return 'text-gray-500';
	};
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
		<span class="text-2xl mt-8 font-bold {convertTextColor(participant.status)}"
			>{convertStatus(participant.status)}</span
		>
	</div>
</PageWrapper>

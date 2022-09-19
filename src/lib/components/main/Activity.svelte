<script lang="ts">
	export let href = '/';
	export let imgUrl = '';
	export let title = '';
	export let details = '';
	export let short_details = '';
	export let recruiting = true;
	export let startDate = '';
	export let endDate = '';
	export let status = '';
	export let type = '';

	let w: number;

	type statusDivType = { content: string; color: string };
	const statusVariation: { [key: string]: statusDivType } = {
		pending: { content: '활동 시작전', color: 'text-gray-200' },
		started: { content: '활동 시작됨', color: 'text-green-600' },
		finished: { content: '활동 종료', color: 'text-red-600' }
	};

	// 모집중 메시지
	const recruitingMSG = () => {
		return recruiting
			? `<div class="text-blue-600">지원 가능</div>`
			: `<div class="text-red-600">지원 불가</div>`;
	};

	// 진행상태 메시지
	const statusMSG = () => {
		return `<div class="${statusVariation[status].color}">${statusVariation[status].content}</div>`;
	};
</script>

<a
	{href}
	class="MAIN-ACTIVITY-WIDTH mb-12 shadow-2xl rounded-lg overflow-hidden"
	bind:clientWidth={w}
>
	<div
		class="w-full 2xl:h-96 lg:h-72 h-96 flex justify-center items-center bg-gray-100 lg:rounded-t-lg overflow-hidden"
	>
		<img src={imgUrl} alt={title} class="w-full hover:scale-125 duration-200" />
	</div>
	<div class="w-full pb-12 lg:px-3 h-1/4 flex flex-col">
		<div class="mt-2">{title}</div>
		<div class="text-xs">
			{#if recruiting}
				<div class="text-blue-600">지원 가능</div>
			{:else}
				<div class="text-red-600">지원 불가</div>
			{/if}
		</div>
	</div>
</a>

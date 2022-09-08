<script lang="ts">
	export let href = '/';
	export let imgUrl = '';
	export let title = '';
	// export let contents = '';
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

<a {href} class="MAIN-ACTIVITY-WIDTH shadow-2xl" bind:clientWidth={w}>
	<img src={imgUrl} alt={title} class="w-full h-3/4 object-cover border-b" />
	<!-- 브라우저 사이즈 -->
	{#if w >= 340}
		<div class="h-1/4 flex flex-col px-4 py-2 justify-center text-sm">
			<div class="flex flex-col justify-between items-start text-start text-lg truncate">
				<h1>{title}</h1>
				<h2 class="text-xs">{type}</h2>
			</div>
			<div class="text-end gap-1">
				{@html recruitingMSG()}
				{@html statusMSG()}
				<div>시작일 {startDate}</div>
				<div>종료일 {endDate ? endDate : '-'}</div>
			</div>
		</div>
		<!-- 패드 사이즈 -->
	{:else if w >= 190}
		<div class="flex flex-col px-2 justify-center ">
			<div class="mt-2 text-start truncate">{title}</div>
			<div class="mt-2 text-xs">{type}</div>
			<div class="lg:block hidden text-start text-xs gap-1">
				{#if recruiting}
					<div class="text-blue-600">지원 가능</div>
				{:else}
					<div class="text-red-600">지원 불가</div>
				{/if}
			</div>
		</div>
		<!-- 휴대폰 사이즈 -->
	{:else}
		<div class="flex flex-col px-4 justify-center">
			<div class="text-start text-lg truncate">{title}</div>
			<div class="lg:block hidden text-end text-xs gap-1">
				{#if recruiting}
					<div class="text-blue-600">지원 가능</div>
				{:else}
					<div class="text-red-600">지원 불가</div>
				{/if}

				<div>시작일 {startDate}</div>
				<div>종료일 {endDate ? endDate : '-'}</div>
			</div>
		</div>
	{/if}
</a>

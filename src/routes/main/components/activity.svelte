<script>
	export let href = '/main';
	export let imgUrl = '';
	export let title = '';
	export let recruiting = true;
	export let proceeding = false;
	export let startDate = '';
	export let endDate = '';
</script>

<a {href} class="w-1/3 flex flex-col shadow-2xl">
	<img src={imgUrl} alt={title} class="h-3/4 w-full border-b" />
	<div class="h-1/4 font-bold flex flex-col px-4 justify-center">
		<div class="text-start text-lg truncate">{title}</div>
		<div class="lg:block hidden text-end text-xs gap-1">
			{#if recruiting}
				<div class="text-blue-600">지원 가능</div>
			{:else}
				<div class="text-red-600">지원 불가</div>
			{/if}
			{#if proceeding}
				<div />
			{:else}
				<div>현재 진행중</div>
			{/if}
			<div>시작일 {startDate}</div>
			<div>종료일 {endDate ? endDate : '-'}</div>
		</div>
	</div>
</a>

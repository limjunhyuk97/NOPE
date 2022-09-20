<script lang="ts">
	import { slide, fade } from 'svelte/transition';
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
	import moment from 'moment';
	moment.locale('ko');

	// 진행상태 메시지 가공 위한 객체
	type statusDivType = { content: string; color: string };
	const statusVariation: { [key: string]: statusDivType } = {
		pending: { content: '활동 시작전', color: 'text-gray-200' },
		started: { content: '활동 진행중', color: 'text-green-600' },
		finished: { content: '활동 종료', color: 'text-red-600' }
	};

	// 모집중 메시지
	const recruitingMSG = () => {
		return recruiting
			? `<div class="mt-1 text-blue-600">지원 가능</div>`
			: `<div class="mt-1 text-red-600">지원 불가</div>`;
	};

	// 진행상태 메시지
	const statusMSG = () => {
		return `<div class="mt-3 ${statusVariation[status].color}">${statusVariation[status].content}</div>`;
	};

	// 간단한 설명 보여주기
	let hovering = false;
</script>

<a
	{href}
	class="w-full 2xl:h-[524px] lg:h-[434px] h-[524px] mb-12 shadow-2xl rounded-lg overflow-hidden"
>
	{#if !hovering}
		<div
			class="w-full 2xl:h-96 lg:h-72 h-96 flex justify-center items-center bg-gray-100 lg:rounded-t-lg overflow-hidden"
			in:fade={{ duration: 400 }}
			out:slide={{ duration: 600 }}
		>
			<img src={imgUrl} alt={title} class="w-full hover:scale-125 duration-200" />
		</div>
	{/if}
	<div
		class="w-full h-full px-4 flex flex-col text-xs"
		on:mouseenter={() => {
			hovering = true;
		}}
		on:mouseleave={() => {
			hovering = false;
		}}
	>
		<p class="w-full mt-2 text-lg {hovering ? '' : 'truncate'}">
			{title}
		</p>
		{@html statusMSG()}
		{@html recruitingMSG()}
		<div class="mt-3">시작일 {moment(startDate).format('YYYY.MM.DD')}</div>
		<div class="mt-1">종료일 {moment(endDate).format('YYYY.MM.DD')}</div>
		{#if hovering}
			<p class="w-full h-max pt-8 text-xs text-ellipsis" in:fade={{ duration: 800 }}>
				{short_details}
			</p>
		{/if}
	</div>
</a>

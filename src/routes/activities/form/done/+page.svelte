<script>
	import Icon from '$lib/Icon.svelte';
	import { getQueryString } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import id from 'date-fns/locale/id';

	let showIcon = false;
	let showLink = false;
	let activity_id = getQueryString('id');

	onMount(() => {
		setTimeout(() => {
			showIcon = true;
		}, 400);
		setTimeout(() => {
			showLink = true;
		}, 800);
	});
</script>

<div
	class="relative flex flex-col justify-center items-center gap-6 w-full h-full lg:p-10 py-14 px-6 text-lg"
>
	{#if showIcon}
		<div
			class="absolute flex flex-col items-center gap-4 mb-56"
			in:fly|local={{ duration: 1000, y: 120 }}
		>
			<div class="flex items-center justify-center w-44 h-44 rounded-full bg-blue-300 text-white">
				<Icon icon="check" size={128} />
			</div>
			<h1 class="text-2xl text-blue-300">활동 생성을 완료했습니다!</h1>
		</div>
	{/if}
	{#if showLink}
		<div class="absolute flex flex-col gap-4 mt-56" in:fly|local={{ duration: 1500, y: 120 }}>
			<a
				href="/activities/{activity_id}"
				class="px-4 py-2 rounded border border-blue-300 text-blue-300">활동 페이지로 이동</a
			>
			<a href="/" class="px-4 py-2 rounded border border-blue-300 bg-blue-300 text-white"
				>메인 페이지로 이동</a
			>
		</div>
	{/if}
</div>

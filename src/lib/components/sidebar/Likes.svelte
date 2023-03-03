<script lang="ts">
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let hovering = false;
	const mouseEnter = () => {
		hovering = true;
	};
	const mouseOut = () => {
		hovering = false;
	};
</script>

<a
	href="/likes"
	on:mouseenter={mouseEnter}
	on:mouseleave={mouseOut}
	class="p-4 border-b text-start hover:bg-gray-500 hover:text-white"
>
	찜한 내역
	{#if hovering}
		<div class="pt-4 flex flex-col items-start gap-4 text-sm" transition:slide>
			<button
				class="ml-2"
				on:click|preventDefault|stopPropagation={() => {
					goto('/likes');
				}}>찜한 활동</button
			>
			<button
				class="ml-2"
				on:click|preventDefault|stopPropagation={() => {
					goto('/likes/articles');
				}}>찜한 게시글</button
			>
		</div>
	{/if}
</a>

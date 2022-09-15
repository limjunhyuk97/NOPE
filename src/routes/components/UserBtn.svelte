<script>
	import { user } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	let hovering = false;
	const mouseEnter = () => {
		hovering = true;
	};
	const mouseOut = () => {
		hovering = false;
	};
</script>

{#if $user}
	<button
		on:click|preventDefault={() => {
			goto('/users');
		}}
		class="border-b p-4 text-left"
		on:mouseenter={mouseEnter}
		on:mouseleave={mouseOut}
	>
		마이페이지
	</button>
{:else}
	<a href="/" class="border-b p-4 text-left" on:mouseenter={mouseEnter} on:mouseleave={mouseOut}>
		함께하기
		{#if hovering}
			<div class="pt-4 flex flex-col items-start gap-4 text-sm" transition:slide>
				<a class="ml-2" href="/users/signin" sveltekit:reload>로그인</a>
				<a class="ml-2" href="/users/signup" sveltekit:reload>회원가입</a>
			</div>
		{/if}
	</a>
{/if}

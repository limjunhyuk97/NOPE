<script>
	import { Jumper } from 'svelte-loading-spinners';
	import { LOGO } from '$lib/constants';
	import Icon from '$lib/Icon.svelte';
	import { user, toast } from '$lib/stores';
	import { goto } from '$app/navigation';
</script>

{#if $user}
	{goto('/')}
{:else}
	<div class="w-full h-screen flex justify-center items-center">
		<div class="SIGNUP-TEMPLATE-WIDTH relative mx-auto border rounded shadow-2xl text-xl">
			<button type="button" class="absolute left-8 top-8" on:click={() => window.history.go(-1)}>
				<Icon icon="arrow-left" size={32} stroke_width={3} />
			</button>

			<a href="/"><img src={LOGO} class="mx-auto" alt="NOPE" /></a>

			<div class="w-full py-32 flex flex-col items-center justify-center">
				<Jumper color="#9FC9F3" />
				<a href="/" class="flex flex-col items-center">
					<div class="pt-24 text-blue-300">인증 대기중입니다</div>
					<div class="pt-1 text-xs text-blue-300">홈으로 가기</div>
				</a>
			</div>
		</div>
	</div>
{/if}

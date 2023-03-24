<script lang="ts">
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import { mypageSidebar } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		$mypageSidebar = Symbol('null');
	});
</script>

<ContentWrapper title="">
	<div class="flex flex-col gap-32 flex-1 px-12">
		<div>
			<h1 class="font-semibold text-3xl">NOPE을 이용해주셔서 감사합니다.</h1>
			<p class="mt-8 text-xl font-semibold">다시 뵙는 그날을 기다릴게요!</p>
		</div>
		<div class="flex gap-12">
			<button
				class="text-xl font-semibold hover:underline"
				on:click|preventDefault={() => goto('/')}>홈으로</button
			>
		</div>
	</div>
</ContentWrapper>

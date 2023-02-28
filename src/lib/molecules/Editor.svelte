<script lang="ts">
	import MdEditor from '$lib/components/common/MDEditor.svelte';

	// 설명 보여주기 위한 핸들러
	let showDetail = false;
	const showDetailDescriptionHandler = () => {
		showDetail = true;
	};
	const hideDetailDescriptionHandler = () => {
		showDetail = false;
	};

	export let title: string;
	export let help = '';

	export let result: string;
</script>

<label class="relative flex flex-col gap-4 w-full" for="details">
	{#if showDetail && help.length > 0}
		<p class="absolute left-24 w-72 p-3 rounded-lg bg-gray-200 text-xs z-10">
			{@html help}
		</p>
	{/if}
	<div class="flex items-center gap-3 w-fit">
		{title}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		{#if help.length > 0}
			<span
				class="text-xs text-gray-400"
				on:mouseover={showDetailDescriptionHandler}
				on:mouseleave={hideDetailDescriptionHandler}
			>
				?
			</span>
		{/if}
	</div>
	<MdEditor name="details" bind:contentsInHTML={result} />
</label>

<script lang="ts">
	export let help = '';
	export let title = '';
	export let constraint: number;
	export let rows = 4;
	export let submission = '';
	export let submithandler: (value: string) => void;
	export let result = '';

	// 간단한 설명 보여주기 위한 핸들러
	let showHelp = false;
	const showHelpHandler = () => {
		showHelp = true;
	};
	const hideHelpHandler = () => {
		showHelp = false;
	};

	// 제출 버튼 핸들러
	const innerHandler = (e: Event) => {
		submithandler(result);
		result = '';
	};
</script>

<label for="activity_short_details" class="relative flex flex-col gap-4">
	{#if showHelp && help.length > 0}
		<p class="absolute left-28 w-72 p-3 rounded-lg bg-gray-200 text-xs z-10">
			{@html help}
		</p>
	{/if}
	{#if title.length > 0}
		<div class="flex items-center gap-3 w-fit">
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			{title}
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			{#if help.length > 0}
				<span
					class="text-xs text-gray-400"
					on:mouseover={showHelpHandler}
					on:mouseleave={hideHelpHandler}
				>
					?
				</span>
			{/if}
		</div>
	{/if}
	<textarea
		name="short_details"
		id="activity_short_details"
		bind:value={result}
		{rows}
		maxlength={constraint}
	/>
	<div class="absolute bottom-1 right-2 text-sm">
		<span class="text-green-500">{result.length}</span> / {constraint}
	</div>
</label>

{#if submission.length > 0}
	<button class="flex justify-center w-full pt-6" on:click|preventDefault={innerHandler}
		>생성하기</button
	>
{/if}

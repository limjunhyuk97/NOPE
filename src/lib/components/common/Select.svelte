<script lang="ts">
	import { slide } from 'svelte/transition';

	export let options: {}[];
	export let defaultValue: string;
	export let name = 'none';
	export let trueValue = 'id';
	export let namedValue = 'type_kor';

	let selected = false;
	let selectedTrueValue = '';
	let selectedNamedValue = defaultValue;

	const selectHandler = (option: { id: string; value: string }) => {
		selectedTrueValue = option[`${trueValue}`];
		selectedNamedValue = option[`${namedValue}`];
		selected = !selected;
	};
</script>

<input type="text" class="hidden" {name} value={selectedTrueValue} />

<div class="relative flex flex-col gap-4 w-full h-full">
	<button
		class="flex items-center justify-center p-2 bg-gray-100 rounded-lg"
		on:click|preventDefault={() => {
			selected = !selected;
		}}
	>
		{selectedNamedValue}
	</button>
	{#if selected}
		<div
			transition:slide|local={{ duration: 500 }}
			class="absolute top-16 flex flex-col gap-4 w-full p-4 bg-gray-100 rounded-lg z-10"
		>
			{#each options as option}
				<button
					on:click|preventDefault={() => {
						selectHandler(option);
					}}>{option[`${namedValue}`]}</button
				>
			{/each}
		</div>
	{/if}
</div>

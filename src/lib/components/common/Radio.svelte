<script lang="ts">
	import { fade } from 'svelte/transition';
	export let options: { innerText: string; value: boolean | string }[];
	export let name: string;

	export let result = options[0].value;

	const selectHandler = (value: boolean | string) => {
		return (e: Event) => {
			result = value;
		};
	};
</script>

<div class="flex flex-col gap-2">
	{#each options as { innerText, value }, id}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<label
			for={String(id)}
			class="flex items-center gap-2"
			on:click|preventDefault={selectHandler(value)}
		>
			<input
				type="radio"
				id={String(id)}
				{name}
				{value}
				class="hidden"
				checked={result === value}
			/>
			<div class="flex justify-center items-center w-5 h-5 bg-gray-200 rounded-full">
				{#key result}
					<div
						transition:fade|local={{ duration: 100 }}
						class="w-3 h-3 rounded-full bg-blue-400 drop-shadow-md {result === value
							? ''
							: 'hidden'} transition ease-in"
					/>
				{/key}
			</div>
			{innerText}
		</label>
	{/each}
</div>

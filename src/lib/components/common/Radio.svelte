<script lang="ts">
	import { fade } from 'svelte/transition';
	export let choices: { innerText: string; value: boolean }[];
	export let name: string;

	let selectedID = 0;

	const selectHandler = (id: number) => {
		return (e: Event) => {
			selectedID = id;
		};
	};
</script>

<div class="flex flex-col gap-2">
	{#each choices as choice, id}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<label
			for={String(id)}
			class="flex items-center gap-2"
			on:click|preventDefault={selectHandler(id)}
		>
			<input
				type="radio"
				id={String(id)}
				{name}
				value={choice.value}
				class="hidden"
				checked={selectedID === id}
			/>
			<div class="flex justify-center items-center w-5 h-5 bg-gray-200 rounded-full">
				{#key selectedID}
					<div
						transition:fade|local={{ duration: 100 }}
						class="w-3 h-3 rounded-full bg-blue-400 drop-shadow-md {selectedID === id
							? ''
							: 'hidden'} transition ease-in"
					/>
				{/key}
			</div>
			{choice.innerText}
		</label>
	{/each}
</div>

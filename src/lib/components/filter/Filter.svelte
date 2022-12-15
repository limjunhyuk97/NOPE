<script type="ts">
	import Icon from '$lib/Icon.svelte';
	import { slide } from 'svelte/transition';
	import { ACTIVITY_FILTER } from '$lib/constants';

	let opened = false;
	const handleOpen = () => {
		opened = !opened;
	};
	const handleFilter = (filter: string) => {
		return (e: Event) => {
			filtered = filter;
			opened = false;
		};
	};
	const renderFilteredName = (filter: string) => {
		return Object.values(ACTIVITY_FILTER).filter((el) => el.type === filter)[0].name;
	};

	export let filtered = ACTIVITY_FILTER.ALL.type;
</script>

<div class="flex flex-col justify-center items-center relative">
	<button class="flex items-center gap-2 " on:click={handleOpen}>
		<span>{renderFilteredName(filtered)}</span>
		{#if opened}
			<Icon icon="chevron-up" size={16} />
		{:else}
			<Icon icon="chevron-down" size={16} />
		{/if}
	</button>
	{#if opened}
		<div
			class="flex flex-col gap-2 absolute top-6 left-[-35px] w-24 px-4 py-2 rounded-xl bg-white z-10"
			transition:slide|local={{ duration: 200 }}
		>
			{#each Object.values(ACTIVITY_FILTER) as { type, name }}
				<button on:click={handleFilter(type)}>{name}</button>
			{/each}
		</div>
	{/if}
</div>

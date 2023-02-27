<script>
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import { ko } from 'date-fns/locale';
	import { slide } from 'svelte/transition';

	export let dateSelected = new Date();
	export let dateMinimum = new Date(0);
	export let dateMaximum = new Date(`${dateSelected.getFullYear() + 50} 12 31 23:59:59`);
	export let name = 'none';

	const locale = localeFromDateFnsLocale(ko);
	let isVisible = false;

	const makeDateString = (date) => {
		date = [date.getFullYear(), String(parseInt(date.getMonth()) + 1), String(date.getDate())];
		if (date[1].length < 2) date[1] = '0' + date[1];
		if (date[2].length < 2) date[2] = '0' + date[2];
		return date.join('-');
	};

	const showCalendar = () => {
		isVisible = !isVisible;
	};
</script>

<input type="date" value={makeDateString(dateSelected)} {name} id={name} class="hidden" />

<div class="relative w-full h-full">
	<button on:click|preventDefault={showCalendar} class="w-full h-full p-2 bg-gray-100 rounded-lg"
		>{dateSelected.toLocaleString('ko-kr').slice(0, 12)}</button
	>
	{#if isVisible}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="fixed top-0 left-0 w-full h-full z-10" on:click|preventDefault={showCalendar} />
		<button
			transition:slide|local={{ duration: 200 }}
			on:click|stopPropagation|preventDefault
			class="block absolute top-14 z-10 w-full p-2 bg-gray-100 rounded-lg"
		>
			<DateInput
				bind:value={dateSelected}
				closeOnSelection={true}
				{locale}
				format="yyyy-MM-dd"
				min={dateMinimum}
				max={dateMaximum}
			/>
		</button>
	{/if}
</div>

<style>
	:root {
		--date-input-width: 100%;
	}
</style>

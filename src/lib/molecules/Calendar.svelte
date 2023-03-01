<script lang="ts">
	import Calendar from '$lib/components/common/Calendar.svelte';

	export let title: string;
	export let minimum = new Date(0);
	export let result = new Date();
</script>

<div class="flex items-center gap-2 w-full">
	<div class="w-24 font-semibold">{title}</div>
	<Calendar name="start_at" bind:dateSelected={result} dateMinimum={minimum} />
</div>

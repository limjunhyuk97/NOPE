<script lang="ts">
	import Select from '$lib/components/common/Select.svelte';

	export let options: [];
	export let title: string;
	export let trueValue: string;
	export let namedValue: string;
	export let name: string;

	export let result: string;
</script>

<div class="flex items-center gap-2 w-full">
	<div class="w-24 font-semibold">{title}</div>
	<Select {options} {trueValue} {namedValue} {name} bind:selectedTrueValue={result} />
</div>

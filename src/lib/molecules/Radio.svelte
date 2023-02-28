<script lang="ts">
	import Radio from '$lib/components/common/Radio.svelte';

	export let options: { innerText: string; value: string | boolean }[];
	export let title: string;
	export let result: string | boolean;
</script>

<div class="relative flex flex-col gap-4 w-full">
	<div>{title}</div>
	<div class="flex justify-start">
		<Radio {options} name="recruiting" bind:result />
	</div>
</div>

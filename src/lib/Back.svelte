<script>
	import Icon from '$lib/Icon.svelte';
</script>

<button on:click={() => window.history.go(-1)}>
	<Icon icon="chevron-left" size={28} />
</button>

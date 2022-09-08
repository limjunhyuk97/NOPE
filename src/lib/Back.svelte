<script>
	import LeftArrow from './assets/LeftArrow.svelte';
</script>

<button type="button" class="w-8 absolute" on:click={() => window.history.go(-1)}>
	<LeftArrow />
</button>

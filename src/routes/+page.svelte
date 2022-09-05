<script>
	import { goto } from '$app/navigation';
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		goto('/main');
	});
</script>

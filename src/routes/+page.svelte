<script>
	import { goto } from '$app/navigation';

	import { user } from '$lib/stores';
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		if (!$user) {
			goto('/users/login');
		}
	});
</script>

<div>메인 페이지</div>

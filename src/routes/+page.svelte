<script>
	import { goto } from '$app/navigation';

	import { user } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		if (!$user) goto('/users/signin');
	});
</script>

<div class="px-24 pb-16 mx-auto w-3/5 border rounded flex flex-col gap-4 shadow-2xl relative" />
<button
	class="mt-10 w-full border-none py-4"
	on:click={async () => {
		const { error } = await supabase.auth.signOut();
		console.log(error);
		if (!error) {
			// $toastMessage = '로그아웃 되었습니다';
			// goto('/');
		}
	}}
>
	로그아웃
</button>

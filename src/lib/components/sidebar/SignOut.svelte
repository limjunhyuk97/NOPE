<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { toast } from '$lib/stores';
	import { goto } from '$app/navigation';
</script>

<button
	on:click={async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		} else {
			$toast = '로그아웃 되었습니다';
			goto('/activities');
		}
	}}
	class="border-b text-start p-4"
>
	로그아웃</button
>

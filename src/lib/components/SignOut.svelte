<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { toast } from '$lib/stores';
</script>

<button
	on:click={async () => {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			$toast = '로그아웃 되었습니다';
		}
	}}
	class="border-b text-start p-4"
>
	로그아웃</button
>

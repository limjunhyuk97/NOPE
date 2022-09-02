<script>
	import '../app.css';
	import Loading from '$lib/Loading.svelte';
	import Toast from '$lib/Toast.svelte';
	import { DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH } from '$lib/constant';
	import { beforeUpdate } from 'svelte';
	import { user } from '$lib/stores';
	import { supabase } from '$lib/supabase';

	beforeUpdate(async () => {
		const { data } = await supabase.auth.getUser();
		$user = data.user;
	});

	supabase.auth.onAuthStateChange((_, session) => {
		$user = session?.user ?? null;
	});
</script>

<div class="w-full bg-gray-100">
	<div
		class="h-screen 2xl:w-[{DESKTOP_WIDTH}] lg:w-[{TABLET_WIDTH}] w-[{MOBILE_WIDTH}] mx-auto bg-white"
	>
		<slot />
	</div>
</div>

<Loading />

<Toast />

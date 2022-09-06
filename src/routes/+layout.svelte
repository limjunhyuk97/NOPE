<script>
	import '../app.css';
	import Loading from '$lib/Loading.svelte';
	import Toast from '$lib/Toast.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores';
	import { supabase } from '$lib/supabase';

	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		$user = data.user;
	});

	supabase.auth.onAuthStateChange(async (_, session) => {
		$user = session?.user || null;
	});
</script>

<div class="w-full bg-gray-100 font-NOPE">
	<div
		class="DESKTOP-TEMPLATE-WIDTH TABLET-TEMPLATE-WIDTH MOBILE-TEMPLATE-WIDTH h-screen relative mx-auto bg-white"
	>
		<slot />
	</div>
</div>

<Loading />

<Toast />

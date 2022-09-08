<script lang="ts">
	import '../app.css';
	import Logo from '$lib/assets/Logo.svelte';
	import Toast from '$lib/Toast.svelte';
	import { user } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import type { ActivityTypes } from './+layout';

	// SideBar Component
	import SignOut from './main/components/SignOut.svelte';

	import Notices from './main/components/Notices.svelte';
	import Ongoing from './main/components/Ongoing.svelte';
	import UserBtn from './main/components/UserBtn.svelte';
	import Version from './main/components/Version.svelte';
	import Undergoing from './main/components/Undergoing.svelte';

	// activity, user data 받아오기
	export let data: any;
	const activityTypes: ArrayLike<ActivityTypes> = data.activityTypes;
	$user = data.user.user;

	supabase.auth.onAuthStateChange(async (_, session) => {
		$user = session?.user || null;
	});
</script>

<div class="w-full min-h-screen bg-gray-100 font-NOPE">
	<div class="TEMPLATE-WIDTH min-h-screen relative mx-auto bg-white">
		<div class="w-full min-h-screen flex">
			<!-- 사이드 바 -->
			<div
				class="SIDEBAR-WIDTH min-h-screen relative flex flex-col border-r-2 border-gray-200 shadow-xl overflow-hidden"
			>
				<Logo />
				<nav class="flex flex-col text-xl font-bold border-t">
					<UserBtn />
					<Ongoing activityTypes={data.activityTypes} />
					{#if $user}
						<Undergoing />
						<Notices />
						<SignOut />
					{/if}
					<div class="absolute bottom-0"><Version /></div>
				</nav>
			</div>

			<!-- 컨텐츠 들어가는 곳 -->
			<div class="w-full p-12 shadow-2xl">
				<slot />
			</div>
		</div>
	</div>
</div>

<Toast />

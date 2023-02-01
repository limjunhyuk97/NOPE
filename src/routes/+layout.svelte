<script lang="ts">
	import type { ActivityTypes } from '$lib/types';
	import '../app.css';
	import Logo from '$lib/components/common/Logo.svelte';
	import Toast from '$lib/Toast.svelte';
	import { user } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import { ScaleOut } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';

	// view width
	let spinner = true;

	// SideBar Component
	import SignOut from '$lib/components/sidebar/SignOut.svelte';
	import Notices from '$lib/components/sidebar/Notices.svelte';
	import UserBtn from '$lib/components/sidebar/UserBtn.svelte';
	import Version from '$lib/components/sidebar/Version.svelte';
	import Likes from '$lib/components/sidebar/Likes.svelte';
	import Modal from '$lib/Modal.svelte';
	import Ongoing from '$lib/components/sidebar/Ongoing.svelte';

	// activity, user data 받아오기
	export let data: any;
	const activityTypes: ArrayLike<ActivityTypes> = data.activityTypes;

	supabase.auth.onAuthStateChange(async (event, session) => {
		$user = session?.user || null;
	});

	onMount(() => {
		spinner = false;
	});
</script>

<div class="VIEWPORT bg-gray-100 font-NOPE">
	<div class="flex CONTAINERPORT relative mx-auto bg-white">
		{#if spinner}
			<!-- 대기 -->
			<div class="w-full h-screen flex flex-col justify-center items-center text-gray-400">
				<ScaleOut size="120" color="#cfcfcf" duration="1s" />
				<div class="mt-5">잠시만 기다려주세요</div>
			</div>
		{:else}
			<!-- 데스크톱, 태블릿 사이드 바 -->
			<div
				class="fixed top-0 SIDEBARPORT relative flex flex-col border-r-2 border-gray-200 shadow-xl overflow-hidden"
			>
				<Logo />
				<nav class="flex flex-col w-full text-xl font-bold border-t">
					<UserBtn />
					<Ongoing {activityTypes} />
					{#if $user}
						<Likes />
						<Notices />
						<SignOut />
					{/if}
					<div class="absolute bottom-0 "><Version /></div>
				</nav>
			</div>
			<!-- 컨텐츠 들어가는 곳 -->
			<div class="relative CONTENTPORT overflow-x-auto scrollbar-hide">
				<slot />
			</div>
		{/if}
	</div>
</div>

<Toast />
<Modal />

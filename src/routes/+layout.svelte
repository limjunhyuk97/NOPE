<script lang="ts">
	import '../app.css';
	import Logo from '$lib/assets/Logo.svelte';
	import Button from './main/components/button.svelte';
	import Link from './main/components/link.svelte';
	import { onMount } from 'svelte';
	import { toast, user } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import { slide } from 'svelte/transition';

	// menu 선택
	let menu = 'all';

	// scroll 위한 식별자
	let active = false;

	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		$user = data.user;
	});

	supabase.auth.onAuthStateChange(async (_, session) => {
		$user = session?.user || null;
	});
</script>

<div class="w-full min-h-screen bg-gray-100 font-NOPE">
	<div class="TEMPLATE-WIDTH min-h-screen relative mx-auto bg-white">
		<div class="w-full min-h-screen flex">
			<!-- 사이드 바 -->
			<div
				class="SIDEBAR-WIDTH min-h-screen flex flex-col border-r-2 border-gray-200 gap-5 shadow-xl"
			>
				<Logo />
				<!-- 로그인된 상태 -->
				{#if $user}
					<nav class="mt-5 flex flex-col text-xl font-bold">
						<Button innerText={'마이페이지'} />
						<button
							on:click={() => {
								if (menu === 'activity') menu = '';
								else menu = 'activity';
							}}
							class="border-y text-start p-4 pb-0"
						>
							진행중인 활동
							<div class="flex flex-col gap-4 p-4 {menu === 'activity' ? '' : 'pb-0'}">
								<button class="{menu === 'activity' ? '' : 'hidden'} ml-8">스터디</button>
								<button class="{menu === 'activity' ? '' : 'hidden'} ml-8">프로젝트</button>
							</div>
						</button>
						<a href="/main/favorites" class="border-y p-4"> 찜한 활동 </a>
						<a href="/main/knowhow" class="border-y p-4"> 노하우 공유 </a>
						<a href="/notice" class="border-y p-4">공지사항</a>
						<button
							on:click={async () => {
								const { error } = await supabase.auth.signOut();
								if (!error) {
									$toast = { message: '로그아웃 되었습니다', top: 20, width: 24 };
								}
							}}
							class="border-y text-start p-4"
						>
							로그아웃</button
						>
					</nav>
				{:else}
					<nav class="border-t flex flex-col text-xl font-bold">
						<Button innerText="함께하기" let:hovering={active}>
							{#if active}
								<div
									class="w-full pl-3 flex flex-col items-start gap-5"
									transition:slide={{ duration: 500 }}
								>
									<Link href="/users/signIn" innerText="로그인" />
									<Link href="/users/signUp" innerText="회원가입" />
								</div>
							{/if}
						</Button>
						<Button innerText="진행중인 활동" let:hovering={active}>
							{#if active}
								<div
									class="w-full pl-3 flex flex-col items-start gap-5"
									transition:slide={{ duration: 500 }}
								>
									<Link href="/users/signUp" innerText="회원가입" />
								</div>
							{/if}
						</Button>
						<a href="/main/knowhow" class="p-4 border-b">노하우 공유</a>
						<a href="/main/notice" class="p-4 border-b">공지사항</a>
					</nav>
				{/if}
			</div>
			<!-- 컨텐츠 들어가는 곳 -->
			<div class="w-full p-12 shadow-2xl"><slot /></div>
		</div>
	</div>
</div>

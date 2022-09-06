<script>
	import Logo from '$lib/assets/Logo.svelte';
	import { toast, user } from '$lib/stores';
	import { supabase } from '$lib/supabase';

	let menu = '';
</script>

<div class="h-screen flex">
	<div class="flex flex-col border-r-2 border-gray-200 gap-8">
		<Logo />
		{#if $user}
			<nav class="border-y flex flex-col text-xl font-bold">
				<a href="/users/mypage" class="p-4 border-t">마이페이지</a>
				<button
					on:click={() => {
						if (menu === 'activity') menu = '';
						else menu = 'activity';
					}}
					class="border-y text-start p-4 pb-0"
				>
					진행중인 활동
					<div class="flex flex-col gap-4 p-4 {menu === 'activity' ? '' : 'pb-0'}">
						<a href="/main/study" class="{menu === 'activity' ? '' : 'hidden'} ml-8">스터디</a>
						<a href="/main/project" class="{menu === 'activity' ? '' : 'hidden'} ml-8">프로젝트</a>
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
			<nav class="border-y flex flex-col text-xl font-bold">
				<button
					on:click={() => {
						if (menu === 'together') menu = '';
						else menu = 'together';
					}}
					class="text-start p-4"
				>
					함께하기
				</button>
				<div class="flex flex-col gap-4 p-4 {menu === 'together' ? '' : 'hidden'}">
					<a href="/users/signIn" class="ml-8">로그인</a>
					<a href="/users/signUp" class="ml-8">회원가입</a>
				</div>
				<a href="/main/activity" class="p-4 border-t">진행중인 활동</a>
				<a href="/main/knowhow" class="p-4 border-t">노하우 공유</a>
				<a href="/main/notice" class="p-4 border-t">공지사항</a>
			</nav>
		{/if}
	</div>
	<slot />
</div>

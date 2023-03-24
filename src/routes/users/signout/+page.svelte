<script lang="ts">
	import { user, toast } from '$lib/stores';
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import { mypageSidebar } from '$lib/stores';
	import { onMount, onDestroy } from 'svelte';
	import { _deleteUser } from './+page';
	import { goto } from '$app/navigation';

	const handleGoBack = (e: Event) => {
		history.go(-1);
	};

	const handlerSignOut = async () => {
		const result = await _deleteUser($user.id);
		if (result) {
			console.log(12);
			goto('/signout/done');
			$user = null;
		}
	};

	onMount(() => {
		$mypageSidebar = Symbol('null');
	});

	onDestroy(() => {
		$mypageSidebar = Symbol.for('default');
	});
</script>

<ContentWrapper title="회원 탈퇴" hasBack={true}>
	<div class="flex flex-col gap-20 flex-1 py-6 px-4">
		<div>
			<h1 class="font-semibold text-3xl">정말로 탈퇴하시겠어요?</h1>
			<p class="mt-8 text-xl font-semibold">✅ 다음의 사항들은 탈퇴하셔도 페이지에 남게 됩니다.</p>
			<p class="mt-2 ">• 작성하신 게시글</p>
			<p class="mt-2">• 생성하신 활동 및 세션</p>
			<p class="mt-8 text-xl font-semibold">✅ 다음의 사항들은 자동으로 종료 처리됩니다.</p>
			<p class="mt-2">• 개설하신 활동</p>
		</div>
		<div class="flex gap-12">
			<button class="text-xl font-semibold hover:underline" on:click|preventDefault={handlerSignOut}
				>회원탈퇴</button
			>
			<button class="text-xl font-semibold hover:underline" on:click|preventDefault={handleGoBack}
				>이전으로</button
			>
		</div>
	</div>
</ContentWrapper>

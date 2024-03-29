<script type="ts">
	import Icon from '$lib/Icon.svelte';
	import { fade, fly } from 'svelte/transition';
	import { toast, user, mypageSidebar, mypageSidebarParam, myProfile, myStacks } from '$lib/stores';
	import axios from 'axios';
	import { supabase } from '$lib/supabase';
	import {
		_addUserStack,
		_getUser,
		_deleteUserStack,
		_getUserStacks,
		_checkNameDuplication,
		_upsertUserProfileImage,
		_removeUserProfileImage
	} from './+layout';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: any;

	const stacks = data.stacks;
	let searchedStack = '';

	$myProfile = data.user;
	$myStacks = data.userStacks;
	let nameDuplicated = false;

	$mypageSidebar = Symbol.for('default');

	const addStackHandler = async (stack_id: string) => {
		const result = await _addUserStack(stack_id, $user?.id);
		$toast = result ? '스택 뱃지 추가 성공' : '추가 실패';
		if (result) $myStacks = await _getUserStacks();
	};

	const nameCheckHandler = async (name: string, e: Event) => {
		nameDuplicated = await _checkNameDuplication(name, $user.id);
	};

	const submitProfileHandler = async (e: SubmitEvent) => {
		const name = e.target.name.value;
		const descriptions = e.target.descriptions.value;
		const accesstoken = await supabase.auth
			.getSession()
			.then(({ data }) => data.session?.access_token);
		try {
			await axios({
				method: 'post',
				url: '/users',
				data: { name, descriptions, id: $user?.id },
				headers: { Bearer: accesstoken }
			});
			$toast = '내 정보 변경 성공';
			$myProfile = await _getUser();
		} catch (err) {
			console.log(err);
			$toast = err.response.data;
		}
	};

	const searchState = (stackName: string) => {
		return stacks.filter((stack) => stack.name.toLowerCase().includes(stackName.toLowerCase()));
	};

	beforeUpdate(() => {
		if (!$user) {
			$toast = '로그인을 해주세요';
			goto('/');
		}
	});
</script>

<div in:fade|local class="flex">
	<!-- 내 정보 섹션 -->
	<div class="w-2/3 h-screen py-12 px-6 overflow-y-auto scrollbar-hide">
		<slot />
	</div>
	{#if $mypageSidebar === Symbol.for('default')}
		<!-- 활동 관리 섹션 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/3 h-screen border-l pt-24 pl-12 gap-8 text-start font-semibold"
		>
			<h2 class="text-2xl pb-4 font-bold">활동 관리</h2>
			<a class="text-start text-gray-500 text-xl hover:underline" href="/users">마이 페이지</a>
			<a class="text-start text-gray-500 text-xl hover:underline" href="/activities/form"
				>활동 개설</a
			>
			<a class="text-start text-gray-500 text-xl hover:underline" href="/users/activities/admin"
				>관리 활동 목록</a
			>
			<a class="text-start text-gray-500 text-xl hover:underline" href="/users/activities"
				>참여 활동 목록</a
			>
			<a class="text-start text-gray-500 text-xl hover:underline" href="/users/articles"
				>게시글 관리</a
			>
			<a class="text-start text-gray-500 text-xl hover:underline" href="/users/applications"
				>지원 내역 조회</a
			>
			<a class="text-start text-gray-500 text-xl hover:underline" href="/users/signout">회원 탈퇴</a
			>
		</div>
	{:else if $mypageSidebar === Symbol.for('edit')}
		<!-- 내 정보 변경 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/3 h-screen border-l pt-24 px-4 gap-8 text-start font-semibold"
		>
			<h2 class="flex items-center gap-2 text-2xl pb-4 font-bold">
				내 정보 변경 <Icon icon="edit-2" />
			</h2>
			<form class="flex flex-col gap-16 w-full" on:submit|preventDefault={submitProfileHandler}>
				<div class="flex gap-6 w-full">
					<div class="w-24 text-xl text-blue-300">이름</div>
					<div class="relative w-full">
						<input
							class="w-full border-b {nameDuplicated
								? 'border-red-300'
								: 'border-green-300'} focus:outline-none"
							name="name"
							value={$myProfile?.name}
							on:keyup={async (e) => {
								nameCheckHandler(e.target.value, e);
							}}
							type="text"
						/>
						<div
							class="absolute top-8 text-xs {nameDuplicated ? 'text-red-500' : 'text-green-500'}"
						>
							{nameDuplicated ? '중복된 이름이 있습니다!' : '가능한 이름입니다!'}
						</div>
					</div>
				</div>
				<div class="flex gap-6">
					<div class="w-24 text-xl text-blue-300">이메일</div>
					<p class="w-full truncate text-start">{$myProfile?.email}</p>
				</div>
				<div class="flex justify-between gap-6 w-full">
					<div class="w-24 text-xl text-blue-300">비밀번호</div>
					<a
						class="flex items-center w-fit px-2 text-sm rounded bg-blue-300 text-white"
						href="/reset/password">비밀번호 변경</a
					>
				</div>
				<div class="flex flex-col gap-2">
					<div class="text-xl text-blue-300">자기소개</div>
					<textarea
						class="w-full h-56 py-2 border-y overflow-y-auto scrollbar-hide resize-none"
						name="descriptions"
						value={$myProfile?.descriptions ? $myProfile?.descriptions : ''}
					/>
				</div>
				<input type="text" class="hidden" value={$user?.id} name="user_id" />
				<div class="flex justify-center w-full">
					<button
						class="text-xl {nameDuplicated ? '' : 'hover:underline'}"
						disabled={nameDuplicated}>수정완료</button
					>
				</div>
			</form>
		</div>
	{:else if $mypageSidebar === Symbol.for('stack')}
		<!-- 스택 선택 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/3 h-screen pt-12 px-12 border-l gap-12 text-start"
		>
			<div class="flex items-center gap-6">
				<h2 class="w-48 text-2xl font-bold">스택 선택</h2>
				<div class="relative w-full">
					<input
						type="text"
						class="w-full py-0.5 px-1 text-lg placeholder:text-sm rounded bg-gray-100 focus:outline-none focus:border-blue-300"
						placeholder="찾고자 하는 스택 입력"
						bind:value={searchedStack}
					/>
					<div class="absolute right-1 top-1"><Icon icon="search" /></div>
				</div>
			</div>
			<div class="grid grid-cols-3 gap-3 gap-y-2 pb-12 overflow-y-auto scrollbar-hide">
				{#each searchState(searchedStack) as stack}
					<button
						class="w-full h-20 hover:bg-gray-200 rounded"
						on:click|preventDefault={async () => {
							addStackHandler(stack.id);
						}}
					>
						<img
							src={stack.url}
							alt={stack.id}
							class="w-full h-10 object-cover hover:object-contain rounded"
						/>
						<h3 class="text-sm">{stack.name}</h3>
					</button>
				{/each}
			</div>
		</div>
	{:else if $mypageSidebar === Symbol.for('participant')}
		<!-- 활동 관리 섹션 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/3 h-screen pt-36 pl-12 border-l gap-8 text-start font-semibold"
		>
			<h2 class="text-2xl pb-4 font-bold">활동 참가자 메뉴</h2>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/activities/{$mypageSidebarParam}">활동 메인 페이지</a
			>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/activities/{$mypageSidebarParam}/sessions">세션 목록</a
			>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/users/articles?id={$mypageSidebarParam}">게시글 관리</a
			>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/users/activities/{$mypageSidebarParam}/signout">활동 탈퇴</a
			>
		</div>
	{:else if $mypageSidebar === Symbol.for('participant/super')}
		<!-- 활동 관리 섹션 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/3 h-screen pt-36 pl-12 border-l  gap-8 text-start font-semibold"
		>
			<h2 class="text-2xl pb-4 font-bold">활동 참가자 메뉴</h2>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/activities/{$mypageSidebarParam}">활동 메인 페이지</a
			>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/activities/{$mypageSidebarParam}/sessions">세션 목록</a
			>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/users/articles?id={$mypageSidebarParam}">게시글 관리</a
			>
		</div>
	{:else if $mypageSidebar === Symbol.for('super')}
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/3 h-screen pt-36 pl-12 border-l gap-8 text-start font-semibold"
		>
			<h2 class="text-2xl pb-4 font-bold">활동 오너 메뉴</h2>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/activities/{$mypageSidebarParam}/admin/form">활동 정보 수정</a
			>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/activities/{$mypageSidebarParam}/admin/sessions">세션 목록 수정</a
			>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/activities/{$mypageSidebarParam}/admin/applications">지원 정보 관리</a
			>
		</div>
	{:else if $mypageSidebar === Symbol.for('admin')}
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/3 h-screen pt-36 pl-12 border-l gap-8 text-start font-semibold"
		>
			<h2 class="text-2xl pb-4 font-bold">활동 관리자 메뉴</h2>
			<a
				class="text-start text-gray-500 text-xl hover:underline"
				href="/activities/{$mypageSidebarParam}/admin/sessions">세션 목록 수정</a
			>
		</div>
	{:else}{/if}
</div>

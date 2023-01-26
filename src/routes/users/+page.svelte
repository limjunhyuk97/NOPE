<script type="ts">
	import Icon from '$lib/Icon.svelte';
	import { getImageKey, getSignedUrl } from '$lib/utils';
	import { fade, fly } from 'svelte/transition';
	import { toast, user } from '$lib/stores';
	import {
		editProfile,
		editProfileImage,
		addUserStack,
		deleteUserStack,
		getUserStacks
	} from './+page';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: any;

	const stacks = data.stacks;
	let pageState = 'default';
	let searchedStack = '';

	let profile = data.user;
	let userStacks = data.userStacks;
	console.log(userStacks);

	let profileImageUrl: string | null = profile.images?.url;
	let profileEdit = false;
	let name = profile.name;
	let password = '';
	let passwordCheck = '';

	const fileSelectedHandler = async (event: Event) => {
		if (event.target.files.length === 1) {
			const key = await getImageKey(event.target.files[0]);
			const signedUrl = await getSignedUrl(key);

			profileImageUrl = signedUrl;
			profile = await editProfileImage(profile.image_id, signedUrl);
		}
	};

	const addStackHandler = async (stack_id: string) => {
		const result = await addUserStack(stack_id, $user?.id);
		$toast = result ? '스택 뱃지 추가 성공' : '추가 실패';
		if (result) userStacks = await getUserStacks();
	};

	const deletStackHandler = async (id: string) => {
		const result = await deleteUserStack(id);
		$toast = result ? '스택 뱃지 삭제 성공' : '삭제 실패';
		if (result) userStacks = await getUserStacks();
	};

	const changePageState = () => {
		pageState = pageState === 'default' ? 'edit' : 'default';
	};

	const selectStackState = () => {
		pageState = 'stack';
	};

	const searchState = (stackName: string) => {
		return stacks.filter((stack) => stack.name.toLowerCase().includes(stackName.toLowerCase()));
	};

	onMount(() => {
		if (!$user) {
			$toast = '로그인을 해주세요';
			goto('/');
		}
	});
</script>

<div in:fade|local class="flex text-xl">
	<!-- 내 정보 섹션 -->
	<div class=" w-1/2 h-screen py-12 px-6 border-r ">
		<div class="flex justify-between items-end">
			<!-- 프로필 사진 업로드 -->
			<label
				on:mouseenter={() => {
					profileEdit = true;
				}}
				on:mouseleave={() => {
					profileEdit = false;
				}}
				for="img_export"
				class="relative cursor-pointer"
			>
				<input
					class="hidden"
					type="file"
					accept=".png, .jpg, .jpeg"
					id="img_export"
					autocomplete="off"
					on:change={(e) => fileSelectedHandler(e)}
				/>
				<div class="bg-black rounded-full text-white">
					{#if profileImageUrl}
						<img
							src={profileImageUrl}
							class="w-36 h-36 rounded-full object-cover"
							alt="프로필사진"
						/>
					{:else}
						<div
							class="flex items-center justify-center w-36 h-36 rounded-full bg-blue-100 border-2 border-gray-100"
						>
							<Icon icon="user" size={132} stroke_width={0.5} />
						</div>
					{/if}
				</div>
				<div
					class="{profileEdit
						? ''
						: 'hidden'} absolute right-0 bottom-0 bg-white rounded-full p-2 border border-gray-800"
				>
					<Icon icon="edit-2" />
				</div>
			</label>
			<!-- 내 정보 변경 / 활동 관리 선택 -->
			<button on:click={changePageState} class="flex gap-4">
				{#if pageState === 'default'}
					<div>내 정보</div>
					<Icon icon="settings" />
				{:else}
					<div>활동 관리</div>
					<Icon icon="list" />
				{/if}
			</button>
		</div>
		<!-- 내 정보 섹션 -->
		<div class="flex flex-col gap-16 mt-14">
			<div class="flex gap-14">
				<div class="w-20 text-blue-300">이름</div>
				<div>{profile.name}</div>
			</div>
			<div class="flex gap-14">
				<div class="w-20 text-blue-300">이메일</div>
				<div>{profile.email}</div>
			</div>
			<div class="flex gap-14">
				<div class="w-20 text-blue-300">비밀번호</div>
				<div>****</div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="text-blue-300">자기소개</div>
				<p class="w-full h-56 py-2 border-y overflow-y-auto scrollbar-hide">
					{data.descriptions ? data.descriptions : `자기소개를 작성해주세요!`}
				</p>
			</div>
			<div class="flex flex-col gap-2">
				<div class="flex gap-4">
					<div class="text-blue-300">나의 관심/주력 스택</div>
					<button
						class="flex items-center justify-center w-6 h-6 rounded-full border-2 border-blue-300 text-sm font-bold text-blue-300"
						on:click|preventDefault={selectStackState}
						><Icon icon="plus" size={12} stroke_width={4} /></button
					>
				</div>
				<div class="grid grid-cols-3 gap-2 h-40 overflow-y-auto scrollbar-hide">
					{#each userStacks as stack}
						<button
							class="flex flex-col items-center relative w-full h-16 hover:bg-gray-200 rounded "
							on:click={async () => await deletStackHandler(stack.id)}
						>
							<img
								src={stack.stacks.url}
								alt={stack.stacks.id}
								class="w-full h-12 object-cover hover:object-contain rounded"
							/>
							<h3 class="text-sm">{stack.stacks.name}</h3>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
	{#if pageState === 'default'}
		<!-- 활동 관리 섹션 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/2 h-screen pt-40 pl-12 gap-8 text-start"
		>
			<h2 class="text-3xl pb-4">활동 관리</h2>
			<a class="text-start text-gray-500 text-xl" href="/activities/post">활동 개설</a>
			<button class="text-start text-gray-500 text-xl">주최 활동 관리</button>
			<button class="text-start text-gray-500 text-xl">참여 활동 관리</button>
			<button class="text-start text-gray-500 text-xl">게시글 관리</button>
			<button class="text-start text-gray-500 text-xl">지원 내역 조회</button>
			<button class="text-start text-gray-500 text-xl">회원 탈퇴</button>
		</div>
	{:else if pageState === 'edit'}
		<!-- 내 정보 변경 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/2 h-screen pt-40 px-12 gap-8 text-start"
		>
			<h2 class="text-3xl pb-4">내 정보 변경</h2>
			<form on:submit|preventDefault={() => {}} class="flex flex-col gap-6">
				<label for="id" class="text-xl flex justify-between items-center">
					<span class="whitespace-nowrap">이름</span>
					<input
						class="text-end px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
						type="text"
						id="id"
						bind:value={name}
						autocomplete="off"
					/>
				</label>
				<span class="flex justify-end"><button>이름 변경</button></span>
			</form>
			<form action="" class="flex flex-col gap-6">
				<label for="newPassword" class="text-xl flex justify-between items-center"
					><span class="whitespace-nowrap">새 비밀번호</span>
					<input
						class="text-end px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
						type="password"
						id="newPassword"
						bind:value={password}
						autocomplete="off"
					/>
				</label>
				<label for="passwordCheck" class="text-xl flex justify-between">
					<span class="whitespace-nowrap">새 비밀번호 확인</span>
					<input
						class="text-end px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
						type="password"
						id="passwordCheck"
						bind:value={passwordCheck}
						autocomplete="off"
					/>
				</label>
				<span class="flex justify-end"><button>비밀번호 변경</button></span>
			</form>
			{#if password !== passwordCheck}<span class="ml-3 text-xs text-red-500"
					>비밀번호와 일치하지 않습니다.</span
				>
			{:else if password || passwordCheck}
				<span class="ml-3 text-xs text-green-500">비밀번호와 일치합니다.</span>
			{/if}
			<label for="descriptions"> 자기소개 </label>
			<textarea class="h-32 border-y outline-none" />
		</div>
	{:else if pageState === 'stack'}
		<!-- 스택 선택 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/2 h-screen pt-40 px-12 gap-12 text-start"
		>
			<div class="flex flex-col gap-12">
				<h2 class="w-40 text-3xl">스택 선택</h2>
				<div class="relative w-full mt-1">
					<input
						type="text"
						class="w-full text-xl border-b border-gray-300 focus:outline-none focus:border-blue-300"
						bind:value={searchedStack}
					/>
					<div class="absolute right-0 top-0"><Icon icon="search" /></div>
				</div>
			</div>
			<div class="grid grid-cols-3 gap-3 gap-y-4 pb-12 overflow-y-auto scrollbar-hide">
				{#each searchState(searchedStack) as stack}
					<button
						class="w-full h-18 hover:bg-gray-200 rounded"
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
	{/if}
</div>

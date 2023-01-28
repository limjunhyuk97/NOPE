<script type="ts">
	import Icon from '$lib/Icon.svelte';
	import { resizeImage, getImageKey, getSignedUrl } from '$lib/utils';
	import { upsertUserProfileImage, removeUserProfileImage } from './+page';
	import { fade, fly } from 'svelte/transition';
	import { toast, user } from '$lib/stores';
	import axios from 'axios';
	import { supabase } from '$lib/supabase';
	import {
		addUserStack,
		getUser,
		deleteUserStack,
		getUserStacks,
		checkNameDuplication
	} from './+page';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: any;

	const stacks = data.stacks;
	let pageState = 'default';
	let searchedStack = '';

	let profile = data.user;
	let userImage = data.userImage;
	let userStacks = data.userStacks;

	let nameDuplicated = false;
	let hoveringImageUpload = false;

	const uploadImageHandler = async (event: Event) => {
		if (event.target.files.length > 0) {
			const image = event.target.files[0];
			const resized = await resizeImage(image);
			const key = await getImageKey(resized);
			if (!key) {
				$toast = '이미지 등록이 불가능합니다.';
			} else {
				const access_token = await supabase.auth
					.getSession()
					.then(({ data }) => data.session?.access_token);
				const result = await upsertUserProfileImage(profile.image_id, key, access_token);
				if (result) {
					$toast = '이미지 등록 완료';
					profile = await getUser();
					userImage = await getSignedUrl(profile.images?.storage_id);
				} else {
					$toast = '이미지 등록 실패';
				}
			}
		}
	};

	const removeImageHandler = async (event: Event) => {
		const result = await removeUserProfileImage(profile.image_id);
		if (result) {
			$toast = '이미지 삭제 완료';
			profile = await getUser();
			userImage = await getSignedUrl(profile.images?.storage_id);
		} else {
			$toast = '이미지 삭제 실패';
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

	const nameCheckHandler = async (name: string, e: Event) => {
		nameDuplicated = await checkNameDuplication(name, $user.id);
	};

	const submitProfileHandler = async (e: SubmitEvent) => {
		const name = e.target.name.value;
		const descriptions = e.target.descriptions.value;
		const accesstoken = await supabase.auth
			.getSession()
			.then(({ data }) => data.session?.access_token);
		try {
			const response = await axios({
				method: 'post',
				url: '/users',
				data: { name, descriptions, id: $user?.id },
				headers: { Bearer: accesstoken }
			});
			$toast = '내 정보 변경 성공';
			profile = await getUser();
		} catch (err) {
			$toast = err.response.data;
			console.log(err);
		}
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
	<div class=" w-1/2 h-screen py-12 px-6 border-r overflow-y-auto scrollbar-hide">
		<div class="flex justify-between items-end">
			<!-- 프로필 사진 업로드 -->
			<label
				on:mouseenter={() => {
					hoveringImageUpload = true;
				}}
				on:mouseleave={() => {
					hoveringImageUpload = false;
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
					on:change={uploadImageHandler}
				/>
				<div class="bg-black rounded-full text-white">
					{#if userImage}
						<img src={userImage} class="w-36 h-36 rounded-full object-cover" alt="프로필사진" />
					{:else}
						<div
							class="flex items-center justify-center w-36 h-36 rounded-full bg-blue-100 border-2 border-gray-100"
						>
							<Icon icon="user" size={132} stroke_width={0.5} />
						</div>
					{/if}
				</div>
				<div
					class="{hoveringImageUpload
						? ''
						: 'hidden'} absolute left-24 bottom-0 flex gap-2 p-2 bg-white rounded-full border border-gray-800"
				>
					<Icon icon="edit-2" />
					<button on:click|preventDefault={removeImageHandler}>
						<Icon icon="x" />
					</button>
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
			<div class="flex gap-12">
				<div class="w-24 text-blue-300">이름</div>
				<p class="w-full text-start">{profile.name}</p>
			</div>
			<div class="flex gap-12">
				<div class="w-24 text-blue-300">이메일</div>
				<p class="w-full truncate text-start">{profile.email}</p>
			</div>
			<div class="flex gap-12">
				<div class="w-24 text-blue-300">비밀번호</div>
				<p class="w-full text-start">****</p>
			</div>
			<div class="flex flex-col gap-2">
				<div class="text-blue-300">자기소개</div>
				<p class="w-full h-56 py-2 border-y overflow-y-auto scrollbar-hide">
					{profile.descriptions ? profile.descriptions : `자기소개를 작성해주세요!`}
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
			<form class="flex flex-col gap-16 w-full" on:submit|preventDefault={submitProfileHandler}>
				<div class="flex gap-6 w-full">
					<div class="w-24 text-blue-300">이름</div>
					<div class="relative w-full">
						<input
							class="w-full border-b {nameDuplicated
								? 'border-red-300'
								: 'border-blue-300'} focus:outline-none"
							name="name"
							value={profile.name}
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
					<div class="w-24 text-blue-300">이메일</div>
					<p class="w-full truncate text-start">{profile.email}</p>
				</div>
				<div class="flex justify-between gap-6 w-full">
					<div class="w-24 text-blue-300">비밀번호</div>
					<a
						class="flex items-center w-fit px-2 text-sm rounded bg-blue-300 text-white"
						href="/users/reset/password">비밀번호 변경</a
					>
				</div>
				<div class="flex flex-col gap-2">
					<div class="text-blue-300">자기소개</div>
					<textarea
						class="w-full h-56 py-2 border-y overflow-y-auto scrollbar-hide resize-none"
						name="descriptions"
						value={profile.descriptions ? profile.descriptions : ''}
					/>
				</div>
				<input type="text" class="hidden" value={$user?.id} name="user_id" />
				<div class="flex justify-end w-full">
					<button
						class="flex items-center gap-2 {nameDuplicated ? '' : 'hover:scale-110 duration-300'}"
						disabled={nameDuplicated}>수정완료<Icon icon="edit-2" size={20} /></button
					>
				</div>
			</form>
		</div>
	{:else if pageState === 'stack'}
		<!-- 스택 선택 -->
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/2 h-screen pt-12 px-12 gap-12 text-start"
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

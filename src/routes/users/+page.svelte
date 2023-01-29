<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { goto } from '$app/navigation';
	import { toast, mypageSidebar, myProfile, myStacks, user } from '$lib/stores';
	import { resizeImage, getImageKey, getSignedUrl } from '$lib/utils';
	import {
		_upsertUserProfileImage,
		_removeUserProfileImage,
		_getUser,
		_deleteUserStack,
		_addUserStack,
		_getUserStacks
	} from './+layout';
	import { supabase } from '$lib/supabase';
	import { onDestroy, onMount } from 'svelte';

	export let data;

	let userImage = data.userImage;
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
				const result = await _upsertUserProfileImage($myProfile.image_id, key, access_token);
				if (result) {
					$toast = '이미지 등록 완료';
					$myProfile = await _getUser();
					userImage = await getSignedUrl($myProfile.images?.storage_id);
				} else {
					$toast = '이미지 등록 실패';
				}
			}
		}
	};

	const removeImageHandler = async (event: Event) => {
		const result = await _removeUserProfileImage($myProfile.image_id);
		if (result) {
			$toast = '이미지 삭제 완료';
			$myProfile = await _getUser();
			userImage = await getSignedUrl($myProfile?.images.storage_id);
		} else {
			$toast = '이미지 삭제 실패';
		}
	};

	const deletStackHandler = async (id: string) => {
		const result = await _deleteUserStack(id);
		$toast = result ? '스택 뱃지 삭제 성공' : '삭제 실패';
		if (result) $myStacks = await _getUserStacks();
	};

	const changePageState = () => {
		$mypageSidebar = $mypageSidebar === 'default' ? 'edit' : 'default';
	};

	const selectStackState = () => {
		$mypageSidebar = $mypageSidebar === 'stack' ? 'default' : 'stack';
	};

	onMount(() => {
		if (!$user) {
			$toast = '로그인을 해주세요';
			goto('/');
		}
	});

	onDestroy(() => {
		$mypageSidebar = 'default';
	});
</script>

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
		{#if $mypageSidebar === 'default'}
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
		<p class="w-full text-start">{$myProfile?.name}</p>
	</div>
	<div class="flex gap-12">
		<div class="w-24 text-blue-300">이메일</div>
		<p class="w-full truncate text-start">{$myProfile?.email}</p>
	</div>
	<div class="flex gap-12">
		<div class="w-24 text-blue-300">비밀번호</div>
		<p class="w-full text-start">****</p>
	</div>
	<div class="flex flex-col gap-2">
		<div class="text-blue-300">자기소개</div>
		<p class="w-full h-56 py-2 border-y overflow-y-auto scrollbar-hide">
			{$myProfile?.descriptions ? $myProfile?.descriptions : `자기소개를 작성해주세요!`}
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
			{#each $myStacks as stack}
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

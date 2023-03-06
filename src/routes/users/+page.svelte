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
	import { onDestroy, beforeUpdate } from 'svelte';

	export let data;

	let userImage = data.userImage;
	let hoveringImageUpload = false;

	// 프로필 이미지 업로드
	const uploadImageHandler = async (event: Event) => {
		if (event.target.files.length > 0) {
			// bucket에 저장
			const image = event.target.files[0];
			const resized = await resizeImage(image);
			const key = await getImageKey(resized);
			if (!key) {
				$toast = '이미지 등록이 불가능합니다.';
			} else {
				// access_token 수령
				const access_token = await supabase.auth
					.getSession()
					.then(({ data }) => data.session?.access_token);
				// 이미지 업데이트 (images 테이블에 저장 + image_id 정보 갱신)
				const result = await _upsertUserProfileImage($myProfile?.image_id, key, access_token);
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

	// 프로필 이미지 제거
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

	// 기술 스택 제거
	const deletStackHandler = async (id: string) => {
		const result = await _deleteUserStack(id);
		$toast = result ? '스택 뱃지 삭제 성공' : '삭제 실패';
		if (result) $myStacks = await _getUserStacks();
	};

	// 마이페이지 상태 default, edit 사이로 변경 (전체 : default / edit / stack)
	const changePageState = () => {
		$mypageSidebar =
			$mypageSidebar === Symbol.for('default') ? Symbol.for('edit') : Symbol.for('default');
	};

	// 마이페이지 상태 default, stack 사이로 변경 (전체 : default / edit / stack)
	const selectStackState = () => {
		$mypageSidebar =
			$mypageSidebar === Symbol.for('stack') ? Symbol.for('default') : Symbol.for('stack');
	};

	beforeUpdate(() => {
		if (!$user) {
			$toast = '로그인을 해주세요';
			goto('/');
		}
	});

	onDestroy(() => {
		$mypageSidebar = Symbol.for('default');
	});
</script>

<div class="relative flex items-center lg:gap-12 gap-4 w-full mt-12">
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
				<img
					src={userImage}
					class="xl:w-52 xl:h-52 w-28 h-28 rounded-full object-cover"
					alt="프로필사진"
				/>
			{:else}
				<div
					class="flex items-center justify-center xl:w-52 xl:h-52 w-28 h-28 rounded-full bg-blue-100 border-2 border-gray-100"
				>
					<Icon icon="user" size={132} stroke_width={0.5} />
				</div>
			{/if}
		</div>
		<div
			class="{hoveringImageUpload
				? ''
				: 'hidden'} absolute right-0 bottom-0 flex gap-2 p-2 bg-white rounded-full border border-gray-800"
		>
			<Icon icon="edit-2" size={16} />
			<button on:click|preventDefault={removeImageHandler}>
				<Icon icon="x" size={16} />
			</button>
		</div>
	</label>
	<div class="flex flex-col gap-6 xl:gap-12 py-4 font-semibold">
		<div class="flex items-center gap-12">
			<div class="w-24 text-xl text-blue-300">이름</div>
			<p class="w-full text-start">{$myProfile?.name}</p>
		</div>
		<div class="flex items-center gap-12">
			<div class="w-24 text-xl text-blue-300">이메일</div>
			<p class="w-full truncate text-start">{$myProfile?.email}</p>
		</div>
		<div class="flex items-center gap-9">
			<div class="w-28 text-xl text-blue-300">비밀번호</div>
			<p class="w-full text-start">********</p>
		</div>
	</div>
	<!-- 내 정보 변경 / 활동 관리 선택 -->
	<button
		on:click={changePageState}
		class="absolute top-0 right-0 flex items-center gap-2 text-blue-300"
	>
		{#if $mypageSidebar === Symbol.for('default')}
			<div>수정</div>
			<Icon icon="settings" size={20} />
		{:else}
			<div>메뉴</div>
			<Icon icon="list" size={20} />
		{/if}
	</button>
</div>
<div class="flex flex-col gap-12 mt-14">
	<div class="flex flex-col gap-2">
		<div class="text-blue-300 text-xl font-semibold">자기소개</div>
		<p class="w-full h-56 py-2 border-y overflow-y-auto scrollbar-hide font-semibold">
			{$myProfile?.descriptions ? $myProfile?.descriptions : `자기소개를 작성해주세요!`}
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<div class="flex gap-4 items-center">
			<div class="h-7 text-xl text-blue-300 font-semibold">나의 관심/주력 스택</div>
			<button
				class="flex items-center justify-center w-5 h-5 rounded-full border-2 border-blue-300 text-sm font-bold text-blue-300"
				on:click|preventDefault={selectStackState}
				><Icon icon="plus" size={12} stroke_width={4} /></button
			>
		</div>
		<div class="grid grid-cols-5 gap-2 h-full">
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

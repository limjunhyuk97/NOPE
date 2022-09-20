<script type="ts">
	import Icon from '$lib/Icon.svelte';
	import { getImageKey, getSignedUrl } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { editProfileImage } from './+page';

	export let data: any;

	let profileImage: string | null = data.profileImage[0]?.url;
	let edit = false;

	const fileSelectedHandler = async (event: any) => {
		const key = await getImageKey(event.target.files[0]);
		const signedUrl = await getSignedUrl(key);
		profileImage = signedUrl;
		editProfileImage(signedUrl);
	};
</script>

<div in:fade class="flex text-xl">
	<div class="flex flex-col w-1/2 h-screen pt-12 pr-12 border-r gap-16">
		<div class="flex justify-between items-end">
			<label
				on:mouseenter={() => {
					edit = true;
				}}
				on:mouseleave={() => {
					edit = false;
				}}
				for="img_export"
				class="relative cursor-pointer"
			>
				<input
					class="hidden"
					type="file"
					accept=".png, .jpg, .jpeg"
					id="img_export"
					on:change={(e) => fileSelectedHandler(e)}
				/>
				<div class="bg-black rounded-full text-white">
					{#if profileImage}
						<img src={profileImage} class="w-24 h-24 rounded-full" alt="프로필사진" />
					{:else}
						<Icon icon="user" size={96} />
					{/if}
				</div>
				<div
					class="{edit
						? ''
						: 'hidden'} absolute right-0 bottom-0 bg-white rounded-full p-2 border border-gray-800"
				>
					<Icon icon="edit-2" />
				</div>
			</label>

			<button class="flex gap-4">
				<div>내 정보</div>
				<Icon icon="settings" />
			</button>
		</div>
		<div class="flex justify-between items-end">
			<div>이름</div>
			<div>{data.profile.name}</div>
		</div>
		<div class="flex justify-between items-end">
			<div>이메일</div>
			<div>{data.profile.email}</div>
		</div>
		<div class="flex justify-between items-end">
			<div>비밀번호</div>
			<div>****</div>
		</div>
		<div class="flex flex-col gap-6">
			<div>자기소개</div>
			<div class="h-32 border-y">
				{data.descriptions ? data.descriptions : '자기소개가 없습니다.'}
			</div>
		</div>
		<div class="flex gap-6 items-end">
			<div>나의 관심/주력 스택</div>
			<button>+</button>
		</div>
	</div>
	<div class="flex flex-col w-1/2 h-screen pt-28 pl-12 gap-8 text-start">
		<div class="text-3xl pb-4">활동 관리</div>
		<button class="text-start text-gray-500 text-xl">활동 개설</button>
		<button class="text-start text-gray-500 text-xl">주최 활동 관리</button>
		<button class="text-start text-gray-500 text-xl">참여 활동 관리</button>
		<button class="text-start text-gray-500 text-xl">산출물 관리</button>
		<button class="text-start text-gray-500 text-xl">회원 탈퇴</button>
	</div>
</div>

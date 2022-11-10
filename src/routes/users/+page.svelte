<script type="ts">
	import Icon from '$lib/Icon.svelte';
	import { getImageKey, getSignedUrl } from '$lib/utils';
	import { fade, fly } from 'svelte/transition';
	import { editProfile, editProfileImage } from './+page';

	export let data: any;

	let profile = data.profile;
	let profileImageUrl: string | null = profile.images?.url;
	let profileEdit = false;
	let pageState = 'default';
	let name = profile.name;
	let password = '';
	let passwordCheck = '';

	const fileSelectedHandler = async (event: any) => {
		if (event.target.files.length === 1) {
			const key = await getImageKey(event.target.files[0]);
			const signedUrl = await getSignedUrl(key);

			profileImageUrl = signedUrl;
			profile = await editProfileImage(profile.image_id, signedUrl);
		}
	};

	const changePageState = (state: string) => {
		pageState = state;
	};

	const changeName = async (name: string) => {
		profile = await editProfile({ name: name });
	};
</script>

<div in:fade class="flex text-xl px-8">
	<div class="flex flex-col w-1/2 h-screen pt-12 pr-12 border-r gap-16">
		<div class="flex justify-between items-end">
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
						<Icon icon="user" size={144} />
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

			<button
				on:click={() => {
					switch (pageState) {
						case 'default':
							changePageState('editProfile');
							break;
						case 'editProfile':
							changePageState('default');
					}
				}}
				class="flex gap-4"
			>
				{#if pageState === 'editProfile'}
					<div>활동 관리</div>
					<Icon icon="tool" />
				{:else if pageState === 'default'}
					<div>내 정보</div>
					<Icon icon="settings" />
				{/if}
			</button>
		</div>
		<div class="flex justify-between items-end">
			<div>이름</div>
			<div>{profile.name}</div>
		</div>
		<div class="flex justify-between items-end">
			<div>이메일</div>
			<div>{profile.email}</div>
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
	{#if pageState === 'default'}
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/2 h-screen pt-28 pl-12 gap-8 text-start"
		>
			<div class="text-3xl pb-4">활동 관리</div>
			<a class="text-start text-gray-500 text-xl" href="/activities/post">활동 개설</a>
			<button class="text-start text-gray-500 text-xl">주최 활동 관리</button>
			<button class="text-start text-gray-500 text-xl">참여 활동 관리</button>
			<button class="text-start text-gray-500 text-xl">산출물 관리</button>
			<button class="text-start text-gray-500 text-xl">회원 탈퇴</button>
		</div>
	{:else if pageState === 'editProfile'}
		<div
			in:fly|local={{ x: -64 }}
			class="flex flex-col w-1/2 h-screen pt-28 pl-12 gap-6 text-start"
		>
			<div class="text-3xl pb-4">내 정보 변경</div>
			<form on:submit|preventDefault={() => changeName(name)} class="flex flex-col gap-6">
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
	{/if}
</div>

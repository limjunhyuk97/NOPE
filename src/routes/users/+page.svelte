<script type="ts">
	import Icon from '$lib/Icon.svelte';
	import { profile, user } from '$lib/stores';
	import { fade } from 'svelte/transition';

	export let data: any;
	console.log(data);

	export let editProfileImage: () => {};
</script>

<div in:fade class="flex text-xl px-8">
	<div class="flex flex-col w-1/2 h-screen pt-12 pr-12 border-r gap-16">
		<div class="flex justify-between items-end">
			<button on:click={editProfileImage} class="rounded-full border-8 border-gray-900">
				<Icon icon="user" size={96} />
			</button>
			<button class="flex gap-4">
				<div>내 정보</div>
				<Icon icon="settings" />
			</button>
		</div>
		<div class="flex justify-between items-end">
			<div>이름</div>
			<!-- <div>{}</div> -->
		</div>
		<div class="flex justify-between items-end">
			<div>이메일</div>
			<!-- <div>{data.profile.data[0].email}</div> -->
		</div>
		<div class="flex justify-between items-end">
			<div>비밀번호</div>
			<div>****</div>
		</div>
		<div class="flex flex-col gap-6">
			<div>자기소개</div>
			<div class="h-32 border-y">blah blah</div>
		</div>
		<div class="flex gap-6 items-end">
			<div>나의 관심/주력 스택</div>
			<button>+</button>
		</div>
	</div>
	<div class="flex flex-col w-1/2 h-screen pt-28 pl-12 gap-8 text-start">
		<div class="text-3xl pb-4">활동 관리</div>
		<button class="text-start text-gray-500 text-xl">주최 활동 관리</button>
		<button class="text-start text-gray-500 text-xl">참여 활동 관리</button>
		<button class="text-start text-gray-500 text-xl">산출물 관리</button>
	</div>
</div>

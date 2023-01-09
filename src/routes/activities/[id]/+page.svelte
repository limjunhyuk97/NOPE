<script lang="ts">
	import { page } from '$app/stores';
	import { USER_STATUS } from '$lib/constants';
	import { Viewer } from 'bytemd';
	/** @type {import('./$types').PageData} */
	export let data: any;

	const activityData = data.activityData[0];
	const comments = activityData.comments;
	const userStatus = Symbol.for(data.userStatus) ?? USER_STATUS.LOGOUT;

	console.log(activityData);
</script>

<div class=" flex w-full h-full">
	<div class="relative flex flex-col w-full h-full pt-24 p-12">
		{#if activityData?.images?.url}
			<img
				class="absolute top-0 left-0 w-full h-32 object-cover opacity-40"
				src={activityData?.images?.url}
				alt={activityData.title}
			/>
		{:else}
			<div class="absolute top-0 left-0 w-full h-32 bg-gray-400 opacity-40" />
		{/if}
		<h1 class="w-fit p-2 text-2xl z-10 bg-white rounded">{activityData.title}</h1>
		<div class="min-h-[80%] mt-6 md-body"><Viewer value={activityData.details} /></div>
		<div class="flex gap-12">
			{#if userStatus === USER_STATUS.NOTAPPLIED}
				<button class="text-green-700 ">참여 신청하기</button>
				<button>세션 둘러보기</button>
			{:else if userStatus === USER_STATUS.APPLIED}
				<button class="text-green-700">참여 요청완료</button>
				<button>세션 둘러보기</button>
			{:else if userStatus === USER_STATUS.LOGOUT}
				<button>세션 둘러보기</button>
			{:else}
				<button class="text-green-700">세션 목록으로</button>
			{/if}
		</div>
	</div>
	<div class="w-80 pt-24 p-12 border border-l" />
</div>

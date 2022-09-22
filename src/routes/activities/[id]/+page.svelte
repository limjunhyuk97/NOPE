<script lang="ts">
	import Discussion from '$lib/components/activities/Discussion.svelte';
	import Detail from '$lib/components/activities/Detail.svelte';
	import { supabase } from '$lib/supabase';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data: any;
	console.log(data);

	// 활동 정보
	const activity_id = data.activity_id;
	const title = data.activity.title;
	const details = data.activity.details;
	const image = data.activity.images.url;
	const comments = data.comments;

	// 참가 여부 확인
	let status: string | undefined;
	const checkParticipating = async () => {
		const { data, error } = await supabase
			.from('participants')
			.select('status')
			.match({ user_id: $user?.id, activity_id });
		return error ? null : data[0]?.status;
	};

	onMount(async () => {
		status = await checkParticipating();
		console.log(status);
	});
</script>

<div class="w-full h-screen px-6 pt-12 pb-16 relative flex">
	<Detail {title} {details} {image} />
	<Discussion {comments} {activity_id} />
	<div class="flex absolute bottom-4 gap-4">
		{#if status === undefined}
			{#if $user}
				<button class="text-green-700 drop-shadow-lg duration-700 hover:-translate-y-2"
					>참가 신청하기</button
				>
			{/if}
			<button class="text-gray-500 drop-shadow-lg duration-700 hover:-translate-y-2"
				>세션 미리보기</button
			>
		{:else}
			<button class="text-green-700 drop-shadow-lg duration-700 hover:-translate-y-2"
				>세션으로</button
			>
		{/if}
	</div>
</div>

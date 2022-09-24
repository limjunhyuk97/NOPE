<script lang="ts">
	import Discussion from '$lib/components/activities/Discussion.svelte';
	import Detail from '$lib/components/activities/Detail.svelte';
	import { getParticipantAuth } from './+page';
	import { supabase } from '$lib/supabase';
	import { user, toast } from '$lib/stores';

	/** @type {import('./$types').PageData} */
	export let data: any;

	// 활동 정보
	const activity_id = data.activity_id;
	const title = data.activity.title;
	const details = data.activity.details;
	const image = data.activity.images.url;
	const comments = data.comments;

	// 사용자 참여 정보
	let authority = data.authority;

	// 참여 신청
	const requestParticipant = async () => {
		const { data, error } = await supabase
			.from('participants')
			.insert([{ user_id: $user?.id, activity_id }]);
		$toast = !error ? '참가 신청 완료' : '참가 신청 실패';
		if (!error) {
			authority = $user ? await getParticipantAuth($user?.id, activity_id) : null;
		}
	};
</script>

<div class="w-full h-screen  px-6 pt-12 pb-16 relative flex ">
	<Detail {title} {details} {image} {activity_id} {authority} />
	<Discussion {comments} {activity_id} />
	<div class="absolute bottom-4 gap-4">
		<div class="flex gap-4 justify-center text-lg">
			{#if !authority || authority === 'pending' || authority === 'none'}
				{#if authority === 'none'}
					<button
						class="hover:animate-pulse text-green-700"
						on:click|preventDefault={async () => {
							await requestParticipant();
						}}>참여 신청하기</button
					>
				{/if}
				{#if authority === 'pending'}
					<div>참여 요청완료</div>
				{/if}
				<a class="hover:animate-pulse" href="/activities/{activity_id}/session">세션 둘러보기</a>
			{:else}
				<a class="hover:animate-pulse" href="/activities/{activity_id}/session">세션으로</a>
			{/if}
		</div>
	</div>
</div>

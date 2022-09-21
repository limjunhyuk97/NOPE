<script lang="ts">
	import moment from 'moment/min/moment-with-locales';
	import Icon from '$lib/Icon.svelte';
	import { supabase } from '$lib/supabase';
	import type { Users } from '$lib/types/activities';
	import { user, toast } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	moment.locale('ko');

	export let users: Users;
	export let contents = '';
	export let created_at = '';
	export let comment_id = '';
	console.log(users);

	// 댓글 삭제 시에 상위로 이벤트 전달하여 댓글 목록을 다시 받아온다.
	// 이를 하위컴포넌트 -> 상위 컴포넌트로 전달하는 방식으로 구현한다. (eventDispatcher)
	const dispatch = createEventDispatcher();

	// 댓글 삭제
	const deleteComment = async () => {
		const { error } = await supabase.from('activities_comments').delete().match({ id: comment_id });
		$toast = error ? '삭제 실패' : '댓글이 삭제 되었습니다!';
		if (!error) {
			dispatch('reload_message', {
				getComments: true
			});
		}
	};
</script>

<div class="px-3 mb-7">
	<div class="mb-4 flex items-center text-sm">
		{#if users.images}
			<img src={users.images.url} alt={users.name} class="w-7 h-7 rounded-full object-cover" />
		{:else}
			<div class="w-min p-1 bg-gray-200 rounded-full"><Icon icon="user" size={20} /></div>
		{/if}
		<div class="ml-3">{users.name}</div>
	</div>
	<pre class="mb-2">{contents}</pre>
	<div class="w-full items-end relative flex text-xs text-gray-500">
		{#if $user?.id === users.id}
			<button
				on:click={async () => {
					await deleteComment();
				}}>삭제</button
			>
			<pre> • </pre>{/if}

		<button>신고</button>
		<div class="absolute right-0">{moment(created_at).fromNow()}</div>
	</div>
</div>

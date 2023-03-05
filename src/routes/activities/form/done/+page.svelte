<script lang="ts">
	import Done from '$lib/template/Done.svelte';

	export let data;

	const activity_id = data.activity_id;

	const done_message = '활동 생성을 완료했습니다!';
	const links = [
		{ text: '홈으로', href: '/' },
		{ text: '활동 메인으로', href: `/activities/${activity_id}` }
	];
</script>

<Done {done_message} {links} />

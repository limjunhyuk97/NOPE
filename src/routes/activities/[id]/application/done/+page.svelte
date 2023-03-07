<script>
	import Done from '$lib/template/Done.svelte';
	import qs from 'query-string';

	export let data;

	const { id } = qs.parse(window.location.search);

	const done_message = '지원서 제출을 완료했습니다!';
	const links = [
		{ text: '홈으로', href: '/' },
		{ text: '지원서 보러가기', href: `/applications/${id}` }
	];
</script>

<Done {done_message} {links} />

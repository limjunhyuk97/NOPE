<script>
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import { mypageSidebar, myProfile } from '$lib/stores';
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		$mypageSidebar = null;
	});
</script>

<ContentWrapper title="참가자 탈퇴" hasBack={true}>
	<h1>정말로 탈퇴하시겠어요?</h1>
</ContentWrapper>

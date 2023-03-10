<script>
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	import { mypageSidebar, mypageSidebarParam } from '$lib/stores';
	import { onDestroy } from 'svelte';
	import MDViewer from '$lib/components/common/MDViewer.svelte';
	export let data;

	const activity = data.activityData;
	const userStatus = data.userStatus;

	$mypageSidebar =
		userStatus === 'super' ? Symbol.for('participant/super') : Symbol.for('participant');
	$mypageSidebarParam = activity.id;

	onDestroy(() => {
		$mypageSidebar = Symbol.for('default');
	});
</script>

<ContentWrapper title={activity.title} hasBack={true}>
	<div class="w-full px-4">
		<MDViewer mdTypeContent={activity.details} />
	</div>
</ContentWrapper>

<script>
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	import { mypageSidebar, mypageSidebarParam } from '$lib/stores';
	import { onDestroy } from 'svelte';
	import MDViewer from '$lib/components/common/MDViewer.svelte';
	export let data;

	const activity = data.activityData;
	const userStatus = data.userStatus;

	$mypageSidebar = userStatus === 'super' ? Symbol.for('super') : Symbol.for('admin');
	$mypageSidebarParam = activity.id;

	onDestroy(() => {
		$mypageSidebar = Symbol.for('default');
	});
</script>

<ContentLayer title={activity.title} hasBack={true}>
	<div class="w-full px-4">
		<MDViewer mdTypeContent={activity.details} />
	</div>
</ContentLayer>

<script>
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	import { mypageSidebar, mypageSidebarParam } from '$lib/stores';
	import { onDestroy } from 'svelte';
	import MDViewer from '$lib/components/common/MDViewer.svelte';
	export let data;

	console.log(data);

	const activity = data.activityData;
	$mypageSidebar = 'participating';
	$mypageSidebarParam = activity.id;

	onDestroy(() => {
		$mypageSidebar = 'default';
	});
</script>

<ContentLayer title={activity.title} hasBack={true}>
	<div class="w-full px-4">
		<MDViewer mdTypeContent={activity.details} />
	</div>
</ContentLayer>

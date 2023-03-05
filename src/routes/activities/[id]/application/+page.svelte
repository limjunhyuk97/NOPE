<script>
	import ContentLayer from '$lib/template/ContentLayer.svelte';
	export let data;

	const queries = data.queries;
	const title = data.title.title;

	console.log(data);
</script>

<div class="w-full lg:p-10 py-14 px-6">
	<ContentLayer {title} hasBack={true} />
</div>

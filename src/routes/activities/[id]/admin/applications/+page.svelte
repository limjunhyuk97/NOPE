<script>
	import ContentWrapper from '$lib/template/ContentWrapper.svelte';
	export let data;

	const { participants, activity_name } = { ...data };
</script>

<ContentWrapper title={activity_name} hasBack />

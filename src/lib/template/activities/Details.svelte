<script>
	import Outlayer from '$lib/template/ContentLayer.svelte';
</script>

<Outlayer title="활동 개설">
	<div class="flex 2xl:gap-20 lg:gap-12 gap-4 w-full">
		<slot name="thumbnail" />
		<div class="flex flex-col xl:gap-12 gap-6 w-full mb-12">
			<slot name="activity_type" />
			<slot name="title" />
			<slot name="start_at" />
			<slot name="end_at" />
		</div>
	</div>
	<slot name="short_details" />
	<slot name="details" />
	<slot name="recruiting" />
	<slot name="status" />
</Outlayer>

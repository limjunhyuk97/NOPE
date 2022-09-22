<script>
	import MarkDown from '$lib/components/MarkDown.svelte';

	export let title = '';
	export let details = '# 환영합니다';
	export let image = '';
</script>

<div class="w-2/3 h-full flex flex-col py-3 pr-3 border-r-2 overflow-y-auto">
	<h1 class="w-full text-3xl mb-6">{title}</h1>
	<img src={image} alt={title} class="w-full h-44 object-cover rounded duration-500 bg-gray-100" />
	<MarkDown value={details} />
</div>

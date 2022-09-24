<script lang="ts">
	import MarkDown from '$lib/components/MarkDown.svelte';

	export let title = '';
	export let details = '# 환영합니다';
	export let image = '';
	export let activity_id = '';
	export let authority: string | null = null;
</script>

<div class="w-2/3 h-full relative flex flex-col py-3 pr-3 border-r-2 overflow-y-auto">
	<div class="flex justify-between items-end ">
		<h1 class="w-full text-3xl">{title}</h1>
		{#if authority === 'admin'}
			<a href="/activities/{activity_id}/edit" class="w-20 text-sm text-center text-gray-500"
				>내용 수정</a
			>
		{/if}
	</div>
	<img
		src={image}
		alt={title}
		class="w-full h-44 mt-6 object-cover rounded duration-500 bg-gray-100"
	/>
	<MarkDown value={details} />
</div>

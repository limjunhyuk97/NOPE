<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { modalData } from '$lib/stores';
	import { deleteModal } from '$lib/utils';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="relative flex flex-col p-4 pr-16 bg-white rounded-xl" on:click|stopPropagation>
	<button class="absolute right-4" on:click={deleteModal}><Icon icon="x" /></button>
	<div class="flex flex-col gap-4 w-[440px]">
		<div class="flex gap-8">
			{#if $modalData?.imageUrl}
				<img src={$modalData?.imageUrl} class="w-40 h-40 object-cover rounded-xl" />
			{:else}
				<div class="flex items-center justify-center relative w-36 h-36 rounded-xl bg-gray-200">
					<div class="font-semibold">빈 이미지</div>
				</div>
			{/if}
			<div class="flex flex-col gap-2">
				<h1 class="text-lg font-bold">{$modalData?.name}</h1>
				<p class="w-64 h-28 overflow-y-auto">
					{$modalData?.descriptions ? $modalData?.descriptions : '아직 소개가 없습니다!'}
				</p>
			</div>
		</div>
		{#if $modalData?.user_stacks?.length > 0}
			<div class="relative flex flex-wrap gap-2 w-full">
				{#each $modalData?.user_stacks as stack}
					<img src={stack.stacks.url} alt={stack.stacks.name} />
				{/each}
			</div>
		{/if}
	</div>
</div>

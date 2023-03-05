<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { modalData } from '$lib/stores';
	import { deleteModal } from '$lib/utils';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class=" flex flex-col p-8 MODALMARGIN bg-white rounded-xl" on:click|stopPropagation>
	<div class="relative flex flex-col w-[480px] max-h-[720px]">
		<div class="absolute top-0 left-0 w-full bg-white">
			<button class="absolute right-0" on:click={deleteModal}><Icon icon="x" /></button>
			<h1 class="text-xl font-bold">
				{$modalData?.title}
			</h1>
			<h2 class="mt-2font-semibold text-gray-500">
				{$modalData?.subtitle}
			</h2>
		</div>
		<div class="w-full h-12" />
		<div class="w-full h-1 my-4 bg-gray-100" />
		<div class="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
			{#each $modalData?.answers as answer, id}
				<div class="flex flex-col gap-2">
					<h3>
						<span class="font-semibold">Q{id + 1}. </span>
						<span>{answer.query}</span>
					</h3>
					<p class="break-all">{answer.content}</p>
				</div>
			{/each}
		</div>
		<div class="w-full h-1 my-4 bg-gray-100" />
	</div>
	<div class="flex justify-around gap-16 pt-4">
		<button class="font-semibold text-xl hover:underline" on:click={deleteModal}>다시 작성</button>
		<button
			class="font-semibold text-xl hover:underline"
			on:click|preventDefault|once={() => {
				$modalData.handleConfirm();
				deleteModal();
			}}>제출</button
		>
	</div>
</div>

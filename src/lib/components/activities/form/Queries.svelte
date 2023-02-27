<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';
	import Icon from '$lib/Icon.svelte';

	let query = '';
	let queries: string[] = [];

	const createQuery = (e: Event) => {
		const newQuery = DOMPurify.sanitize(query).replace(/\n/gi, (match) => '<br/>');
		queries = [newQuery, ...queries];
		query = '';
	};

	let showDelete = false;
	const removeQuery = (id: number) => {
		return (e: Event) => {
			queries = queries.filter((el, idx) => idx !== id);
		};
	};
	const showDeleteButton = (e: Event) => {
		showDelete = true;
	};
	const hideDeleteButton = (e: Event) => {
		showDelete = false;
	};
</script>

<input type="number" name="query-count" value={queries.length} class="hidden" />
{#each queries as query, id}
	<input type="text" name="queiry-{id}" value={query} class="hidden" />
{/each}

<div class="flex w-full h-full">
	<div class="flex flex-col gap-4 w-1/2 h-[85vh] p-4 border-r">
		<h1 class="text-3xl">지원서 생성</h1>
		<h2 class="mt-8 text-xl">참가 신청자에게 물어보고 싶은 내용을 생성합니다.</h2>
		<div class="flex flex-col gap-4 w-full mt-4">
			<div class="relative w-full">
				<textarea
					rows="20"
					maxlength="1000"
					class="w-full"
					bind:value={query}
					placeholder="질문을 입력해주세요!"
				/>
				<div class="absolute bottom-3 right-2 text-sm">
					<span class="text-green-500">{query.length}</span> / 1000
				</div>
			</div>
			<div class="flex justify-center w-full mt-1">
				<button on:click|preventDefault={createQuery} class="px-4 py-1 text-xl">생성하기</button>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-4 w-1/2 h-[85vh] p-4 overflow-y-auto scrollbar-hide">
		<h2 class="mb-4 text-xl">등록된 질문 ({queries.length})</h2>
		{#each queries as query, id}
			<div class="text-xs">질문 {id + 1}</div>
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<button
				class="relative w-full h-fit p-2 text-left break-words bg-gray-100 rounded-lg"
				on:mouseover={showDeleteButton}
				on:mouseleave={hideDeleteButton}
				on:click|preventDefault={removeQuery(id)}
			>
				{@html query}
				{#if showDelete}
					<button class="absolute right-[-8px] top-[-8px] p-1 bg-black rounded-full text-white"
						><Icon icon="x" size={16} /></button
					>
				{/if}
			</button>
		{/each}
	</div>
</div>

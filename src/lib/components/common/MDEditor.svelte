<script lang="ts">
	import { quill } from '$lib/Quill';

	export let name = 'none';

	// 에디터 텍스트
	let contentsInHTML = '';
	let contentsInEditor = '';

	// svelte-quill 에디터
	const options = {
		modules: {
			toolbar: [
				[{ header: [1, 2, 3, 4, false] }],

				['bold', 'italic', 'underline', 'strike'],
				['blockquote', 'code-block', 'link'],

				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ script: 'sub' }, { script: 'super' }],

				[{ color: [] }, { background: [] }]
			]
		},
		placeholder: '',
		theme: 'snow'
	};

	// quil text change handler
	const quilTextChangeHandler = (e: any) => {
		contentsInHTML = e.detail.html;
		contentsInEditor = e.detail.text;
	};
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<textarea {name} id={name} cols="30" rows="10" class="hidden" value={contentsInHTML} />

<!-- 세로로 에디터와 미리보기 화면이 위치 -->
<div class="flex justify-between gap-4 w-full ">
	<div class="w-full h-[640px]">
		<div class="editor" use:quill={options} on:text-change={quilTextChangeHandler} />
	</div>
	<div class="w-full h-full">
		<div class="flex items-center w-full h-20 2xl:h-12 p-3 bg-gray-100 rounded-t-lg text-gray-500">
			작성 결과 미리보기
		</div>
		<div
			class="w-full h-[640px] p-2 bg-gray-100 rounded-b-lg md-body overflow-y-auto scrollbar-hide"
		>
			{#if contentsInEditor.length > 1}
				{@html contentsInHTML}
			{:else}
				<div class="flex justify-center items-center w-full h-[640px] p-2 text-gray-400">
					에디터에 작성한 글의 미리보기가 제공됩니다
				</div>
			{/if}
		</div>
	</div>
</div>

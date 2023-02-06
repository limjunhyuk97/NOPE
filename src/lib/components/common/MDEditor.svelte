<script lang="ts">
	import { quill } from 'svelte-quill';
	import DOMPurify from 'isomorphic-dompurify';

	export let name = 'none';

	// 에디터 텍스트
	let contentsInHTML = '';
	let contentsInEditor = '';

	// svelte-quill 에디터
	const options = {
		modules: {
			toolbar: [
				[{ header: [1, 2, 3, 4, false] }],
				['bold', 'italic', 'underline', 'strike'], // toggled buttons
				['blockquote', 'code-block', 'image'],

				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ script: 'sub' }, { script: 'super' }], // superscript/subscript

				[{ color: [] }, { background: [] }] // dropdown with defaults from theme
			]
		},
		theme: 'snow'
	};

	// quil change handler
	const quilTextChangeHandler = (e) => {
		contentsInHTML = DOMPurify.sanitize(e.detail.html);
		contentsInEditor = e.detail.text;
		console.log(contentsInEditor);
	};
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<textarea {name} id={name} cols="30" rows="10" class="hidden" value={contentsInEditor} />

<div class="flex flex-col justify-between gap-y-16 w-full ">
	<div class="w-full min-h-[300px]">
		<div use:quill={options} on:text-change={quilTextChangeHandler} />
	</div>
	<div class="w-full min-h-[200px] p-2 bg-gray-100 rounded-lg md-body">
		{#if contentsInEditor.length > 1}
			{@html contentsInHTML}
		{:else}
			<div class="flex justify-center items-center w-full min-h-[200px] text-gray-400">
				상세 설명을 md 형식으로 작성해주시면 미리보기가 제공됩니다
			</div>
		{/if}
	</div>
</div>

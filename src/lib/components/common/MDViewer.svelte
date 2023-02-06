<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';

	export let mdTypeContent = '#무제';
	export let htmlTypeContent = DOMPurify.sanitize(marked.parse(mdTypeContent));
</script>

<div class="w-full md-body">
	{@html htmlTypeContent}
</div>

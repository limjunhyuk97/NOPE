<script>
	import { marked } from 'marked';

	export let mdTypeContent = '#무제';
	export let htmlTypeContent = marked.parse(mdTypeContent);
</script>

<div class="w-full md-body">
	{@html htmlTypeContent}
</div>

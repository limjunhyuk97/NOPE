<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';

	export let mdTypeContent = '#무제';
	export let htmlTypeContent = DOMPurify.sanitize(mdTypeContent);
</script>

<div class="w-full md-body">
	{@html htmlTypeContent}
</div>

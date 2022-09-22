<script>
	import { Viewer } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import gemoji from '@bytemd/plugin-gemoji';

	// md
	const plugins = [gfm(), gemoji()];

	export let value = '# 환영합니다!';
</script>

<div class="w-full h-full md-body">
	<Viewer {value} {plugins} />
</div>

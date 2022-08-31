<script>
	import '../app.css';
	import Loading from '$lib/Loading.svelte';
	import Toast from '$lib/Toast.svelte';
	import { DESKTOP_WIDTH, MOBILD_WIDTH, TABLET_WIDTH } from '$lib/constant';
</script>

<!-- <div class="2xl:w-[{DESKTOP_WIDTH}] sm:w-[{TABLET_WIDTH}] w-[{MOBILD_WIDTH}] mx-auto"> -->
<div class="2xl:w-[{DESKTOP_WIDTH}] sm:w-[{TABLET_WIDTH}] w-[{MOBILD_WIDTH}] mx-auto">
	<slot />
</div>
<Loading />
<Toast />

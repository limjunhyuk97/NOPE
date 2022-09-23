<script lang="ts">
	import type { Likes } from '$lib/types/likes';
	import ActivityWrapper from '$lib/components/likes/ActivityWrapper.svelte';

	/** @type {import('./$types').PageData} */
	export let data: any;

	const Likes: ArrayLike<Likes> = data.likes;
</script>

<!-- Activity 컴포넌트 주입 -->
<div class="w-full lg:p-12 p-3">
	<!-- all -->
	<ActivityWrapper {Likes} />
</div>

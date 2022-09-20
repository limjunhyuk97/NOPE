<script lang="ts">
	import type { Activities } from '$lib/types/main';
	import ActivityWrapper from '$lib/components/main/ActivityWrapper.svelte';

	/** @type {import('./$types').PageData} */
	export let data: any;

	const Likes: ArrayLike<Activities> = data.activities;
</script>

<!-- Activity 컴포넌트 주입 -->
<div class="w-full">
	<!-- all -->
	<ActivityWrapper Activites={Likes} activities_type_kor={'찜한 활동'} />
</div>

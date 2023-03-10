<script lang="ts">
	import { applyStatusColor, applyStatus } from '$lib/utils';
	export let id: string;
	export let title: string;
	export let apply_status: string;
	export let activity_type_kor: string;
</script>

<a
	href="/applications/{id}"
	class="flex flex-col justify-between w-full h-44 p-4 hover:opacity-90 rounded bg-apply"
>
	<div class="flex flex-col w-full h-full py-2">
		<h2 class="text-2xl font-bold">{title}</h2>
	</div>
	<h3>
		<span class="font-bold {applyStatusColor(apply_status)}">{applyStatus(apply_status)}</span> /
		<span>{activity_type_kor}</span>
	</h3>
</a>

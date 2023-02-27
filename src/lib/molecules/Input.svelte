<script lang="ts">
	export let title: string;
	export let result: string;
</script>

<label for="activity_name" class="flex items-center gap-2 w-full">
	<div class="w-24">{title}</div>
	<input
		type="text"
		name="title"
		class="w-full h-full p-2.5 rounded-lg bg-gray-100 text-center"
		placeholder="{title}을 입력해주세요"
		bind:value={result}
	/>
</label>

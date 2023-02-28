<script>
	import Outlayer from '$lib/template/ContentLayer.svelte';
</script>

<Outlayer title="활동 개설" subtitle="참가 신청자에게 물어보고 싶은 내용을 생성합니다.">
	<div class="flex">
		<div class="w-1/2 h-[70vh] px-4 mb-8 border-r">
			<slot name="query_input" />
		</div>
		<div class="relative w-1/2 h-[70vh] px-4 mb-8 overflow-y-auto scrollbar-hide">
			<slot name="query_details" />
		</div>
	</div>
</Outlayer>

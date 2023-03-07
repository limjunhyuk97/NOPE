<script lang="ts">
	export let id: string;
	export let title: string;
	export let apply_status: string;
	export let activity_type_kor: string;

	const applyStatus = (status: string) => {
		if (status === 'pending') return '참여 대기중';
		if (status === 'denied') return '참여 거절됨';
		if (status === 'quit') return '활동 탈퇴';
		if (status === 'granted') return '참여중';
		if (status === 'admin') return '참여중';
		if (status === 'super') return '참여중';
	};

	const applyStatusColor = (status: string) => {
		if (status === 'pending') return 'text-black';
		if (status === 'denied') return 'text-red-600';
		if (status === 'quit') return 'text-black';
		if (status === 'granted') return 'text-green-600';
		if (status === 'admin') return 'text-green-600';
		if (status === 'super') return 'text-green-600';
	};
</script>

<a
	href="/applications/{id}"
	class="flex flex-col justify-between w-full h-44 p-4 hover:opacity-90 rounded bg-apply"
>
	<div class="flex flex-col w-full h-full py-2">
		<h2 class="text-2xl">{title}</h2>
	</div>
	<h3>
		<span class="font-bold {applyStatusColor(apply_status)}">{applyStatus(apply_status)}</span> /
		<span>{activity_type_kor}</span>
	</h3>
</a>

<script lang="ts">
	export let id: string;
	export let title: string;
	export let pariticpant_status: string;
	export let activity_status: string;

	const activitiyStatus = (status: string) => {
		if (status === 'pending') return '시작전';
		if (status === 'started') return '진행중';
		if (status === 'finished') return '종료됨';
	};

	const participantStatus = (status: string) => {
		if (status === 'super') return '활동 오너';
		if (status === 'admin') return '활동 관리자';
		if (status === 'granted') return '참가자';
	};
</script>

<a
	href="/users/activities/{id}"
	class="flex flex-col justify-between w-full h-44 p-4 bg-{pariticpant_status} rounded text-{pariticpant_status ===
	'super'
		? 'white'
		: 'black'}"
>
	<div class="flex flex-col w-full h-full py-2">
		<h2 class="text-2xl">{title}</h2>
		<span class="text-base"> {participantStatus(pariticpant_status)}</span>
	</div>
	<h3>{activitiyStatus(activity_status)}</h3>
</a>

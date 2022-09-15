<script>
	import Icon from '$lib/Icon.svelte';
</script>

<div class="w-full h-16" />

<div
	class="w-[360px] h-16 px-8 fixed bottom-0 border-t-2 flex bg-white justify-between items-center z-20 text-xs text-gray-700"
>
	<a href="/" class="flex flex-col items-center text-xs">
		<Icon icon="home" size={20} />
		<div class="mt-1 text-gray-500">홈으로</div>
	</a>
	<a href="/likes" class="flex flex-col items-center">
		<Icon icon="heart" size={20} />
		<div class="mt-1 text-gray-500">찜한 내역</div>
	</a>
	<a href="/users/activities" class="flex flex-col items-center">
		<Icon icon="git-pull-request" size={20} />
		<div class="mt-1 text-gray-500">참여 활동</div>
	</a>
	<a href="/" class="flex flex-col items-center">
		<Icon icon="user" size={20} />
		<div class="mt-1 text-gray-500">내 정보</div>
	</a>
</div>

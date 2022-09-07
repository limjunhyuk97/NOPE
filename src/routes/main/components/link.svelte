<script lang="ts">
	export let innerText = '이름 없음';
	export let href = '/main';
	export let open = false;
	export let bgColor = 'white';
</script>

<a class={open ? bgColor : 'bg-transparent'} {href}>
	{innerText}
</a>

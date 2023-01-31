<script>
	export let users;
	export let position: { x: number; y: number };
	console.log(users, position);
</script>

<div class="fixed left-[{position.x}]" />

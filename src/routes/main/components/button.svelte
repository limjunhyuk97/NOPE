<script lang="ts">
	export let innerText = '이름 없음';
	let hovering: boolean;
	let menu = 'all';

	const mouseIn = () => {
		hovering = true;
		innerText += ' ';
	};

	const mouseOut = () => {
		hovering = false;
		innerText.trim();
	};
</script>

<button
	class="w-full p-4 flex flex-col text-start gap-4 border-b"
	on:mouseenter|preventDefault={mouseIn}
	on:mouseleave|preventDefault={mouseOut}
>
	<div class="w-full">
		{innerText}
	</div>
	<slot {hovering} />
</button>

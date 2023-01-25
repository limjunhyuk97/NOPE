<script>
	import feather from 'feather-icons';
	export let icon = 'home';
	export let size = 24;
	export let stroke_width = 2;
	export let fill = 'none';
	export let viewBox = 24;
	export let stroke = 'currentColor';
</script>

{#if icon === 'heart-fill'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 {viewBox} {viewBox}"
		{fill}
		{stroke}
		stroke-width={stroke_width}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="feather feather-heart"
		><path
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
		/></svg
	>
{:else if icon === 'thumbs-up'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		{fill}
		stroke="currentColor"
		stroke-width={stroke_width}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="feather feather-thumbs-up"
		><path
			d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
		/></svg
	>
{:else}
	{@html feather.icons[icon]
		? feather.icons[icon].toSvg({
				width: size,
				height: size,
				'stroke-width': stroke_width,
				color: fill
		  })
		: '-'}
{/if}

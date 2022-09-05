<script>
	export let size = 32;
	export let left = 0;
	export let top = 0;
</script>

<div class="relative left-{left} top-{top}">
	<button on:click={() => window.history.go(-1)}>
		<svg
			width={size}
			height={size}
			viewBox="0 0 56 56"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_d_16_538)">
				<path
					d="M52 21H15.49L32.26 4.23L28 0L4 24L28 48L32.23 43.77L15.49 27H52V21Z"
					fill="black"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_16_538"
					x="0"
					y="0"
					width="56"
					height="56"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16_538" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_16_538"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	</button>
</div>

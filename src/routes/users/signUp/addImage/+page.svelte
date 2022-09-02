<script>
	import Icon from '$lib/Icon.svelte';
	import { getImageKey, getUrl } from '$lib/utils';

	let image_src = null;
	let image_BLOB = null;
</script>

<label class="w-full mt-6 flex items-center justify-center hover:cursor-pointer">
	{#if image_src}
		<div class="relative flex items-center justify-center">
			<img src={image_src} alt="profile-image" class="w-24 h-24 rounded-full object-cover" />
			<div class="absolute bottom-0 right-0 bg-gray-200 rounded-full">
				<Icon icon="edit-3" />
			</div>
		</div>
	{:else}
		<div class="w-24 h-24 relative flex items-center justify-center bg-gray-50 rounded-full">
			<Icon icon="user" size={64} stroke_width={2} />
			<div class="absolute bottom-0 right-0 bg-gray-200 rounded-full">
				<Icon icon="edit-3" />
			</div>
		</div>
	{/if}
	<input
		type="file"
		class="hidden"
		on:change|preventDefault={async (e) => {
			const file = e.target.files[0];
			if (file) {
				image_BLOB = file;
				const reader = new FileReader();
				reader.readAsDataURL(image_BLOB);
				reader.addEventListener('load', (e) => {
					image_src = reader.result;
				});
			}
		}}
	/>
</label>

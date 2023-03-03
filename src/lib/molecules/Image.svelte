<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { toast } from '$lib/stores';
	import { supabase } from '$lib/supabase';
	import { resizeImage, getImageKey, upsertImage, getSignedUrl } from '$lib/utils';
	import { onMount } from 'svelte';

	// result 는 image 테이블에서의 id 값
	// storage_id는 bucket에 있는 이미지 id 값
	export let title: string;
	export let image_id: string | null;
	let storage_id: string | null;

	// 이미지 업로드 관련
	const imageUploadeHandler = async (e: Event) => {
		const file = e.target?.files[0];

		const resized = await resizeImage(file);
		storage_id = await getImageKey(resized);
		image_id = await upsertImage({ storage_id });

		if (image_id === null) {
			$toast = '이미지 등록 실패';
			image_id = null;
			return;
		}

		$toast = '이미지 등록 완료';
	};

	// 이미지 제거 관련
	let hovering_image_delete = false;
	const imageDeleteHandler = (e: Event) => {
		const imgElement = document.querySelector('#image_upload');
		imgElement.files = new DataTransfer().files;
		image_id = null;
		storage_id = null;
		$toast = `${title} 이미지 삭제`;
	};

	onMount(async () => {
		if (image_id) {
			const { data, error } = await supabase
				.from('images')
				.select('storage_id')
				.eq('id', image_id)
				.single();
			storage_id = data?.storage_id;
		}
	});
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<label
	for="image_upload"
	class="relative flex justify-center items-center w-fit h-fit bg-gray-100 rounded-lg hover:cursor-pointer"
	on:mouseover={() => (hovering_image_delete = true)}
	on:mouseleave={() => {
		hovering_image_delete = false;
	}}
>
	{#if storage_id}
		<div class="xl:w-96 w-72 xl:h-80 h-60 rounded-lg">
			{#await getSignedUrl(storage_id)}
				<div class="w-full h-full rounded bg-gray-100" />
			{:then image_source}
				<img src={image_source} alt="썸네일" class="w-full h-full object-cover rounded-lg" />
			{:catch}
				<div class="flex items-center justify-center relative w-full h-full rounded bg-gray-100">
					<span>이미지 등록 실패</span>
				</div>
			{/await}
		</div>
	{:else}
		<div class="xl:w-96 w-72 xl:h-80 h-60 rounded" />
		<div class="absolute text-gray-400">{title} 이미지 등록</div>
	{/if}
	<input
		id="image_upload"
		name="thumbnail"
		type="file"
		class="hidden"
		accept=".png,.jpg,.jpeg"
		multiple
		on:change|preventDefault={imageUploadeHandler}
	/>
	<button
		on:click|preventDefault={imageDeleteHandler}
		class="absolute top-[-8px] right-[-8px] flex gap-2 p-1 bg-white rounded-full border border-gray-800 {hovering_image_delete
			? ''
			: 'hidden'}"><Icon icon="x" /></button
	>
</label>

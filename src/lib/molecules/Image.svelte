<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { supabase } from '$lib/supabase';
	import { toast } from '$lib/stores';
	import { resizeImage, getImageKey, upsertImage } from '$lib/utils';

	// 이미지 변수
	let image_source: string | null;

	export let title: string;
	export let result: string | boolean | null;

	// 이미지 업로드 관련
	const imageUploadeHandler = async (e: Event) => {
		const file = e.target?.files[0];

		const resized = await resizeImage(file);
		const imageKey = await getImageKey(resized);
		result = await upsertImage({ storage_id: imageKey });

		if (result === false) {
			$toast = '이미지 등록 실패';
			image_source = null;
			result = null;
		}

		if (file) {
			// FileReader 객체 생성
			const UrlReader = new FileReader();
			// FileReader가 Blob 타입이나, File 타입의 content를 URL형식으로 읽어들인다
			// content를 읽는 과정이 다 끝나면 readyState가 DONE으로 변경되고, loadend가 트리거 된다.
			// event의 result객체가 data:URL 정보를 담고 있게 된다.
			UrlReader.readAsDataURL(file);
			await UrlReader.addEventListener('load', async (e: any) => {
				image_source = UrlReader.result;
			});
		}
	};

	// 이미지 제거 관련
	let hovering_image_delete = false;
	const imageDeleteHandler = (e: Event) => {
		const imgElement = document.querySelector('#image_upload');
		imgElement.files = new DataTransfer().files;
		image_source = null;
		result = null;
		$toast = `${title} 이미지 삭제`;
	};
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
	{#if image_source}
		<div class="xl:w-96 w-72 xl:h-80 h-60 rounded-lg">
			<img src={image_source} alt="썸네일" class="w-full h-full object-cover rounded-lg" />
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

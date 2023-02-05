<script lang="ts">
	import { user } from '$lib/stores';
	import Select from '$lib/components/common/Select.svelte';
	import Calendar from '$lib/components/common/Calendar.svelte';
	import { enhance } from '$app/forms';

	export let data;

	let start_at = new Date();

	let image_source: any;
	const imageUploadeHandler = async (e: any) => {
		const file = e.target?.files[0];
		if (file) {
			// FileReader 객체 생성
			const Reader = new FileReader();
			Reader.readAsDataURL(file);

			await Reader.addEventListener('load', async (e: any) => {
				image_source = Reader.result;
			});
		}
	};

	const { activityTypes } = { ...data };
</script>

<form
	class="flex flex-col gap-12 w-full h-full py-20 px-6"
	method="POST"
	use:enhance={({ form, data, cancel }) => {}}
>
	<h1 class="text-3xl">활동 개설</h1>
	<div class="flex 2xl:gap-20 lg:gap-12 gap-4 w-full">
		<!-- 이미지 업로드 -->
		<label
			for="thumbnail"
			class="flex justify-center items-center w-fit h-fit bg-gray-100 rounded-lg hover:cursor-pointer"
		>
			{#if image_source}
				<div class="xl:w-96 w-72 xl:h-80 h-60 rounded-lg">
					<img src={image_source} alt="썸네일" class="w-full h-full object-cover rounded-lg" />
				</div>
			{:else}
				<div class="xl:w-96 w-72 xl:h-80 h-60 rounded" />
				<div class="absolute text-sm">활동 썸네일 이미지 등록</div>
			{/if}
			<input
				id="thumbnail"
				name="activity_thumbnail"
				type="file"
				class="hidden"
				on:change|preventDefault={imageUploadeHandler}
			/>
		</label>
		<div class="flex flex-col xl:gap-12 gap-6 w-full">
			<!-- 활동 타입 선택 -->
			<label for="activity_type" class="flex items-center gap-2 w-full">
				<div class="w-24">활동 타입</div>
				<Select
					options={activityTypes}
					trueValue="id"
					namedValue="type_kor"
					defaultValue="활동 타입을 선택해주세요"
					name="activity_type"
				/>
			</label>
			<!-- 활동 이름 선택 -->
			<label for="activity_name" class="flex items-center gap-2 w-full">
				<div class="w-24">활동명</div>
				<input
					type="text"
					id="activity_name"
					name="activity_name"
					class="w-full h-full p-2.5 rounded-lg bg-gray-100 text-center"
					placeholder="활동명을 입력해주세요"
				/>
			</label>
			<!-- 활동 시작 일자 선택 -->
			<label for="start_at" class="flex items-center gap-2 w-full">
				<div class="w-24">시작 일자</div>
				<Calendar name="start_at" bind:dateSelected={start_at} />
			</label>
			<label for="end_at" class="flex items-center gap-2 w-full">
				<div class="w-24">종료 일자</div>
				<Calendar name="end_at" bind:dateMinimum={start_at} />
			</label>
		</div>
	</div>
	<button>제출</button>
</form>

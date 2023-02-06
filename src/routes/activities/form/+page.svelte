<script lang="ts">
	import { toast, user } from '$lib/stores';
	import Select from '$lib/components/common/Select.svelte';
	import Calendar from '$lib/components/common/Calendar.svelte';
	import MdEditor from '$lib/components/common/MDEditor.svelte';
	import { enhance } from '$app/forms';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	// 시작 시간 - 종료 시간 설정 위한 반응형 변수
	$: start_at = new Date();

	// 이미지 업로드 관련
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

	// 간단한 설명 보여주기 위한 핸들러
	let showShortDetail = false;
	const showShortDetailDescriptionHandler = () => {
		showShortDetail = true;
	};
	const hideShortDetailDescriptionHandler = () => {
		showShortDetail = false;
	};

	// 간단한 설명 텍스트
	let short_details = '';

	// 설명 보여주기 위한 핸들러
	let showDetail = false;
	const showDetailDescriptionHandler = () => {
		showDetail = true;
	};
	const hideDetailDescriptionHandler = () => {
		showDetail = false;
	};

	const { activityTypes } = { ...data };

	beforeUpdate(() => {
		if (!$user) {
			goto('/');
			$toast = '로그인을 먼저 해주세요!';
		}
	});
</script>

<form
	class="flex flex-col gap-12 w-full h-full py-20 px-6 text-lg"
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
				<div class="absolute text-gray-400">활동 썸네일 이미지 등록</div>
			{/if}
			<input
				id="thumbnail"
				name="thumbnail"
				type="file"
				class="hidden"
				accept=".png,.jpg,.jpeg"
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
					name="type_id"
				/>
			</label>
			<!-- 활동 이름 선택 -->
			<label for="activity_name" class="flex items-center gap-2 w-full">
				<div class="w-24">활동명</div>
				<input
					type="text"
					id="activity_name"
					name="title"
					class="w-full h-full p-2.5 rounded-lg bg-gray-100 text-center"
					placeholder="활동명을 입력해주세요"
					required
				/>
			</label>
			<!-- 활동 시작 일자 선택 -->
			<label for="start_at" class="flex items-center gap-2 w-full">
				<div class="w-24">시작 일자</div>
				<Calendar name="start_at" bind:dateSelected={start_at} />
			</label>
			<label for="end_at" class="flex items-center gap-2 w-full">
				<div class="w-24">종료 일자</div>
				<Calendar name="end_at" bind:dateMinimum={start_at} dateSelected={start_at} />
			</label>
		</div>
	</div>
	<!-- 간단한 설명 -->
	<label for="activity_short_details" class="relative flex flex-col gap-4">
		{#if showShortDetail}
			<p class="absolute left-28 w-72 p-3 rounded-lg bg-gray-200 text-xs z-10">
				메인 페이지에 노출되는 활동 정보 중 하나입니다.<br /> 활동에 대한 간단한 설명을 적어주세요!
			</p>
		{/if}
		<div class="flex items-center gap-3 w-fit">
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			간단한 설명
			<span
				class="text-xs text-gray-400"
				on:mouseover={showShortDetailDescriptionHandler}
				on:mouseleave={hideShortDetailDescriptionHandler}
			>
				?
			</span>
		</div>
		<textarea
			name="short_details"
			id="activity_short_details"
			class="p-1 bg-gray-100 rounded-lg resize-none"
			bind:value={short_details}
			rows="4"
			maxlength="210"
		/>
		<div class="absolute bottom-1 right-2 text-sm">
			<span class="text-green-500">{short_details.length}</span> / 205
		</div>
	</label>
	<!-- 상세 설명 -->
	<label class="relative flex flex-col gap-4 w-full" for="details">
		{#if showDetail}
			<p class="absolute left-28 w-72 p-3 rounded-lg bg-gray-200 text-xs z-10">
				활동 상세 페이지에서 노출되는 활동 상세 정보입니다.<br /> 활동에 대한 구체적인 설명을 적어주세요!
			</p>
		{/if}
		<div class="flex items-center gap-3 w-fit">
			상세 설명
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<span
				class="text-xs text-gray-400"
				on:mouseover={showDetailDescriptionHandler}
				on:mouseleave={hideDetailDescriptionHandler}
			>
				?
			</span>
		</div>
		<MdEditor name="details" />
	</label>

	<label for="activity_is_recruiting" class="relative flex flex-col gap-4">
		<div>현재 지원 가능 여부</div>
		<input type="radio" name="recruiting" id="activity_is_recruiting" value={true} /> 가능
		<input type="radio" name="recruiting" id="activity_is_recruiting" value={false} /> 불가능
	</label>

	<button class="pb-12 text-2xl">다음 단계로</button>
</form>

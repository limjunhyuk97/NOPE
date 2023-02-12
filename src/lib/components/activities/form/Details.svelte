<script lang="ts">
	import { toast } from '$lib/stores';
	import Icon from '$lib/Icon.svelte';
	import Select from '$lib/components/common/Select.svelte';
	import Calendar from '$lib/components/common/Calendar.svelte';
	import Radio from '$lib/components/common/Radio.svelte';
	import MdEditor from '$lib/components/common/MDEditor.svelte';

	// 활동 타입 정보
	export let activityTypes: { type: string; type_kor: string }[];

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

	// 이미지 제거 관련
	let hovering_image_delete = false;
	const imageDeleteHandler = (e: Event) => {
		const thumbnail = document.querySelector('#thumbnail');
		thumbnail.files = new DataTransfer().files;
		image_source = null;
		$toast = '썸네일 이미지 삭제';
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

	// 지원 가능 여부 값
	const groupForRecruit = [
		{ innerText: '예', value: true },
		{ innerText: '아니오', value: false }
	];

	// 현재 활동 진행 상태 : pending, started
	const groupForStatus = [
		{ innerText: '시작 전 대기', value: 'pending' },
		{ innerText: '시작됨', value: 'started' }
	];
</script>

<div class="flex flex-col gap-12 w-full h-full">
	<h1 class="text-3xl">활동 개설</h1>
	<div class="flex 2xl:gap-20 lg:gap-12 gap-4 w-full">
		<!-- 이미지 업로드 -->
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<label
			for="thumbnail"
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
				<div class="absolute text-gray-400">활동 썸네일 이미지 등록</div>
			{/if}
			<input
				id="thumbnail"
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
		<!-- 활동 타입 / 활동명 / 시작일자 / 종료일자 -->
		<div class="flex flex-col xl:gap-12 gap-6 w-full">
			<!-- 활동 타입 선택 -->
			<label for="activity_type" class="flex items-center gap-2 w-full">
				<div class="w-24">활동 타입</div>
				<Select options={activityTypes} trueValue="id" namedValue="type_kor" name="type_id" />
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
			bind:value={short_details}
			rows="4"
			maxlength="210"
		/>
		<div class="absolute bottom-1 right-2 text-sm">
			<span class="text-green-500">{short_details.length}</span> / 210
		</div>
	</label>
	<!-- 상세 설명 -->
	<label class="relative flex flex-col gap-4 w-full" for="details">
		{#if showDetail}
			<p class="absolute left-24 w-72 p-3 rounded-lg bg-gray-200 text-xs z-10">
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

	<div class="relative flex flex-col gap-4 w-full">
		<div>현재 지원 가능 여부</div>
		<div class="flex justify-start">
			<Radio choices={groupForRecruit} name="recruiting" />
		</div>
	</div>

	<div class="relative flex flex-col gap-4 w-full">
		<div>현재 지원 가능 여부</div>
		<div class="flex justify-start">
			<Radio choices={groupForStatus} name="status" />
		</div>
	</div>
</div>

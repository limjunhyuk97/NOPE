<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { Jumper } from 'svelte-loading-spinners';
	import { enhance } from '$app/forms';
	import { toast } from '$lib/stores';
	import { THEME_COLOR } from '$lib/constants';

	let send = false;

	//** form response */
	const formResponseHandler = async (
		response: ActionResult<Record<string, any>, Record<string, any>>
	) => {
		if (response.status === 200) {
			$toast = '본인확인이 전송되었습니다';
			send = true;
		} else $toast = response.data.message;
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	<div
		class="flex flex-col justify-center items-center w-1/2 h-[440px] border rounded shadow-2xl text-xl"
	>
		<form
			class="flex flex-col w-full px-16"
			method="POST"
			use:enhance={({ form, data, cancel }) => {
				return async ({ result }) => {
					await formResponseHandler(result);
				};
			}}
		>
			<div class="flex items-center gap-4">
				<h1 class="text-2xl">비밀번호 재설정</h1>
				{#if send}
					<Jumper color={THEME_COLOR} size={32} />
				{/if}
			</div>

			<!-- 아이디 -->
			<label class="w-full mt-20">
				<div>아이디</div>
				<input
					type="email"
					name="email"
					class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
					placeholder="본인의 이메일을 기입해주세요"
					required
				/>
				{#if send}
					<span class="text-xs text-green-600">전송완료 / 이메일로 본인인증을 진행해주세요</span>
				{:else}
					<div class="w-full h-7" />
				{/if}
			</label>

			<!-- 버튼 -->
			<div class="w-full mt-12 px-12 flex justify-center">
				<button type="submit" class="drop-shadow-xl">본인확인 이메일 전송</button>
			</div>
		</form>
	</div>
</div>

<style>
	::placeholder {
		color: gray;
		font-size: 14px;
		opacity: 0.5;
	}
	input {
		font-size: 16px;
	}
	input:focus {
		border-color: #9fc9f3;
	}
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px #fff inset;
	}
	input:disabled {
		background-color: white;
	}
</style>

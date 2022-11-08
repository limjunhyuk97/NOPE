<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { RESPONSE_TYPE, SIGNIN_STATUS } from '$lib/constants';
	import { toast } from '$lib/stores';
	import { signin } from './+page';
	import { goto } from '$app/navigation';

	//** form response */
	const formResponseHandler = async (
		response: ActionResult<Record<string, any>, Record<string, any>>
	) => {
		if (response.type === RESPONSE_TYPE.SUCCESS) {
			const result = await signin({ email: response.data.email, password: response.data.password });
			if (result === SIGNIN_STATUS.SUCCESS) {
				$toast = '로그인 성공';
				goto('/');
			} else {
				$toast = '로그인 실패';
			}
		} else $toast = response.data.message;
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	<div
		class="flex flex-col justify-center items-center 2xl:w-1/2 lg:w-2/3 w-4/5 h-[600px] border rounded shadow-2xl text-xl"
	>
		<form
			method="POST"
			use:enhance={({ form, data, cancel }) => {
				return async ({ result }) => {
					await formResponseHandler(result);
				};
			}}
			class="flex flex-col gap-12 w-full px-16"
		>
			<h1 class="w-full text-2xl">로그인</h1>

			<!-- 아이디 -->
			<label class="w-full">
				<div>아이디</div>
				<input
					type="email"
					name="email"
					class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
					placeholder="본인의 이메일을 기입해주세요"
					required
				/>
			</label>

			<!-- 비밀번호 -->
			<label class="w-full">
				<div>비밀번호</div>
				<input
					type="password"
					name="password"
					class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
					placeholder="비밀번호를 입력해주세요"
					required
				/>
				<div class="w-full mt-8 flex gap-2 justify-end text-xs text-gray-700">
					<a href="/users/signup">회원가입</a>
				</div>
			</label>

			<!-- 버튼 -->
			<div class="w-full px-12 flex justify-between">
				<button type="submit" class="drop-shadow-xl">로그인</button>
				<a href="/users/reset/password" class="drop-shadow-xl">비밀번호 재설정</a>
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

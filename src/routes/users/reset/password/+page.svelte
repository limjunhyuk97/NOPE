<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { user, toast } from '$lib/stores';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	//** form response */
	const formResponseHandler = async (
		response: ActionResult<Record<string, any>, Record<string, any>>
	) => {
		console.log(response);
	};

	beforeUpdate(() => {
		if (!$user) {
			$toast = '이메일 인증을 해주세요';
			goto('/users/reset');
		}
	});
</script>

{#if user}
	<div class="w-full h-full flex justify-center items-center">
		<div
			class="flex flex-col justify-center items-center 2xl:w-1/2 lg:w-2/3 w-4/5 h-3/5 border rounded shadow-2xl text-xl"
		>
			<form
				class="flex flex-col gap-20 w-full px-16"
				method="POST"
				use:enhance={({ form, data, cancel }) => {
					return async ({ result }) => {
						await formResponseHandler(result);
					};
				}}
			>
				<h1 class="w-full text-2xl">비밀번호 재설정</h1>

				<!-- 새 비밀번호 -->
				<label class="w-full">
					<div>새 비밀번호</div>
					<input
						type="password"
						name="password"
						class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
						placeholder="새 비밀번호를 기입해주세요"
						required
					/>
				</label>

				<!-- 비밀번호 재확인 -->
				<label class="w-full">
					<div>비밀번호 재확인</div>
					<input
						type="password"
						name="passwordcheck"
						class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
						placeholder="새 비밀번호를 다시 기입해주세요"
						required
					/>
				</label>

				<!-- 버튼 -->
				<div class="w-full px-12 flex justify-center">
					<button type="submit" class="drop-shadow-xl">비밀번호 변경</button>
				</div>
			</form>
		</div>
	</div>
{/if}

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

<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { Jumper } from 'svelte-loading-spinners';
	import { enhance } from '$app/forms';
	import { user, toast } from '$lib/stores';
	import { THEME_COLOR } from '$lib/constants';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';

	let send = false;

	//** form response */
	const formResponseHandler = async (
		response: ActionResult<Record<string, any>, Record<string, any>>
	) => {};

	beforeUpdate(() => {
		if (!$user) {
		}
	});
</script>

{#if true}
	<div class="w-full h-full flex justify-center items-center">
		<div
			class="flex flex-col justify-center items-center 2xl:w-1/2 lg:w-2/3 w-4/5 h-[590px] border rounded shadow-2xl text-xl"
		>
			<form
				class="flex gap-20 flex-col w-full px-16"
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

				<!-- 이전 비밀번호 -->
				<label class="w-full">
					<div>이전 비밀번호</div>
					<input
						type="password"
						name="previouspassword"
						class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
						placeholder="변경 전 비밀번호를 입력해주세요"
						required
					/>
				</label>

				<!-- 새 비밀번호 -->
				<label class="w-full">
					<div>새 비밀번호</div>
					<input
						type="password"
						name="newpassword"
						class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
						placeholder="새 비밀번호를 입력해주세요"
						required
					/>
				</label>

				<!-- 버튼 -->
				<div class="w-full px-12 flex justify-center">
					<button type="submit" class="drop-shadow-xl">변경 완료</button>
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

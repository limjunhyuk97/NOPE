<script lang="ts">
	import { user, toast } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { _isValidPassword, _isMatchingPassword, _isShortPassword, _isValid } from './+page';
	import axios from 'axios';

	let password = '';
	let pwPermission = false;
	let passwordcheck = '';
	let pwcheckPermission = false;

	const passwordValidationHandler = (e: Event) => {
		pwPermission = _isValidPassword(password) && !_isShortPassword(password);
	};

	const passwordCheckValidationHandler = (e: Event) => {
		pwcheckPermission = _isMatchingPassword(password, passwordcheck);
	};

	const submitHandler = (e: Event) => {
		const result = _isValid(password, passwordcheck);
		if (result !== null) $toast = result;
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	<form
		class="flex flex-col justify-center items-center w-1/2 px-16 py-12 border rounded shadow-2xl text-xl"
		on:submit|preventDefault={async () => {
			if (!pwPermission || !pwcheckPermission) return;
			try {
				const status = await axios({
					method: 'post',
					url: `/reset/password`,
					data: { user_id: $user?.id, password, passwordcheck }
				});
				$toast = status.data;
				goto('/');
			} catch (err) {
				$toast = err.response.data;
			}
		}}
	>
		<div class="flex items-center gap-4">
			<h1 class="text-2xl font-bold">비밀번호 재설정</h1>
		</div>

		<!-- 새 비밀번호 -->
		<label class="w-full mt-20">
			<div class="font-semibold">새 비밀번호</div>
			<input
				type="password"
				name="password"
				class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
				placeholder="새로 사용할 비밀번호를 기입해주세요"
				bind:value={password}
				on:keyup={passwordValidationHandler}
				required
			/>
		</label>

		<!-- 비밀번호 -->
		<label class="w-full mt-12">
			<div class="font-semibold">비밀번호 확인</div>
			<input
				type="password"
				name="passwordcheck"
				class="w-full mt-6 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
				placeholder="새로 사용할 비밀번호를 기입해주세요"
				bind:value={passwordcheck}
				on:keyup={passwordCheckValidationHandler}
				required
			/>
		</label>

		<!-- 버튼 -->
		<div class="w-full mt-12 px-12 flex justify-center">
			<button
				type="submit"
				class="drop-shadow-xl font-semibold hover:underline"
				on:click={submitHandler}>비밀번호 변경</button
			>
		</div>
	</form>
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

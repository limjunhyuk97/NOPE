<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { toast } from '$lib/stores';
	import { PASSWORD_VERIFICATION_STATUS, UNIFICATION_STATUS, RESPONSE_TYPE } from '$lib/constants';
	import { isEmptyString } from '$lib/utils';
	import { _checkDuplication } from './+page';
	import * as EmailValidator from 'email-validator';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let passwordInput: HTMLInputElement;

	let email = '';
	let password = '';
	let passwordCheck = '';
	let name = '';
	let emailVerified: string | null = null;
	let nameVerified: string | null = null;
	let passwordVerified: string | null = null;

	const isValidEmail = (email: string) => {
		return EmailValidator.validate(email);
	};

	const isShortPassword = (pw: string) => {
		return pw.length < 8;
	};

	const verifyEmail = async (value: string) => {
		if (isEmptyString(value)) {
			emailVerified = UNIFICATION_STATUS.EMPTY;
		} else {
			emailVerified = isValidEmail(value)
				? await _checkDuplication(value, 'email')
				: UNIFICATION_STATUS.NOT_AVAILABLE_FORM;
		}
	};

	const verifyName = async (value: string) => {
		nameVerified = isEmptyString(value)
			? UNIFICATION_STATUS.EMPTY
			: await _checkDuplication(value, 'name');
	};

	const verifyPassword = (e: Event) => {
		if (isShortPassword(password)) {
			passwordCheck = '';
			passwordVerified = PASSWORD_VERIFICATION_STATUS.EMPTY;
			return;
		}
		if (isEmptyString(passwordCheck)) {
			passwordVerified = PASSWORD_VERIFICATION_STATUS.EMPTY;
			return;
		}
		passwordVerified = isShortPassword(password)
			? PASSWORD_VERIFICATION_STATUS.NON_VALID
			: password === passwordCheck
			? PASSWORD_VERIFICATION_STATUS.VERIFIED
			: PASSWORD_VERIFICATION_STATUS.MISMATCHED;
	};

	const duplicationHandler = (verification: Function) => {
		const handler = async (e: Event) => {
			await verification((<HTMLInputElement>e?.target)?.value);
		};
		return handler;
	};

	const passwordErrorHandler = (e: Event) => {
		if (isShortPassword(password)) {
			$toast = '비밀번호를 형식에 맞게 입력해주세요!';
			passwordInput.focus();
		}
	};

	//** form response */
	const formResponseHandler = (
		response: ActionResult<Record<string, any>, Record<string, any>>
	) => {
		if (response.type === RESPONSE_TYPE.SUCCESS) goto('/signup/pending');
		else $toast = response.data.message;
	};

	//** reactive value */
	$: disableSubmit =
		passwordVerified !== PASSWORD_VERIFICATION_STATUS.VERIFIED ||
		emailVerified !== UNIFICATION_STATUS.VERIFIED ||
		nameVerified !== UNIFICATION_STATUS.VERIFIED;
</script>

<div class="w-full h-full flex justify-center items-center">
	<div
		class="flex flex-col justify-center items-center 2xl:w-1/2 lg:w-3/4 w-4/5 border rounded shadow-2xl text-xl"
	>
		<form
			method="POST"
			class="flex flex-col gap-14 w-full px-16 py-12 justify-center items-center"
			use:enhance={({ form, data, cancel }) => {
				return ({ result }) => {
					formResponseHandler(result);
				};
			}}
		>
			<h1 class="w-full text-2xl font-bold">회원가입</h1>

			<!-- 아이디 -->
			<label class="w-full">
				<div class="font-semibold">아이디</div>
				<input
					type="email"
					name="email"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
					bind:value={email}
					placeholder="본인의 이메일을 기입해주세요"
					on:keyup|preventDefault={duplicationHandler(verifyEmail)}
					required
				/>
				<!-- 아이디 유효성 문구 -->
				<div
					class="w-max h-1 mt-1 text-xs {emailVerified === UNIFICATION_STATUS.VERIFIED
						? 'text-green-600'
						: 'text-red-600'}"
				>
					{#if emailVerified === UNIFICATION_STATUS.VERIFIED}
						사용가능한 아이디입니다.
					{:else if emailVerified === UNIFICATION_STATUS.NOT_AVAILABLE_FORM}
						이메일 형식을 확인해주세요.
					{:else if emailVerified === UNIFICATION_STATUS.DUPLICATED}
						이미 존재하는 아이디입니다.
					{/if}
				</div>
			</label>

			<!-- 비밀번호 -->
			<label class="w-full">
				<div class="font-semibold">비밀번호</div>
				<input
					type="password"
					name="password"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={password}
					bind:this={passwordInput}
					placeholder="최소 8자리의 비밀번호를 기입해주세요"
					on:keyup|preventDefault={verifyPassword}
					on:paste|preventDefault={() => false}
					required
				/>
				<!-- 비밀번호 유효성 문구 -->
				<div
					class="w-max h-1 mt-1 text-xs {isShortPassword(password)
						? 'text-red-600'
						: 'text-green-600'}"
				>
					{#if isShortPassword(password) && !isEmptyString(password)}
						8자리 이상 입력해주세요.
					{:else if password.length >= 6}
						형식에 만족합니다.
					{/if}
				</div>
			</label>

			<!-- 비밀번호 확인 -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label class="w-full " on:click|preventDefault={passwordErrorHandler}>
				<div class="font-semibold">비밀번호 확인</div>
				<input
					type="password"
					name="passwordcheck"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none {isShortPassword(
						password
					)
						? 'hover:cursor-not-allowed'
						: ''}"
					bind:value={passwordCheck}
					placeholder={isEmptyString(password)
						? '비밀번호를 먼저 적어주세요'
						: isShortPassword(password)
						? '8자리 이상의 비밀번호를 적어주세요'
						: '비밀번호를 한번 더 입력해주세요'}
					required
					on:keyup|preventDefault={verifyPassword}
					on:paste|preventDefault={() => false}
					disabled={isShortPassword(password)}
				/>
				<!-- 비밀번호 확인 유효성 문구 -->
				<div
					class="w-max h-2 mt-1 text-xs {passwordVerified === PASSWORD_VERIFICATION_STATUS.VERIFIED
						? 'text-green-600'
						: 'text-red-600'}"
				>
					{#if !isEmptyString(passwordCheck)}
						{#if passwordVerified === PASSWORD_VERIFICATION_STATUS.VERIFIED}
							비밀번호가 일치합니다
						{:else}
							비밀번호가 일치하지 않습니다
						{/if}
					{/if}
				</div>
			</label>

			<!-- 이름 -->
			<label class="w-full">
				<div class="font-semibold">이름</div>
				<input
					type="text"
					name="name"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={name}
					placeholder="사용하고자 하는 이름을 적어주세요!"
					on:keyup|preventDefault={duplicationHandler(verifyName)}
					required
				/>
				{#if name.length > 0}
					<!-- 이름 유효성 문구 -->
					<div
						class="w-max h-1 mt-1 text-xs {nameVerified === UNIFICATION_STATUS.VERIFIED
							? 'text-green-600'
							: 'text-red-600'}"
					>
						{#if nameVerified === UNIFICATION_STATUS.VERIFIED}
							사용가능한 이름입니다.
						{:else if nameVerified === UNIFICATION_STATUS.DUPLICATED}
							이미 존재하는 이름입니다.
						{/if}
					</div>
				{/if}
			</label>

			<!-- 회원가입 완료 -->
			<button
				class="flex justify-center font-semibold {disableSubmit
					? 'text-gray-600 hover:cursor-not-allowed'
					: 'text-black hover:underline'}"
				disabled={disableSubmit}
			>
				회원가입 완료
			</button>
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

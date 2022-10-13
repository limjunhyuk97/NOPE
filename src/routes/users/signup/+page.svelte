<script lang="ts">
	import { toast } from '$lib/stores';
	import { PASSWORD_VERIFICATION_STATUS, UNIFICATION_STATUS } from '$lib/constants';
	import { checkEmail, isEmptyString } from '$lib/utils';
	import { checkDuplication } from './+page';

	let passwordInput: HTMLInputElement;

	let email = '';
	let password = '';
	let passwordCheck = '';
	let name = '';
	let emailVerified: string | null = null;
	let nameVerified: string | null = null;
	let passwordVerified: string | null = null;

	const verifyEmail = async (value: string) => {
		if (isEmptyString(value)) {
			emailVerified = UNIFICATION_STATUS.EMPTY;
		} else {
			emailVerified = checkEmail(value)
				? await checkDuplication(value, 'email')
				: UNIFICATION_STATUS.NOT_AVAILABLE_FORM;
		}
		console.log('email', value, emailVerified);
	};

	const verifyName = async (value: string) => {
		nameVerified = isEmptyString(value)
			? UNIFICATION_STATUS.EMPTY
			: await checkDuplication(value, 'name');
	};

	const verifyPassword = (e: Event) => {
		if (isEmptyString(password) || isEmptyString(passwordCheck)) {
			passwordVerified = PASSWORD_VERIFICATION_STATUS.EMPTY;
			return;
		}
		passwordVerified =
			password === passwordCheck
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
		if (isEmptyString(password)) {
			$toast = '비밀번호를 먼저 입력해주세요!';
			passwordInput.focus();
		}
	};

	$: disableSubmit =
		passwordVerified !== PASSWORD_VERIFICATION_STATUS.VERIFIED ||
		emailVerified !== UNIFICATION_STATUS.VERIFIED ||
		nameVerified !== UNIFICATION_STATUS.VERIFIED;
</script>

<div class="w-full h-full flex justify-center items-center">
	<div
		class="flex flex-col justify-center items-center 2xl:w-1/2 lg:w-3/4 w-4/5 h-4/5 border rounded shadow-2xl text-xl"
	>
		<form
			on:submit|preventDefault={() => {}}
			class="flex flex-col gap-14 w-full px-16 py-12 justify-center items-center"
			action="submit"
		>
			<h1 class="w-full text-2xl ">회원가입</h1>
			<!-- 아이디 -->
			<label class="w-full">
				<div>아이디</div>
				<input
					type="email"
					id="email"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:bg-white"
					bind:value={email}
					placeholder="본인의 이메일을 기입해주세요"
					on:keyup|preventDefault={duplicationHandler(verifyEmail)}
					required
				/>
			</label>
			<!-- 비밀번호 -->
			<label class="w-full">
				<div>비밀번호</div>
				<input
					type="password"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={password}
					bind:this={passwordInput}
					placeholder="비밀번호를 기입해주세요"
					required
				/>
			</label>

			<label class="w-full " on:click|preventDefault={passwordErrorHandler}>
				<div>비밀번호 확인</div>
				<input
					type="password"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none hover:cursor-pointer"
					bind:value={passwordCheck}
					placeholder={isEmptyString(password)
						? '비밀번호를 입력하세요!'
						: '비밀번호를 한번 더 입력해주세요'}
					required
					on:keyup|preventDefault={verifyPassword}
					disabled={isEmptyString(password)}
				/>
			</label>
			<label class="w-full">
				<div>이름</div>
				<input
					type="text"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={name}
					placeholder="사용하고자 하는 이름을 적어주세요!"
					on:keyup|preventDefault={duplicationHandler(verifyName)}
					required
				/>
			</label>
			<button
				class="flex justify-center drop-shadow-xl {disableSubmit ? 'text-gray-600' : 'text-black'}"
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

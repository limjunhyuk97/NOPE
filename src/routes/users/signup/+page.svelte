<script lang="ts">
	import { toast } from '$lib/stores';
	import { checkEmail } from '$lib/utils';
	import { checkDuplication } from './+page';

	let email = '';
	let emailVerified: string | null = null;
	let phone = '';
	let password = '';
	let passwordCheck = '';
	let name = '';
	let nameVerified: string | null = null;

	const verifyEmail = (result: string | null) => {
		emailVerified = result;
	};

	const verifyName = (result: string | null) => {
		nameVerified = result;
	};

	const duplicationHandler = (verfication: Function, column: string) => {
		const handler = async (e: Event) => {
			const input = (<HTMLInputElement>e?.target)?.value;
			emailVerified = (await checkEmail(input))
				? checkDuplication({ input, column }) + ''
				: 'NOT_EMAIL_FORM';
		};
		return handler;
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="2xl:w-2/5 lg:w-3/5 w-4/5 h-5/6 border rounded shadow-2xl text-xl">
		<form
			on:submit|preventDefault={() => {}}
			class="grid gap-y-12 lg:w-full px-4 py-12 justify-center items-center"
			action="submit"
		>
			<h1 class="w-full text-2xl">회원가입</h1>
			<!-- 아이디 -->
			<label for="email" class="w-96">
				<div>아이디</div>
				<input
					type="email"
					id="email"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={email}
					placeholder="본인의 이메일을 기입해주세요"
					on:keyup={duplicationHandler(verifyEmail, 'email')}
					required
				/>
			</label>
			<!-- 전화번호 -->
			<label for="password" class="w-96">
				<div>전화번호</div>
				<input
					type="text"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={phone}
					placeholder="본인의 전화번호를 기입해주세요 (- 생략)"
					required
				/>
			</label>
			<!-- 비밀번호 -->
			<label for="password" class="w-96">
				<div>비밀번호</div>
				<input
					type="password"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={password}
					placeholder="비밀번호를 기입해주세요"
					required
				/>
			</label>

			<label for="password" class="w-96">
				<div>비밀번호 확인</div>
				<input
					type="password"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={passwordCheck}
					placeholder="비밀번호를 확인해주세요"
					required
				/>
			</label>
			<label for="password" class="w-96">
				<div>이름</div>
				<input
					type="text"
					class="w-full mt-2 border-b-2 border-gray-300 focus:outline-none"
					bind:value={name}
					placeholder="사용하고자 하는 이름을 적어주세요!"
					on:keyup={duplicationHandler(verifyName, 'name')}
					required
				/>
			</label>
			<button class="flex justify-center drop-shadow-xl"> 회원가입 완료 </button>
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
</style>

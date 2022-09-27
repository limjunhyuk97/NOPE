<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { toast } from '$lib/stores';

	let email = '',
		password = '',
		passwordCheck = '',
		name = '';

	const handleSignup = async () => {
		let { data, error } = await supabase.auth.signUp({ email, password });
		const id = typeof data !== null ? data.user?.id : null;
		if (error) {
			$toast = '회원가입 실패';
		} else {
			// 회원 정보 입력 뒤에 pending으로 이동
			let { data, error } = await supabase.from('users').insert([{ name, email, id }]);
			if (error) {
				$toast = '회원가입 실패';
			}
		}
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="relative mx-auto lg:border rounded shadow-2xl text-xl">
		<form
			on:submit|preventDefault={handleSignup}
			class="px-16 flex flex-col justify-between"
			action="submit"
		>
			<h1 class="w-full lg:mt-16 mt-8 text-2xl">회원가입</h1>
			<label for="email" class="lg:mt-16 mt-6">
				<div>아이디</div>
				<input
					type="email"
					id="email"
					class="lg:w-96 w-44 mt-3 border-b border-gray-300 focus:outline-none"
					onfocus="this.placeholder=''"
					onblur="this.placeholder='본인의 이메일을 기입해주세요!'"
					bind:value={email}
					placeholder="본인의 이메일을 기입해주세요!"
					required
				/>
			</label>
			<label for="password" class="lg:mt-16 mt-6">
				<div>비밀번호</div>
				<input
					type="password"
					class="lg:w-96 w-44 mt-3 border-b border-gray-300 focus:outline-none"
					onfocus="this.placeholder=''"
					onblur="this.placeholder='비밀번호를 기입해주세요!'"
					bind:value={password}
					placeholder="비밀번호를 기입해주세요!"
					required
				/>
			</label>

			<label for="password" class="lg:mt-16 mt-6">
				<div>비밀번호 확인</div>
				{#if password !== passwordCheck}<span class="ml-3 text-xs text-red-500"
						>비밀번호와 일치하지 않습니다.</span
					>
				{:else if password}
					<span class="ml-3 text-xs text-green-500">비밀번호와 일치합니다.</span>
				{/if}
				<input
					type="password"
					class="lg:w-96 w-44 mt-3 border-b border-gray-300 focus:outline-none"
					onfocus="this.placeholder=''"
					onblur="this.placeholder='비밀번호 재확인'"
					bind:value={passwordCheck}
					placeholder="비밀번호 재확인"
					required
				/>
			</label>
			<label for="password" class="lg:mt-16 mt-6">
				<div>이름</div>
				<input
					type="text"
					class="lg:w-96 w-44 mt-3 border-b border-gray-300 focus:outline-none"
					onfocus="this.placeholder=''"
					onblur="this.placeholder='실명을 기입해주세요!'"
					bind:value={name}
					placeholder="실명을 기입해주세요!"
					required
				/>
			</label>
			<button
				class="flex justify-center my-12 drop-shadow-lg"
				disabled={password.length !== 0 && password !== passwordCheck}
			>
				회원가입 완료
			</button>
		</form>
	</div>
</div>

<style>
	::placeholder {
		font-size: 14px;
		color: gray;
		opacity: 0.5;
	}
</style>

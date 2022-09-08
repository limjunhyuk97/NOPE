<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { toast } from '$lib/stores';

	let loading = false;
	let email = '',
		password = '';

	const handleLogin = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			$toast = '로그인 실패';
		} else {
			$toast = '로그인 성공!';
			goto('/');
		}
	};
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<div class="SIGNIN-TEMPLATE-WIDTH relative pb-12 pt-4 border rounded shadow-2xl text-xl">
		<form
			on:submit|preventDefault={handleLogin}
			class="2xl:px-28 px-16 flex flex-col"
			action="submit"
		>
			<h1 class="w-full mt-16 text-2xl">로그인</h1>
			<label for="email" class="mt-16"> 이메일 </label>
			<input
				type="email"
				id="email"
				class="mt-8 border-b focus:outline-none border-gray-300 bg-white"
				bind:value={email}
				required
			/>

			<label for="password" class="mt-16"> 비밀번호 </label>
			<input
				type="password"
				class="mt-8 border-b focus:outline-none border-gray-300 bg-white"
				bind:value={password}
				required
			/>

			<div class="w-full mt-8 flex justify-end text-sm drop-shadow-lg">
				<a href="/users/signup"> 회원가입 </a>
			</div>

			<div class="px-8 mt-12 flex justify-between drop-shadow-lg">
				<button>로그인</button>
				<a href="/users/">아이디/PW 찾기</a>
			</div>
		</form>
	</div>
</div>

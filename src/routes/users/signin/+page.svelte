<script>
	import { LOGO } from '$lib/constants';
	import Icon from '$lib/Icon.svelte';
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { toast } from '$lib/stores';

	let loading = false;
	let email = '',
		password = '';

	const handleLogin = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			$toast = { message: '로그인 실패', top: 20, width: 24 };
		} else {
			$toast = { message: '로그인 성공!', top: 20, width: 24 };
			goto('/');
		}
	};
</script>

<div class="w-full h-screen flex justify-center items-center">
	<div class="SIGNIN-TEMPLATE-WIDTH pb-12 relative border rounded shadow-2xl text-xl">
		<button type="button" class="absolute left-8 top-8" on:click={() => window.history.go(-1)}>
			<Icon icon="arrow-left" stroke_width={3} size={32} />
		</button>
		<a href="/"><img src={LOGO} class="mx-auto" alt="NOPE" /></a>
		<form
			on:submit|preventDefault={handleLogin}
			class="2xl:px-28 px-16 flex flex-col justify-between"
			action="submit"
		>
			<label for="email" class="mt-20"> 이메일 </label>
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

			<div class="lg:px-16 px-8 mt-12 flex flex justify-between drop-shadow-lg">
				<button>로그인</button>
				<a href="/users/">아이디/PW 찾기</a>
			</div>
		</form>
	</div>
</div>

<style>
	input {
		font-size: 14px;
	}
</style>

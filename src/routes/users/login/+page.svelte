<script>
	import { goto } from '$app/navigation';

	import { supabase } from '$lib/supabase';

	let loading = false;
	let email = '',
		password = '';

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) throw error;
			goto('/');
		} catch (error) {
			// alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<div class="px-24 pb-16 mx-auto w-3/5 border rounded flex flex-col gap-4 shadow-2xl relative">
	<img
		src="https://tpadnvqhtgwxcexavqic.supabase.co/storage/v1/object/sign/app/logo-NOPE.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvbG9nby1OT1BFLnN2ZyIsImlhdCI6MTY2MjAwMzE4NCwiZXhwIjoxOTc3MzYzMTg0fQ.i3cnkALP8nzLksFCR5c7ZgafzcqjKsqLRfIcRz9XhZU"
		class="w-2/3 mx-auto"
		alt="logo"
	/>
	<form
		on:submit|preventDefault={handleLogin}
		class="flex flex-col text-2xl gap-8 lg:mt-16 lg:px-12 mt-4"
		action="submit"
	>
		<label for="email" class="focus:ring-0 font-bold text-sm font-sans"> 이메일 </label>

		<input
			type="email"
			id="email"
			class="h-8 border-b border-gray-300 text-sm p-3 mt-2"
			bind:value={email}
			required
		/>
		<label for="password" class="font-bold text-sm font-sans"> 비밀번호 </label>
		<input
			type="password"
			class="h-8 border-b border-gray-300 text-sm p-3 mt-2"
			bind:value={password}
			required
		/>

		<div class="w-full justify-end flex text-xs text-gray-600">
			<a href="/users/signUp" class="flex items-center"> 회원가입 </a>
		</div>

		<div class="flex text-sm font-bold justify-evenly my-16 whitespace-nowrap gap-8">
			<button>로그인</button>
			<a href="/users/">아이디/PW 찾기</a>
		</div>
	</form>
</div>

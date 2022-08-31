<script>
	import { supabase } from '$lib/supabase';

	let loading = false;
	let email = '',
		password = '';

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			// alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<div class="px-24 pb-16 my-32 w-3/5 mx-auto border rounded flex flex-col gap-4 shadow-2xl">
	<img
		src="https://tpadnvqhtgwxcexavqic.supabase.co/storage/v1/object/sign/app/NOPE_logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvTk9QRV9sb2dvLnN2ZyIsImlhdCI6MTY2MTk0Nzc2MCwiZXhwIjoxOTc3MzA3NzYwfQ.e2gtZbD8cfwlU4VNSmXdzRFF9ZpBmRACM_jeYx2mtjY"
		alt="logo"
		class="pl-24"
	/>
	<form
		on:submit|preventDefault={handleLogin}
		class="flex flex-col text-2xl gap-8 mt-16"
		action="submit"
	>
		<label for="email" class="focus:ring-0 font-bold text-sm font-sans">
			이메일
			<input
				type="email"
				id="email"
				class="w-full h-8 border-b border-gray-300 text-sm p-3 mt-2"
				bind:value={email}
				required
			/>
		</label>
		<label for="password" class="font-bold text-sm font-sans">
			비밀번호
			<input
				type="password"
				class="w-full h-8 border-b border-gray-300 text-sm p-3 mt-2"
				bind:value={password}
				required
			/>
		</label>
	</form>
	<div class="w-full justify-end flex text-xs text-gray-600">
		<a href="/users/signUp" class="flex items-center"> 회원가입 </a>
	</div>

	<div class="flex font-bold justify-evenly my-16">
		<a class="" href="/users/login">로그인</a>
		<a href="/users/">아이디/PW 찾기</a>
	</div>
</div>

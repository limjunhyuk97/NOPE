<script>
	import { goto } from '$app/navigation';

	import { toastMessage } from '$lib/stores';

	// import { supabase } from '$lib/supabase';

	let email = '';
	let password = '';
</script>

<div class="p-4 my-32 w-96 mx-auto bg-blue-400 rounded flex flex-col gap-10">
	<div class="text-5xl text-center">NOPE</div>
	<form
		on:submit|preventDefault={async () => {
			// const { error } = await supabase.auth.signIn({ email, password });
			// if (error) {
			// 	$toastMessage = '잘못된 로그인 정보입니다';
			// 	return;
			// } else {
			// 	$toastMessage = '로그인 되었습니다';
			// 	goto('/');
			// }
		}}
		class="flex flex-col text-2xl gap-2"
		action="submit"
	>
		<label class="flex flex-col gap-2" id="email">
			email
			<input bind:value={email} type="text" for="id" required />
		</label>
		<label class="flex flex-col gap-2" id="password" required
			>password
			<input bind:value={password} type="password" for="password" />
		</label>
	</form>
	<button class="bg-blue-600 rounded-lg text-sm h-12 w-full text-white font-bold mt-6">
		로그인
	</button>
</div>

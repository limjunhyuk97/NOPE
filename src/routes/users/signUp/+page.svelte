<script>
	import { supabase } from '$lib/supabase';

	let loading = false;
	let email = '',
		password = '',
		passwordCheck = '',
		name = '';

	const handleSignup = async () => {
		if (password === passwordCheck) {
			try {
				loading = true;
				const { error } = await supabase.auth.signUp({ email, password });
				if (error) throw error;
				alert('Check your email for the login link!');
			} catch (error) {
				alert(error.error_description || error.message);
			} finally {
				loading = false;
			}
		}
	};
</script>

<div class="px-24 pb-16 mx-auto w-3/5 border rounded flex flex-col gap-4 shadow-2xl relative">
	<button type="button" class="w-8 absolute left-8 top-8" on:click={() => window.history.go(-1)}>
		<img
			src="https://tpadnvqhtgwxcexavqic.supabase.co/storage/v1/object/sign/app/left_arrow.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvbGVmdF9hcnJvdy5zdmciLCJpYXQiOjE2NjE5NTk0NjUsImV4cCI6MTk3NzMxOTQ2NX0.S01vxOY0Lyq0xaAhTnu3fG9xLxQudMSt9EvMgkm49cg"
			alt="left_arrow"
		/>
	</button>

	<img
		src="https://tpadnvqhtgwxcexavqic.supabase.co/storage/v1/object/sign/app/logo-NOPE.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvbG9nby1OT1BFLnN2ZyIsImlhdCI6MTY2MjAwMzE4NCwiZXhwIjoxOTc3MzYzMTg0fQ.i3cnkALP8nzLksFCR5c7ZgafzcqjKsqLRfIcRz9XhZU"
		class="w-2/3 mx-auto"
		alt="logo"
	/>
	<form
		on:submit|preventDefault={handleSignup}
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
				placeholder="본인의 이메일을 기입해주세요!"
				required
			/>
		</label>
		<label for="password" class="font-bold text-sm font-sans">
			비밀번호
			<input
				type="password"
				class="w-full h-8 border-b border-gray-300 text-sm p-3 mt-2"
				bind:value={password}
				placeholder="비밀번호를 기입해주세요!"
				required
			/>
		</label>

		<label for="password" class="font-bold text-sm font-sans">
			비밀번호 확인
			{#if password !== passwordCheck}<span class="text-xs text-red-500"
					>비밀번호와 일치하지 않습니다.</span
				>
			{:else if password}
				<span class="text-xs text-blue-500">비밀번호와 일치합니다.</span>
			{/if}
			<input
				type="password"
				class="w-full h-8 border-b border-gray-300 text-sm p-3 mt-2"
				bind:value={passwordCheck}
				placeholder="비밀번호를 확인해주세요!"
				required
			/>
		</label>
		<label for="password" class="font-bold text-sm font-sans">
			이름
			<input
				type="text"
				class="w-full h-8 border-b border-gray-300 text-sm p-3 mt-2"
				bind:value={name}
				placeholder="실명을 기입해주세요!"
				required
			/>
		</label>
		<button
			class="flex font-bold text-lg justify-evenly my-16"
			disabled={password.length !== 0 && password !== passwordCheck}
		>
			회원가입 완료
		</button>
	</form>
</div>

<script lang="ts">
	import { supabase } from '$lib/supabase';
	import Icon from '$lib/Icon.svelte';
	import { toast } from '$lib/stores';
	import { goto } from '$app/navigation';
	import Logo from '$lib/assets/Logo.svelte';
	import LeftArrow from '$lib/assets/LeftArrow.svelte';

	let email = '',
		password = '',
		passwordCheck = '',
		name = '';

	const handleSignup = async () => {
		let { data, error } = await supabase.auth.signUp({ email, password });
		const id = typeof data !== null ? data.user.id : null;
		if (error) {
			$toast = '회원가입 실패';
		} else {
			// 회원 정보 입력 뒤에 pending으로 이동
			let { data, error } = await supabase.from('users').insert([{ name, email, id }]);
			if (error) {
				$toast = '회원가입 실패';
			} else {
				let { data, error } = await supabase.from('users_private').insert([{ id, password }]);
				if (error) $toast = '회원가입 실패';
				else goto('/users/signUp/pending');
			}
		}
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="SIGNUP-TEMPLATE-WIDTH relative mx-auto border rounded shadow-2xl text-xl">
		<form
			on:submit|preventDefault={handleSignup}
			class="px-16 flex flex-col justify-between"
			action="submit"
		>
			<label for="email" class="mt-12">
				아이디
				<input
					type="email"
					id="email"
					class="w-full mt-4 border-b border-gray-300 focus:outline-none"
					onfocus="this.placeholder=''"
					onblur="this.placeholder='본인의 이메일을 기입해주세요!'"
					bind:value={email}
					placeholder="본인의 이메일을 기입해주세요!"
					required
				/>
			</label>
			<label for="password" class="mt-12">
				비밀번호
				<input
					type="password"
					class="w-full mt-4 border-b border-gray-300 focus:outline-none"
					onfocus="this.placeholder=''"
					onblur="this.placeholder='비밀번호를 기입해주세요!'"
					bind:value={password}
					placeholder="비밀번호를 기입해주세요!"
					required
				/>
			</label>

			<label for="password" class="mt-12">
				비밀번호 확인
				{#if password !== passwordCheck}<span class="ml-3 text-xs text-red-500"
						>비밀번호와 일치하지 않습니다.</span
					>
				{:else if password}
					<span class="ml-3 text-xs text-green-500">비밀번호와 일치합니다.</span>
				{/if}
				<input
					type="password"
					class="w-full mt-4 border-b border-gray-300 focus:outline-none"
					onfocus="this.placeholder=''"
					onblur="this.placeholder='비밀번호 재확인'"
					bind:value={passwordCheck}
					placeholder="비밀번호 재확인"
					required
				/>
			</label>
			<label for="password" class="mt-12">
				이름
				<input
					type="text"
					class="w-full mt-4 border-b border-gray-300 focus:outline-none"
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

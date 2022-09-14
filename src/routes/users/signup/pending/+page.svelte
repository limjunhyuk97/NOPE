<script>
	import { Jumper } from 'svelte-loading-spinners';
	import { user, toast } from '$lib/stores';
	import { goto } from '$app/navigation';
</script>

{#if $user}
	{goto('/')}
{:else}
	<div class="w-full h-full flex justify-center items-center">
		<div class="SIGNUP-TEMPLATE-WIDTH relative mx-auto border rounded shadow-2xl text-xl">
			<div class="w-full py-24 flex flex-col items-center justify-center">
				<h1 class="mb-24 text-blue-300">정보 입력 완료!</h1>
				<Jumper color="#9FC9F3" />
				<a href="/" class="flex flex-col items-center">
					<div class="pt-24 text-blue-300">인증 대기중입니다</div>
					<div class="pt-4 text-sm text-blue-300">
						이메일로 본인인증을 완료하시면 회원가입이 완료됩니다!
					</div>
					<div class="pt-1 text-xs text-blue-300">홈으로 가기</div>
				</a>
			</div>
		</div>
	</div>
{/if}

<script>
	import Logo from './icon/LOGO.png';
	import { goto } from '$app/navigation';
	import { activitiesToShow } from '$lib/stores';

	$activitiesToShow = 'all';
</script>

<div class="w-full ml-3 mb-8 flex items-center justify-center">
	<button
		on:click={() => {
			$activitiesToShow = 'all';
			goto('/');
		}}
	>
		<img src={Logo} alt="NOPE" class="w-5/6" />
	</button>
</div>

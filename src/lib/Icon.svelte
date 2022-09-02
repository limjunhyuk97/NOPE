<script>
	import feather from 'feather-icons';
	export let icon = 'home';
	export let size = 24;
	export let stroke_width = 2;
</script>

<!-- {@html ...}을 사용하면 html 요소를 바로 렌더링할 수 있음을 이용하는 것.-->
{@html feather.icons[icon]
	? feather.icons[icon].toSvg({ width: size, height: size, 'stroke-width': stroke_width })
	: '-'}

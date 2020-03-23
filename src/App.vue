<template>
	<div id="app">
			<Nav></Nav>
			<router-view class="view"/>
	</div>
</template>
<script>
	import Nav from '@/components/nav';

	export default {
		components: {
			Nav,
		},
	};
</script>
<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		display: flex;
	}
	.view{
		flex: 1;
	}
</style>

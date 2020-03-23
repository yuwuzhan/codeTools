<template>
	<aside class="aside">
		<ul>
			<li>
				<p>js</p>
				<ul>
					<li></li>
				</ul>
			</li>
			<li>
				<p>css</p>
				<ul>
					<li><router-link :to="{name:'css'}">多边框</router-link></li>
					<li></li>
				</ul>
			</li>
		</ul>
	</aside>
</template>

<script>
	export default{

	}
</script>

<style lang="scss" scoped>
	.aside{
		display: flex;
		flex-direction: column;
		width: 220px;
	}
</style>

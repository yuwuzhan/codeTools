<template>
	<li>
		<div
				:class="{bold: isFolder}"
				@click="toggle(item)">
			{{ item.filename }}
			<span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
		</div>
		<ul v-show="isOpen" v-if="isFolder">
			<tree-item
					class="item"
					v-for="(child, index) in item.children"
					:key="index"
					:item="child"
			></tree-item>
		</ul>
	</li>
</template>
I understand the consequences,delete this repository
<script>
	export default {
		name:'treeItem',
		props: {
			item: Object,
		},
		inject: ['getFile'],
		data: function () {
			return {
				isOpen: false,
			};
		},
		computed: {
			isFolder: function () {
				return this.item.children &&
					this.item.children.length;
			},
		},
		methods: {
			toggle: function (item) {
				if (this.isFolder) {
					this.isOpen = !this.isOpen;
				}
				if(item.isFile) {
					this.getFile(item)
				}
			},
		},
	};

</script>


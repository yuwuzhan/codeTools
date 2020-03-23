<template>
	<div class="about">
		<!-- the demo root element -->
		<ul id="demo">
			<treeItem
					class="item"
					:item="$fileList"
			></treeItem>
		</ul>
		<div>
			<pre>
			<code id="code" v-html="code">
			</code>
		</pre>
		</div>
		<button @click="runCode">运行</button>
		<div v-html="runResult"></div>
	</div>
</template>
<script>
	import Hljs from 'highlight.js';
	import 'highlight.js/styles/github.css';
	import treeItem from '@/components/tree';

	export default {
		data() {
			return {
				code: '',
				currentJsId: 0,
				runResult: '',
				log: Function,
			};
		},
		provide() {
			return {getFile: this.listenClick};
		},
		components: {
			treeItem,
		},
		methods: {
			runCode() {
				const tempCode = this.code.replace(/console.log/g, 'this.log');
				eval(tempCode);
			},
			listenClick(item) {
				if (this.currentJsId === item.fid) return;
				this.currentJsId = item.fid;
				this.getFile(item.filepath);
			},
			getFile(filepath) {
				this.$ajax(filepath).then((text) => {
					this.code = text;
					this.$nextTick(() => {
						Hljs.highlightBlock(document.getElementById('code'));
					});
				});
			},
		},
		created() {
			this.log = new Proxy(console.log, {
				apply(target, thisArg, argArray) {
					thisArg.runResult = '';
					argArray.map((message) => {
						if (typeof message == 'object') {
							thisArg.runResult += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br/>';
						} else {
							thisArg.runResult += message + '<br/>';
						}
					});
				},
			});
		},
		mounted() {
			console.log(this.$fileList);
		},
	};
</script>

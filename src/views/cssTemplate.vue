<!--多边框-->
<template>
	<div class="home">
		<div class="flex-2">
			<div class="code-wrap">
				<div ref="code">
					<p>.{{cssObj.tag}}{</p>
					<p class="code-item" :data-i="index" v-for="(item,index) in cssObj.propList" :key="index" contenteditable>{{item}}</p>
					<p>}</p>
				</div>
				<button @click="copy">复制</button>
			</div>
			<div>
				边框(box-shadow):
				<div class="w60" :class="[cssObj.tag]"></div>
			</div>
		</div>
		<code v-html="html" class="hidden">
		</code>
	</div>
</template>

<script>
	export default {
		computed: {
			html() {
				return `<style contenteditable>.${this.cssObj.tag}{\n${this.cssObj.propList.join(';\n')};\n}</style>`;
			},
		},
		mounted() {
			const config = {
				characterData: true, subtree: true, childList: true,
			};
			const codeAreaDom = this.$refs.code;
			this.observer = new MutationObserver(this.listerCallback);
			this.observer.observe(codeAreaDom, config);
		},
		beforeDestroy() {
			this.observer.disconnect();
		},
		methods: {
			listerCallback(mutationsList) {
				// .match(/\{([^>]+)\}/)
				for (let mutation of mutationsList) {
					console.log(mutation);
					let type = mutation.type;
					let index = mutation.target.parentNode.dataset.i;
					switch (type) {
						case 'characterData':
							this.changeCssData(index, mutation.target.data, mutation.target.parentNode);
							break;
						default:
							break;
					}
				}
			},
			changeCssData(index, data, node) {
				let s = window.getSelection();
				let r = document.createRange();
				let offset = s.focusOffset
				this.$set(this.cssObj.propList, index, data);
				this.$nextTick(() => {
					r.setStart(node.childNodes[0], offset);
					r.setEnd(node.childNodes[0], offset);
					s.removeAllRanges();
					s.addRange(r);
				});
			},
			copy() {
				const tempNode = document.createElement('textarea');
				document.body.appendChild(tempNode);
				tempNode.value = this.cssObj.propList.join('\n');
				tempNode.select(); // 选中文本
				document.execCommand('copy'); // 执行浏览器复制命令
				document.body.removeChild(tempNode);
			},
		},
		data() {
			return {
				observerObj: {},
				cssObj: {
					tag: 'border-1',
					propList: [
						`background: yellowgreen;`,
						`padding: 20px;`,
						`box-shadow: 0 0 0 10px inset #655,0 0 0 15px inset deeppink,0 2px 5px 15px inset rgba(0, 0, 0,.6);`,
					],
				},
			};
		},
	};
</script>

<style scoped lang="scss">
	.hidden {
		display: none;
	}

	.code-wrap {
		position: relative;

		p {
			text-align: left;
			margin-left: -40px;
			background-color: #fff;
			font-family: Monaco, monospace;
			font-size: 12px;
			word-wrap: break-word;
			outline: none;
			&.code-item{
				margin-left: 20px;
				text-indent: -30px;
			}
		}

		&:hover {
			button {
				display: block;
			}
		}

		button {
			outline: none;
			box-shadow: none;
			border: none;
			right: 0;
			top: 0;
			display: none;
			position: absolute;
		}
	}
</style>

<template>
	<div id="hello">
		<div class="chest">
			<div class="heart left side top"></div>
			<div class="heart center"></div>
			<div class="heart right side"></div>
		</div>
		<div class="chest">
			<div class="heart left side top"></div>
			<div class="heart center"></div>
			<div class="heart right side"></div>
		</div>
		<div class="chest">
			<div class="heart left side top"></div>
			<div class="heart center"></div>
			<div class="heart right side"></div>
		</div>

		<div id="container">
			<div id="sun"></div>
			<div class="orbit" id="earth-orbit">
				<div class="globe" id="earth">
					<div class="orbit" id="moon-orbit">
						<div class="globe" id="moon"></div>
					</div>
				</div>
			</div>
		</div>

		<vueToTop type=8 size=45 class="gg"></vueToTop>
<!-- 参数	说明	类型	可选值	默认值
	type	按钮的类型，一共16种	number	0~15	0
	top	滚动条离顶部多高时，显示返回顶部按钮	number	大于0的整数	400
	right	按钮右部定位位置	number	大于0的整数	30
	bottom	按钮底部定位位置	number	大于0的整数	30
	size	按钮大小	number	大于0的整数	24
	color	按钮颜色	string	rgb/hex	'#666'
	duration	返回顶部的间隔时间	number	大于0的整数	300 -->
	</div>
</template>

<script>
	import Vue from 'vue'
	import vueToTop from 'vue-totop'
	Vue.use(vueToTop)
	export default {
		data() {
			return {}
		},
		mounted() {}
	}
</script>

<style scoped lang="scss">
	.chest {
		width: 500px;
		height: 500px;
		margin: 0 auto;
		position: relative;
	}

	.heart {
		position: absolute;
		z-index: 2;
		background: linear-gradient(-90deg, #F50A45 0%, #d5093c 40%);
		animation: beat 0.7s ease 0s infinite normal;
	}

	.heart.center {
		background: linear-gradient(-45deg, #B80734 0%, #d5093c 40%);
	}

	.heart.top {
		z-index: 3;
	}

	.side {
		top: 100px;
		width: 220px;
		height: 220px;
		border-radius: 110px;
	}

	.center {
		width: 210px;
		height: 210px;
		bottom: 100px;
		left: 145px;
		transform: rotateZ(225deg);
		/*transform: rotate(45deg);*/
	}

	.left {
		left: 62px;
	}

	.right {
		right: 62px;
	}


	@keyframes beat {
		0% {
			transform: scale(1) rotate(225deg);
			box-shadow: 0 0 40px #d5093c;
		}

		50% {
			transform: scale(1.1) rotate(225deg);
			box-shadow: 0 0 70px #d5093c;
		}

		100% {
			transform: scale(1) rotate(225deg);
			box-shadow: 0 0 40px #d5093c;
		}
	}

	#container {
		z-index: 33;
		height: 400px;
		left: calc(50% - 200px);
		position: absolute;
		top: calc(50% - 200px);
		width: 400px;
		position: relative;

	}

	#container #sun {
		background-color: yellow;
		border-radius: 50%;
		-webkit-box-shadow: 0 0 30px white;
		box-shadow: 0 0 30px white;
		height: 100px;
		left: 150px;
		position: absolute;
		top: 150px;
		width: 100px;
	}

	#container .orbit {
		border: solid;
		border-color: white transparent transparent transparent;
		border-radius: 50%;
		border-width: 1px 1px 0 0;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		position: absolute;
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transform-origin: center;
		transform-origin: center;
	}

	#container .orbit#earth-orbit {
		-webkit-animation: orbit 36.5s linear infinite;
		animation: orbit 36.5s linear infinite;
		height: 300px;
		left: 50px;
		top: 50px;
		width: 300px;
	}

	#container .orbit#moon-orbit {
		-webkit-animation: orbit 2.7s linear infinite;
		animation: orbit 2.7s linear infinite;
		height: 80px;
		left: -25px;
		top: -25px;
		width: 80px;
	}

	#container .orbit .globe {
		border-radius: 50%;
		position: absolute;
	}

	#container .orbit .globe#earth {
		background: aqua;
		height: 30px;
		right: 28px;
		top: 28px;
		width: 30px;
	}

	#container .orbit .globe#moon {
		background: #d6d6d6;
		height: 12px;
		right: 2px;
		top: 8px;
		width: 12px;
	}

	@-webkit-keyframes orbit {
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@keyframes orbit {
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>

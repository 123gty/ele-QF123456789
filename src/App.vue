<template>
	<div id="app">
		<header>
			<div class="header" v-show="$route.meta.show">
				<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
				 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >

					<el-menu-item index="1"><a> <i class="el-icon-rank" @click='toggleFullScreen'></i></a></el-menu-item>
					<el-menu-item index="2"><a>订单管理</a></el-menu-item>
					<el-submenu index="3" style='float: right;'>
						<template slot="title">系统操作</template>
						<el-menu-item index="3-1" @click="zhuxiao">注销退出</el-menu-item>
						<el-menu-item index="3-2" @click="zhuxiao">更换账号</el-menu-item>
					</el-submenu>
				</el-menu>
			</div>
		</header>
		<aside id="side" v-show="$route.meta.show">
			<div id="nav">
				<router-link to="/yi">壹壹壹壹壹</router-link>
				<router-link to="/er">贰贰贰贰贰</router-link>
				<router-link to="/san">叁叁叁叁叁</router-link>
				<router-link to="/aaa">肆肆肆肆肆</router-link>
				<router-link to="/wu">伍伍伍伍伍</router-link>
				<router-link to="/liu">陆陆陆陆陆</router-link>
				<router-link to="/qi">嘁嘁嘁嘁嘁</router-link>
				<router-link to="/ba">叭叭叭叭叭</router-link>
				<router-link to="/jiu">啾啾啾啾啾</router-link>
				<router-link to="/aaa">递归</router-link>
				<router-link to="/bbb">递归2</router-link>
				<router-link to="/ccc">角色授权</router-link>
			</div>
		</aside>
		<main>
			<router-view />
		</main>
	
	</div>
</template>


<style lang="scss" scoped>
	::-webkit-scrollbar {
		border: none;
	}
	* {
		padding:0;
		margin:0;
	}

	header {
		width: 100%;
		height: 60px;
	}

	aside {
		position: absolute;
		height: calc(100% - 75px);
		width: 200px;
		#nav {
			display: flex;
			width: 100%;
			text-align: center;
			// box-shadow: inset 0 0 200px rgba(0, 0, 0, .4);
			flex-direction: column;
			text-align: center;
			a {
				line-height: 50px;
				font-weight: bold;
				color: #2c3e50;
				&.router-link-exact-active {
					color: #42b983;
				}
			}
		}
	}

	main {
		position: absolute;
		left: 208px;
		height: calc(100% - 75px);
		overflow: auto;
		width: calc(100% - 216px);
	}


</style>


<script>
	import {
		removeToken
	} from '@/utils/auth'

	export default {
		data() {
			return {
				activeIndex2: '1'
			}
		},
		methods: {
			zhuxiao() {
				removeToken()
				this.$router.push({
					name: 'login'
				});
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			toggleFullScreen() {
				if (!document.fullscreenElement && // alternative standard method
					!document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
					if (document.documentElement.requestFullscreen) {
						document.documentElement.requestFullscreen();
					} else if (document.documentElement.mozRequestFullScreen) {
						document.documentElement.mozRequestFullScreen();
					} else if (document.documentElement.webkitRequestFullscreen) {
						document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
					}
				} else {
					if (document.cancelFullScreen) {
						document.cancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					}
				}
			},
		},
		mounted() {

			var colors = new Array(
				[251, 243, 246], [200, 220, 208], [111, 123, 140], [244, 226, 156], [141, 158, 170]);
			var step = 0;
			var colorIndices = [0, 1, 2, 3];
			var gradientSpeed = .015;

			function updateGradient() {
				var c0_0 = colors[colorIndices[0]];
				var c0_1 = colors[colorIndices[1]];
				var c1_0 = colors[colorIndices[2]];
				var c1_1 = colors[colorIndices[3]];
				var istep = 1 - step;
				var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
				var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
				var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
				var color1 = "#" + ((r1 << 16) | (g1 << 8) | b1).toString(16);
				var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
				var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
				var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
				var color2 = "#" + ((r2 << 16) | (g2 << 8) | b2).toString(16);
				document.getElementById("side").style.background = "-webkit-radial-gradient(center, circle cover, " + color1 +
					"," + color2 + ")";
				step += gradientSpeed;
				if (step >= 1) {
					step %= 1;
					colorIndices[0] = colorIndices[1];
					colorIndices[2] = colorIndices[3];
					colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
					colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
				}
			}
			setInterval(updateGradient, 50);
		}
	}
</script>

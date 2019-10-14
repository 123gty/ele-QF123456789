<template>
	<div id="app">
		<el-container>
			<el-header v-show="$route.meta.show">
				<div class="header" v-show="$route.meta.show">
					<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
					 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

						<el-menu-item index="1"><a> <i class="el-icon-rank" @click='toggleFullScreen'></i></a></el-menu-item>
						<el-menu-item index="2"><a>订单管理</a></el-menu-item>
						<el-submenu index="3">
							<template slot="title">系统操作</template>
							<el-menu-item index="3-1" @click="zhuxiao">注销退出</el-menu-item>
							<el-menu-item index="3-2" @click="zhuxiao">更换账号</el-menu-item>
						</el-submenu>
					</el-menu>
				</div>
			</el-header>
			<el-container>
				<el-aside style="width: 200px;" v-show="$route.meta.show" id="side">
					<div id="nav">
						<router-link to="/yi">壹壹壹壹壹</router-link>
						<router-link to="/er">贰贰贰贰贰</router-link>
						<router-link to="/san">叁叁叁叁叁</router-link>
						<router-link to="/si">肆肆肆肆肆</router-link>
						<router-link to="/wu">伍伍伍伍伍</router-link>
						<router-link to="/liu">陆陆陆陆陆</router-link>
						<router-link to="/qi">嘁嘁嘁嘁嘁</router-link>
						<router-link to="/ba">叭叭叭叭叭</router-link>
					</div>
				</el-aside>
				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>

	</div>
</template>


<style lang="scss" scoped>
	::-webkit-scrollbar {
		border: none;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		overflow: hidden;
	}
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		padding: 0;
		text-align: center;
		line-height: 60px;
	}
	.el-aside {
		// position: absolute;
		// 		height: 90%;
		// 		width: 100%;
		// 		visibility: visible;
		background-color: #D3DCE6;
		background-color: rgb(84, 92, 100);
		color: #333;
		text-align: center;
		line-height: 200px;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
	.el-main {
		padding: 0;
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		overflow: hidden;
	}
	.el-container {
		height: 900px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

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

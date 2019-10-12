<template>
  <div id="app">
    <div id="nav" >
      <!-- <router-link to="/">首页导航</router-link> -->
      <router-link to="/yi">壹壹壹壹壹</router-link>
	   <router-link to="/er">贰贰贰贰贰</router-link> 
	  <router-link to="/san">叁叁叁叁叁</router-link> 
	  <router-link to="/si">肆肆肆肆肆</router-link> 
      <router-link to="/wu">伍伍伍伍伍</router-link>
      <router-link to="/liu">陆陆陆陆陆</router-link>
      <router-link to="/qi">嘁嘁嘁嘁嘁</router-link>
      <router-link to="/ba">叭叭叭叭叭</router-link>
	  
    </div>
	<div class="you">
		<router-view/>
	</div>
    
  </div>
</template>
<script>
	export default{
		data(){
			return {
				screenWidth: document.body.clientWidth
			}
		},
		watch:{
			screenWidth(){
				console.log(this.screenWidth)
			// 	var data={
			// 	    name:'taytay',
			// 	    sex:'woman',
			// 	    hobby:'program'
			// 	};
			// 	var e=JSON.stringify(data);
			// 	window.localStorage.setItem("shuju",e);
			 },
			
		},
		
	}
	
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  height:99%;
  width:99%;
}
#app{
	display: flex;
	 justify-content: space-around;
	 background: #ededed;
}
#nav {
	
	display: flex;
	 min-width:180px;
	 text-align: center;
	 box-shadow: inset 0 0 200px rgba(0, 0, 0, .4);
	flex-direction: column;
	line-height: 50px;
	text-align: center;
  
  a {
    font-weight: bold;
    color: #2c3e50;
	
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.you{
	
	width:90%;
}

</style>


<script>
	export default {
		data(){
			return {
				
			}
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
				document.getElementById("nav").style.background = "-webkit-radial-gradient(center, circle cover, " + color1 +
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
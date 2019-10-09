<template>
  <div id="hello">
		<div class="yi">
			<el-row>
			 <el-col :span="18">
				  <div class="grid-content bg-purple">
					  <div id="main" style="width: 100%;height:100%;"></div>
				  </div>
			</el-col>
			<el-col :span="6">
			  <div class="grid-content bg-purple-light">
				  <div id="maina" style="width: 100%;height:100%;"></div>

			  </div>
			</el-col>
		</el-row>
		</div></br>
		
  </div>
</template>

<script>
import echarts from 'echarts';
		export default {
		  name: 'HelloWorld',
		  props: {
			
		  },
		  mounted(){
			 
		var myChart = echarts.init(document.getElementById('main'));
		myChart.setOption({
			title: {//标题
				text: '首页导航首页导航',
				// top:'20%',/标题margin
			},
			
			tooltip : {//鼠标移入时
				 //enterable:true,
				
				//trigger: 'axis',
				axisPointer: {
					type: 'cross',//显示十字架，阴影，竖线
					label: {
						backgroundColor: 'red'//鼠标移入颜色
					},
				}
			},
			legend: {//
			   
				data:['邮件营销','搜索引擎','你好'],
				x: 'right',
				 top:'10%',
				 left:'65%',
				
			},
			color: ["#0080ff","#4cd5ce"],
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				
				left: '0',
				right: '4%',
				bottom: '3%',
				top:'20%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,//图表是否居中
					data : ['2008','2009','20010','2011','2012','2013','2014','2015','2017','2014','2015','2017']
				}
			],
			yAxis : [
				 
				{
					type : 'value',
						max:1000,
					  splitNumber:5,
					  
					  axisLine:{
						  lineStyle:{
									color:'pink',//文字和线条颜色
									width:0,//y轴线条宽度
									}
							  } 
				}
			],
			series : [


				 
				{
					name:'你好',
					type:'line',//图表类型（pie,bar，line）
					
					itemStyle: {  
						normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
						   color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: 'green' // 0% 处的颜色
								}, {
									offset: 0.3, color: '#FFFFFF' // 100% 处的颜色
								}],
			globalCoord: true // 缺省为 false
		}, //背景渐变色
			
							lineStyle: {        // 系列级个性化折线样式  
								width: 3,  
								type: 'solid',  
								color: "green" //折线的颜色
							}  
						},  
						emphasis: {
							color: '#0180ff',   
							lineStyle: {        // 系列级个性化折线样式  
								width: 2,  
								type: 'dotted',  
								color: "0180ff" 
							}  
						}  
					},//线条样式
					symbolSize:5, //折线点的大小
					label: {//折线上面在数字
						normal: {
							show: true,
							position: 'top'
						}
					},
					areaStyle: {normal: {}},
					data:[888,333,888,333,888,333,888,333,888,333,888,333]
				},
				
				
				
			  
				{
					name:'邮件营销',
					type:'line',//图表类型（pie,bar，line）
					
					itemStyle: {  
						normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
						   color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: 'blue' // 0% 处的颜色
								}, {
									offset: 0.3, color: '#FFFFFF' // 100% 处的颜色
								}],
			globalCoord: true // 缺省为 false
		}, //背景渐变色    
							lineStyle: {        // 系列级个性化折线样式  
								width: 3,  
								type: 'solid',  
								color: "blue" //折线的颜色
							}  
						},  
						emphasis: {
							color: '#0180ff',   
							lineStyle: {        // 系列级个性化折线样式  
								width: 2,  
								type: 'dotted',  
								color: "0180ff" 
							}  
						}  
					},//线条样式
					symbolSize:5, //折线点的大小
					label: {//折线上面在数字
						normal: {
							show: true,
							position: 'top'
						}
					},
					areaStyle: {normal: {}},
					data:[222,666,222,666,222,666,222,666,222,666,222,666]
				},
				
				
				
				
				
				{
					name:'搜索引擎',
					type:'line',//图表类型（pie,bar，line）
					// stack: '总量',
					itemStyle: {  
						normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
							 color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: 'red' // 0% 处的颜色
								}, {
									offset: 0.5, color: '#FFFFFF' // 100% 处的颜色
								}],
			globalCoord: true // 缺省为 false
		}, //背景渐变色    
							lineStyle: { //控制折线在样式 
								width: 3,  
								type: 'solid',  
								color: "red" //折线的颜色
							}  
						},  
						emphasis: {
							color: '#0180ff',   
							lineStyle: {        // 系列级个性化折线样式  
								width: 2,  
								type: 'dotted',  
								color: "0180ff" 
							}  
						}  
					},//线条样式
					symbolSize:5, //折线点的大小
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					areaStyle: {normal: {}},
					data:[555,444,555,444,555,444,555,444,555,444,555,444]
				},
				   
				
			]
		})


var myCharta = echarts.init(document.getElementById('maina'));
		myCharta.setOption({
							 title: {
						text: '阶梯瀑布图',
						left:'center',
					},
							 color: ['#3398DB'],
					tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					yAxis : [
						{
							
							type : 'category',
							data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					xAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'直接访问',
							type:'bar',
							barWidth: '60%',
							data:[10, 52, 200, 334, 390, 330, 220]
						}
					]
						})
						}




}
</script>

<style scoped lang="scss">
	#hello{
		float: left;
		box-sizing: border-box;
		 width: 85%;
	.bg-purple{
	//background: red;
	height: 400px;
}
		.bg-purple-light{
			//background: red;
			// margin-left:100px;
			height: 400px;
}
	}
	// .yi{
	// 	float: left;
	// }
	// .er{
	// 	float: left;
	// }

</style>

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
				text: '贰贰贰贰贰贰贰贰贰贰贰贰',
				 // top:'20%',//标题margin
			},
			tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎'],
		 top:'5%'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis:  {
        type: 'value'
    },
    xAxis: {
        type: 'category',
        data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日']
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
			barWidth : '33px',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320,320, 302, 301, 334, 390, 330, 320]
        },
       
        {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [250, 212, 401, 554, 390, 330, 410,320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320,832, 901, 934, 1290, 1330, 1320,777]
        }
    ]
		})


var myCharta = echarts.init(document.getElementById('maina'));
		myCharta.setOption({
			 legend: {
			    data: ['直接访问', '邮件营销',],
				 top:'5%'
			},
							  xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
		 name: '直接访问',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
		color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 0.6, color: 'yellow' // 100% 处的颜色
    },{
        offset: 1, color: '#FFFFFF' // 100% 处的颜色
    }],
    globalCoord: false // 缺省为 false
},
        areaStyle: {}
    },
	{name: '邮件营销',
	        data: [1420, 432, 1601, 1234, 1390, 830, 920],
	        type: 'line',
			color: {
	    type: 'linear',
	    x: 0,
	    y: 0,
	    x2: 0,
	    y2: 1,
	    colorStops: [{
	        offset: 0, color: 'rgba(133,244,55,0.4)' // 0% 处的颜色
	    }, {
	        offset: 0.2, color: 'rgba(33,44,55,0.4)' // 100% 处的颜色
	    }],
	    globalCoord: false // 缺省为 false
	},
	        areaStyle: {}
	    }]
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

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
	import axios from 'axios'

	const CryptoJS = require('crypto-js');
	const key = CryptoJS.enc.Utf8.parse("5d85dadfe4b0e2e391c489de"); //十六位十六进制数作为密钥
	const iv = CryptoJS.enc.Utf8.parse(''); //十六位十六进制数作为密钥偏移量
	import echarts from 'echarts';
	export default {
		name: 'HelloWorld',
		props: {

		},
		data() {
			return {
				"shuju": [{
						"shijian": "2016-05-02",
						"name": "王1虎",
						"dizhi": "上海市普陀区金沙江路 1518 弄"
					},
					{
						"shijian": "2016-05-02",
						"name": "王2虎",
						"dizhi": "北京市普陀区金沙江路 1518 弄"
					},
					{
						"name": "郭天洋",
						"shijian": "2019-08-31",
						"dizhi": "江西省"
					}
				]
			}
		},
		created() {
			console.log(this.Encrypt("我的密码"))
		},
		methods: {
			Encrypt(word) { //加密
				let srcs = CryptoJS.enc.Utf8.parse(word);
				let encrypted = CryptoJS.AES.encrypt(srcs, key, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				});
				return encrypted.ciphertext.toString().toUpperCase();
			},
			tianjia() { //添加数据
				axios({
					method: "post",
					url: `http://localhost:9090/posts`,
					data: {
						shuju: this.shuju
					}
				}).then((data) => {
					console.log(data);
				})
			},

		},
		mounted() {


			var colors = ['red', 'blue', 'green'];
			var myChart = echarts.init(document.getElementById('main'));
			myChart.setOption({
				title: { //标题
					text: '壹壹壹壹壹壹壹壹壹',
					// top:'20%',//标题margin
				},
				color: colors,
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'bar'
					}
				},
				grid: {
					right: '10%',
					left: '20%',
					top: '20%',
				},
				toolbox: { //下载，数据试图，数据刷新，
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				legend: {
					top: '10%',
					data: ['蒸发量', '降水量', '平均温度']
				},
				xAxis: [{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
				}],
				yAxis: [{
						type: 'value',
						name: '蒸发量',
						min: 0,
						max: 250,
						position: 'right',
						axisLine: { //折线央视
							lineStyle: {
								color: colors[1],

							}
						},
						axisLabel: {
							formatter: '{value} ml'
						}
					},
					{
						type: 'value',
						name: '降水量',
						min: 0,
						max: 250,
						position: 'left',
						offset: 80,
						axisLine: {
							lineStyle: {
								color: 'red',
							}
						},
						axisLabel: {
							formatter: '{value} ml'
						}
					},
					{
						type: 'value',
						name: '温度',
						min: 0,
						max: 25,
						position: 'left',
						axisLine: {
							lineStyle: {
								color: colors[2]
							}
						},
						axisLabel: {
							formatter: '{value} °C'
						}
					}
				],
				series: [{
						name: '蒸发量',
						type: 'bar',
						// barWidth : '13px',
						data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
					},
					{
						name: '降水量',
						type: 'bar',
						yAxisIndex: 1,
						data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '平均温度',
						type: 'line',
						yAxisIndex: 2,
						data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
					}
				]
			})


			var myCharta = echarts.init(document.getElementById('maina'));
			myCharta.setOption({
				//  backgroundColor: '#2c343c',

				title: {
					text: 'Customized Pie',
					left: 'center',
					top: 20,
					textStyle: {
						color: '#ccc'
					}
				},

				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},

				visualMap: {
					show: false,
					min: 80,
					max: 600,
					inRange: {
						colorLightness: [0, 1]
					}
				},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: [{
							value: 335,
							name: '直接访问'
						},
						{
							value: 310,
							name: '邮件营销'
						},
						{
							value: 274,
							name: '联盟广告'
						},
						{
							value: 235,
							name: '视频广告'
						},
						{
							value: 400,
							name: '搜索引擎'
						}
					].sort(function(a, b) {
						return a.value - b.value;
					}),
					roseType: 'radius',
					label: {
						normal: {
							textStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
					itemStyle: {
						normal: {
							color: '#c23531',
							shadowBlur: 200,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},

					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function(idx) {
						return Math.random() * 200;
					}
				}]
			})
		}




	}
</script>

<style scoped lang="scss">
	#hello {
		float: left;
		box-sizing: border-box;
		width: 85%;

		.bg-purple {
			//background: red;
			height: 400px;
		}

		.bg-purple-light {
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

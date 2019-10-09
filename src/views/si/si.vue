<template>
	<div>
 <el-input-number v-model="banji"   label="请输入班级"></el-input-number>
		
		<el-select v-model="value" placeholder="请选择科目">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
			
		</el-select>
		<el-select v-model="valuea" placeholder="请选择地点">
			<el-option v-for="item in box" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select></br>
		<el-button icon="fa fa-plus" type="primary" disabled>最高薪资:{{topSalary}}元</el-button>
		<el-button icon="fa fa-plus" type="primary" disabled>平均薪资:{{avgSalary}}元</el-button>
		<el-button icon="fa fa-plus" type="primary" disabled>找到工作人数:{{total}}人</el-button>

		<!-- 表格主内容 -->
		<el-table :data="pageResult" border stripe size="mini" style="width: 100%" row-key="id">
			<el-table-column prop="studentName" header-align="left" align="left" show-overflow-tooltip label="人名" />
			<el-table-column prop="salary" header-align="left" align="left" show-overflow-tooltip label="薪资" width="150" />
			<el-table-column prop="company" header-align="left" align="left" show-overflow-tooltip label="公司" />
			<el-table-column prop="studentEducation" header-align="left" align="left" show-overflow-tooltip label="学历" />
			<el-table-column prop="welfare" header-align="left" align="left" show-overflow-tooltip label="福利" />
			<el-table-column prop="studentStatus" header-align="left" align="left" show-overflow-tooltip label="是否应届" />
		</el-table>
		<!-- 分页 -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5,10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				pageSize:10,
				pageNum:1,
	
				total: 10, //找到工作人数
				banji: "1901", //班级
				topSalary: "0", //最高薪资
				avgSalary: "0", //平均薪资
				pageResult: [], //学生所有数据
				options: [{
					value: 'SZ',
					label: '深圳'
				}, {
					value: 'HZ',
					label: '杭州'
				}, {
					value: 'BJ',
					label: '北京'
				}],
				value: 'SZ',
				
				box: [{
					value: 'HTML5',
					label: 'web前端'
				}, {
					value: 'JAVA',
					label: 'JAVA后台'
				}, {
					value: 'BJ',
					label: 'UI设计'
				}, {
					value: '云计算',
					label: '云计算'
				}],
				valuea:"HTML5"
			}
		},
		watch:{
			value(){
				if(this.value=="HZ"){
					this.banji="1801"
					this.valuea="云计算"
				}
				this.chaxun()
			},
			banji(){
					this.chaxun()
 			},
			pageNum(){
				this.chaxun()
				// console.log(this.pageNum,this.pageSize)
			},
			pageSize(){
				this.chaxun()
			},
		},
		created() { //页面刚进入，加载数据
			this.chaxun();
		},
		methods: { //事件处理

			chaxun() { //获取数据
				axios({
					method: "get",
					url: `http://jx.1000phone.net/teacher.php/Api/classJobData?class=${this.value}-${this.valuea}-JY-${this.banji}&tdsourcetag=s_pcqq_aiomsg`
				}).then((data) => {
					this.loading = false
					this.topSalary = data.data.topSalary //最高薪资
					this.total = data.data.student.length //找到工作人数
					this.avgSalary = data.data.avgSalary //找平均薪资
					let tiaoshu = this.pageNum*this.pageSize-this.pageSize
					// console.log(tiaoshu)
					this.pageResult = data.data.student.splice(tiaoshu,this.pageSize) //学生所有数据

				})
			},
			handleAdd() { //班级加
				clearTimeout(this.timer) //防抖
				this.timer = setTimeout(() => {
					this.banji++
					this.chaxun()
				}, 300)

			},
			handledel() { //班级减handleChange
				clearTimeout(this.timer) //防抖
				this.timer = setTimeout(() => {
					this.banji--
					this.chaxun()
				}, 300)
			},
			handleSizeChange(val){//条数
			this.pageSize = val
			},
			handleCurrentChange(val){//页数
				this.pageNum = val

			}

		}
	}
</script>

<style scoped>
	/deep/ .el-form-item__content {
		line-height: 33px;
		text-align: left;
	}

	.tips {
		display: inline-block;
		float: right;
	}
</style>

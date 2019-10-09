
<template>
	<div>
		<!-- p批量管理 -->
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<el-button plain disabled size="small">已选中{{xiangshu}}项</el-button>
					<el-button icon="el-icon-delete-solid" size="small" perms="delete" type="danger" :disabled="disabled" @click="shanchudel">批量删除</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 主内荣表格 -->
		<!-- <el-table ref="multipleTable"  size="mini" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: center;"
		 @selection-change="handleSelectionChange" @row-click="handleRowClick"> -->
		 <el-table :data="tableData" border stripe size="mini" ref="multipleTable" style="width: 100%;margin-top:10px" row-key="id" v-loading="loading"
		   @selection-change="handleSelectionChange" element-loading-text="'加载中'"  @row-click="handleRowClick">
			<el-table-column type="selection" />
			<el-table-column prop="name" label="姓名" />
			<el-table-column prop="leixing" label="消费方式" />
			<el-table-column prop="zhanbi" label="家庭开支占比" />
			<el-table-column prop="phone" label="联系方式" />
			<el-table-column prop="xinyong" label="每月消费" />
			<el-table-column prop="nowtiem" label="时间" width="200" />
			<el-table-column prop="word" label="编码" />
			<el-table-column label="是否满足" filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag :type="scope.row.chaobiao === '是' ? 'primary' : 'success'" disable-transitions>{{scope.row.chaobiao}}</el-tag>
				</template>
			</el-table-column>
			
			<el-table-column fixed="right" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click.stop.prevent="bianjiedit(scope.row)" type="primary" size="small">编辑</el-button>
					<el-button @click.stop.prevent="shanchu(scope.$index)" type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum"
		 :page-sizes="[5,10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
		</el-pagination>
	</div>
</template>
<script>
	import axios from 'axios'
	import Mock from 'mockjs'
	import crypto from 'crypto'//md5加密
	
	let aaa = "888888888888"
	Mock.mock('http://wu.com', {
		'shuju|56': [{
			"daima": "@guid", //B707C5Ff-6D95-CA74-4b(随机)
			'leixing|1': ['吃喝玩乐', '衣食住行', '女朋友', '上老下小'], //(随机)4中1
			"chengnuo|1": ["是", "否"], //(随机)2中1
			"chuzhi|1": ["false", "true"], //(随机)2中1
			"xinyong|500-2000": 1000, //(随机)500-1000的数字
			// "zhanbi": /^(100|[1-9]?\d(\.\d\d?\d?)?)%$|0$/, //(随机)500-1000的数字
			"zhanbi": /^([1-9]?\d(\.\d?)?)%$/, //(随机)500-1000的数字
			photo: "@image('100x50', '@hex', '#FFFFFF', 'png', '')", //(随机)图片（宽*高，背景颜色，字体颜色，格式，字）
			phone: /^1[385][1-9]\d{8}/, //正则校验手机号
			"renjun": "",
			"chaobiao|1": ["是", "否"], //(随机)2中1
			name: "@cname()", //(随机)姓名
			bianma: aaa, //  等于let aaa = "888888888888"
			fasheng: "@datetime(yyyy-hh)", //(随机)时间
			nowtiem: "@now()", //(随机)获得现在的时间
			word: "@word(3, 5)", //(随机)获得3-5个英文字母
			aaa: "cparagraph(10)", //(随机)获得10行（约120个）汉字
			"pingjun|500-1000": function() { //等于上文项目的值+1
				return this.xinyong + 1
			},
		}]
	})
	export default {
		data() {
			return {
				page: {
					pageSize: 10,
					pageNum: 1,
					total: 10,
				},
				loading:false,
				tableData: [],
				multipleSelection: [],
				xiangshu: 0,
				delarr: [],
				disabled: true,
			}
		},
		watch: {
			"multipleSelection": [
				function() {
					if (this.multipleSelection.length > 0) {
						this.disabled = false
						// this.$confirm("提示：请先选择要删除的文件？", "提示", {})
					} else {
						this.disabled = true

					}
				}
			],
		},
		created() {
			const md5 = crypto.createHash('md5')
				md5.update("panwei19921210")
				let md5password = md5.digest('hex')
				console.log(md5password)
					
			this.obtainpage()
		},
		methods: {
			filterTag(value, row) {
				return row.chaobiao === value;
			},
			filterTaga(value, row) {
				return row.chuzhi === value;
			},
			obtainpage() { //获取全部mock信息
				axios({
					method: "get",
					url: "http://wu.com"
				}).then(res => {
					this.page.total = res.data.shuju.length //找到工作人数
					let tiaoshu = this.page.pageNum * this.page.pageSize - this.page.pageSize
					this.tableData = res.data.shuju.splice(tiaoshu, this.page.pageSize)
				})
			},
			handleSizeChange(val) { //条数 
				this.page.pageSize = val
				this.obtainpage()
			},
			handleCurrentChange(val) { //页数
				this.page.pageNum = val
				this.obtainpage()
			},
			//编辑
			bianjiedit(){
				
			},
			//操作多选
			handleSelectionChange(val) {
				this.multipleSelection = val;
				this.xiangshu = val.length
			},
			// 点击行选中
			 handleRowClick(row, column, event){
			         this.$refs.multipleTable.toggleRowSelection(row);
			     },
				 shanchu(index){
					this.tableData.splice(index,1)
					this.page.total--
				 },
			// 批量删除
			shanchudel() {
				for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
					this.delarr.push(this.multipleSelection[i].name)
				}

				this.$confirm("确认提交吗？", "提示", {}).then(() => {
					this.loading=true
					console.log(this.delarr)
					if (this.delarr) {
						this.delarr = []
						this.loading=false
						this.$message({
							message: "删除成功",
							type: "success"
						});
						this.obtainpage()
					} else {
						this.$message({
							message: "删除失败, ",
							type: "error"
						});
					}
				});
			},
		},
	}
</script>
<style scoped>
</style>

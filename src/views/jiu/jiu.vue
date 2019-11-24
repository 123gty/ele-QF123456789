<template>
	<div class="fillcontain">
		<!-- 搜索栏 -->
		<el-form :inline="true" :model='search_data' ref="search_data" class="demo-form-inline search-form">
			<el-form-item label="">
				<el-input v-model="search_data.name" :size="fontsize" placeholder="用户名"></el-input>
			</el-form-item>

			<div class="btndel">
				<el-button icon="el-icon-warning" type="text" :size="fontsize">选中{{this.xiangshu}}项</el-button>
				<el-button type="text" :size="fontsize" class="el-icon-delete" @click='onBatchDelMoney()' :disabled="isFlag">批量删除</el-button>
				<el-form-item class="btnRight">
					<el-button type="primary" :size="fontsize" class="el-icon-edit" icon="view" @click='onAddMoney()'>添加</el-button>
				</el-form-item>
			</div>
		</el-form>
		<!-- 主内容 -->
		<div class="table_container">
			<el-table :size="fontsize" v-loading="loading" :data="tableData" style="width: 100%" align='center'
			 @selection-change="selectAll">
				<el-table-column v-if="idFlag" prop="id" label="id" align='center' width="180">
				</el-table-column>
				<el-table-column type="selection" align='center' width="60">
				</el-table-column>
				<el-table-column prop="username" label="用户姓名" align='center' width="80">
				</el-table-column>
				<el-table-column prop="address" label="籍贯" align='center' width="280">
				</el-table-column>
				<el-table-column prop="createTime" label="投资时间" align='center' sortable width="200">
					<template slot-scope="scope">
						<el-icon name="time"></el-icon>
						<span style="margin-left: 10px">{{ scope.row.createTime }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="incomePayType" label="收支类型" align='center' width="130" :formatter="formatterType" :filters="fields.incomePayType.filter.list"
				 :filter-method="filterType">
				</el-table-column>
				<el-table-column prop="income" label="收入" align='center' width="130" sortable>
					<template slot-scope="scope">
						<span style="color:#00d053">+ {{ scope.row.income }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="pay" label="支出" align='center' width="130" sortable>
					<template slot-scope="scope">
						<span style="color:#f56767">{{ scope.row.pay }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="accoutCash" label="账户现金" align='center'  sortable>
					<template slot-scope="scope">
						<span style="color:#4db3ff">{{ scope.row.accoutCash }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="operation" align='center' label="操作" width="220">
					<template slot-scope='scope'>
						<el-button type="warning" icon='edit' class="el-icon-edit" size="mini" @click='onEditMoney(scope.row)'>编辑</el-button>
						<el-button type="danger" icon='delete' class="el-icon-delete"  size="mini" @click='onDeleteMoney(scope.row,scope.$index)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="incomePayData.page"
			 :page-sizes="[5,10,20,30,50]" :page-size="incomePayData.limit" layout="total, sizes, prev, pager, next, jumper"
			 :total="pageTotal">
			</el-pagination>
			<!-- 新增编辑 -->
			<!-- 	 <el-dialog 
			    :visible.sync="isVisible"
			    :title="addFundDialog.title" 
			    :close-on-click-modal='false'
			    :close-on-press-escape='false'
			    :modal-append-to-body="false"
			    @close="closeDialog">
			    <div class="form">
			        <el-form 
			            ref="form" 
			            :model="form"
			            :rules="form_rules"
			            :label-width="dialog.formLabelWidth" 
			            style="margin:10px;width:auto;">
			            <el-form-item label="收支类型:" >
			                <el-select v-model="form.incomePayType" placeholder="收支类型">
			                    <el-option
			                        v-for="item in payType"
			                        :key="item.value"
			                        :label="item.label"
			                        :value="item.value">
			                    </el-option>
			                </el-select>
			            </el-form-item>
			
			            <el-form-item prop='username' label="用户名:">
			                <el-input type="text" v-model="form.username"></el-input>
			            </el-form-item>
			            
			             <el-form-item  prop='address' label="籍贯:">
			                <el-cascader
			                    placeholder="请选择地区"
			                    v-model="form.address"
			                    :props="{ expandTrigger: 'hover'}"
			                    :options="areaData"
			                    @change="handleChange">
			                </el-cascader>
			            </el-form-item>
			
			            <el-form-item prop='income'  label="收入:">
			                <el-input v-model.number="form.income"></el-input>
			            </el-form-item>
			
			            <el-form-item prop='pay' label="支出:">
			                <el-input v-model.number="form.pay"></el-input>
			            </el-form-item>
			
			            <el-form-item prop='accoutCash' label="账户现金:">
			                <el-input v-model.number="form.accoutCash"></el-input>
			            </el-form-item>
			
			                <el-form-item label="备注:">
			                <el-input type="textarea" v-model="form.remarks"></el-input>
			            </el-form-item>
			
			            <el-form-item  class="text_right">
			                <el-button @click="isVisible = false">取 消</el-button>
			                <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
			            </el-form-item>
			
			        </el-form>
			    </div>
			</el-dialog> -->
		</div>
	</div>
</template>

<script>
	import {
		getMoneyIncomePay,
		removeMoney,
		batchremoveMoney
	} from "@/api/money";

	export default {
		data() {

			return {
				fontsize: "small",
				search_data: {
					startTime: '',
					endTime: '',
					name: ''
				},
				isFlag: false, //批量删除显示
				tableData: [], //主内容
				tableHeight: 0,
				loading: false,
				idFlag: false,
				isShow: false, // 是否显示资金modal,默认为falsepagination
				editid: '',
				rowIds: [],
				sortnum: 0,
				format_type_list: {
					0: '提现',
					1: '提现手续费',
					2: '提现锁定',
					3: '理财服务退出',
					4: '购买宜定盈',
					5: '充值',
					6: '优惠券',
					7: '充值礼券',
					8: '转账'
				},
				addFundDialog: {
					show: false,
					dialogRow: {}
				},
				incomePayData: {
					page: 1,
					limit: 10,
					name: ''
				},
				pageTotal: 0,
				// 用于列表筛选
				fields: {
					incomePayType: {
						filter: {
							list: [{
								text: '提现',
								value: 0
							}, {
								text: '提现手续费',
								value: 1
							}, {
								text: '提现锁定',
								value: 2
							}, {
								text: '理财服务退出',
								value: 3
							}, {
								text: '购买宜定盈',
								value: 4
							}, {
								text: '充值',
								value: 5
							}, {
								text: '优惠券',
								value: 6
							}, {
								text: '充值礼券',
								value: 7
							}, {
								text: '转账',
								value: 8
							}],
							multiple: true
						}
					},
				},
				xiangshu: "0"

			}
		},
		created() {
			this.getMoneyList()
		},
		watch: {
			"search_data.name": [
				function() {
					clearTimeout(this.timera);
					this.timera = setTimeout(() => {
						this.getMoneyList()
					}, 300)
				}
			],
		},
		methods: {
			// setTableHeight(){
			//    this.$nextTick(() => {
			//       this.tableHeight =  document.body.clientHeight - 300
			//    })
			// },
			// 获取资金列表数据
			getMoneyList() {
				const para = Object.assign({}, this.incomePayData, this.search_data);
				getMoneyIncomePay(para).then(res => {
					this.loading = false;
					this.pageTotal = res.data.total
					this.tableData = res.data.moneyList
				})
			},
			// 添加
			onAddMoney() {},
			// 上下分页
			handleCurrentChange(val) {
				this.incomePayData.page = val;
				this.getMoneyList()
			},
			// 每页显示多少条console
			handleSizeChange(val) {
				this.incomePayData.limit = val;
				this.getMoneyList()
			},

			/**
			 * 格式化状态
			 */
			formatterType(item) {
				const type = parseInt(item.incomePayType);
				return this.format_type_list[type];
			},
			filterType(value, item) {
				const type = parseInt(item.incomePayType);
				return this.format_type_list[value] == this.format_type_list[type];
			},
			// 编辑操作方法
			onEditMoney(row) {
				this.addFundDialog.dialogRow = { ...row
				};
				this.showAddFundDialog();
			},
			// 删除数据
			onDeleteMoney(row) {
				this.$confirm('确认删除该记录吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						const para = {
							id: row.id
						}
						removeMoney(para).then(res => {
							this.$message({
								message: '删除成功',
								type: 'success'
							})
							this.getMoneyList()
						})
					})
					.catch(() => {})
			},
			onBatchDelMoney() {
				this.$confirm('确认批量删除记录吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						const ids = this.rowIds.toString()
						batchremoveMoney(ids).then(res => {
							this.$message({
								message: '批量删除成功',
								type: 'success'
							})
							this.getMoneyList()
						})
					})
					.catch(() => {})
			},

			selectAll(val) {
				val.forEach((item) => {
					this.rowIds.push(item.id);
				});
				this.setSearchBtn(val);
			},
			setSearchBtn(val) {
				this.xiangshu = val.length
				if (val.length > 0) {
					this.isFlag = false;
				} else {
					this.isFlag = true;
				}
			}
		},
	}
</script>

<style>
	.fillcontain {
		padding: 20px;
		overflow: auto;
	}

	.search_container {
		margin-bottom: 20px;
	}

	.btnRight {
		text-align: center;
		float: right;
		margin-right: 40px !important;
	}

	.searchArea {
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		padding: 18px 18px 0 0;
	}

	.btndel {
		background: rgba(230, 247, 255, 0.6);
		margin-bottom: 10px;
		line-height: 40px;
		border: #bae7ff 1px solid;
	}
</style>

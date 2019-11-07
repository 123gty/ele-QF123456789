<template>
	<div>
		<el-row>
			<div>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">
						<el-button style="float: right;" type="primary" :arr="permBtn" perms="adddata" :size="fontsize"  @click="addMetadata" >新建</el-button>
					</div>
				</el-col>
			</div>
			<!-- 所有数据库 -->
			<div style="margin-top:50px;">
				<el-col :span="4">
					<div class="grid-content bg-purple">
						<el-tree :default-expand-all="true" :data="shujuku" @node-click="handleNodeClick"></el-tree>
					</div>
				</el-col>
				<!-- 表格主内容 -->
				<el-col :span="20" style="padding-left:20px">
					<div class="grid-content bg-purple-light">
						<el-table :data="tableData" stripe style="width: 100%" :size="fontsize">
							<el-table-column :show-overflow-tooltip="true" prop="date" label="表名称" width="180">
								<template slot-scope="scope">
									<el-button type="text" @click="details(scope.row.id)">{{scope.row.date}}</el-button>
								</template>
							</el-table-column>
							<el-table-column :show-overflow-tooltip="true" prop="name" label="备注" />
							<el-table-column :show-overflow-tooltip="true" prop="name" label="数据分类" />
							<el-table-column :show-overflow-tooltip="true" prop="name" label="数据目录" />
							<el-table-column :show-overflow-tooltip="true" prop="address" label="更新时间" width="250" />
						</el-table>
					</div>
					<!--分页栏-->
					<div class="pagination" style="padding:10px;">
						<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="refreshPageRequest" @size-change="handleSizeChange"
						 :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="totalSize">
						</el-pagination>
					</div>
				</el-col>
			</div>
		</el-row>
		<!--新增（编辑）界面-->
		<el-dialog :title="dialogTitle" width="70%" :visible.sync="addDialog" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" :size="fontsize">
				<div class="dir">
					<el-form-item label="数据分类:" prop="fenlei">
						<el-button type="text">主题库</el-button>
					</el-form-item>
					<el-form-item label="数据目录:" prop="mulu">
						<el-button type="text">数据资料</el-button>
					</el-form-item>
					<el-form-item label="所属数据库:" prop="suoshu">
						<el-select v-model="addForm.suoshu" @change="tagValueChange(addshuju)" multiple>
							<el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="可视化建表" name="yiyi">
						<el-form-item label="表名称：">
							<el-input maxlength="255" style="width:250px" v-model="addForm.mulu" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="表注释：">
							<el-input maxlength="255" style="width:250px" v-model="addForm.mulu"></el-input>
						</el-form-item>
						<el-form-item label="初步信息：">
							<br />
							<el-table :data="SQL" stripe style="width: 100%" :size="fontsize">
								<el-table-column :show-overflow-tooltip="true" prop="mingcheng" label="名称">
									<template slot-scope="scope">
										<el-input maxlength="255" placeholder="请输入" v-model="SQL[scope.$index].mingcheng" auto-complete="off"></el-input>
										<!-- <el-select v-model="SQL[scope.$index].mingcheng" @change="tagValueChange(scope.row)" multiple> -->
											<!-- <el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" :value="item.id"></el-option> -->
										<!-- </el-select> -->
									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" prop="leixing" label="类型">
									<template slot-scope="scope">
										<el-select v-model="SQL[scope.$index].leixing" @change="tagValueChange(scope.row)" multiple>
											<el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" prop="changdu" label="长度">
									<template slot-scope="scope">
										<!-- <el-select v-model="SQL[scope.$index].changdu" @change="tagValueChange(scope.row)" multiple>
											<el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select> -->
										<el-input maxlength="255" placeholder="请输入" v-model="SQL[scope.$index].changdu" auto-complete="off"></el-input>

									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" prop="jingdu" label="精度">
									<template slot-scope="scope">
										<el-select v-model="SQL[scope.$index].jingdu" @change="tagValueChange(scope.row)" multiple>
											<el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" prop="kongzhi" label="运行空值">
									<template slot-scope="scope">
										<el-select v-model="SQL[scope.$index].kongzhi" @change="tagValueChange(scope.row)">
											<el-option label="是" :value="true"></el-option>
											<el-option label="否" :value="false"></el-option>
											<!-- <el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" ::value="item.id"></el-option> -->
										</el-select>
									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" prop="zhujian" label="是否主键">
									<template slot-scope="scope">
										<el-select v-model="SQL[scope.$index].zhujian" @change="tagValueChange(scope.row)">
											<el-option label="是" :value="true"></el-option>
											<el-option label="否" :value="false"></el-option>
											<!-- <el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" ::value="item.id"></el-option> :value-->
										</el-select>
									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" prop="zengzhang" label="是否自增长">
									<template slot-scope="scope">
										<el-select v-model="SQL[scope.$index].zengzhang" @change="tagValueChange(scope.row)">
											<el-option label="是" :value="true"></el-option>
											<el-option label="否" :value="false"></el-option>
											<!-- <el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" :value="item.id"></el-option> -->
										</el-select>
									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" prop="moren" label="默认值">
									<template slot-scope="scope">
										<!-- <el-select v-model="SQL[scope.$index].moren" @change="tagValueChange(scope.row)" multiple>
											<el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select> -->
										<el-input maxlength="255" placeholder="请输入" v-model="SQL[scope.$index].moren" auto-complete="off"></el-input>

									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" prop="beizhu" label="备注">
									<template slot-scope="scope">
										<!-- <el-select v-model="SQL[scope.$index].beizhu" @change="tagValueChange(scope.row)" multiple>
											<el-option v-for="item in upStreamtagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select> -->
										<el-input maxlength="255" placeholder="请输入" v-model="SQL[scope.$index].beizhu" auto-complete="off"></el-input>

									</template>
								</el-table-column>
								<el-table-column :show-overflow-tooltip="true" fixed="right" header-align="left" align="left" width="100"
								 :label="'操作'">
									<template slot-scope="scope">
										<el-button :size="fontsize" icon="el-icon-delete" perms="delete" :arr="permBtn" @click="handleDelete(scope.$index)"
										 type="text" label="删除">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<hr />
							<el-button type="text" class="el-icon-circle-plus" :size="fontsize" @click="addBaseline">添加基线</el-button>

						</el-form-item>
					</el-tab-pane>

					<el-tab-pane label="SQL建表" name="erer">SQL建表1</el-tab-pane>
				</el-tabs>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button :size="fontsize" @click.native="addDialog = false">取消</el-button>
				<el-button :size="fontsize" type="primary" @click.native="submitForm" edit :loading="btnLoading">提交</el-button>
			</div>
		</el-dialog>

		<!-- 详情 -->
		<el-dialog :title="detailsTitle" width="70%" :visible.sync="detailsDialog" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" style="width:100%;" :rules="addFormRules" ref="addForm" :size="fontsize">
				<el-form-item label="" prop="hash_on">
					<el-tabs v-model="topActiveName" @tab-click="handleClick">
						<el-tab-pane label="基本信息" name="one">
							<el-table :data="toptableData" style="width: 100%" :size="fontsize">
								<el-table-column :show-overflow-tooltip="true" prop="date" label="表名" />
								<el-table-column :show-overflow-tooltip="true" prop="name" label="备注" />
								<el-table-column :show-overflow-tooltip="true" prop="address" label="分类" />
								<el-table-column :show-overflow-tooltip="true" prop="address" label="创建时间" />
								<el-table-column :show-overflow-tooltip="true" prop="address" label="更新时间" />
							</el-table>
						</el-tab-pane>
					</el-tabs>
				</el-form-item>
				<el-form-item label="" prop="hash_on">
					<el-tabs v-model="bottomActiveName" @tab-click="handleClick">
						<el-tab-pane label="初步信息" name="first">
							<el-table :data="bottomtableData" style="width: 100%" :size="fontsize">
								<el-table-column :show-overflow-tooltip="true" prop="date" label="初步名" />
								<el-table-column :show-overflow-tooltip="true" prop="name" label="类型" />
								<el-table-column :show-overflow-tooltip="true" prop="address" label="长度" />
								<el-table-column :show-overflow-tooltip="true" prop="date" label="精度" />
								<el-table-column :show-overflow-tooltip="true" prop="name" label="空值？" />
								<el-table-column :show-overflow-tooltip="true" prop="address" label="主键？" />
								<el-table-column :show-overflow-tooltip="true" prop="date" label="默认值" />
								<el-table-column :show-overflow-tooltip="true" prop="name" label="备注" />
								<el-table-column :show-overflow-tooltip="true" prop="address" label="创建时间" />
							</el-table>
						</el-tab-pane>
					</el-tabs>
				</el-form-item>
			</el-form>
			<!--分页栏-->
			<div class="pagination" style="padding:10px;">
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="refpageNum" @size-change="handlePageSize"
				 :current-page="detailsPageRequest.pageNum" :page-size="detailsPageRequest.pageSize" :total="detailstotalSize">
				</el-pagination>
			</div>

		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fontsize: "small",
				permBtn: [],
				shujuku: [{
					label: '所有',
					children: [{
							label: '数据库名称1'
						},
						{
							label: '数据库名称2'
						},
						{
							label: '数据库名称3'
						}
					]
				}],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				pageRequest: {
					pageNum: 1,
					pageSize: 10,
				},
				totalSize: 0,
				addForm: {
					fenlei: "4124234",
					mulu: "4124234",
					suoshu: "4124234",
				},
				SQL: [{
					mingcheng: "",
					leixing: "",
					changdu: "",
					jingdu: "",
					kongzhi: "",
					zhujian: "",
					zengzhang: "",
					moren: "",
					beizhu: "",
				}],
				dialogTitle: "基本信息",
				addDialog: false,
				addFormRules: {
					fenlei: [{
						required: false,
						pattern: /^[^\s]*$/,
						message: '请输入负载描述(不能输入空格)',
						trigger: 'blur'
					}], // 描述
				},
				upStreamtagList: [],
				activeName: 'yiyi',
				btnLoading: false,
				detailsTitle: "表****详情",
				detailsDialog: false, //详情显示
				topActiveName: "one",
				toptableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				bottomActiveName: "first",
				bottomtableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				detailsPageRequest: {
					pageNum: 1,
					pageSize: 10,
				},
				detailstotalSize: 0,

			}
		},
		created() {
			this.fetchData()
			this.permBtn = this.$route.meta.btn
		},
		methods: {
			fetchData() {
				console.log("开始获取")
			},
			// 新建
			addMetadata() {
				this.addDialog = true
				console.log("新建元数据")
			},
			// 新建
			handleNodeClick(data) {
				console.log(data)
			},

			// 翻页
			refreshPageRequest(page) {
				this.loading = true
				this.pageRequest.pageNum = page
				this.fetchData()
			},
			handleSizeChange(val) {
				this.loading = true
				this.pageRequest.pageSize = val
				this.fetchData()
			},
			// 详情
			details(id) {
				this.detailsDialog = true
			},
			// SQl选择
			handleClick(tab, event) {
				console.log(tab, event);
			},
			// 选中之后
			tagValueChange(val) {
				console.log(val, 'valvalval')
			},
			// 新增删除
			handleDelete(index) {
				this.SQL.splice(index, 1)
			},
			// 添加基线
			addBaseline() {
				var duixiang = {
					mingcheng: "",
					leixing: "",
					changdu: "",
					jingdu: "",
					kongzhi: "",
					zhujian: "",
					zengzhang: "",
					moren: "",
					beizhu: ""
				}
				this.SQL.push(duixiang)
			},
			// 新增提交
			submitForm() {

			},
			//详情翻页
			refpageNum(page) {
				this.loading = true
				this.pageRequest.pageNum = page
				this.fetchData()
			},
			handlePageSize(val) {
				this.loading = true
				this.pageRequest.pageSize = val
				this.fetchData()
			},
		}
	}
</script>


<style scoped>
	.el-select,.el-input{
		width: 100px;
	}
	/* .el-input {
			width: 100px;
					} */
	.dir {
		display: flex;
		flex-direction: initial;
	}

	.el-pagination {
		text-align: center;
	}
</style>

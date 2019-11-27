<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar">
      <el-form :inline="true"
               :size="size">
        <el-form-item>
          <el-input v-model="pageRequest.name"
                    placeholder="角色名" @input="fetchData"></el-input>
        </el-form-item>
        <el-form-item>
          <!--base-button icon="fa fa-search"
                       label="查询"
                       type="primary"
                       @click="fetchData" /-->
        </el-form-item>
        <br />
        <el-form-item>
          <el-button icon="el-icon-plus"
                       type="primary"
                       @click="handleAdd" >新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格树内容栏-->
    <el-table :data="pageResult"
              border
              stripe
              size="mini"
              style="width: 100%;"
              row-key="id"
              v-loading="loading"
              element-loading-text="加载中">
      <el-table-column prop="name"
                       header-align="left"
                       align="left"
                       label="角色名称">
      </el-table-column>
      <el-table-column prop="priority"
                       header-align="left"
                       align="left"
                       label="优先级">
      </el-table-column>
      <el-table-column prop="createTime"
                       header-align="left"
                       align="left"
                       label="创建时间"
                       width="150">
      </el-table-column>
      <el-table-column prop="remark"
                       header-align="left"
                       align="left"
                       label="角色描述"
                       width="240"
                       show-overflow-tooltip
                       >
      </el-table-column>
      <el-table-column fixed="right"
                       header-align="left"
                       align="left"
                       width="300"
                       :label="'操作'">
        <template slot-scope="scope">
          <el-button icon="fa fa-edit"
                       type="text"
                       @click="handleEdit(scope.row)" >编辑</el-button>
          <el-button icon="fa fa-plus-square"
                       type="text"
                       @click="handleAuth(scope.row.id)" >角色授权</el-button>
          <el-button icon="fa fa-trash"
                       type="text"
                       @click="handleDele(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="pagination"
         style="padding:10px;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper"
                     @current-change="refreshPageRequest"
                     @size-change="handleSizeChange"
                     :current-page="pageRequest.pageNum"
                     :page-size="pageRequest.pageSize"
                     :total="totalSize">
      </el-pagination>
    </div>
    <!--新增界面-->
    <el-dialog title="新增"
               width="40%"
               :visible.sync="addDialog"
               :close-on-click-modal="false">
      <el-form :model="addForm"
               label-width="80px"
               :rules="addFormRules"
               ref="addForm"
               :size="size">
        <el-form-item label="角色名"
                      prop="userName">
          <el-input v-model="addForm.userName"
		  maxlength="25"
                    auto-complete="off"></el-input>
        </el-form-item>
      <!-- {
 "userName":"张三",
 "passWord":"李四"
} -->
        <el-form-item label="密码"  prop="passWord">
                    <el-input v-model="addForm.passWord" auto-complete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button :size="size"
                   @click.native="addDialog = false">取消</el-button>
        <el-button :size="size"
                   type="primary"
                   @click.native="submitAdd"
                   edit>提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑"
               width="600px"
               :visible.sync="editDialog"
               :close-on-click-modal="false">
      <el-form :model="editForm"
               label-width="80px"
               ref="editForm"
               :size="size">
        <el-form-item label="角色名"
                      prop="name">
          <el-input v-model="editForm.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="editForm.type !== 2"
                      label="优先级"
                      prop="priority">
          <el-input-number v-model="editForm.priority"
                           controls-position="left"
                           :min="0"
                           label="优先级"></el-input-number>
        </el-form-item>
        <el-form-item label="备注 "
                      prop="remark">

                    <el-input v-model="editForm.remark" auto-complete="off" type="textarea" maxlength="255" show-word-limit></el-input>

        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button :size="size"
                   @click.native="editDialog = false">取消</el-button>
        <el-button :size="size"
                   type="primary"
                   @click.native="submitEdit">提交</el-button>
      </div>
    </el-dialog>
    <!--角色菜单授权-->
    <el-dialog title="角色菜单授权"
               width="600px"
               highlight-current
               :visible.sync="roleDia"
               :close-on-click-modal="false">
      <div class="dia-head">
        <span>角色继承：</span>
        <el-radio-group v-model="radioChecked"
                        @change="handleBox">
          <el-radio v-for="(item, index) in pageResult"
                    :label="item.id"
                    :key="index">
            {{item.name}}
          </el-radio>
        </el-radio-group>
      </div>
      <el-tree :data="menuData"
               show-checkbox
               check-strictly
               default-expand-all
               node-key="id"
               :props="defaultProps"
               ref="menuTree"
               @check="handleNode"
               @check-change="handleMenuCheckChange"
               :render-content="renderContent"
               :expand-on-click-node="false">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button :size="size"
                   @click.native="roleDia = false">取消</el-button>
        <el-button :size="size"
                   type="primary"
                   @click.native="submitRole">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import BaseTable from "@/views/Core/BaseTable";
  // import BaseButton from "@/views/Core/BaseButton";
  // import TableTreeColumn from "@/views/Core/TableTreeColumn";
  import crypto from 'crypto'//md5加密
  // import {targetNameRule} from "@/utils/validate.js";
  import { format } from "@/utils/datetime";
  import { arrayToJson } from '@/utils/menuTree'
  import { allRoles, add, edit, dele, findTree, getRole, checkRole } from "@/api/role";
  export default {
    // components: {
    //   BaseButton,
    //   TableTreeColumn
    // },
    data () {
      return {
        size: "small",
        roleDia: false,
        loading: true,
        pageRequest: { pageNum: 1, pageSize: 10, name: '' },
        totalSize: 0,
        pageResult: [{},{}],
        addDialog: false, // 新增界面是否显示
        editDialog: false, // 编辑界面是否显示
        editLoading: false,
        addLoading: false,
        addFormRules: {
          userName: [{
            required: true,
            message: "请输入中文用户名（25字内，不能含空格）",
           pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,24}$/,
            trigger: "blur"
          }],
          passWord: [{
            required: true,
            message: "请输入包含 数字,英文,字符中的两种以上，长度6-20的密码",
           // pattern: /^[^\s]*$/,
		   pattern:/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/,
            trigger: "blur"
          }],
        },
        // 新增编辑界面数据
        addForm: {
          userName: "",
          passWord: "",
         
        },
        editForm: {
          userName: "",
          passWord: "",
         
        },
        menuData: [],
        defaultProps: {
          children: "children",
          label: "name",
        },
        filterMenu: [],
        deleteList: [],
        insertList: [],
        rowCode: '',
        permBtn: [],
        radioChecked: '',
        isClick: false,
        checkList: []
      };
    },
    created () {
      console.log(this.$route.meta)
      this.permBtn = this.$route.meta.btn
      this.fetchData();
    },
    watch: {
      'pageRequest.name' (value) {
        if (!value) {
          this.fetchData();
        }
      }
    },
    methods: {
      // 加载所有数据
      fetchData () {
        allRoles(this.pageRequest).then(res => {
            this.loading = false
            if (res.code === '200') {
               if (res.body.list.length == 0 && this.pageRequest.pageNum > 1) {
                    this.pageRequest.pageNum = 1
                    this.fetchData()
                } else {
                    this.pageResult = res.body.list
                    this.totalSize = res.body.total
                }
            } else {
                this.pageResult = []
            }
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      },
      getTree (id) {
        findTree().then(res => {
          if (res.body && res.body.length) {
            let dataAll = JSON.parse(JSON.stringify(res.body))
            this.filterMenu = JSON.parse(JSON.stringify(res.body))
            this.menuData = arrayToJson(dataAll, 1);
            // _self.addTree = arrayToJson(dataMenu, 0);
            // _self.loading = false;
          }
        })
        checkRole(id).then(res => {
          if (res.body) {
            console.log(this.$refs.menuTree)
            this.checkList = JSON.parse(JSON.stringify(res.body))
            this.$nextTick(() => {
              this.$refs.menuTree.setCheckedKeys(res.body)
            })
          }
        });
      },
      // 显示新增界面
      handleAdd () {
        this.addDialog = true
      },
      // 显示编辑界面
      handleEdit (row) {
        this.editDialog = true
        let { name, remark, id, priority } = row
        this.editForm = { name, remark, id, priority }
        this.radioChecked = ''
      },
      // 显示授权菜单
      handleAuth (id) {
        this.roleDia = true
        this.$nextTick(() => {
          this.$refs.menuTree.setCheckedKeys([])
        })
        this.rowCode = id
        this.radioChecked = ''
        this.getTree(id)
      },
      // 新增
      submitAdd () {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.addLoading = true;
             
			  	 const md5 = crypto.createHash('md5')
			  		md5.update(this.addForm.passWord)
			  		let md5password = md5.digest('hex')
			  					console.log(md5password)
			  
			 
			   let params = {
				userName:this.addForm.userName,
				passWord:md5password
			   }
              this.loading = true
              add(params).then(res => {
                this.addLoading = false;
                if (res.code == 200) {
                  this.$message.success("操作成功"+res.message);
                  this.addDialog = false;
                  this.$refs["addForm"].resetFields();
                } else{
                  this.$message.error("操作失败" + res.message);
                }
                this.fetchData()
              });
            }).catch((err) => {console.log(err+"取消成功")});
          }
        });
      },
      // 编辑
      submitEdit () {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true
          this.editLoading = true;
          let params = this.editForm;
          edit(params).then(res => {
            this.editLoading = false;
            if (res.code == 201) {
              this.$message({ message: "操作成功", type: "success" });
              this.editDialog = false;
              this.$refs["editForm"].resetFields();
            } else {
              this.$message({
                message: "操作失败, " + res.message,
                type: "error"
              });
            }
            this.fetchData()
          }).catch(err => {
            console.log(err)
          });
        }).catch((err) => {console.log(err+"取消成功")});
      },
      // 删除
      handleDele (id) {
        this.$confirm("确认删除吗？", "提示", {}).then(() => {
          dele(id).then(res => {
            this.editLoading = false;
            if (res.code == 204) {
              this.$message({ message: "删除成功", type: "success" });
            } else {
              this.$message({
                message: "删除失败, " + res.message,
                type: "error"
              });
            }
            this.fetchData()
          }).catch(err => {
            console.log(err)
          }
          );
        }).catch((err) => {console.log(err+"取消成功")});
      },
      // 分页
      refreshPageRequest (page) {
        this.loading = true
        this.pageRequest.pageNum = page
        this.fetchData()
      },
      handleSizeChange (val) {
        this.loading = true
        this.pageRequest.pageSize = val
        this.fetchData()
      },
      handleNode () {
        this.isClick = true
      },
      // 树节点选择监听
      handleMenuCheckChange (data, check, subCheck) {
        const _self = this
        setTimeout(() => {
          if (_self.isClick) {
            if (check) {
              // 节点选中时同步选中父节点
              let parentId = data.parentId
              _self.$refs.menuTree.setChecked(parentId, true, false)
            } else {
              // 节点取消选中时同步取消选中子节点
              if (data.children != null) {
                data.children.forEach(element => {
                  _self.$refs.menuTree.setChecked(element.id, false, false)
                });
              }
            }
          }
        }, 0);
      },
      // 提交授予角色
      submitRole () {
        this.roleDia = false
        let selected = this.$refs.menuTree.getCheckedKeys();
        this.insertList = selected.filter(i => !this.checkList.includes(i));
        this.deleteList = this.checkList.filter(i => !selected.includes(i));
        let data = {
          insertList: this.insertList,
          deleteList: this.deleteList
        }
        getRole(this.rowCode, data).then(res => {
          this.fetchData()
          this.resetParams()
          if (res.code == 201) {
            this.$message({ message: `操作成功`, type: "success" });
          } else {
            this.$message({
              message: "操作失败, " + res.message,
              type: "error"
            });
          }
        }).catch(err => {
          this.resetParams()
          this.$message({
            message: "操作失败, " + res.message,
            type: "error"
          });
        })
      },
      resetParams () {
        this.insertList = []
        this.deleteList = []
      },
      renderContent (h, { node, data, store }) {
        return (
          <div class="column-container">
            <span style="text-algin:center;margin-right:80px">{data.name}</span>
            <span style="text-algin:center;margin-right:80px;">
              <el-tag
                type={data.type === 0 ? "" : data.type === 1 ? "success" : "info"}
                size="mini"
              >
                {data.type === 0 ? "菜单" : data.type === 1 ? "按钮" : "其他"}
              </el-tag>
            </span>
          </div>
        );
      },
      handleBox (id) {
        this.roleDia = true
        checkRole(id).then(res => {
          if (res.body) {
            this.$refs.menuTree.setCheckedKeys(res.body)
          }
        });
      }
    },
    mounted () { }
  };
</script>
<style scoped lang="scss">
	.page-container{
			padding: 30px;
	}
  .menu-container {
    margin-top: 10px;
  }
  .menu-header {
    padding-left: 8px;
    padding-bottom: 5px;
    text-align: left;
    font-size: 16px;
    color: rgb(20, 89, 121);
  }
   .el-form-item__content {
    line-height: 33px;
    text-align: left;
  }
   .el-tree-node__content {
    height: 35px;
  }
   .column-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .dia-head {
    text-align: left;
    position: relative;
    padding-left: 80px;
    margin-bottom: 15px;
    > span {
      position: absolute;
      left: 0;
      margin-top: 7px;
    }
    .el-radio {
      width: 100px;
      margin-top: 10px;
    }
  }
</style>

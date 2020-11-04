<template>
  <div class="container">
    <div class="snt-table-right-col">
      <div class="task_management_pages button-box">
        <div class="header-box">
          <div class="header-left">
            <!--搜索-->
            <div class="search-box">
              <el-input
                placeholder="请输入访客点名称"
                prefix-icon="el-icon-search"
                clearable
                @clear="getList" 
                v-model="form.pointName"
                @input="searchTableData(form.pointName)"
              ></el-input>
              <!-- <el-button class="search-button" type="primary"  @click="getList">查询</el-button> -->
              <KtButton type="primary" class="search-button" @click="getList" label='查询' perms='Security.Visitor.Point.Search'/>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
              <!-- <el-button type="primary" plain @click="handleAdd">新增</el-button> -->
              <KtButton type="primary" plain @click="handleAdd" label='新增' perms='Security.Visitor.Point.Add'/>
              <el-button type="primary" :disabled="ids.length > 1 || ids.length == 0" plain @click="handleEdit(0,editObj[0],'top')">修改</el-button>
              <el-button type="primary" :disabled="multipleSelection.length == 0 ? true : false" plain @click="handleDel('')">删除</el-button>
              <el-button type="primary" :disabled="ids.length > 1 || ids.length == 0" plain @click="handleCheckInfo('','','top')">详情</el-button>
              <el-button type="primary" :disabled="ids.length > 1 || ids.length == 0" plain @click="handleShowSetRole('')">关联角色</el-button>
            </el-button-group>
          </div>
        </div>
        <!--数据表格-->
        <div class="content-box">
          <div class="table-box">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :stripe="true"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="pointName"
                label="访客地点"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="operate-box">
                    <!-- <el-button
                      type="text"
                      class="operate-button"
                      @click="handleEdit(scope.$index, scope.row,'edit')"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      class="operate-button"
                      @click="handleDel(scope.$index, scope.row)"
                      >删除</el-button
                    >
                    <el-button
                      type="text"
                      class="operate-button"
                      @click="handleCheckInfo(scope.$index, scope.row,'seeInfo')"
                      >详情</el-button
                    >
                    <el-button 
                      type="text"
                      class="operate-button" 
                      @click="handleShowSetRole(scope.row)"
                    >关联角色</el-button> -->
                    <KtButton type="text" class="operate-button" @click="handleEdit(scope.$index,scope.row,'edit')" label='修改' perms='Security.Visitor.Point.Edit'/>
                    <KtButton type="text" class="operate-button" @click="handleDel(scope.row)" label='删除' perms='Security.Visitor.Point.Delete'/>
                    <KtButton type="text" class="operate-button" @click="handleCheckInfo(scope.$index,scope.row,'seeInfo')" label='详情' perms='Security.Visitor.Point.Detail'/>
                    <KtButton type="text" class="operate-button" @click="handleShowSetRole(scope.row)" label='关联角色' perms='Security.Visitor.Point.JoinRole'/>
                    
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <page
            :page-data="[30, 40, 50, 100]"
            :total="totalCount"
            @changePageSize="changePageSize"
            @changeCurrentPage="changeCurrentPage"
          ></page>
        </div>
        <!--查看访客地点详情弹窗-->
        <div class="addTask-box dialog-box button-box">
          <el-dialog title="访客地点详情" :visible.sync="detilFormVisible">
            <div class="content-box form-box">
              <div class="content_box">
                <div class="info-box">
                  <div>访客地点：{{pointService}}</div>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="detilFormVisible = false">取消</el-button>
            </div>
          </el-dialog>
        </div>
        <!-- 新增弹窗 -->
        <add-task :dialogAdd.sync="dialogAdd"></add-task>
        <!-- 修改弹窗 -->
        <edit-task :editFormData="editFormData" :dialogEdit.sync="dialogEdit"></edit-task>
        <!--分配角色权限弹窗-->
        <div class="addTask-box dialog-box button-box">
          <el-dialog title="关联角色" :visible.sync="setRoleVisible">
            <div class="content-box form-box">
              <div class="content_box">
                <div class="role-info">
                  <div style="color:#c1c1c1;">账号信息：{{accountInfo}}</div>
                  <div>请选择权限：</div>
                  <div><el-button type="primary" round>角色选择</el-button></div>
                  <!-- 树形控件 -->
                  <div class="tree-list">
                    <el-tree 
                    :data="rolesList" 
                    :props="treeProps" 
                    show-checkbox 
                    node-key="id" 
                    default-expand-all 
                    :default-checked-keys="defKeys" 
                    @node-click="handleNodeClick"
                    ref="treeRef"
                    :render-content="associatedrender"
                    >
                    </el-tree>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="setRoleVisible = false">取 消</el-button>
              <el-button type="primary" @click="setRoleSubmit">确 定</el-button>
            </div>
        </el-dialog>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/page/Page';
import AddTask from './visitorPointTask/addTask/AddTask';
import EditTask from './visitorPointTask/editTask/EditTask';
import { GetPagePointList, DeleteVisitPoint, GetByCode, GetRoleTree, GetPowerToRole, GetByIdSearch } from '@/api/visitor';

export default {
  components: { 
    Page, 
    AddTask, 
    EditTask
  },
  data() {
    return {
      // 查询参数
      form: {
        pointName:'',
        pageIndex: 1,
        maxResultCount: 30,
      },
      multipleSelection: [],
      // 访客登记点列表
      // listData: [],
      // currentIndex: 0,
      // 列表
      tableData:[],
      loading: false,
      // 总条数
      totalCount: 0,
      // 访客地点详情数据
      pointService:'',
      detilFormVisible:false,
      // 是否显示关联角色弹窗
      setRoleVisible: false,
      // 角色信息数据
      accountInfo:'',
      // 角色所有权限数据
      rolesList:[], 
      // 当前即将分配权限的角色id
      roleId: '',
      // 关联角色属性绑定的对象
      treeProps: {
        label: 'orgName',
        children: 'roleItems'
      },
      // 默认选中的节点Id值数组
      defKeys:[],
      // 是否显示新增弹窗
      dialogAdd: false,
      // 是否显示修改弹窗
      dialogEdit: false,
      // 查询到的访客登记点对象
      editFormData: {},
      // 选中的数组
      ids:[],
      showWindow: false,
      // 操作头部修改的对象
      editObj: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 根据访客地点名称模糊查询
    searchTableData(pointName) {
      let  that = this;
      that.tableData = that.tableData.filter(Val => {
        if (
          Val.pointName.includes(pointName) 
        ) {
          that.tableData.push(Val);
          return that.tableData;
        }
      });
    },
    // 获取列表
    getList() {
      this.loading = true
      GetPagePointList(this.form).then(res => {
        // console.log(res)
        if(res.success){
          this.tableData = res.result.items
          this.totalCount =  res.result.totalCount
          this.loading = false
        }
      })
    },
    // 当选择项发生变化时的事件
    handleSelectionChange(val) {
      let list = []
      this.multipleSelection = val;
      // console.log(val)
      if(val.length > 0){
        this.showWindow = true
        for(var i=0; i<val.length; i++){
          this.editObj[i] = val[i]
        }
        // console.log(this.obj)
      }else{
        this.showWindow = false
      }
      val.forEach((res) => {
        list.push(res.id)
      })
      this.ids = list
    },
    // 查看访客地点详情
    handleCheckInfo(index, row, string) {
      // console.log(index, row);
      this.detilFormVisible = true
      if(string == 'top'){
        this.detilForm = this.multipleSelection[0]
        this.pointService = this.multipleSelection[0].pointName
        let param = {
          code: this.multipleSelection[0].code
        }
        GetByCode(param).then(res => {
          this.detilForm = res.result
        })
      }else{
        this.detilForm = row
        this.pointService = row.pointName
        let param = {
          code: row.code
        }
        GetByCode(param).then(res => {
          this.detilForm = res.result
        })
      }
    },
    // 显示新增弹窗
    handleAdd() {
      this.dialogAdd = true;
    },
    // 显示修改弹窗
    handleEdit(index,row,string){
      // console.log(index, row)
      if(row === undefined){
        return
      }
      // this.editData = row
      this.editFormData = Object.assign({}, this.row, {
        id: row.id,
        code: row.code,
        pointName: row.pointName,
        remark: row.remark,
        orgIds: row.orgIds,
        roleIds: row.roleIds
      })
      if(string === 'top' && this.showWindow || string === 'edit'){
        this.dialogEdit = true
      } 
      
    },
    // 初始化角色关联
    roletree() {
      GetRoleTree().then(res => {
        // console.log(res)
        if(res.success) {
          res.result.map(item => {
            item.roleItems.map(items => {
              items.orgName = items.roleName
              items.id = items.roleId
            })
          })
          this.rolesList = res.result
        }else {
          return false
        }
      })
    },
    // 展示分配权限的对话框
    handleShowSetRole(row) {
      this.setRoleVisible = true
      if (row != '') {
        this.accountInfo = row.pointName;
        this.roleid = row.id;
        let params = {
          Id: this.roleid
        }
        GetByIdSearch(params).then(res => {
          if(res.success){
            this.setRoleVisible = false
          }
        })
      } else {
        this.roleid = this.multipleSelection[0].id;
        this.accountInfo = this.multipleSelection[0].pointName;
      }
      this.roletree()
    },
    // 节点被点击时的回调
    handleNodeClick(node, data){
      console.log(data)
    },
    // 树形结构添加图标
    associatedrender(h, {node, data}) {
      if (!data.children) {
        return (
          <span class="custom-tree-node">
            <i class="el-icon-user-solid"></i>
            <span>{node.label}</span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      }
    },
    // 保存角色关联
    setRoleSubmit() {
      this.setRoleVisible = true
      let id = this.roleid
      let roleIds = [
        ...this.$refs.treeRef.getHalfCheckedKeys(),
        ...this.$refs.treeRef.getCheckedKeys()
      ]
      let data = {
        id,
        roleIds
      }
      GetPowerToRole(data).then(res => {
        // console.log(res)
        if(res.success){
          this.setRoleVisible = false
        }
      })
    },
    // 删除
    handleDel(row){  
      const _this = this
      let ids = []
      if(row){
        ids.push(row.id)
      }else{
        _this.multipleSelection.map(item => {
          ids.push(item.id)
        })
      }
      _this.$confirm('确定删除此数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteVisitPoint(ids).then(res => {
            console.log(res)
            if (res.success) {
              _this.$message({
                type: 'success',
                message: '删除成功!'
              })
             _this.getList()
            } else {
              _this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    
    // 获取从分页传过来的每页多少条数据
		changePageSize(val) {
      // console.log(val);
      this.form.maxResultCount = val.pageSize;
      this.getList()
		},
		// 获取从分页传过来的当前页数
		changeCurrentPage(val) {
      // console.log(val);
      this.form.pageIndex = val.currentPage;
      this.getList()
		}
  }

}
</script>

<style lang="scss" scoped>
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.container{
  width:100%;
  display: flex;
  overflow: hidden;
}
.snt-table-right-col {
  // margin-left: 190px;
  overflow: hidden;
  // padding:30px;
  flex: 1;
  min-height: calc(100vh - 0px);
  .task_management_pages {
    padding: 10px;
    .header-box {
      display: flex;
      justify-content: space-between;
      .header-left {
        display: flex;
        .search-box {
          // margin-left: 20px;
          display: flex;
          .search-button {
            margin-left: 5px;
          }
        }
      }
    }
    .content-box {
      margin-top: 10px;
      .table-box {
        border: 1px solid #ddd;
        box-sizing: border-box;
        min-height: 800px;
      }
      .page-box {
        margin-top: 10px;
      }
    }
  }
  .role-info div:not(:first-child){
    margin-top: 20px;
  }
  .tree-list{
    width: 100%;
    height: 226px;
    overflow-y: auto;
    border: 1px solid #dddddd;
    padding: 15px 0 15px 15px;
  }
}
/deep/.el-table th, 
/deep/.el-table td{
  text-align: center;
}
</style>


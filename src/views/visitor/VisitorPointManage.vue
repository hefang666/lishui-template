<template>
  <div class="container">
    <!-- <div class="snt-list-left-col">
      <div class="list-box">
        <div class="snt-left-list">
          <div 
            :class="{active: currentIndex === index}" 
            v-for="(item, index) in listData" 
            :key="index" 
            @click="changeList(index)">
            <span>{{item.pointName}}</span>
            
          </div>
        </div>
      </div>
    </div> -->
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
              ></el-input>
              <el-button class="search-button" type="primary"  @click="getList">查询</el-button>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
              <el-button type="primary" plain @click="handleAdd">新增</el-button>
              <el-button type="primary" plain @click="handleEdit">修改</el-button>
              <el-button type="primary" :disabled="ids.length === 0" plain @click="handleDel(tableData)">删除</el-button>
              <el-button type="primary" plain @click="handleCheckInfo">详情</el-button>
              <el-button type="primary" plain @click="handleShowSetRole">关联角色</el-button>
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
                    <el-button
                      type="text"
                      class="operate-button"
                      @click="handleEdit(scope.$index, scope.row)"
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
                      @click="handleCheckInfo(scope.$index, scope.row)"
                      >查看</el-button
                    >
                    <el-button 
                      type="text"
                      class="operate-button" 
                      @click="handleShowSetRole(scope.row)"
                    >关联角色</el-button>
                    
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
                  <div>地点：{{pointService}}</div>
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
        <edit-task :editData="editData" :dialogEdit.sync="dialogEdit"></edit-task>
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
                    ref="treeRef">
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
// import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
import AddTask from './visitorPointTask/addTask/AddTask';
import EditTask from './visitorPointTask/editTask/EditTask';
import { GetPagePointList, DeleteVisitPoint, GetByCode, GetRoleTree, GetPowerToRole } from '@/api/visitor';

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
      totalCount:0,
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
      // 树形控件的属性绑定对象
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
      // 查询到的信息对象
      editData: {},
      // 批量删除id
      ids:[]

    }
  },
  mounted() {
    this.getList()
    // this.getLeftList()
  },
  methods: {
    // 获取访客登记点列表
    // getLeftList(){
    //   let _this = this
    //   GetPointPower().then(res => {
    //     console.log(res)
    //     if(res.success){
    //       _this.listData = res.result
    //     }
    //   })
    // },
    // changeList(index) {
    //   this.currentIndex = index;
    // },
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
      val.forEach((res) => {
        list.push(res.id)
      })
      this.ids = list
    },
    // 查看访客地点详情
    handleCheckInfo(index, row) {
      // console.log(index, row);
      this.detilFormVisible = true
      if(row){
        this.pointService = row.pointName
        let param = {
          code: row.code
        }
        GetByCode(param).then(res => {
          this.detilForm = res.result
        })
      }else {
        this.detilForm = this.multipleSelection[0]
      }
     
    },
    // 显示新增弹窗
    handleAdd() {
      this.dialogAdd = true;
    },
    // 展示分配权限的对话框
    async handleShowSetRole(role) {
      this.setRoleVisible = true
      this.roleId = role.id
      this.accountInfo = role.pointName
      // 获取所有权限
      GetRoleTree().then(res => {
        // console.log(res)
        if(res.success) {
          res.result.map(item => {
            item.roleItems.map(items => {
              items.orgName = items.roleName
              items.id = items.roleId
            })
          })
          // 把获取到的权限数据保存到data中
          this.rolesList = res.result
        }else {
          return false
        }
      })
      
    },
    // 节点被点击时的回调
    handleNodeClick(node, data){
      console.log(data)
    },
    // 保存角色关联
    setRoleSubmit() {
      this.setRoleVisible = true
      let id = this.roleId
      let roleIds = [
        ...this.$refs.treeRef.getHalfCheckedKeys(),
        ...this.$refs.treeRef.getCheckedKeys()
      ]
      let data = {
        id,
        roleIds
      }
      GetPowerToRole(data).then(res => {
        console.log(res)
        if(res.success){
          this.setRoleVisible = false
        }
      })
    },
    // 删除
    handleDel(){  
      const _this = this
      // console.log(rows)
      if (_this.ids.length === 0) {
        _this.$message({
          message: '请勾选要删除的行',
          type: 'warning'
        })
        return
      } else {
        var data = this.ids
        _this.$confirm('确定删除此数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteVisitPoint(data).then(res => {
            // console.log(res)
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
        })
      }    
    },
    // 显示修改弹窗
    handleEdit(index, row){
      // console.log(index, row)
      if(row){
        this.editData = row
      }else{
        this.editData = this.multipleSelection[0]
      }
      this.dialogEdit = true
      // console.log(this.multipleSelection)
    },
    // 获取从分页传过来的每页多少条数据
		changePageSize(val) {
      // console.log(val);
      this.form.maxResultCount = val
      this.getList()
		},
		// 获取从分页传过来的当前页数
		changeCurrentPage(val) {
      // console.log(val);
      this.form.pageIndex = val
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
// .snt-list-left-col {
//   position: absolute;
//   width: 190px;
//   min-height:calc(100vh - 24px);
//   overflow: hidden;
//   transition:width 0.28s;
//   border-right: 1px solid #ccc;
//   .list-box div{
//     height: 30px;
//     line-height: 30px;
//     margin-top: 10px;
//     border-bottom: 1px solid #ddd;
//     text-align: center;
//     cursor: pointer;
//     font-size: 14px;
//     &.active {
//       background: #4b77be;
//       color: #fff;
//     }
    
//   }
// }
.snt-table-right-col {
  // margin-left: 190px;
  overflow: hidden;
  // padding:30px;
  flex: 1;
  min-height: calc(100vh - 24px);
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
    border: 1px solid #dddddd;
    padding: 15px 0 15px 15px;
  }
}
/deep/.el-table th, 
/deep/.el-table td{
  text-align: center;
}
</style>


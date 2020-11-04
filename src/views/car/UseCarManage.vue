<template>
  <div class="container">
    <div class="snt-list-left-col">
      <c-tree :treeData="treeData" @changeTree="getChangeTree"></c-tree>
    </div>
    <div class="snt-table-right-col">
      <div class="task_management_pages button-box">
        <div class="header-box">
          <div class="header-left">
            <!--搜索-->
            <div class="search-box">
              <el-input
                placeholder="请输入车牌/用车人信息/电话"
                prefix-icon="el-icon-search"
                clearable
                @clear="getList" 
                v-model="form.numberOrNameOrTel"
                style="width:220px;"
              ></el-input>
              <!-- <el-button class="search-button" type="primary"  @click="getList">查询</el-button> -->
              <KtButton type="primary" class="search-button" @click="getList" label='查询' perms='Security.Vehicle.Use.Search'/>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
              <!-- <el-button type="primary" plain @click="handleAdd">新增</el-button> -->
              <KtButton type="primary" plain @click="handleAdd" label='新增' perms='Security.Vehicle.Use.Add'/>
              <el-button type="primary" :disabled="ids.length > 1 || ids.length == 0" plain @click="handleEdit(0,editObj[0],'top')">修改</el-button>
              <el-button type="primary" :disabled="multipleSelection.length == 0 ? true : false" plain @click="handleDel('')">删除</el-button>
              <el-button type="primary" :disabled="ids.length > 1 || ids.length == 0" plain @click="handleCheckInfo('','','top')">详情</el-button>
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
              :loading="loading"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="carNumber"
                label="车牌号码"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="userName"
                label="登记姓名"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="type"
                label="车辆类型"
                :formatter="formatType"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="color"
                label="车辆颜色"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="userPhone"
                label="联系电话"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="事由"
                show-overflow-tooltip
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
                      @click="handleCheckInfo(scope.$index, scope.row)"
                      >详情</el-button
                    > -->
                    <KtButton type="text" class="operate-button" @click="handleEdit(scope.$index,scope.row,'edit')" label='修改' perms='Security.Vehicle.Use.Edit'/>
                    <KtButton type="text" class="operate-button" @click="handleDel(scope.row)" label='删除' perms='Security.Vehicle.Use.Delete'/>
                    <KtButton type="text" class="operate-button" @click="handleCheckInfo(scope.$index,scope.row,'seeInfo')" label='详情' perms='Security.Vehicle.Use.Detail'/>
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
        <!--查看用车详情弹窗-->
        <div class="addTask-box dialog-box button-box">
          <el-dialog title="用车信息" :visible.sync="detilFormVisible">
            <div class="content-box form-box">
              <div class="content_box">
                <div class="info-box">
                  <el-form :model="detilForm">
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="车辆：">
                          <span>{{ detilForm.carNumber }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="用车人：">
                          <span>{{ detilForm.userName }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="联系电话：">
                          <span class="info">{{ detilForm.userPhone }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="用车时间：">
                          <span class="info">{{ detilForm.beginTime == null?'' :$moment(detilForm.beginTime).format('YYYY-MM-DD HH:mm') }}</span> 至
                          <span class="info">{{ detilForm.endTime == null?'' :$moment(detilForm.endTime).format('YYYY-MM-DD HH:mm') }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="事由：">
                          <span>{{ detilForm.reason }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    
                  </el-form>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeAdd">取消</el-button>
            </div>
        </el-dialog>
      </div>
      <!-- 新增用车信息弹窗 -->
      <add-task :dialogAdd.sync="dialogAdd" :carListData="carListData" :userListData="userListData"></add-task>
      <!-- 修改用车信息弹窗 -->
      <edit-task :editFormData="editFormData" :dialogEdit.sync="dialogEdit" :carListData="carListData" :userListData="userListData"></edit-task>
    </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
import AddTask from './useCarManageTask/addTask/AddTask';
import EditTask from './useCarManageTask/editTask/EditTask';
import { GetByOrgIdCarUseRecord,DeleteCarUseRecord, GetByOrgId } from '@/api/car';
import { GetOrgagencyTree } from '@/api/role';
import { GetOrgUserList } from '@/api/visitor'
export default {
  components: { 
    cTree, 
    Page,
    AddTask,
    EditTask
  },
  data() {
    return {
      // 查询参数
      form: {
        organizationId: '',
        numberOrNameOrTel: '',
        pageIndex: 1,
        maxResultCount: 30,
      },
      multipleSelection:[],
      // 总条数
      totalCount:0,
      loading: false,
      // 组织机构树
      treeData: [],
      // 列表数据
      tableData: [],
      // 车辆下拉列表数据
      carListData: [],
      // 用车人下拉列表数据
      userListData: [],
      // 是否显示新增弹窗
      dialogAdd: false,
      // 是否显示修改用车信息弹窗
      dialogEdit: false,
      // 查询到的用车信息对象
      editFormData: {},
      // 是否显示查看用车详情弹窗
      dialogView: false,
      // 用车详情对象
      detilForm: {}, 
      detilFormVisible: false,
      // 选中的数组
      ids:[],
      showWindow: false,
      // 操作头部修改的对象
      editObj: {},
    };
  },
  created() {
    this.getTreeData() // 加载组织机构树
  },
  methods: {
    // 点击节点时获取到id并加载列表
    getChangeTree(id) {
      this.form.organizationId = id
      // console.log(id)
      this.getList()
    },
    // 加载组织机构树
    getTreeData() {
      GetOrgagencyTree().then(res => {
        // console.log(res)
        if(res.success) {
          this.treeData = res.result
          let id = res.result[0].id
          this.form.organizationId = id
          this.getList()
        }else {
          return false
        }
        
      })
    },
    // 获取列表
    getList() {
      this.loading = true
      GetByOrgIdCarUseRecord(this.form).then(res => {
        if(res.success){
          this.tableData = res.result.items
          this.totalCount =  res.result.totalCount
          this.loading = false
        }
      })
    },
    // 获取车辆下拉列表
    getCarList() {
      // console.log('this.form.organizationId :>> ', this.form.organizationId);
      let parms = {
        orgId: this.form.organizationId,
        numberOrName: '',
        carType: 0
      }
      GetByOrgId(parms).then(res => {
        let newsCarListData = []
        res.result.forEach((res) => {
          res.carNumber = res.number
          newsCarListData.push({
            value: res.id,
            label: res.carNumber
          })
        })
        this.carListData = newsCarListData
      })
    },
    // 获取用车人下拉列表
    getUserList() {
      let _this = this
      let parm = {
        orgIds: []
      }
      GetOrgUserList(parm).then(res => {
        let newsUserListData = []
        res.result.map(item => {
          item.users.map(items => {
            newsUserListData.push({
              value: items.nickName,
              id: items.id
          })
          })
        })
        _this.userListData = newsUserListData
      })
    },
    // 判断车辆类型
    formatType: function(row) {
      return row.type === 2 ? '工程车辆' : row.type === 1 ? '标准民用车' : ''
    },
    // 点击取消关闭详情弹窗
    closeAdd() {
      this.detilFormVisible = false
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
      }else{
        this.showWindow = false
      }
      val.forEach((res) => {
        list.push(res.id)
      })
      this.ids = list
    },
    // 显示新增用车信息弹窗
    handleAdd() {
      this.getCarList() // 加载车辆下拉列表
      this.getUserList() // 加载用车人下拉列表
      this.dialogAdd = true;
    },
    // 显示修改用车信息弹窗
    handleEdit(index, row , string){
      // console.log(index, row)
      this.getCarList()
      this.getUserList() 
      let param = Object.assign({},row)
      this.editFormData = param
      if(row === undefined){
        return false
      }
      if(string === 'top' && this.showWindow || string === 'edit'){
        this.dialogEdit = true
      } 
    },
    // 查看用车详情
    handleCheckInfo(index, row, string ) {
      this.detilFormVisible = true
      if(string == 'top') {
        this.detilForm = this.multipleSelection[0]
        // GetByIdCarUseRecord(`Id=${this.multipleSelection[0].id}`).then(res => {
        // if(res.success){
        //   this.detilForm = res.result
        //   // console.log('res.result :>> ', res.result);
        // }
        // }).catch(err => {
        //   console.log(err)
        // })
      }else {
        let newdetilForm =  Object.assign({},row)
        this.detilForm = newdetilForm
        // GetByIdCarUseRecord(`Id=${row.id}`).then(res => {
        // if(res.success){
        //   this.detilForm = res.result
        // }
        // }).catch(err => {
        //   console.log(err)
        // })
      }
    },
    
    // 删除
    handleDel(row){  
      const _this = this
      let ids = []
      if(row){
        ids.push(row.id)
      }else{
        // console.log('this.multipleSelection :>> ', _this.multipleSelection);
        _this.multipleSelection.map(item => {
          ids.push(item.id)
        })
      }
      _this.$confirm('确定删除此数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteCarUseRecord(ids).then(res => {
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
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.container{
  width:100%;
  display: flex;
  overflow: hidden;
}
.snt-list-left-col {
  position: absolute;
  width: 190px;
  height: 100%;
  min-height:calc(100vh - 10px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
}
.snt-table-right-col {
  margin-left: 190px;
  overflow: hidden;
  // padding:30px;
  flex: 1;
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
}
.addTask-box {
  .content-box {
    .list-item {
      display: flex;
      justify-content: space-between;
      .has-two-item {
        width: 46%;
        .list-item-content-box {
          width: 220px;
        }
      }
    }
  }
  .info-box{
    padding: 0 40px;
  }
}
/deep/.el-table th, 
/deep/.el-table td{
  text-align: center;
}
</style>

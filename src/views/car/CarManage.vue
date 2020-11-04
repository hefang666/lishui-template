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
                placeholder="请输入车牌/姓名"
                prefix-icon="el-icon-search"
                clearable
                @clear="getList" 
                v-model="numberOrName"
                style="margin-right:20px;"
              ></el-input>
              <el-select 
                v-model="carType" 
                clearable
                placeholder="请选择车辆类型">
                <el-option 
                label="标准民用车" 
                value="1">
                </el-option>
                <el-option 
                label="工程车辆" 
                value="2">
                </el-option>
              </el-select>
              <!-- <el-button class="search-button" type="primary"  @click="getList(1)">查询</el-button> -->
              <KtButton type="primary" class="search-button" @click="getList" label='查询' perms='Security.Vehicle.Management.Search'/>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
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
              v-loading="loading"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="number"
                label="车牌号码"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="ownerName"
                label="车主姓名"
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
                prop="phoneNumber"
                label="联系电话"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="operate-box">
                    <!-- <el-button
                      type="text"
                      class="operate-button"
                      @click="handleEdit(scope.$index, scope.row, 'edit')"
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
                    <KtButton type="text" class="operate-button" @click="handleEdit(scope.$index,scope.row,'edit')" label='修改' perms='Security.Vehicle.Management.Edit'/>
                    <KtButton type="text" class="operate-button" @click="handleDel(scope.row)" label='删除' perms='Security.Vehicle.Management.Delete'/>
                    <KtButton type="text" class="operate-button" @click="handleCheckInfo(scope.$index,scope.row,'seeInfo')" label='详情' perms='Security.Vehicle.Management.Detail'/>
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
        <!--查看车辆详情弹窗-->
        <div class="addTask-box dialog-box button-box">
          <el-dialog title="车辆信息" :visible.sync="detilFormVisible">
            <div class="content-box form-box">
              <div class="content_box">
                <div class="info-box">
                  <el-form :model="detilForm">
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="车牌号码：" prop="number">
                          <span>{{ detilForm.number }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="车主姓名：" prop="ownerName">
                          <span>{{ detilForm.ownerName }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="联系电话：" prop="phoneNumber">
                          <span class="info">{{ detilForm.phoneNumber }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="车辆颜色：" prop="color">
                          <span class="info">{{ detilForm.color }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="车辆分类：" prop="type">
                          <span class="info">{{ detilForm.type == 1 ? '工程车辆' : "标准民用车" }}</span>
                        </el-form-item>
                      </div>
                    </div>  
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="备注：" prop="remark">
                          <span>{{ detilForm.remark }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="登记时间：" prop="registerTime">
                          <span class="info">{{ $moment(detilForm.registerTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="IEMI：" prop="iemi">
                          <span class="info">{{ detilForm.iemi }}</span>
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
      <!-- 修改车辆弹窗 -->
      <edit-task :editFormData="editFormData" :dialogEdit.sync="dialogEdit"></edit-task>
    </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
import EditTask from './carManageTask/editTask/EditTask';
import { GetByOrgIdPage, GetById, DeleteCar } from '@/api/car';
import { GetOrgagencyTree } from '@/api/role';

export default {
  components: { 
    cTree, 
    Page,
    EditTask
  },
  data() {
    return {
      // 查询参数
      form: {
        orgId: '', // 组织ID
        pageIndex: 1,
        maxResultCount: 30,
      },
      numberOrName: '',
      carType: '',
      // 总条数
      totalCount: 0,
      loading: false,
      multipleSelection:[],
      // 组织机构树
      treeData: [],
      // 列表数据
      tableData: [],
      // 是否显示修改弹窗
      dialogEdit: false,
      // 查询到的编辑车辆信息对象
      editFormData: {},
      // 是否显示查看车辆信息弹窗
      dialogView: false,
      // 车辆详情对象
      detilForm: {}, 
      detilFormVisible:false,
      // 选中的数组
      ids:[],
      showWindow: false,
      // 操作头部修改的对象
      editObj: {}
      
    };
  },
  created() {
    this.getTreeData()// 加载组织机构树
  },
  methods: {
    // 点击节点时获取到id并加载列表
    getChangeTree(id) {
      this.form.orgId = id
      this.getList(1)
    },
    // 加载组织机构树
    getTreeData() {
      GetOrgagencyTree().then(res => {
        // console.log(res)
        if(res.success) {
          this.treeData = res.result
          let id = res.result[0].id
          this.form.orgId = id
          this.getList(1)
          
        }else {
          return false
        }
        
      })
    },
    
    // 获取列表
    getList(type) {
      if(type == 1){
        GetByOrgIdPage(this.form).then(res => {
          if(res.success){
            this.tableData = res.result.items
            this.totalCount =  res.result.totalCount
            this.loading = false
          }
        })
      }else {
        if(this.carType){
            this.form.numberOrName = this.numberOrName
            this.form.carType = this.carType
            GetByOrgIdPage(this.form).then(res => {
            if(res.success){
              this.tableData = res.result.items
              this.totalCount =  res.result.totalCount
              this.loading = false
            }
          })
        }
        else {
          this.$message({
            message: '请选择车辆类型',
            type: 'warning'
          })
        }
      }
      
    },
    // 判断车辆类型
    formatType: function(row) {
      return row.type === 1 ? '标准民用车' : row.type === 2 ? '工程车辆' :  ''
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
        // console.log(this.obj)
      }else {
        this.showWindow = false
      }
      val.forEach((res) => {
        list.push(res.id)
      })
      this.ids = list
    },
    // 显示修改车辆弹窗
    handleEdit(index, row, string){
      if(row === undefined){
        return
      }
      this.editFormData = Object.assign({}, this.row, {
        id: row.id,
        organizationId: row.organizationId,
        number: row.number,
        ownerName: row.ownerName,
        phoneNumber: row.phoneNumber,
        color: row.color,
        type: row.type,
        brand: row.brand,
        remark: row.remark,
        registerTime: row.registerTime,
        iemi: row.iemi
      })
      if(string === 'top' && this.showWindow || string === 'edit'){
        this.dialogEdit = true
      }
    },
    // 查看车辆信息详情
    handleCheckInfo(index, row, string) {
      this.detilFormVisible = true
      if(string == 'top') {
        GetById(`Id=${this.multipleSelection[0].id}`).then(res => {
        if(res.success){
          this.detilForm = res.result
        }
        }).catch(err => {
          console.log(err)
        })
      }else {
        GetById(`Id=${row.id}`).then(res => {
        if(res.success){
          this.detilForm = res.result
        }
        }).catch(err => {
          console.log(err)
        })
      }
      
    },
    
    // 删除
    // handleDel(){  
    //   const _this = this
    //   if (_this.ids.length === 0) {
    //     _this.$message({
    //       message: '请勾选要删除的行',
    //       type: 'warning'
    //     })
    //     return
    //   } else {
    //     var data = this.ids
    //     _this.$confirm('确定删除此数据吗？', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       DeleteCar(data).then(res => {
    //         console.log(res)
    //         if (res.success) {
    //           _this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //           })
    //          _this.getList(1)
    //         } else {
    //           _this.$message({
    //             type: 'warning',
    //             message: res.message
    //           })
    //         }
    //       })
    //     })
    //   }    
    // },
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
          DeleteCar(ids).then(res => {
            console.log(res)
            if (res.success) {
              _this.$message({
                type: 'success',
                message: '删除成功!'
              })
             _this.getList(1)
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

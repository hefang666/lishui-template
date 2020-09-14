<template>
  <div class="container">
    <div class="snt-list-left-col">
      <c-tree></c-tree>
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
                style="width:220px;margin-right:20px;"
              ></el-input>
              <el-button class="search-button" type="primary"  @click="getList">查询</el-button>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
              <el-button type="primary" :disabled="ids.length === 0" plain @click="handleDel(tableData)">删除</el-button>
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
                prop="carNumber"
                label="车牌号码"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="userName"
                label="用车人姓名"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="userNumber"
                label="用车人联系电话"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="color"
                label="车辆颜色"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="用车事由"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="operate-box">
                    <el-button
                      type="text"
                      class="operate-button"
                      @click="handleCheckInfo(scope.$index, scope.row)"
                      >查看</el-button
                    >
                    <el-button
                      type="text"
                      class="operate-button"
                      @click="handleEdit(scope.$index, scope.row)"
                      >修改</el-button
                    >
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
        <!--查看访客详情弹窗-->
        <div class="addTask-box dialog-box button-box">
          <el-dialog title="车辆信息" :visible.sync="detilFormVisible">
            <div class="content-box form-box">
              <div class="content_box">
                <div class="info-box">
                  <el-form :model="detilForm" :rules="detilFormRules">
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
                          <span class="info">{{ detilForm.type }}</span>
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
                        <el-form-item label="登记时间：" prop="registrationTime">
                          <span class="info">{{ detilForm.registrationTime }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="IMEI：" prop="imei">
                          <span class="info">{{ detilForm.imei }}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="detilFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
      </div>
      <!-- 修改车辆弹窗 -->
      <edit-task :editData="editData" :dialogEdit.sync="dialogEdit"></edit-task>
    </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
import EditTask from './useCarManageTask/editTask/EditTask';
import { GetByOrgIdCarUseRecord, GetByIdCarUseRecord, DeleteCarUseRecord } from '@/api/car';

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
        organizationId: 0,
        numberOrNameOrTel: '',
        pageIndex: 1,
        maxResultCount: 30,
      },
      // 总条数
      totalCount:0,
      loading: false,
      // 列表数据
      tableData: [],
      // 是否显示修改弹窗
      dialogEdit: false,
      // 查询到的车辆信息对象
      editData: {},
      // 是否显示查看用户信息弹窗
      dialogView: false,
      // 详情数据
      detilForm: {}, 
      detilFormVisible:false,
      detilFormRules: {},
      // 批量删除id
      ids:[],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true
      GetByOrgIdCarUseRecord(this.form).then(res => {
        console.log(res)
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
      console.log(val)
      val.forEach((res) => {
        list.push(res.id)
      })
      this.ids = list
    },
    // 显示修改车辆弹窗
    handleEdit(index, row){
      console.log(index, row)
      this.editData = row
      this.dialogEdit = true
    },
    // 查看访客记录详情
    handleCheckInfo(index, row) {
      console.log(index, row);
      this.detilFormVisible = true
      this.detilForm = row
      let param = {
        id: row.id
      }
      GetByIdCarUseRecord(param).then(res => {
       this.detilForm = res.result
       this.loading = false
      })
    },
    
    // 删除
    handleDel(rows){  
      const _this = this
      console.log(rows)
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
          DeleteCarUseRecord(data).then(res => {
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
        })
      }    
    },
    // 获取从分页传过来的每页多少条数据
		changePageSize(val) {
      console.log(val);
      this.form.maxResultCount = val
      this.getList()
		},
		// 获取从分页传过来的当前页数
		changeCurrentPage(val) {
      console.log(val);
      this.form.pageIndex = val
      this.getList()
    },

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
  min-height:calc(100vh - 24px);
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
</style>

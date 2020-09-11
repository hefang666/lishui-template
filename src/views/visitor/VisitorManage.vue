<template>
  <div class="container">
    <div class="snt-list-left-col">
      <c-tree></c-tree>
    </div>
    <div class="snt-table-right-col">
      <div class="task_management_pages button-box">
        <div class="header-box">
          <div class="header-left">
            <div class="search-box">
              <el-input
                placeholder="请输入访客姓名/电话"
                prefix-icon="el-icon-search"
                clearable
                @clear="getList" 
                v-model="form.nameOrTel"
                style="width:210px;margin-right:20px;"
              ></el-input>
              <el-date-picker
                v-model="visitTime"
                type="daterange"
                unlink-panels
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
              <el-button class="search-button" type="primary"  @click="getList">查询</el-button>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
              <el-button type="primary" :disabled="ids.length === 0" plain @click="handleDel(tableData)">删除</el-button>
            </el-button-group>
          </div>
        </div>
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
                prop="visitorName"
                label="姓名"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="idCardNumber"
                label="证件号码"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="idPhoto"
                label="联系电话"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="contactAddress"
                label="登记地点"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="visitTime"
                label="登记时间"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="leaveTime"
                label="离开时间"
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
                      @click="handleLeaveTimeAdd"
                      >添加离开时间</el-button
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
     
      <!-- <el-dialog
        :visible.sync="dialogVisible"
        title="访客记录"
        :close-on-click-modal="true"
        :show-close="true"
        style="width:50%;margin:0 auto;"
        ><el-form
          id="txt_box"
          ref="detilForm"
          :model="detilForm"
          :inline="true"
          :rules="detilFormRules"
        >
          <el-form-item label="姓名：" prop="visitorName">
            <span class="info">{{ detilForm.visitorName }}</span>
          </el-form-item>
          <el-form-item label="证件号码：" prop="IdCardNumber">
            <span class="info">{{ detilForm.IdCardNumber }}</span>
          </el-form-item>
          <el-form-item label="联系电话：" prop="IdCardPhoto">
            <span class="info">{{ detilForm.IdCardPhoto }}</span>
          </el-form-item>
          <el-form-item label="来访地址：" prop="CheckAddress">
            <span class="info">{{ detilForm.CheckAddress }}</span>
          </el-form-item>
          <el-form-item label="来访时间：" prop="VisitTime">
            <span class="info">{{ detilForm.VisitTime }}</span>
          </el-form-item>
          <el-form-item label="离开时间：" prop="LeaveTime">
            <span class="info">{{ detilForm.LeaveTime }}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="dialogVisible = false">取消</el-button>
        </div>
      </el-dialog> -->
      <div class="addTask-box dialog-box button-box">
        <el-dialog
          :visible.sync="dialogAddLeaveTimeVisible"
          title="添加离开时间"
          >
          <div class="content-box form-box">
            <div class="content_box">
              <el-form
                ref="addFormRef"
                :model="addForm"
                :rules="addFormRules"
              >
                <el-form-item label="离开时间" prop="leaveTime">
                  <el-date-picker
                    v-model="addForm.leaveTime"
                    type="datetime"
                    placeholder="选择离开时间"
                  >
                  </el-date-picker> </el-form-item
              ></el-form>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeAdd">取消</el-button>
            <el-button
              type="primary"
              @click="onSubmit"
              >保存</el-button
            >
          </div>
        </el-dialog>
      </div>
      
      <!-- 查看详情弹窗 -->
      <view-task :dialog-view="dialogView" @getViewData="getViewData"></view-task>
    </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
import ViewTask from './visitorManageTask/viewTask/ViewTask';
import { GetPageList, GetById, getInsertLeaveTime, DeleteRecord } from '@/api/visitor';

export default {
  components: { cTree, Page, ViewTask },
  data() {
    return {
      // 查询参数
      form: {
        nameOrTel:'',
        visitTimeBegin:'',
        visitTimeEnd:'',
        codes: ["1"],
        pageIndex: 1,
        maxResultCount: 30,
      },
      // 日期时间参数
      visitTime:'',
      // 总条数
      totalCount:0,
      loading: false,
      // 列表数据
      tableData: [],
      // 是否显示查看用户信息弹窗
      dialogView: false,
      // detilForm: {}, // 详情数据
      detilFormRules: {},
      // 是否显示新增离开时间弹窗
      dialogAddLeaveTimeVisible:false,
      // 新增添加时间参数
      addForm: { 
        id:0,
        leaveTime: "" 
      }, 
      addFormRules:{
        leaveTime: [
          { required: true, message: "离开时间不能为空", trigger: "blur" }
        ],
      },
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
      GetPageList(this.form).then(res => {
        console.log(res)
        if(res.success){
          this.tableData = res.result.items
          this.totalCount =  res.result.totalCount
          this.loading = false
        }
      })
    },
    
    handleSelectionChange(val) {
      let list = []
      this.multipleSelection = val;
      console.log(val)
      val.forEach((res) => {
        list.push(res.id)
      })
      this.ids = list
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
    // 关闭查看弹窗
    getViewData(data) {
      this.dialogView = data.dialogView;
    },
    // 查看详情
    handleCheckInfo(index, row) {
      console.log(index, row);
      this.dialogView = true;
      // console.log(index, row);
      // let _this = this;
      // _this.loading = true
      // _this.detilForm = row;
      // _this.dialogVisible = true;
      let param = {
        id: row.id
      }
      GetById(param).then(res => {
       this.detilForm = res.result
       this.loading = false
       this.getList()
      })
    },
    // 打开新增添加时间弹窗
    handleLeaveTimeAdd() {
      this.dialogAddLeaveTimeVisible = true;
    },
    // 关闭新增添加时间弹窗
    closeAdd() {
      // this.$refs.addFormRef.resetFields() // 监听对话框关闭事件
      this.dialogAddLeaveTimeVisible = false
    },
    // 新增添加时间并提交 
    onSubmit() {
      this.$refs.addFormRef.validate(async valid => {
        // 如果valid的值为true，说明校验成功，反之则校验失败
        if (!valid) return
         getInsertLeaveTime(this.addForm).then(res => {
          console.log(res)
          if(res.success){
            this.dialogAddLeaveTimeVisible = false
            this.$message.success('添加成功！')
          }
        })
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
          DeleteRecord(data).then(res => {
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
}
</style>

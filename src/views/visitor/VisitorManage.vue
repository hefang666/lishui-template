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
                placeholder="请输入访客姓名/电话"
                prefix-icon="el-icon-search"
                clearable
                @clear="getList" 
                v-model="form.nameOrTel"
                style="width:210px;margin-right:20px;"
              ></el-input>
              <!-- <el-date-picker
                v-model="visitTime"
                type="datetimerange"
                format="yyyy-MM-dd hh:mm"
                value-format="yyyy-MM-dd hh:mm"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
              /> -->
              <el-date-picker
                v-model="form.visitTimeBegin"
                type="datetime"
                format="yyyy-MM-dd hh:mm"
                value-format="yyyy-MM-dd hh:mm"
                placeholder="请选择开始时间"
              ></el-date-picker>
              <span class="to-style">-</span>
              <el-date-picker
                v-model="form.visitTimeEnd"
                type="datetime"
                format="yyyy-MM-dd hh:mm"
                value-format="yyyy-MM-dd hh:mm"
                placeholder="请选择结束时间"
              ></el-date-picker>

              <el-button class="search-button" type="primary"  @click="getList">查询</el-button>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
              <el-button type="primary" plain @click="handleCheckInfo">详情</el-button>
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
                prop="phoneNumber"
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
                      >详情</el-button
                    >
                    <el-button
                      type="text"
                      class="operate-button"
                      @click="handleLeaveTimeAdd(scope.row)"
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
        <!--查看访客详情弹窗-->
        <div class="addTask-box dialog-box button-box">
          <el-dialog title="访客记录" :visible.sync="detilFormVisible">
            <div class="content-box form-box">
              <div class="content_box">
                <div class="info-box">
                  <el-form :model="detilForm" :rules="detilFormRules">
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="姓名：" prop="visitorName">
                          <span>{{ detilForm.visitorName }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="证件类型：" prop="idCardType" :formatter="formatType">
                          <span>{{ detilForm.idCardType }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="证件号码：" prop="idCardNumber">
                          <span class="info">{{ detilForm.idCardNumber }}</span>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="联系电话：" prop="idCardPhoto">
                          <span class="info">{{ detilForm.idCardPhoto }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="车牌号：" prop="carNumber">
                          <span class="info">{{ detilForm.carNumber }}</span>
                        </el-form-item>
                      </div>
                    </div>  
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="联系地址：" prop="contactAddress">
                          <span>{{ detilForm.contactAddress }}</span>
                        </el-form-item>
                      </div>
                    </div>  
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="来访事由：" prop="reason">
                          <span>{{ detilForm.reason }}</span>
                        </el-form-item>
                      </div>
                    </div>  
                    <div class="list-item">
                      <div class="list-items has-two-item">
                        <el-form-item label="被访人：" prop="interviewees">
                          <span class="info">{{ detilForm.interviewees }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="同行人数：" prop="visitorCount">
                          <span class="info">{{ detilForm.visitorCount }}</span>
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
                        <el-form-item label="来访时间：" prop="visitTime">
                          <span class="info">{{ detilForm.visitTime }}</span>
                        </el-form-item>
                      </div>
                      <div class="list-items has-two-item">
                        <el-form-item label="离开时间：" prop="leaveTime">
                          <span class="info">{{ detilForm.leaveTime }}</span>
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
      <!--添加离开时间弹窗-->
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
                    format="yyyy-MM-dd hh:mm"
                    value-format="yyyy-MM-dd hh:mm"
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
    </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
// import ViewTask from './visitorManageTask/viewTask/ViewTask';
import { GetPageList, GetById, getInsertLeaveTime, DeleteRecord } from '@/api/visitor';
import { GetOrgagencyTree } from '@/api/role';

export default {
  components: { cTree, Page },
  data() {
    return {
      id:'',
      // 查询参数
      form: {
        nameOrTel:'',
        visitTimeBegin:'',
        visitTimeEnd:'',
        codes: [""],
        pageIndex: 1,
        maxResultCount: 30,
      },
      // 组织机构树
      treeData: [],
      // 日期时间参数
      // visitTime:'',
      // 总条数
      totalCount:0,
      loading: false,
      // 列表数据
      tableData: [],
      // 是否显示查看用户信息弹窗
      dialogView: false,
      detilForm: {}, // 详情数据
      detilFormVisible:false,
      detilFormRules: {},
      // 是否显示新增离开时间弹窗
      dialogAddLeaveTimeVisible:false,
      // 新增添加时间参数
      addForm: { 
        id: 0,
        leaveTime: "" ,
        checkStatus: 1
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
    this.getTreeData()// 加载组织机构树
  },
  methods: {
    // 获取查询的访问时间
    // changeDate() {
    //   this.form.visitTimeBegin = this.visitTime[0]
    //   this.form.visitTimeEnd = this.visitTime[1]
    // },
    // 
    // 点击节点时获取到id
    getChangeTree(v) {
      this.id = v
      this.getList()
    },
    // 判断证件类型
    formatType: function(row) {
      return row.idCardType === 1 ? '军官证' : row.idCardType === 0 ? '身份证' : ''
    },
    // 加载组织机构树
    getTreeData() {
      GetOrgagencyTree().then(res => {
        if(res.success) {
          this.treeData = res.result
          // let id = res.result[0].id
          // this.form.organizationId = id
          this.getList()
        }else {
          return false
        }
        
      })
    },
    // 获取列表
    getList() {
      this.loading = true
      GetPageList(this.form).then(res => {
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
      console.log(val)
      val.forEach((res) => {
        list.push(res.id)
      })
      this.ids = list
    },
    // 查看访客记录详情
    handleCheckInfo(index, row) {
      // console.log(index, row);
      this.detilFormVisible = true
      if(row) {
        this.detilForm = row
        let param = {
          id: row.id
        }
        GetById(param).then(res => {
          this.detilForm = res.result
        })
      } else{
        this.detilForm = this.multipleSelection[0]
      }
      
    },
    // 打开新增添加时间弹窗
    handleLeaveTimeAdd(row) {
      this.dialogAddLeaveTimeVisible = true;
      this.addForm.id = row.id
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
          // /deep/.el-input__icon{
          //   line-height: 23px !important;
          // }
          display: flex;
          .search-button {
            margin-left: 5px;
          }
          .to-style{
            padding:5px 10px;
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
/deep/.search-box .el-input__icon,
/deep/.el-date-editor .el-range-separator{
  line-height: 22px !important;
}
/deep/.el-table th, 
/deep/.el-table td{
  text-align: center;
}
</style>

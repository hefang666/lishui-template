<template>
  <div class="container">
    <div class="m-tree-left-col">
      <c-tree></c-tree>
    </div>
    <div class="m-grid-right-col">
      <el-form ref="form" :inline="true" :model="form" class="fixFrom">
        <el-form-item label="访客姓名/电话：">
          <el-input v-model="form.NameOrTel" placeholder="请输入访客姓名/电话" />
        </el-form-item>
        <el-form-item label="来访时间：">
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
        </el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form>
      <c-table
        :pagedTable="tableData"
        :columnMap="columnMap"
        border
        :paginationOption="page"
        :isLoadTable="loading"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <el-table-column slot="operate" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleCheckInfo(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleAdd(scope.$index, scope.row)"
              >添加离开时间</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDel(scope.$index, scope.row)"
              style="color:#ff4949"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </c-table>
      <el-dialog
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
      </el-dialog>
      <el-dialog
        :visible.sync="dialogAddVisible"
        title="添加离开时间"
        :close-on-click-modal="true"
        :show-close="true"
        style="width:50%;margin:0 auto;"
        ><el-form
          ref="addForm"
          :model="addForm"
          label-width="100px"
          :rules="addFormRules"
        >
          <el-form-item label="离开时间" prop="LeaveTime">
            <el-date-picker
              v-model="addForm.LeaveTime"
              type="datetime"
              placeholder="选择离开时间"
            >
            </el-date-picker> </el-form-item
        ></el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="dialogAddVisible = false">取消</el-button>
          <el-button
            type="primary"
            :loading="addLoading"
            @click.native="onSubmit"
            >保存</el-button
          >
        </div></el-dialog
      >
    </div>
  </div>
</template>

<script>
import cTable from "@/components/table/cTable";
import cTree from "@/components/tree/cTree";
import { GetPageList, GetById, getInsertLeaveTime, DeleteRecord } from '@/api/visitor';

const columnMap = [
  {
    prop: "index",
    slot: true
  },
  {
    prop: "visitorName",
    label: "姓名",
    width: "200",
    align: "center"
  },
  {
    prop: "IdCardNumber",
    label: "证件号码",
    align: "center"
  },
  {
    prop: "PhoneNumber",
    label: "电话号码",
    align: "center"
  },
  {
    prop: "CheckAddress",
    label: "登记地点",
    align: "center"
  },
  {
    prop: "VisitTime",
    label: "登记时间",
    align: "center"
  },
  {
    prop: "LeaveTime",
    label: "离开时间",
    align: "center"
  }
];
export default {
  components: { cTable, cTree },
  data() {
    return {
      // 查询参数
      form: {
        NameOrTel:'',
        VisitTimeBegin:'',
        VisitTimeEnd:'',
        // codes: ["123"],
        // PageIndex:1,
        // MaxResultCount:10

      },
      // 日期时间参数
      visitTime:'',
      columnMap: columnMap,
      // 分页参数
      page: {
        PageIndex: 1,
        MaxResultCount: 10,
        totalCount:0
      },
      
      // pagination: {},
      // table参数
      // options: {
      //   stripe: true, // 是否为斑马纹 table
      //   loading: false, // 是否添加表格loading加载动画
      //   highlightCurrentRow: true, // 是否支持当前行高亮显示
      //   mutiSelect: true // 是否支持列表项选中功能
      // },
      loading: false,
      // 列表数据
      tableData: [],
      ids:[],
      dialogVisible: false, // 查看详情弹窗是否显示
      detilForm: {}, // 详情数据
      detilFormRules: {},
      addForm: { leaveDate: "" }, // 添加数据
      dialogAddVisible: false, // 添加弹窗是否显示
      addFormRules: {},
      addLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      let _this=this
      _this.loading = true
      let para ={
        NameOrTel:_this.form.NameOrTel,
        // codes:_this.JSON.stringify(codes),
        codes: ["123"],
        PageIndex:_this.page.PageIndex,
        MaxResultCount:_this.page.MaxResultCount,
        VisitTimeBegin:_this.visitTime[0],
        VisitTimeEnd:_this.visitTime[1]
      }
      GetPageList(para).then(res => {
        // console.log(res)
        if(res.success){
          setTimeout(() => {
          _this.tableData = res.result.items
          _this.page.totalCount =  res.result.totalCount
          _this.loading = false
        }, 300)
        }
        
        
      })
    },
    // 切换每页显示的数量
    handleSizeChange(val) {
      let _self = this
      // console.log('每页 ' + val + ' 页')
      _self.PageIndex = val
      _self.getList();
    },
    // 切换页码
    handleCurrentChange(val) {
      let _self = this
      _self.MaxResultCount = val
      // console.log('当前页: ' + val)
      _self.getList();
    },
    // 查看详情
    handleCheckInfo(index, row) {
      // console.log(index, row);
      let _this = this;
      _this.loading = true
      _this.detilForm = row;
      _this.dialogVisible = true;
      let param = {
        id: row.id
      }
      GetById(param).then(res => {
       _this.detilForm = res.result
       _this.loading = false
       _this.getList()
      })
    },
    // 添加离开时间
    handleAdd(index, row) {
      // console.log(index, row);
      let _this = this;
      _this.loading = true
      _this.detilForm = row;
      _this.dialogAddVisible = true;
      let param = {
        id:row.id,
        LeaveTime:""
      }
      getInsertLeaveTime(param).then(res => {
       _this.detilForm = res.result
       _this.loading = true
       _this.getList()
      })
    },
    // 添加时间保存
    onSubmit() {
      let _self = this;
      _self.dialogAddVisible = false;
      _self.$message.success("添加成功！");
    },
    // 删除
    handleDel(row){
      let _this = this
      let data = {
        ids:row.id
      }
      _this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteRecord(data).then(res => {
          console.log(data)
          if (res.success) {
           _this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this.getlist()
          } else {
            _this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      })
    }

  }
};
</script>

<style scoped lang="scss">
.container{
  width:100%;
  display: flex;
  overflow: hidden;
}
.m-tree-left-col {
  position: absolute;
  width: 190px;
  min-height:calc(100vh - 24px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
}
.m-grid-right-col {
  margin-left: 190px;
  overflow: hidden;
  padding:30px;
  flex: 1;
}
</style>

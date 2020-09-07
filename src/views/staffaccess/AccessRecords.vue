<template>
  <div class="container">
    <div class="m-tree-left-col">
      <c-tree></c-tree>
    </div>
    <div class="m-grid-right-col">
      <el-form ref="form" :inline="true" :model="form" class="fixFrom">
        <el-form-item label="姓名：">
          <el-input v-model="form.UserName" placeholder="请输入姓名" prefix-icon="el-icon-search"/>
        </el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form>
      <c-table
        :pagedTable="tableData"
        :columnMap="columnMap"
        :pagination="pagination"
        border
        :paginationOption="page"
        :options="options"
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
          </template>
        </el-table-column>
      </c-table>
      <el-dialog
        :visible.sync="dialogVisible"
        title="考勤详情"
        :close-on-click-modal="true"
        style="width:50%;margin:0 auto;"
        ><el-form
          id="txt_box"
          ref="detilForm"
          :model="detilForm"
          :rules="detilFormRules"
          ><el-form-item label="姓名：" prop="name">
            <span class="info">{{ detilForm.name }}</span> </el-form-item
          ><el-form-item label="考勤时间：" prop="date">
            <span class="info">{{ detilForm.date }}</span>
          </el-form-item></el-form
        >
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="dialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import cTable from "@/components/table/cTable";
import cTree from "@/components/tree/cTree";
import { GetPageList } from '@/api/attendance'

const columnMap = [
  {
    prop: "index",
    slot: true
  },
  {
    prop: "name",
    label: "姓名",
    width: "200",
    align: "center"
  },
  {
    prop: "date",
    label: "考勤时间",
    align: "right"
  }
];
export default {
  components: { cTable, cTree },
  data() {
    return {
      // 搜索栏数据
      form: {
        UserName: ""
      },
      columnMap: columnMap,
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      // 分页参数
      pagination: {
        pageIndex: 1,
        pageSize: 20
      },
      // table参数
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true // 是否支持列表项选中功能
      },
      loading: false,
      // 列表数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        }
      ],
      dialogVisible: false,
      detilForm: {}, // 详情数据
      detilFormRules: {},
      // winHeight:window.innerHeight,
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
        UserName:_this.form.UserName
      }
      GetPageList(para).then(res => {
        console.log(res,1111)
      })
    },
    // 切换每页显示的数量
    handleSizeChange(val) {
      console.log(val);
    },
    // 切换页码
    handleCurrentChange(val) {
      console.log(val);
    },
    // 查看详情
    handleCheckInfo(index, row) {
      console.log(index, row);
      let _this = this;
      _this.detilForm = row;
      _this.dialogVisible = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/styles/element-ui-new.scss';
@import '~@/styles/input-public.scss';

/deep/.el-dialog__header {
  background-color: #1890ff;
}
/deep/.el-dialog__title {
  color: #fff;
}
/deep/.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
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

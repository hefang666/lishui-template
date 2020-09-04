<template>
  <div class="container">
    <div class="m-tree-left-col">
      <c-tree></c-tree>
    </div>
    <div class="m-grid-right-col">
      <el-form ref="form" :inline="true" :model="form" class="fixFrom">
        <el-form-item label="姓名：">
          <el-input v-model="form.name" placeholder="请输入巡更员姓名" />
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="form.date"
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
        title="记录详情"
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
          <el-form-item label="巡更点序号：" prop="orderNumber">
            <span class="info">{{ detilForm.orderNumber }}</span>
          </el-form-item>
          <div>
            <el-form-item label="巡更点：" prop="place">
              <span class="info">{{ detilForm.place }}</span>
            </el-form-item>
            <el-form-item label="巡更时间：" prop="time">
              <span class="info">{{ detilForm.time }}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="巡更员：" prop="user">
              <span class="info">{{ detilForm.user }}</span>
            </el-form-item>
            <el-form-item label="圈次：" prop="number">
              <span class="info">{{ detilForm.number }}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="路线点：" prop="route">
              <span class="info">{{ detilForm.route }}</span>
            </el-form-item>
            <el-form-item label="班次：" prop="class">
              <span class="info">{{ detilForm.class }}</span>
            </el-form-item>
          </div>

          <el-form-item label="导入时间：" prop="importTime">
            <span class="info">{{ detilForm.importTime }}</span>
          </el-form-item>
        </el-form>
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

const columnMap = [
  {
    prop: "index",
    slot: true
  },
  {
    prop: "orderNumber",
    label: "巡更点序号"
  },
  {
    prop: "place",
    label: "巡更点",
    width: "200",
    align: "center"
  },
  {
    prop: "time",
    label: "巡更时间",
    align: "center"
  },
  {
    prop: "user",
    label: "巡更员",
    align: "center"
  },
  {
    prop: "number",
    label: "圈次",
    align: "center"
  },
  {
    prop: "route",
    label: "路线点",
    align: "center"
  },
  {
    prop: "class",
    label: "班次",
    align: "center"
  },
  {
    prop: "importTime",
    label: "导入时间",
    align: "center"
  }
];
export default {
  components: { cTable, cTree },
  data() {
    return {
      // 查询列表数据
      form: {
        name: "",
        date: ""
      },
      // dateSelect: "",
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
          orderNumber: "5",
          place: "重庆",
          time: "2020-09-01",
          user: "张三",
          number: "1",
          route: "2020-09-01",
          class: "巡更",
          importTime: "20209-01"
        }
      ],
      dialogVisible: false, // 查看详情弹窗是否显示
      detilForm: {}, // 详情数据
      detilFormRules: {}
    };
  },
  methods: {
    // 加载列表
    getList() {},
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

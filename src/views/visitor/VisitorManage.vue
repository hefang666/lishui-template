<template>
  <di class="container">
    <div class="m-tree-left-col">
      <c-tree></c-tree>
    </div>
    <div class="m-grid-right-col">
      <el-form ref="form" :inline="true" :model="form" class="fixFrom">
        <el-form-item label="姓名：">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="来访时间：">
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
            <el-button
              type="text"
              size="small"
              @click="handleAdd(scope.$index, scope.row)"
              >添加离开时间</el-button
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
          <el-form-item label="姓名：" prop="name">
            <span class="info">{{ detilForm.name }}</span>
          </el-form-item>
          <el-form-item label="证件号码：" prop="number">
            <span class="info">{{ detilForm.number }}</span>
          </el-form-item>
          <el-form-item label="联系电话：" prop="tel">
            <span class="info">{{ detilForm.tel }}</span>
          </el-form-item>
          <el-form-item label="来访地址：" prop="dress">
            <span class="info">{{ detilForm.dress }}</span>
          </el-form-item>
          <el-form-item label="来访时间：" prop="registerDate">
            <span class="info">{{ detilForm.registerDate }}</span>
          </el-form-item>
          <el-form-item label="离开时间：" prop="leaveDate">
            <span class="info">{{ detilForm.leaveDate }}</span>
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
          <el-form-item label="离开时间" prop="leaveDate">
            <el-date-picker
              v-model="addForm.leaveDate"
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
  </di>
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
    prop: "name",
    label: "姓名",
    width: "200",
    align: "center"
  },
  {
    prop: "number",
    label: "证件号码",
    align: "center"
  },
  {
    prop: "tel",
    label: "电话号码",
    align: "center"
  },
  {
    prop: "dress",
    label: "登记地点",
    align: "center"
  },
  {
    prop: "registerDate",
    label: "登记时间",
    align: "center"
  },
  {
    prop: "leaveDate",
    label: "离开时间",
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
          name: "王小虎",
          number: "001",
          tel: "150000000",
          dress: "重庆水厂",
          registerDate: "2020-09-01",
          leaveDate: "20209-01"
        }
      ],
      dialogVisible: false, // 查看详情弹窗是否显示
      detilForm: {}, // 详情数据
      detilFormRules: {},
      addForm: { leaveDate: "" }, // 添加数据
      dialogAddVisible: false, // 添加弹窗是否显示
      addFormRules: {},
      addLoading: false
    };
  },
  methods: {
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
    },
    // 添加离开时间
    handleAdd(index, row) {
      console.log(index, row);
      let _this = this;
      _this.detilForm = row;
      _this.dialogAddVisible = true;
    },
    // 保存
    onSubmit() {
      let _self = this;
      _self.dialogAddVisible = false;
      _self.$message.success("保存成功！");
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

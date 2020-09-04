<template>
  <div class="container">
    <div class="m-tree-left-col">
      <c-tree></c-tree>
    </div>
    <div class="m-grid-right-col">
      <el-form ref="form" :inline="true" :model="form" class="fixFrom">
        <el-form-item label="车牌/姓名：">
          <el-input v-model="form.name" placeholder="请输入车牌/姓名" />
        </el-form-item>
        <el-form-item label="车辆类型：">
          <el-select v-model="form.carType" placeholder="请选择车辆类型">
            <el-option label="标准民用车" value="0"></el-option>
            <el-option label="工程车辆" value="1"></el-option>
          </el-select>
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
              @click.native="handleEdit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click.native="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </c-table>
      <!--修改弹窗-->
      <e-dialog :dialogVisibleFlag.sync="dialogVisibleFlag" />
      <!--查看详情弹窗-->
      <el-dialog
        :visible.sync="dialogVisible"
        title="车辆信息"
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
          <div>
            <el-form-item label="车牌号码：" prop="carNumber">
              <span class="info">{{ detilForm.carNumber }}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="车主姓名：" prop="name">
              <span class="info">{{ detilForm.name }}</span>
            </el-form-item>
            <el-form-item label="联系电话：" prop="tel">
              <span class="info">{{ detilForm.tel }}</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="车辆颜色：" prop="color">
              <span class="info">{{ detilForm.color }}</span>
            </el-form-item>
            <el-form-item label="车辆分类：" prop="type">
              <span class="info">{{ detilForm.type }}</span>
            </el-form-item>
          </div>
          <el-form-item label="备注：" prop="remarks">
            <span class="info">{{ detilForm.remarks }}</span>
          </el-form-item>
          <div>
            <el-form-item label="登记时间：" prop="registerDate">
              <span class="info">{{ detilForm.registerDate }}</span>
            </el-form-item>
            <el-form-item label="IEMI：" prop="iemi">
              <span class="info">{{ detilForm.iemi }}</span>
            </el-form-item>
          </div>
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
import eDialog from "./dialog/eDialog";
const columnMap = [
  {
    prop: "index",
    slot: true
  },
  {
    prop: "carNumber",
    label: "车牌号码",
    width: "200",
    align: "center"
  },
  {
    prop: "name",
    label: "车主姓名",
    align: "center"
  },
  {
    prop: "type",
    label: "车辆类型",
    align: "center"
  },
  {
    prop: "color",
    label: "车辆颜色",
    align: "center"
  },
  {
    prop: "tel",
    label: "联系电话",
    align: "center"
  },
  {
    prop: "remarks",
    label: "备注",
    align: "center"
  }
];
export default {
  components: { cTable, cTree, eDialog },

  data() {
    return {
      // 查询列表数据
      form: {
        name: "",
        carType: ""
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
          carNumber: "888888",
          name: "张三",
          type: "普通民用车",
          color: "白色",
          tel: "1500000",
          remarks: ""
        }
      ],
      dialogVisible: false, // 查看详情弹窗是否显示
      detilForm: {}, // 详情数据
      detilFormRules: {},
      dialogVisibleFlag: false // 修改弹窗是否显示
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
    },
    // 修改
    handleEdit: function(index, row) {
      console.log(row);
      let _this = this;
      _this.dialogVisibleFlag = true;
      _this.editForm = Object.assign({}, _this.row, {
        carNumber: row.carNumber,
        name: row.name
      });
    },
    // 删除
    handleDel() {
      this.$confirm("确认删除此数据吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      });
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

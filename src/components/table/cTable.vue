<template>
  <div id="custom">
    <el-table
      class="table"
      ref="multipleTable"
      v-loading="isLoadTable"
      :data="pagedTable"
      :border="border"
      :stripe="stripe"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @row-click="rowClickFun"
      :highlight-current-row="isHighlightCurrentRow"
      :header-cell-style="getRowClass"
      v-bind="$attrs"
    >
      <el-table-column
        v-if="isMutipleSelection"
        type="selection"
        :selectable="checkboxInit"
        width="55"
        :align="align"
      >
      </el-table-column>
      <el-table-column prop="index" label="序号" align="center" width="120">
        <template slot-scope="scope">{{ scope.$index + 1 }} </template>
      </el-table-column>
      <template v-for="(item, idx) in columnMap">
        <slot v-if="item.slot" :name="item.prop"> </slot>
        <el-table-column
          v-else
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :key="idx"
          :align="align"
        >
          <template slot-scope="scope">
            <span v-if="item.type === 'date'">{{
              scope.row[item.prop] | parseTime("{y}-{m}-{d} {h}:{i}")
            }}</span>
            <span v-if="item.type === 'time'">{{
              scope.row[item.prop] | parseTime("{y}-{m}-{d}")
            }}</span>
            <span v-if="item.type === undefined">{{
              scope.row[item.prop]
            }}</span>
            <span v-if="scope.row[item.prop] === null">{{ "暂无" }}</span>
            <template v-if="item.type === 'dict'">
              <div>{{ dictsMap[item.prop][scope.row[item.prop]] }}</div>
            </template>
          </template>
        </el-table-column>
      </template>
      <slot name="operate"></slot>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationOption.PageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="paginationOption.maxResultCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationOption.totalCount"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    paginationOption: {
      type: Object,
      require: true,
      default: () => {}
    },
    checkboxInit: {
      type: Function,
      default: null
    },
    isLoadTable: {
      type: Boolean,
      required: true
    },
    isMutipleSelection: {
      type: Boolean,
      required: false
    },
    isHighlightCurrentRow: {
      type: Boolean,
      required: false
    },
    isIndex: {
      type: Boolean,
      required: false
    },
    pagedTable: {
      type: Array,
      required: true,
      default: () => []
    },
    columnMap: {
      type: Array,
      default: () => []
    },
    dictsMap: {
      type: Object,
      default: () => {}
    },
    align: {
      type: String,
      required: false,
      default: "center"
    },
    border: {
      type: Boolean,
      required: false,
      default: false
    },
    stripe: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {};
  },
  created() {
    this.$emit("handleRef", this.$refs);
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },

    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    rowClickFun(val) {
      this.$emit("rowClick", val);
    },
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return "background:#F2F4F5;color:#000";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  /deep/ th {
    background: #e5ecf6 !important;
    color: #666 !important;
  }
}
.pagination {
  text-align: right;
  padding: 20px;
}
</style>

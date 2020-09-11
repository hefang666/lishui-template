<template>
  <div class="pagination-box">
    <el-pagination
      background
      :small="true"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :pager-count="5"
      layout="pager"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total', 'pageSize', 'currentPage'],
  methods: {
    // 获取当前选中第几页
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val);
    }
  }
};
</script>

<style scoped lang="scss">
.select-box {
  width: 60px;
}
</style>

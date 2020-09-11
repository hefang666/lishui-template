<template>
  <div class="select-box">
    <el-select v-model="pagesSize" size="mini" @change="getSizeNum">
      <el-option
        v-for="(item, index) in pageData"
        :key="index"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'PageSize',
  props: ['pageData', 'pageSize'],
  data() {
    return {
      pagesSize: 30
    };
  },
  methods: {
    // 获取每页多少条数据
    getSizeNum(val) {
      this.$emit('handleSizeChange', val);
    }
  },
  mounted() {
    this.pagesSize = this.$props.pageSize;
  }
};
</script>

<style>
.select-box {
  width: 60px;
}
</style>

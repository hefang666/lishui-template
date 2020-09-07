<template>
  <div class="search-box">
    <el-input
      placeholder="请输入内容"
      :prefix-icon="icon"
      v-model="searchWords"
    ></el-input>
    <el-button
      v-html="text"
      v-if="isButton"
      @click="submit"
      class="search-button"
      type="primary"
    ></el-button>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'el-icon-search'
    },
    text: {
      type: String,
      default: '查询'
    },
    isButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchWords: ''
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.searchWords);
    }
  }
};
</script>

<style lang="scss">
.search-box {
  display: inline-block;
  vertical-align: middle;
  .el-input {
    width: 250px;
    font-size: 12px;
  }
  .search-button {
    margin-left: 5px;
  }
  .el-input__inner {
    height: 28px;
    line-height: 28px;
    border: 1px solid #4b77be;
  }
  .el-input__icon {
    line-height: 28px;
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #c0c4cc;
    outline: 0;
  }
  .el-input--mini .el-input__inner {
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
  }
  .search-button {
    height: 28px;
    line-height: 28px;
    padding: 0 20px;
    vertical-align: top;
    background: #4b77be;
    border-color: #4b77be;
    &:hover,
    &:focus {
      opacity: 0.9;
    }
  }
}
</style>

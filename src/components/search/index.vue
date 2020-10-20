<template>
  <div class="search-box">
    <el-input
      :placeholder="placeholder"
      :prefix-icon="icon"
      v-model="searchWords"
      @input="changeWords"
      @keyup.enter.native="submit"
    ></el-input>
    <el-button
      v-html="text"
      v-if="isButton"
      @click="submit"
      class="search-button"
      type="primary"
      :loading="loading"
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
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    loading: {
      type: Boolean,
      default: false
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
    },
    changeWords(value) {
      this.$emit('changeSearch', value)
    }
  }
};
</script>

<style lang="scss">
.search-box {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  .el-input {
    width: 220px;
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
    line-height: 32px;
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #c0c4cc;
    outline: 0;
  }
  .el-input--mini .el-input__inner {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
  }
  .search-button {
    height: 32px;
    line-height: 32px;
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

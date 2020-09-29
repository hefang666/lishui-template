<template>
  <div class="jump-box">
    <span>到第</span>
    <el-input
      class="jump-input"
      size="mini"
      type="text"
      v-model.number="pageNum"
      oninput="value=value.replace(/[^\d]/g,'')"
      @blur="getInputValue"
      @keyup.enter.native="jump"
      :max="pagesNum"
    >
      {{ pageNum }}
    </el-input>
    <span>页</span>
    <el-button class="jump-button" type="primary" size="mini" @click="jump">
      跳转
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'PageJump',
  props: ['pagesNum', 'currentPage'],
  data() {
    return {
      pageNum: this.currentPage
    };
  },
  watch: {
    pagesNum() {
      console.log(this.pagesNum)
      if(this.pageNum > this.pagesNum)
        this.pageNum = this.pagesNum;
      this.$emit('handleCurrentChange', this.pageNum);
    }
  },
  methods: {
    // 获取输入框中的数值并进行处理
    getInputValue() {
      if (this.pageNum == '') {
        this.pageNum = 1;
      } else if (this.pageNum == 0) {
        this.pageNum = 1;
      } else if (this.pageNum > this.$props.pagesNum) {
        this.pageNum = this.pagesNum;
      }
    },
    // 点击跳转
    jump() {
      if(this.pageNum > this.pagesNum) this.pageNum = this.pagesNum;
      this.$emit('handleCurrentChange', this.pageNum);
    }
  }
};
</script>

<style socped lang="scss">
.jump-box {
  display: flex;
  font-weight: 400;

  span {
    font-size: 12px;
    line-height: 28px;
  }

  .jump-input {
    width: 60px;
    margin: 0 5px;
  }

  /deep/ .el-input--mini .el-input__inner {
    text-align: center !important;
    padding: 0 2px;
    width: 48px;
  }

  .jump-button {
    margin-left: 5px;
  }
}
</style>

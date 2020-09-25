<template>
  <div class="promptOperate-box">
    <el-dialog title="提示" :visible.sync="dialogOperate">
      <div class="content-box">
        <div class="cancel-box" @click="closeOperate">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="message-box">
          <div class="message">{{ message }}</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="determine">确 定</el-button>
        <el-button type="primary" @click="closeOperate">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialogOperate', 'operateType', 'message'],
  methods: {
    closeOperate() {
      let data = false;
      this.$emit('closeOperate', data);
    },
    determine() {
      let data = {
        flag: false,
        type: this.operateType
      }
      this.$emit('determine', data);
    }
  }
}
</script>

<style lang="scss">
.promptOperate-box {
  /deep/ .el-dialog {
    width: 280px;
    margin-top: 29% !important;
  }
  /deep/ .el-dialog__header {
    padding: 0;
    padding-bottom: 0;
    height: 28px;
    line-height: 28px;
    background: #4b77be;
  }
  /deep/ .el-dialog__title {
    line-height: 28px;
    font-size: 14px;
    color: #ffffff;
    padding-left: 15px;
  }
  /deep/ .el-dialog__headerbtn {
    top: 4px;
  }
  /deep/ .el-dialog__body {
    padding: 0;
  }
  /deep/ .el-dialog__footer {
    padding: 0 15px 12px;
  }
  .content-box {
    position: relative;
    .cancel-box {
      width: 20px;
      height: 20px;
      position: absolute;
      top: -25px;
      right: 15px;
      background: #4b77be;
      color: #ffffff;
      font-size: 16px;
      line-height: 20px;
      cursor: pointer;
    }
    .message-box {
      padding: 15px 15px 0;
      .message {
        font-size: 12px;
        line-height: 34px;
      }
    }
  }
}
</style>
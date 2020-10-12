<template>
  <div class="promptMessage-box">
    <el-dialog
      title="提示"
      :visible.sync="dialogMessage"
      :before-close="closeMessage"
    >
      <div class="content-box">
        <!-- <div class="cancel-box" @click="closeMessage">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div> -->
        <div class="message-box">
          <div class="icon-box">
            <i class="el-icoon el-icon-warning-outline"></i>
          </div>
          <div class="message">{{ message }}</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeMessage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialogMessage', 'message'],
  methods: {
    closeMessage() {
      let data = false;
      this.$emit('closeMessage', data);
    }
  }
}
</script>

<style lang="scss">
.promptMessage-box {
  /deep/ .el-dialog {
    width: 280px !important;
    margin-top: 30% !important;
  }
  /deep/ .el-dialog__header {
    padding: 0 !important;
    padding-bottom: 0 !important;
    height: 28px !important;
    line-height: 28px !important;
    background: #4b77be !important;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
  /deep/ .el-dialog__title {
    line-height: 28px !important;
    font-size: 14px !important;
    color: #ffffff !important;
    padding-left: 15px !important;
  }
  /deep/ .el-dialog__headerbtn {
    top: 4px !important;
  }
  /deep/ .el-dialog__body {
    padding: 0 !important;
    height: 110px !important;
  }
  /deep/ .el-dialog__footer {
    text-align: center !important;
    padding: 0 15px 12px !important;
    border-top: none !important;
  }
  .content-box {
    position: relative !important;
    /* .cancel-box {
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
    } */
    .message-box {
      padding: 15px 15px 0;
      .icon-box {
        text-align: center;
        font-size: 33px;
        color: #e6ae35;
      }
      .message {
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        padding: 5px 0;
      }
    }
  }
}
</style>
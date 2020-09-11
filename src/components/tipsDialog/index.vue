<template>
  <div class="tips-dialog-box">
    <el-dialog
      title="提示"
      :visible.sync="dialogTips"
      width="20%">
      <div class="content-box">
        <div class="cancel-box" @click="closeTips">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="text-box">
          <span>{{ msg }}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTips">取 消</el-button>
        <el-button type="primary" @click="closeTips">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TipsDialog',
  props: ['dialogTips', 'msg'],
  methods: {
    closeTips() {
      let data = false;

      this.$emit('closeTips', data);
    }
  }
}
</script>

<style scoped lang="scss">
.tips-dialog-box {
  /deep/ .el-dialog {
    margin-top: 38vh !important;
  }
	/deep/ .el-dialog__header {
		padding: 0 80px 0 20px;
		border-bottom: 1px solid #eee;
		background: #4b77be;
		height: 30px;
		line-height: 30px;
	}
	/deep/ .el-dialog__title {
		font-size: 14px;
		color: #FFFFFF;
	}
	/deep/ .el-dialog__headerbtn {
		top: 6px;
	}
	/deep/ .el-dialog__headerbtn .el-dialog__close {
		color: #FFFFFF;
	}
	/deep/ .el-dialog__body {
		padding:0;
	}
	/deep/ .el-dialog__footer {
		border-top: 1px solid #e5e5e5;
  }
  .content-box {
		position: relative;
		.cancel-box {
			width: 20px;
			height: 20px;
			background: #4b77be;
			position: absolute;
			top: -25px;
			right: 20px;
			z-index: 20;
			color: #ffffff;
			font-size: 20px;
    }
    
    .text-box {
      padding: 15px 20px;
    }
	}
}
</style>

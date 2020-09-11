<template>
  <div class="preview-box">
    <el-dialog title="附件预览" :visible.sync="dialogPreview">
      <div class="content-box">
        <div class="cancel-box" @click="closePreview">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePreview">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: ['dialogPreview'],
  methods: {
    closePreview() {
      let data = false;
      this.$emit('closePreview', data);
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/public.scss';
.preview-box {
  width: 100%;
  /deep/ .el-dialog{
    width: 100%;
    height: 100%;
    margin: 0 !important;
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
		height: 880px;
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

		.content_box {
			padding: 16px;
		}
	}
}
</style>

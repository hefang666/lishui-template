<template>
  <div class="viewTable-box">
    <el-dialog :title="tableName" :visible.sync="dialogShow">
      <div class="content-box">
        <div class="cancel-box" @click="closeTable">
          <span>关闭</span>
        </div>
        <div class="content_box">
          <component :is="componentName"></component>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InspectorTable from './InspectorTable.vue';
import ProductionTable from './ProductionTable.vue';
import MaintenanceTeam from './MaintenanceTeamTable.vue';
import MaintenanceGroup from './MaintenanceGroupTable.vue';
export default {
  name: 'Viewtable',
  props: ['dialogShow', 'tableName', 'componentName'],
  components: {
    InspectorTable,
    ProductionTable,
    MaintenanceTeam,
    MaintenanceGroup
  },
  data() {
    return {

    }
  },
  methods: {
    closeTable() {
      let data = false;
      this.$emit('closeTable', data);
    }
  }
};
</script>

<style scoped lang="scss">
.viewTable-box {
  /deep/ .el-dialog {
		width: 1100px;
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
		height: 700px;
	}
	/deep/ .el-dialog__footer {
		border-top: 1px solid #e5e5e5;
  }
  
  .content-box {
		position: relative;
		.cancel-box {
			height: 28px;
      line-height: 28px;
      background: #4b77be;
      position: absolute;
      top: -30px;
      right: 20px;
      z-index: 20;
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;
		}

		.content_box {
			padding: 16px;
		}
	}
}
</style>
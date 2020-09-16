<template>
  <div class="area-manage right">
    <div class="button-box">
      <el-button>新增路线</el-button>
      <el-button>删除路线</el-button>
    </div>
    <div class="area-tabs">
      <div class="area-lists-box area-info">
        <div class="area-content-box">
          <div class="area-title">范围绘制</div>
          <div class="button-box area-draw text-center p-t-10 p-b-10">
            <el-button type="primary" plain>划区域</el-button>
            <el-button type="primary" plain>重置范围</el-button>
          </div>
          <div class="area-title">片区信息</div>
          <el-form 
            :model="ruleForm"
            label-width="85px"
            :rules="rules"
            class="m-t-10"
          >
            <el-form-item prop="name" label="片区名:">
              <el-input v-model="ruleForm.name" placeholder="请输入片区名" />
            </el-form-item>
          </el-form>
          <div class="area-title">设备点信息</div>
          <el-tabs v-model="activeName" class="snt-card-tabs m-t-10" type="card">
            <el-tab-pane label="设备" name="area">
              <DeviceTable :tabledata="tabData"></DeviceTable>
            </el-tab-pane>
            <el-tab-pane label="管道" name="layer">
              <DeviceTable :tabledata="tabData"></DeviceTable>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="page-box button-box text-right">
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceTable from './DeviceTable';
export default {
  data() {
    return {
      activeName: 'area',
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入片区名', trigger: 'blur' }
        ]
      },
      tabData: [{
        deviceCode: 'JS50576',
        deviceName: '蝶阀',
        devicePoint: '104.15880336,30.01392323',
        address: '城北路',
      }]
    };
  },
  components: {
    DeviceTable
  }
};
</script>

<template>
  <div class="area-handle-btn">
    <div class="button-box">
      <el-button @click="addArea">新增片区</el-button>
      <el-button :loading="deleteLoading" @click="deleteArea">删除片区</el-button>
    </div>
    <div v-show="handleStatus === 1 || handleStatus === 2" class="area-manage right">
      <div  class="area-tabs">
        <div class="area-lists-box area-info">
          <div class="area-content-box">
            <div class="area-title">范围绘制</div>
            <div class="button-box area-draw text-center pt-10 pb-10">
              <el-button @click="drawAreaFunc" type="primary" plain>划区域</el-button>
              <el-button @click="resetDrawArea" type="primary" plain>重置范围</el-button>
            </div>
            <div class="area-title">片区信息</div>
            <el-form
              :model="ruleForm"
              label-width="85px"
              :rules="rules"
              class="mt-10"
              ref="form"
            >
              <el-form-item prop="name" label="片区名:">
                <el-input v-model="ruleForm.name" placeholder="请输入片区名" />
              </el-form-item>
            </el-form>
            <div class="area-title">设备点信息</div>
            <div class="button-box text-center mt-10">
              <el-button type="primary" @click="showDeviceList" plain>生成设备列表</el-button>
              <div class="text-left pl-10 mt-10">
                <span class="mr-20">设备点：{{areaInfo.selectPoint ? areaInfo.selectPoint.length : 0}}个</span>
                <span> 管线： {{areaInfo.lineLength ? areaInfo.lineLength.toFixed(2) : 0}}km</span>
              </div>
            </div>
            <el-tabs v-model="activeName" class="snt-card-tabs mt-10" type="card">
              <el-tab-pane label="设备" name="area">
                <DeviceTable :type="1" @deleteDevice="deleteDeviceFunc" @showInfo="showPointInfo" table-cc="123" :tabledata="selectPoint"></DeviceTable>
              </el-tab-pane>
              <el-tab-pane label="管道" name="layer">
                <DeviceTable :type="2" @deleteDevice="deleteDeviceFunc" @showInfo="showLineInfo" table-cc="123" :tabledata="selectLine"></DeviceTable>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="page-box button-box text-right">
            <el-button :loading="submitLoading" @click="saveArea" type="primary">保存</el-button>
            <el-button @click="cancelUpdate">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {Message} from 'element-ui';
import DeviceTable from './DeviceTable';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('area');
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
      // 新增和编辑区域的loading
      submitLoading: false,
      // 删除区域loading
      deleteLoading: false
    };
  },
  computed: {
    ...mapState(['areaInfo', 'handleStatus', 'selectPoint', 'selectLine', 'chooseAreaId'])
    // ...mapGetters(['lineLength'])
  },
  mounted() {
    // this.$parent.$ref.map.initDrawMap();
  },
  components: {
    DeviceTable
  },
  methods: {
    ...mapActions(['changeAreaInfo', 'changeHandleStatus', 'addAreaFunc', 'updataAreaFunc', 'deleteAreaFunc', 'deleteDeviceSigle']),
    // 改变操作的方式
    changeStatus(status) {
      this.changeHandleStatus(status)
    },

    // 删除设备
    deleteDeviceFunc(data) {
      this.deleteDeviceSigle(data);
    },

    // 新增片区
    addArea() {
      if(this.handleStatus) {
        this.$alert('请先保存片区！', '提示', {
          confirmButtonText: '确定',
        });
        return false;
      }
      this.changeAreaInfo({})
      this.changeStatus(1);
    },

    // 删除片区
    deleteArea() {
      // console.log(this.chooseAreaId)
      let chooseAreaId = this.chooseAreaId;
      if(chooseAreaId.length < 1) {
        this.$message({
          type: 'error',
          message: '请先选择要操作的数据'
        })
        return false;
      }
      this.deleteLoading = true;
      this.deleteAreaFunc({
        id: chooseAreaId
      }).then(() => {
        this.deleteLoading = false;
      }).catch(() => {
        this.deleteLoading = false;
      });
    },

    // 点击画区域按钮
    drawAreaFunc() {
      this.$parent.$refs.map.drawAreaFunc();
    },
    // 重置绘制的区域范围
    resetDrawArea() {
      this.$parent.$refs.map.resetDrawArea();
    },
    // 取消编译信息
    cancelUpdate () {
      this.$refs.form.resetFields();
      this.changeStatus('');
      this.$parent.$refs.map.resetDrawArea();
    },
    // 生成设备列表
    showDeviceList() {
      var areaInfo = this.$parent.$refs.map.getAreaInfo();
      this.changeAreaInfo(areaInfo)
    },
    showPointInfo(index) {
      let pointList = this.areaInfo.selectPoint;
      let currentPoint = [];
      currentPoint = pointList[index];
      this.$parent.$refs.map.setMapOverLayInfo(currentPoint)
    },
    showLineInfo(index) {
      let lineList = this.areaInfo.selectLine;
      let currentList = [];
      currentList = lineList[index];
      this.$parent.$refs.map.setMapOverLayInfo(currentList)
    },

    // 设置片区名i
    setName(name) {
      this.ruleForm.name = name;
    },

    // 重置片区内容
    resetArea() {
      this.$refs.form.resetFields();
      this.changeAreaInfo({});
      this.resetDrawArea()
    },

    // 保存区域信息
    saveArea() {
      let _this = this;
      this.$refs.form.validate((valid)=> {
        if(!valid) return false;
        if((!_this.areaInfo.selectPoint || _this.areaInfo.selectPoint.length < 1) && (!_this.areaInfo.selectLine || _this.areaInfo.selectLine.length < 1)) {
          this.$message({
            type: 'error',
            message: '请选择设备或者管道'
          })
          return false;
        }
        if (_this.areaInfo.selectPoint == 0 && _this.areaInfo.selectLine != 0 && _this.areaInfo.lineLength < 1) {
          this.$message({
            type: 'error',
            message: '当前选择区域管道长度不足1km，请重置区域'
          })
          return false;
        }
        this.submitLoading = true;
        let areaDetail = {
          name: _this.ruleForm.name,
          pipelineLength: _this.areaInfo.lineLength || 0,
          pointCount: _this.areaInfo.selectPoint.length || 0,
          areaPoint: _this.areaInfo.area,
          deviceLists: _this.areaInfo.selectPoint,
          pipelineLists: _this.areaInfo.selectLine
        };
        if(_this.handleStatus === 1) {
          this.addAreaFunc(areaDetail)    
          .then(() => {
            // console.log(resp)
            this.resetArea();
            this.submitLoading = false; 
          })
          .catch(() => {
            this.submitLoading = false; 
          })
        } else {
          var id = this.areaInfo.id || '';
          if(!id) {
            this.$message({
              message: '请选择编辑的片区',
              type: 'error',
              duration: 2 * 1000
            });
            return false;
          }
          areaDetail.id = id;
          this.updataAreaFunc(areaDetail)
          .then(() => {
            // console.log(resp);
            this.resetArea();
            this.submitLoading = false; 
          })
          .catch(() => {
            this.submitLoading = false; 
          })
        }
      })
    }
  },
};
</script>
   
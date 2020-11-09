<template>
  <div class="viewRoute-box dialog-box button-box">
    <el-dialog
      title="查看路线"
      :visible.sync="dialogRoute"
      :close-on-click-modal="false"
      :before-close="closeRoute"
    >
      <div class="content-box form-box">
        <div class="map-box">
          <map-route :areaInfo="areaDetailsInfo" ref="map" :mapid="'ss_' + areaDetailsInfo.id"></map-route>
        </div>
        <div class="content-right-box">
          <div class="right-box">
            <choose-equip
            @clickView="views"
            :type-text="typestr"
            :type-src="typeStr"
            ref="equipData"
          ></choose-equip>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRoute">取 消</el-button>
        <el-button
          v-if="typestr == 'choose'"
          type="primary"
          @click="determine"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import ChooseEquip from '@/views/public/ChooseEquipment.vue';
import MapRoute from '@/components/mapRoute/index.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: areaState} = createNamespacedHelpers('area');
export default {
  name: 'AddTask',
  props: {
    dialogRoute: {
      type: Boolean,
      default: false
    },
    typestr: {
      type: String,
      default: 'view'
    },
    typeStr: {
      type: String,
      default: 'single'
    }
  },
  components: {
    ChooseEquip,
    MapRoute
  },
  computed: {
    ...areaState(['areaDetailsInfo'])
  },
  watch: {
    areaDetailsInfo: function(areaInfo) {
      if(!this.$refs.map) return false;
      this.isArea = true;
      this.$refs.map.setAreaInfo({
        areaPoint: areaInfo.areaPoint,
        deviceLists: areaInfo.deviceLists,
        pipelineLists: areaInfo.pipelineLists
      })
    }
  },
  data() {
    return {
      isArea: false
    };
  },
  mounted() {
    var areaInfo = this.areaDetailsInfo;
    if(!this.isArea && areaInfo.areaPoint) {
      this.isArea = true
      this.$refs.map.setAreaInfo({
        areaPoint: areaInfo.areaPoint,
        deviceLists: areaInfo.deviceLists,
        pipelineLists: areaInfo.pipelineLists
      })
    }
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeRoute() {
      this.$refs.map.clearMapLayer();
      console.log('点击了X');
      let data = {
        dialogRoute: false,
        data: []
      };
      this.$emit('getRouteData', data);
    },

    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    },
    // 点击确定
    determine() {
      // 判断是单选还是多选
      if (this.typeStr == 'single') {
        // 单选
        if (this.$refs.equipData.devInfo == '') {
          // 没有数据
          alert('请选择设备或管道');
          return;
        } else {
          // 有数据
          let data = {
            dialogRoute: false,
            type: this.typeStr,
            devInfo: this.$refs.equipData.devInfo
          }
          this.$emit('getRouteData', data);
        }
      } else if (this.typeStr == 'multiple') {
        // 多选
        // 判断是否选择有管道或者设备
        if (
          this.$refs.equipData.checkedEqui.length != 0 
          ||
          this.$refs.equipData.checkedCon.length != 0
        ) {
          let data = {
            dialogRoute: false,
            type: this.typeStr,
            equiData: this.$refs.equipData.checkedEqui,
            conData: this.$refs.equipData.checkedCon
          };
          this.$emit('getRouteData', data);
        } else {
          alert('请选择设备或管道');
          return;
        }
      }
      // if (this.$refs.equipData.checkedInfo == '') {
      //   alert('请选择设备');
      // } else {
      //   let data = {
      //     dialogRoute: false,
      //     data: this.$refs.equipData.checkedInfo
      //   };
      //   this.$emit('getRouteData', data);
      // }
    },
    // 点击了查看
    views(data) {
      console.log(data);
      this.$refs.map.getDeviceTooltip(data);
      // if (data.type == 1) {
      //   // 设备
      //   let str = data.deviceCode + ';' + data.deviceName;
      //   console.log(str);
      //   // this.$refs.map.ShowPointFunc(str);
      // } else if (data.type == 2) {
      //   // 管道
      //   // let str = data.deviceCode + ';' + data.deviceName;
      //   // this.$refs.map.ShowLineFunc(str);
      // }
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.viewRoute-box {
  .content-box {
    height: 480px;
    .map-box {
      width: 100%;
      height: 100%;
      /* background: rosybrown; */
    }
    .content-right-box {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 460px;
      width: 315px;
      background: #ffffff;
      overflow: hidden;
      box-shadow: 2px 2px 20px rgb(196, 196, 196);
      border-radius: 5px;
      .right-box {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>

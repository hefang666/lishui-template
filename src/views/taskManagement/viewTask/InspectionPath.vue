<template>
  <div class="inspectionPath-box">
    <div class="map-box">
      <map-route ref="map" :areaInfo="areaDetailsInfo" :mapid="'sss_' + taskDetail.id"></map-route>
    </div>
    <div class="inspectionPath-info-box button-box">
      <div class="inspectionPath-info-item">
        <div class="inspectionPath-info-items">
          <div class="inspectionPath-info-item-title">
            巡检路线：
          </div>
          <div class="inspectionPath-info-item-content">
            {{ taskDetail.areaName }}
          </div>
        </div>
        <div class="inspectionPath-info-items">
          <div class="inspectionPath-info-item-title">
            设备点数：
          </div>
          <div class="inspectionPath-info-item-content">
            {{ areaDetail.pointCount }}
          </div>
        </div>
        <div class="inspectionPath-info-items">
          <div class="inspectionPath-info-item-title">
            管道长度：
          </div>
          <div class="inspectionPath-info-item-content">
            {{ areaDetail.pipelineLength }}
          </div>
        </div>
      </div>
      <!-- <div class="inspectionPath-info-item">
        <div class="inspectionPath-info-items">
          <div class="inspectionPath-info-item-title">
            规划路径：
          </div>
          <div class="inspectionPath-info-item-content">
            <el-button type="primary" plain>
              显示
            </el-button>
          </div>
        </div>
        <div class="inspectionPath-info-items">
          <div class="inspectionPath-info-item-title">
            预计里程：
          </div>
          <div class="inspectionPath-info-item-content">
            1.95km
          </div>
        </div>
        <div class="inspectionPath-info-items">
          <div class="inspectionPath-info-item-title">
            预计花费时间：
          </div>
          <div class="inspectionPath-info-item-content">
            0.10小时
          </div>
        </div>
      </div>
      <div class="inspectionPath-info-item">
        <div class="inspectionPath-info-items">
          <div class="inspectionPath-info-item-title">
            实际路径：
          </div>
          <div class="inspectionPath-info-item-content">
            <el-button type="primary" plain>
              隐藏
            </el-button>
          </div>
        </div>
        <div class="inspectionPath-info-items">
          <div class="inspectionPath-info-item-title">
            实际花费时间：
          </div>
          <div class="inspectionPath-info-item-content">
            0.00小时
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import MapRoute from '@/components/mapRoute/index.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: taskState} = createNamespacedHelpers('taskManagement');
const {mapState: areaState} = createNamespacedHelpers('area');
export default {
  components: {
    MapRoute
  },
  computed: {
    ...taskState(['taskDetail','areaDetail']),
    ...areaState(['areaDetailsInfo'])
  },
  watch: {
    areaDetailsInfo(areainfo) {
      console.log(111111);
      if(this.$refs.map) {
        let data = {
          areaPoint: areainfo.areaPoint.endsWith(';') ?  areainfo.areaPoint : (areainfo.areaPoint+ ';'),
          deviceLists: areainfo.deviceLists,
          pipelineLists: areainfo.pipelineLists
        }
        this.$refs.map.setAreaInfo(data);
      }
    }
  },
  mounted() {
    console.log(2222222222222);
    if(this.$refs.map) {
      let areainfo = this.areaDetailsInfo;
      let data = {
        areaPoint: areainfo.areaPoint.endsWith(';') ?  areainfo.areaPoint : (areainfo.areaPoint+ ';'),
        deviceLists: areainfo.deviceLists,
        pipelineLists: areainfo.pipelineLists
      }
      this.$refs.map.setAreaInfo(data);
    }
  }
}
</script>

<style lang="scss" scoped>
.inspectionPath-box {
  display: flex;
  justify-content: space-between;
  .map-box {
    /* width: 70%; */
    width: 560px;
    height: 450px;
  }

  .inspectionPath-info-box {
    flex: 1;
    .inspectionPath-info-item {
      padding: 20px 15px;
      border-bottom: 1px dashed #0099cc;

      .inspectionPath-info-items {
        display: flex;
        height: 35px;
        line-height: 35px;
      }
    }
  }
}
</style>
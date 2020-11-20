<template>
  <div class="onlineTrajectory-box dialog-box button-box">
    <el-dialog
      title="在线轨迹"
      :visible="dialogOnline"
      :close-on-click-modal="false"
      :before-close="closeOnline"
    >
      <div class="content-box">
        <div class="map-box">
          <map-route
            :maptype="'localtion'"
            :localtion-data="localList"
            ref="map"
            :mapid="'ss_' + userId"
          ></map-route>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeOnline">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MapRoute from '@/components/mapRoute/index.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('personManagement');
export default {
  props: ['dialogOnline', 'userId'],
  components: {
    MapRoute
  },
  data() {
    return {
      personOnline: {},
      personId: 1
    }
  },
  computed: {
    ...mapState(['localList'])
  },
  methods: {
    closeOnline() {
      console.log('点击了关闭人员轨迹');
      // 关闭人员运动的定时器
      this.$refs.map.clearTimer();
      let data = false;
      this.$emit('closeOnline', data);
    },
    // 执行绘制人员轨迹
    initGuiji() {
      this.$refs.map.initLineOrbit();
    }
  }
};
</script>

<style lang="scss" scoped>
.onlineTrajectory-box {
  .content-box {
    width: 100%;
    height: 100%;

    .map-box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

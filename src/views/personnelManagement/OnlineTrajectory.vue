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
          <map-route :areaInfo="personOnline" ref="map" :mapid="'ss_' + userId"></map-route>
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
  methods: {
    closeOnline() {
      console.log('点击了关闭人员轨迹');
      let data = false;
      this.$emit('closeOnline', data);
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

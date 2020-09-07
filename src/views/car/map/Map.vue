<template>
  <div class="index-map-box">
    <div ref="map" id="map" class="index-map"></div>
    <div
      class="task-container overlay-element"
      v-for="(item, index) in memberList"
      :key="index + 'overlay'"
      :id="`overlay-element-${item.id}`"
      @mouseenter="() => handleOverlayEnter(item)"
      @mouseleave="() => handleOverlayLeave(item)"
    >
      <el-form
        ref="infoForm"
        :model="infoForm"
        label-width="100px"
        :inline="true"
      >
      <el-form-item label="车牌：" prop="">
        <span class="info">88888</span> </el-form-item>
        <el-form-item label="信号：" prop="">
        <span class="info">强</span> </el-form-item>
        <el-form-item label="车辆状态：" prop="">
        <span class="info">正常行驶</span> </el-form-item>
        <el-form-item label="车主：" prop="">
        <span class="info">张三</span> </el-form-item>
        <el-form-item label="当前：" prop="">
        <span class="info">渝中区上清寺</span> </el-form-item>
        <el-form-item label="速度：" prop="">
        <span class="info">60km/h</span> </el-form-item>
      </el-form>
    </div>
    <div
      v-for="(item, index) in memberList"
      :id="`img-${item.id}`"
      :key="index + 'img'"
      style="min-width: 20px; cursor: pointer;"
      class="index-map-archor-img"
    >
      <img
        alt
        src="@/assets/logo.png"
        @mouseenter="() => handleAnchorEnter(item)"
        @mouseleave="() => handleAnchorLeave(item)"
      />
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('home');
export default {
  data() {
    return {
      map: {},
      zoomMap: '12',
      isOverlayEnter: false,
      infoForm:{}, // 车辆详情数据
      position: []
    };
  },
  computed: {
    ...mapState(['memberList'])
  },
  mounted() {
    // 初始化地图
    const SNTGIS = window.SNTGIS;
    const tdMap = new SNTGIS.layer.TDMap({
      token: '7ab767e38fe3d9c04f144a091cff214f',
      type: 1,
      layerName: '天地图电子底图'
    });
    const dmLayer = new SNTGIS.layer.TDMap({
      token: '7ab767e38fe3d9c04f144a091cff214f',
      type: 4,
      layerName: '天地图电子底图'
    });
    const zoomMap = this.zoomMap;
    this.map = new SNTGIS.Map({
      layers: [tdMap, dmLayer],
      center: [106.548293, 29.565552],
      zoom: zoomMap,
      maxZoom: 20,
      minZoom: 5,
      target: 'map'
    });
    this.addMember(this.memberList);
  },
  methods: {
    routePush(path) {
      this.$router.push(path);
    },
    // 向地图中增加人员位置
    addMember(data) {
      const position = data.map(item => {
        const location = item.location.split(',');
        const x = Number(location[0]);
        const y = Number(location[1]);
        return [x, y];
      });
      this.position = [...this.position, ...position];
      // 将默认的第一个人设为中心位置
      if (position[0]) this.map.getView().setCenter(position[0]);

      // 循环每一个人象地图中添加人的位置及信息
      data.forEach((member, index) => {
        const overlayDom = document.querySelector(`#overlay-element-${member.id}`);
        const imgDom = document.querySelector(`#img-${member.id}`);

        const overlay = new window.ol.Overlay({
          element: overlayDom,
          className: `customer-overlay customer-overlay-${index}`,
          position: position[index],
          offset: [30, -35]
        });

        const anchor = new window.ol.Overlay({
          element: imgDom,
          className: `customer-anchor customer-anchor-${index}`,
          positioning: 'center-center',
          position: position[index]
        });

        this.overlays = {...this.overlays, [`${member.id}`]: overlay};

        this.anchors = {...this.anchors, [`${member.id}`]: anchor};

        // this.map.addOverlay(overlay);
        this.map.addOverlay(anchor);
      });
    },
    handleAnchorEnter(member) {
      this.map.addOverlay(this.overlays[member.id]);
    },
    // 移除人员时删除人员信息
    handleAnchorLeave(member) {
      setTimeout(() => {
        if (!this.isOverlayEnter) {
          this.map.removeOverlay(this.overlays[member.id]);
        }
      }, 200);
    },
    handleOverlayEnter() {
      this.isOverlayEnter = true;
    },
    handleOverlayLeave(member) {
      this.isOverlayEnter = false;
      this.map.removeOverlay(this.overlays[member.id]);
    },

    // 将地图聚焦到选中人选的位置
    focusOnCurrentMember (index) {
      this.map.getView().setCenter(this.position[index]);
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/style.scss';
</style>

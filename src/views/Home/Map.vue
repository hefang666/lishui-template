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
      <div class="task-title clearfix">
        李四（2020-09-09 09:09:09）
        <span class="fr">时长：6.3 h</span>
      </div>
      <el-tabs
        tab-position="bottom"
        type="card"
        value="first"
        class="snt-tabs-bottom"
      >
        <el-tab-pane label="任务" name="first">
          <div @click="routePush('/plan')">
            <p>任务名称：xxxxxxxx巡检任务<label class="m-l-5">进行中</label></p>
            <p>
              任务类别：临时任务
            </p>
            <p>
              预计开始时间：2020-09-09 09:09:09
            </p>
            <p>
              预计结束时间：2020-09-09 09:09:09
            </p>
            <p>巡检片区：重庆市渝中区渝中街道</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工单" name="second">
          <div @click="routePush('/plan')">
            <p>工单类型：核查情况<label class="m-l-5">进行中</label></p>
            <p>
              <span class="order-title fl">工单内容：</span>
              <span class="order-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida
                dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvin………
              </span>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
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

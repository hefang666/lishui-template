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
    </div>
    <div
      v-for="(item, index) in memberList"
      :id="`img-${item.id}`"
      :key="index + 'img'"
      style="min-width: 20px; cursor: pointer;"
      class="index-map-archor-img"
    >
      <!-- <img
        alt
        src="@/assets/logo.png"
        @mouseenter="() => handleAnchorEnter(item)"
        @mouseleave="() => handleAnchorLeave(item)"
      /> -->
      <el-popover
        placement="top-start"
        title=""
        width="200"
        trigger="click"
        content="">
        <!-- <img alt src="@/assets/logo.png" slot="reference"/> -->
        <i class="el-icon-truck" slot="reference" style="font-size:56px;color:#4b77be;"></i>
        <div class="info-box">
          <div class="info-list">
            <div>车牌：{{item.number}}</div>
            <div>车辆状态：{{item.status}}</div>
            <div>信号：{{item.signal}}</div>
            <div>车主：{{item.name}}</div>
            <div>当前位置：{{item.location}}</div>
            <div>速度：{{item.speed}}</div>
          </div>
          <div class="btn-box">
            <el-button type="primary" size="small" @click="handleLocus">轨迹</el-button>
            <el-button type="primary" size="small">跟踪</el-button>
          </div>
        </div>
       
      </el-popover>
       
    </div>
    <!--轨迹弹窗-->
    <locus-task :dialogLocus.sync="dialogLocus"></locus-task>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const { mapState } = createNamespacedHelpers('home');
import LocusTask from '../locusTask/LocusTask';
export default {
  components: { 
    LocusTask
  },
  data() {
    return {
      map: {},
      zoomMap: '12',
      isOverlayEnter: false,
      infoForm:{}, // 车辆详情数据
      dialogLocus: false,
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
    // 打开轨迹弹窗
    handleLocus() {
      this.dialogLocus = true
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
.info-box{
  display: flex;
  justify-content: space-between;
  .info-list div{
    font-size: 12px;
  }
  .btn-box{
    flex: 1;
    margin-top: 10px;
    /deep/.el-button{
      margin-left: 0;
      margin-top: 10px;
      background-color: #4b77be;
      border: none;
    }
  }
}
</style>

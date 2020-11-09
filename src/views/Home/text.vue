<template>
  <div class="index-map-box">
    <div ref="map" id="map" class="index-map"></div>
    <div
      v-for="(item, index) in memberList"
      :key="index + 'overlay'"
      :id="`overlay-element-${item.userId}`"
      style="min-width: 20px; cursor: pointer;"
      class="index-map-archor-img"
    >
      <!-- <img src="@/assets/icon-location-active.png"
        @mouseenter="() => handleAnchorEnter(item)"
        @mouseleave="() => handleAnchorLeave(item)"
      /> -->
      <img src="@/assets/icon-location-active.png" @click="mouseenterEnter(index)" />
    </div>

    <div
      v-show="isshow"
      v-for="(item, index) in memberList"
      :id="`img-${item.userId}`"
      :key="index + 'img'"
      style="min-width: 20px; cursor: pointer;"
      class="task-container overlay-element"
    >
 <!-- @mouseenter="() => handleOverlayEnter(item)"
      @mouseleave="() => handleOverlayLeave(item)" -->

      <div class="task-title clearfix">
        {{ item.userName }}（{{ item.onlineTime || '' }}）
        <span class="fr">时长：{{ item.duration }} h</span>
      </div>
      <el-tabs
        tab-position="bottom"
        type="card"
        value="first"
        class="snt-tabs-bottom"
      >
        <el-tab-pane label="任务" name="first">
          <el-carousel trigger="click" :autoplay="autoplay" height="145px">
            <el-carousel-item
              v-for="(task, index) in item.taskLists"
              :key="'index_task_' + index"
            >
              <div class="bg-white">
                <p>
                  任务名称：{{ task.taskName
                  }}<label class="m-l-5">进行中</label>
                </p>
                <p>任务类别：{{ task.type }}</p>
                <p>预计开始时间：{{ task.planStartTime }}</p>
                <p>预计结束时间：{{ task.planEndTime }}</p>
                <p>巡检片区：{{ task.taskAreaName }}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="工单" name="second">
          <el-carousel trigger="click" :autoplay="autoplay" height="145px">
            <el-carousel-item
              v-for="(order, index) in item.workOrderLists"
              :key="'index_order_' + index"
            >
              <div class="bg-white">
                <p>
                  工单类型：{{ order.workTypeStr
                  }}<label class="m-l-5">进行中</label>
                </p>
                <p>
                  <span class="order-title fl">工单内容：</span>
                  <span class="order-content">
                    {{ order.content }}
                  </span>
                </p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- v-show="item.isOnline" -->
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
      position: [],
      isshow: false,
      clicknum:0,
      autoplay: false,
      memberIndex: -1
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
      maxZoom: 18,
      minZoom: 5,
      target: 'map'
    });
    // this.addMember(this.memberList);
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
      // this.position = [...position];
      // 将默认的第一个人设为中心位置
      if (position[0]) this.map.getView().setCenter(position[0]);

      // 循环每一个人象地图中添加人的位置及信息
      data.forEach((member, index) => {
        console.log('member :>> ', member);
        const overlayDom = document.querySelector(
          `#overlay-element-${member.userId}`
        );
        const imgDom = document.querySelector(`#img-${member.userId}`);

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

        this.overlays = {...this.overlays, [`${member.userId}`]: overlay};

        this.anchors = {...this.anchors, [`${member.userId}`]: anchor};

        // 标记点
        this.map.addOverlay(overlay);
        // 标记（详情）
        this.map.addOverlay(anchor);
      });
    },

    mouseenterEnter(index) {
      let newarr = []
      newarr.push(this.memberList[index])
      this.addMember(newarr)
      this.isshow = true;
    },
    mouseleaveLeave() {
      this.isshow = false;
    },
    //
    handleAnchorEnter(member) {
      this.map.addOverlay(this.overlays[member.userId]);
    },
    // 移除人员时删除人员信息
    handleAnchorLeave(member) {
      console.log(member);
      setTimeout(() => {
        if (!this.isOverlayEnter) {
          this.map.removeOverlay(this.overlays[member.userId]);
        }
      }, 200);
    },
    handleOverlayEnter() {
      this.isOverlayEnter = true;
    },
    handleOverlayLeave(member) {
      console.log(member);
      this.isOverlayEnter = false;
      this.map.removeOverlay(this.overlays[member.userId]);
    },

    // 将地图聚焦到选中人选的位置
    focusOnCurrentMember(index) {
      // this.map.getView().setCenter(this.position[index]);
      this.isshow = false;
      let newmemberList = [];
      newmemberList.push(this.memberList[index]);
      this.memberIndex = index;
      this.addMember(newmemberList);
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/style.scss';
</style>

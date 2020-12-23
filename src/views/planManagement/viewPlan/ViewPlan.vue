<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog
      title="查看计划"
      :visible.sync="dialogView"
      :close-on-click-modal="false"
      :before-close="closeView"
    >
      <div class="content-box form-box">
        <div class="details-box">
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">计划名称：</div>
              <div class="item-content">
                <span>{{ planDetails.name }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">负责人：</div>
              <div class="item-content">
                <span>{{ planDetails.person }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">巡检片区：</div>
              <div class="item-content">
                <span>{{ planDetails.areaName }}</span>
                <el-button
                  @click="viewRoute"
                  class="view-button"
                >
                  查看片区
                </el-button>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">参与人：</div>
              <div class="item-content">
                <div class="partic-linheight">
                  <span
                    v-for="(item, index) in planDetails.user"
                    :key="index"
                  >
                    <span v-if="index != 0">、</span>
                    {{ item.userName }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">计划时效：</div>
              <div class="item-content">
                <span>{{ planDetails.endTime }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">计划周期：</div>
              <div class="item-content">
                <span>{{ planDetails.cycleStr }}</span>
                <div
                  v-for="(item, index) in planDetails.taskLists"
                  :key="index"
                  class="cycle-box">
                  {{ item.beginTime }}——{{ item.endTime }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeView">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 设备点详情弹窗 -->
    <!-- <equipment-info
      :dialog-equi="dialogEqui"
      @getEquiData="getEquiData"
    ></equipment-info> -->

    <!-- 查看路线弹窗 -->
    <view-route
      :dialog-route="dialogRoute"
      @getRouteData="getRouteData"
      ref="mapview"
    ></view-route>
  </div>
</template>

<script>
// import EquipmentInfo from './EquipmentInformation.vue';
import ViewRoute from '@/views/public/ViewRoute.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: planState} = createNamespacedHelpers('planManagement');
const {mapActions: areaActions} = createNamespacedHelpers('area');
export default {
  name: 'AddTask',
  props: ['dialogView'],
  components: {
    // EquipmentInfo,
    ViewRoute
  },
  computed: {
    ...planState(['planDetails'])
  },
  data() {
    return {
      // tabs当前聚焦在那一个上面
      activeName: 'basicInfo',
      
      checkedName: '',

      // 是否显示设备点巡检信息详情弹窗
      // dialogEqui: false,

      // 是否显示查看路线弹窗
      dialogRoute: false
    };
  },
  methods: {
    // ...mapActions(['changeModalStatus']),
    ...areaActions(['getAreaDetailInfo']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeView() {
      this.$emit('closeView', false);
      // this.changeModalStatus({
      //   name: 'checkModalVisible',
      //   status: false
      // })
    },
    // 点击查看路线，打开查看路线弹窗
    viewRoute() {
      this.dialogRoute = true;
      this.$refs.mapview.setMapReview();
      // let param = {
      //   Id: this.planDetails.areaId
      // }
      // this.getAreaDetailInfo(param).then(res => {
      //   if (res.success) {
      //     this.dialogRoute = true;
      //   }
      // }).catch(() => {
      //   // this.setMessage('未获取到区域id，无法查看路线');
      //   // this.dialogMessage = true;
      // })
    },

    // tabs切换时的点击事件
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    // 获取从分页传过来的每页多少条数据
    // changePageSize(data) {
    //   console.log(data);
    // },
    // 获取从分页传过来的当前页数
    // changeCurrentPage(data) {
    //   console.log(data);
    // },
    // 查看按钮
    // handleSee() {},
    // 选中的行
    clickRow(val) {
      // console.log(val);
      this.checkedName = val.name;
    },
    // 获取从设备点详细信息弹窗传来的值
    // getEquiData(data) {
    //   this.dialogEqui = data.dialogEqui;
    // },
    // 关闭查看路线弹窗
    getRouteData(data) {
      this.dialogRoute = data.dialogRoute;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
  .content-box {
    .details-box {
      .list-item {
        display: flex;
        justify-content: space-between;
        /* height: 40px; */
        line-height: 40px;

        .list-items {
          display: flex;
          flex: 1;

          .item-title,
          .item-content span {
            font-size: 12px;
          }

          .item-title {
            width: 100px;
            text-align: right;
            margin-right: 5px;
          }

          .item-content {
            flex: 1;
            span {
              color: #999999;
            }
            .partic-linheight {
              line-height: 25px;
              padding-top: 7px;
            }
            .view-button {
              margin-left: 10px;
            }
            /deep/ .el-button {
              color: #4b77be;
              border-color: #4b77be;
            }
            /deep/ .el-button:hover {
              background: #4b77be;
              color: #ffffff;
            }
          }
        }
        .has-two-item {
          width: 46%;
        }
      }
    }
  }
}
</style>

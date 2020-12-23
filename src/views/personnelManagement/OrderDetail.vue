<template>
  <div class="planDetail-box dialog-box button-box">
    <el-dialog
      title="工单详情"
      :visible.sync="dialogOrderDetail"
      :close-on-click-modal="false"
      :before-close="closeOrder"
    >
      <div class="content-box form-box">
        <div class="plan-content-box">
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">工单类型：</div>
              <div class="item-content">
                <span>{{ orderDetail.typeStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">负责人：</div>
              <div class="item-content">
                <span v-if="orderDetail.workTranfer.length != 0">
                  <span
                    v-for="(item, index) in orderDetail.workTranfer"
                    :key="index"
                  >
                    <span>{{ item.workPerson }}</span>
                    <span class="transfer-icon" @click="openTransferReason(index)">
                      <img src="../../assets/arrow-right.png" alt="">
                    </span>
                  </span>
                </span>
                <span>{{ orderDetail.person }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">工单内容：</div>
              <div class="item-content">
                <span>{{ orderDetail.content }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">附件：</div>
              <div class="item-content">
                <div class="enclosure-box">
                  <div class="image-box">
                    <div
                      v-for="(item, index) in orderDetail.resourceList"
                      :key="index"
                      @click="previewImg(item)"
                      class="img-box"
                    >
                      <el-image
                        style="width: 100%; height: 100%"
                        :src="httpUrl + item.url"
                        fit="cover"
                      ></el-image>
                    </div>
                  </div>
                  <!-- <div
                    v-for="(item, index) in orderDetail.resourcelist"
                    :key="index"
                    class="enclosure-item"
                  >
                    <div class="enclosure-title">{{ item. fileName}}</div>
                    <div class="enclosure-download" @click="downLoadPic(item)">下载</div>
                    <div class="enclosure-preview" @click="previewImg(item)">预览</div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="workOrder-back-box">
            <!-- 查漏、查漏延伸 -->
            <div
              v-if="orderDetail.type == 1 || orderDetail.type == 2"
              class="workOrder-box"
            >
              <!-- 查漏 -->
              <div class="back-box">
                <div class="back-title">查漏：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.leak"
                    :key="index"
                    class="back-item"
                  >
                    <span class="koujing">DN{{ item.caliber }}1</span>
                    <span class="zhi">{{ item.value }}m</span>
                  </div>
                </div>
              </div>
              <!-- 查漏延伸 -->
              <div class="back-box">
                <div class="back-title">查漏延伸：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.leakExtension"
                    :key="index"
                    class="back-item"
                  >
                    <span class="koujing">DN{{ item.caliber }}</span>
                    <span class="zhi">{{ item.value }}m</span>
                  </div>
                </div>
              </div>
              <!-- 查漏地点 -->
              <div class="back-box">
                <div class="back-title">查漏地点：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.address"
                    :key="index"
                    class="back-item"
                  >
                    {{ item.value }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 维修管道、维修管道延伸、贫水区改造 -->
            <div
              v-if="
                orderDetail.type == 3 ||
                orderDetail.type == 4 ||
                orderDetail.type == 6
              "
              class="workOrder-box"
            >
              <!-- 维修 -->
              <div class="back-box">
                <div class="back-title">维修：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.repair"
                    :key="index"
                    class="back-item"
                  >
                    <span class="koujing">DN{{ item.caliber }}</span>
                    <span class="zhi">{{ item.value }}m</span>
                  </div>
                </div>
              </div>
              <!-- 改管 -->
              <div class="back-box">
                <div class="back-title">改管：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.change"
                    :key="index"
                    class="back-item"
                  >
                    <span class="koujing">DN{{ item.caliber }}</span>
                    <span class="zhi">{{ item.value }}m</span>
                  </div>
                </div>
              </div>
              <!-- 阀门 -->
              <div class="back-box">
                <div class="back-title">阀门：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.valve"
                    :key="index"
                    class="back-item"
                  >
                    <span class="koujing">DN{{ item.caliber }}</span>
                    <span class="zhi">{{ item.value }}m</span>
                  </div>
                </div>
              </div>
              <!-- 消防栓 -->
              <div class="back-box">
                <div class="back-title">消防栓：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.fireHydrant"
                    :key="index"
                    class="back-item"
                  >
                    <span class="koujing">DN{{ item.caliber }}</span>
                    <span class="zhi">{{ item.value }}m</span>
                  </div>
                </div>
              </div>
              <!-- 贫水区改造地点 -->
              <div class="back-box">
                <div class="back-title">贫水区改造地点：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.address"
                    :key="index"
                    class="back-item"
                  >
                    {{ item.value }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 违章罚款 -->
            <div v-if="orderDetail.type == 5" class="workOrder-box">
              <!-- 违章单位 -->
              <div class="back-box">
                <div class="back-title">违章单位：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in orderDetail.workOrderBacks.company"
                    :key="index"
                    class="back-item"
                  >
                    {{ item.value }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 设备信息 -->
          <div v-if="orderDetail.deviceDetails != null" class="div-title">设备信息</div>
          <div v-if="orderDetail.deviceDetails != null" class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备编号：</div>
              <div class="item-content">
                <span>{{ orderDetail.deviceDetails.deviceCode }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备名称：</div>
              <div class="item-content">
                <span>{{ orderDetail.deviceDetails.deviceName }}</span>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备点状态：</div>
              <div class="item-content">
                <span>{{ orderDetail.deviceDetails.deviceStatusStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备坐标点：</div>
              <div class="item-content">
                <span>{{ orderDetail.deviceDetails.devicePoint }}</span>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">地址：</div>
              <div class="item-content">
                <span>{{ orderDetail.deviceDetails.address }}</span>
              </div>
            </div>
          </div>
          <!-- 事件信息 -->
          <div v-if="orderDetail.eventDetails != null" class="div-title">事件信息</div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">事件类型：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.typeStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">事件提交时间：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.creationTime }}</span>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">报告人：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.creationName }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">联系方式：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.phone }}</span>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">事件状态：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.statusStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">提交工单时间：</div>
              <div class="item-content">
                <span>{{ orderDetail.creationTime }}</span>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">异常类型：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.errorType }}</span>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">巡检内容：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeOrder">取 消</el-button>
      </div>
    </el-dialog>
    
    <!-- 查看路线弹窗 -->
    <!-- <view-route
      :dialog-route="dialogRoute"
      @getRouteData="getRouteData"
      ref="mapview"
    ></view-route> -->

    <!-- 预览弹窗 -->
    <preview
      :dialog-preview="dialogPreview"
      :file-data="fileData"
      @closePreview="closePreview"
    ></preview>

    <reason
      :dialog-reason="dialogReason"
      :transfer-info="transferInfo"
      @closeReason="closeTransferReason"
    ></reason>
  </div>
</template>

<script>
// import ViewRoute from '@/views/public/ViewRoute.vue';
import Reason from '@/views/workOrderManagement/TransferReason.vue';
import Preview from '@/components/upLoad/Preview.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: orderState} = createNamespacedHelpers('workOrderManagement');
const {mapState: uploadState, mapActions: uploadActions} = createNamespacedHelpers('upload');
export default {
  name: 'OrderDetail',
  props: ['dialogOrderDetail'],
  components: {
    // ViewRoute,
    Preview,
    Reason
  },
  data() {
    return {
      dialogRoute: false,

      // 是否显示预览弹窗
      dialogPreview: false,

      // 图片信息
      fileData: {},

      dialogReason: false,

      // 转派原因
      transferInfo: {}
    }
  },
  computed: {
    ...orderState(['orderDetail']),
    ...uploadState(['httpUrl'])
  },
  methods: {
    ...uploadActions(['downloadFile']),
    closeOrder(){
      let data = {
        dialogOrderDetail: false
      }
      this.$emit('getOrderDetailData', data);
    },
    // 点击查看路线，打开查看路线弹窗
    // viewRoute() {
    //   // this.dialogRoute = true;
    //   this.dialogRoute = true;
    //   this.$refs.mapview.setMapReview();
    // },
    // 关闭查看路线弹窗
    // getRouteData(data) {
    //   this.dialogRoute = data.dialogRoute;
    // },
    // 关闭预览弹窗
    closePreview(data) {
      this.dialogPreview = data;
    },
    // 预览
    previewImg(data) {
      this.fileData = data;
      this.dialogPreview = true;
    },
    // 下载
    downLoadPic(data) {
      var param = {
        downLoadName: data.fileName,
        fileName: data.url
      };
      this.downloadFile(param);
    },
    // 打开转派原因
    openTransferReason(index) {
      // console.log(index);
      this.transferInfo = this.orderDetail.workTranfer[index];
      this.dialogReason = true;
    },
    // 关闭转派原因
    closeTransferReason(data) {
      this.dialogReason = data;
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.content-box {
  .plan-content-box {
    padding: 0 40px;
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
          span {
            color: #999999;
          }

          .transfer-icon {
              width: 20px;
              height: 20px;
              display: inline-block;
              margin: 0 10px;
              cursor: pointer;

              img {
                width: 100%;
                height: 100%;
              }
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

          .enclosure-box {
            display: flex;
              .image-box {
                clear: both;
                .img-box {
                  width: 90px;
                  height: 90px;
                  margin-right: 20px;
                  margin-top: 10px;
                  float: left;
                  cursor: pointer;
                }
              }
            /* .enclosure-item {
              display: flex;

              .enclosure-title,
              .enclosure-download,
              .enclosure-preview {
                padding: 0 10px;
              }

              .enclosure-download,
              .enclosure-preview {
                color: #4b77be;
              }

              .enclosure-download:hover,
              .enclosure-preview:hover {
                color: #4288f8;
                cursor: pointer;
              }
            } */
          }
        }
      }
      .has-two-item {
        width: 46%;
      }
    }

    .time-box {
      padding: 0 30px;
      .list-item {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;

        .list-items {
          width: 43%;
          font-size: 12px;
          color: #999999;
          &:nth-child(odd) div{
            width: 100%;
            text-align: right;
            padding-right: 30px;
          }
          &:nth-child(even) div{
            width: 100%;
            padding-left: 30px;
          }
        }
      }
    }

    .workOrder-back-box {
      width: 100%;
      .back-box {
        display: flex;
        .back-title {
          width: 100px;
          text-align: right;
          line-height: 40px;
          font-size: 12px;
        }
        .back-content {
          flex: 1;
          width: 100%;
          .back-item {
            width: 46%;
            line-height: 20px;
            margin-top: 9px;
            color: #999999;
            font-size: 12px;

            .zhi {
              margin-left: 20px;
            }
          }
          .back-item:nth-child(odd) {
            float: left;
          }
          .back-item:nth-child(even) {
            float: right;
          }
        }
      }
    }
    .div-title {
      border-bottom: 1px solid #4b77be;
      line-height: 30px;
      padding: 0 5px 0;
    }
  }
}
</style>
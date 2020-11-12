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
                <!-- <span>3小时20分</span> -->
                <div class="enclosure-box">
                  <div
                    v-for="(item, index) in orderDetail.resourcelist"
                    :key="index"
                    class="enclosure-item"
                  >
                    <div class="enclosure-title">{{ item. fileName}}</div>
                    <div class="enclosure-download" @click="downLoadPic(item)">下载</div>
                    <div class="enclosure-preview" @click="previewImg(item)">预览</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null" class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备名称：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.deviceName }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备编号：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.deviceCode }}</span>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备坐标点：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.devicePoint }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">地址：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.address }}</span>
              </div>
            </div>
          </div>
          <div v-if="orderDetail.eventDetails != null"  class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备点状态：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.deviceStatusStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">异常类型：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.typeStr }}</span>
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
              <div class="item-title">巡检内容：</div>
              <div class="item-content">
                <span>{{ orderDetail.eventDetails.content }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">损坏：</div>
              <div class="item-content">
                <div class="enclosure-box">
                  <div
                    v-for="(item, index) in orderDetail.resourcelist"
                    :key="index"
                    class="enclosure-item"
                  >
                    <div class="enclosure-title">{{ item.fileName}}</div>
                    <div class="enclosure-download">下载</div>
                    <div class="enclosure-preview">预览</div>
                  </div>
                </div>
                <span>2019-01-01 18:00</span>
              </div>
            </div>
          </div> -->
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
  </div>
</template>

<script>
// import ViewRoute from '@/views/public/ViewRoute.vue';
import Preview from '@/components/upLoad/Preview.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: orderState} = createNamespacedHelpers('workOrderManagement');
const {mapActions: uploadActions} = createNamespacedHelpers('upload');
export default {
  name: 'OrderDetail',
  props: ['dialogOrderDetail'],
  components: {
    // ViewRoute,
    Preview
  },
  data() {
    return {
      dialogRoute: false,

      // 是否显示预览弹窗
      dialogPreview: false,

      // 图片信息
      fileData: {}
    }
  },
  computed: {
    ...orderState(['orderDetail'])
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
      height: 40px;
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
            .enclosure-item {
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
            }
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
  }
}
</style>
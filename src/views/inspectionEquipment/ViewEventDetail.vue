<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog
      title="事件详情"
      :visible.sync="dialogEventView"
      :close-on-click-modal="false"
      :before-close="closeViewEvent"
    >
      <div class="content-box form-box">
        <!-- <div class="cancel-box" @click="closeViewEvent">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div> -->
        <div class="list-box">
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备名称：</div>
              <div class="item-content">
                <span>{{ eventDetails.deviceName }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备编号：</div>
              <div class="item-content">
                <span>{{ eventDetails.deviceCode }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备坐标：</div>
              <div class="item-content">
                <span>{{ eventDetails.devicePoint }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">地址：</div>
              <div class="item-content">
                <span>{{ eventDetails.address }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备点状态：</div>
              <div class="item-content">
                <span>{{ eventDetails.deviceStatusStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">异常类型：</div>
              <div class="item-content">
                <span>{{ eventDetails.errorType }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">事件类型：</div>
              <div class="item-content">
                <span>{{ eventDetails.typeStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">事件提交时间：</div>
              <div class="item-content">
                <span>{{ eventDetails.creationTime }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">报告人：</div>
              <div class="item-content">
                <span>{{ eventDetails.creationName }}</span>
              </div>
            </div>
            <!-- <div class="list-items has-two-item">
              <div class="item-title">提交工单时间：</div>
              <div class="item-content">
                <span>{{ eventDetails }}</span>
              </div>
            </div> -->
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">预估损失水量：</div>
              <div class="item-content">
                <span>{{ eventDetails.predictWaterLoss }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">巡检内容：</div>
              <div class="item-content">
                <div class="content-script">
                  {{ eventDetails.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">附件：</div>
              <div class="item-content">
                <div class="enclosure-box">
                  <div class="image-box">
                    <div
                      v-for="(item, index) in eventDetails.resourcelist"
                      :key="index"
                      @click="openPre(item)"
                      class="img-box"
                    >
                    <el-image
                      style="width: 100%; height: 100%"
                      :src="httpUrl + item.url"
                      fit="cover"></el-image>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeViewEvent">取 消</el-button>
      </div>
    </el-dialog>

    <pre-view
      :dialog-preview="dialogPreview"
      :file-data="fileData"
      @closePreview="closePreview"
    ></pre-view>
  </div>
</template>

<script>
import preView from '@/components/upLoad/Preview.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: eventState} = createNamespacedHelpers('eventManagement');
const {mapState: uploadState} = createNamespacedHelpers('upload');
export default {
  name: 'ViewEventDetail',
  props: ['dialogEventView'],
  data() {
    return {
      // 是否显示预览弹窗
      dialogPreview: false,
      // 要预览的图片信息
      fileData: ''
    };
  },
  components: {
    preView
  },
  computed: {
    ...eventState(['eventDetails']),
    ...uploadState(['httpUrl'])
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeViewEvent() {
      let data = false;
      this.$emit('closeViewEvent', data);
    },
    // 关闭预览弹窗
    closePreview(data) {
      this.dialogPreview = data;
    },

    // 打开预览弹窗
    openPre(data) {
      this.fileData = data;
      this.dialogPreview = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
  .content-box {
    .list-box {
      padding: 0 40px;

      .list-item {
        display: flex;
        justify-content: space-between;
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
            .content-script {
              color: #999999;
              line-height: 28px;
              padding-top: 6px;
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
                  background: red;
                  margin-right: 20px;
                  margin-top: 10px;
                  float: left;
                }
              }
              
              /* .enclosure-item {
                display: flex;

                .enclosure-title,
                .enclosure-download,
                .enclosure-preview {
                  padding: 0 10px;
                }
              } */
            }
          }
        }
        .has-two-item {
          width: 46%;
        }
      }
    }
  }
  /deep/ .el-dialog__body {
    height: 480px;
    overflow: auto;
  }
}
</style>

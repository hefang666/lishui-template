<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog
      title="事件详情"
      :visible.sync="dialogView"
      :close-on-click-modal="false"
      :before-close="closeView"
    >
      <div class="content-box form-box">
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
                <span>2019-01-01 18:00</span>
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
            <div class="list-items has-two-item">
              <div class="item-title">联系方式：</div>
              <div class="item-content">
                <span>{{ eventDetails.phone }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">事件状态：</div>
              <div class="item-content">
                <span>{{ eventDetails.statusStr }}</span>
              </div>
            </div>
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
                <span>{{ eventDetails.content }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">附件：</div>
              <div class="item-content">
                <div class="enclosure-box">
                  <div
                    v-for="(item, index) in eventDetails.resourcelist"
                    :key="index"
                    class="enclosure-item">
                    <div class="enclosure-title">{{ item.fileName }}</div>
                    <div class="enclosure-download" @click="downLoadPic(item)">下载</div>
                    <div class="enclosure-preview" @click="previewImg(item)">预览</div>
                  </div>
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

    <!-- 预览弹窗 -->
    <preview
      :dialog-preview="dialogPreview"
      :file-data="fileData"
      @closePreview="closePreview"
    ></preview>
  </div>
</template>

<script>
import Preview from '@/components/upLoad/Preview.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: eventState} = createNamespacedHelpers('eventManagement');
const {mapActions: uploadActions} = createNamespacedHelpers('upload');
export default {
  name: 'ViewDetail',
  props: ['dialogView'],
  components: {
    Preview
  },
  data() {
    return {
      // 是否显示预览弹窗
      dialogPreview: false,

      // 图片信息
      fileData: {}
    };
  },
  computed: {
    ...eventState(['eventDetails'])
  },
  methods: {
    ...uploadActions(['downloadFile']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeView() {
      let data = false;
      this.$emit('closeView', data);
    },
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
      // console.log(data);
      var param = {
        downLoadName: data.fileName,
        fileName: data.url
      }
      this.downloadFile(param);
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
    }
  }
}
</style>

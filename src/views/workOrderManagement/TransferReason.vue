<template>
  <div class="transferReason-box dialog-box button-box">
    <el-dialog
      title="转派原因"
      :visible.sync="dialogReason"
      :close-on-click-modal="false"
      :before-close="closeReason"
    >
      <div class="content">
        <div class="item">
          <div class="item-title">转派原因：</div>
          <div class="item-content reson-box">{{ transferInfo.transferReason }}</div>
        </div>
        <div class="item">
          <div class="item-title">附件信息：</div>
          <div class="item-content">
            <div class="enclosure-box">
              <div
                v-for="(item, index) in transferInfo.resourcelist"
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeReason">返 回</el-button>
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
const {mapActions: uploadActions} = createNamespacedHelpers('upload');
export default {
  name: 'Transferreason',
  props: ['dialogReason', 'transferInfo'],
  data () {
    return {
      fileData: '',
      dialogPreview: false
    }
  },
  components: {
    Preview
  },
  methods: {
    ...uploadActions(['downloadFile']),
    closeReason() {
      var data = false;
      this.$emit('closeReason', data);
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
      var param = {
        downLoadName: data.fileName,
        fileName: data.url
      }
      this.downloadFile(param);
    }
  }
}
</script>

<style lang="scss" scoped>
.transferReason-box {
  .content {
    padding: 20px;
    .item {
      display: flex;
      line-height: 40px;
      .item-title {
        width: 100px;
        text-align: right;
        margin-right: 5px;
        font-size: 12px;
      }
      .item-content {
        font-size: 12px;
        color: #999999;
        flex: 1;
        line-height: 20px;
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
      .reson-box {
        padding-top: 10px;
      }
    }
  }
}
</style>
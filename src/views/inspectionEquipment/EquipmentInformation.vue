<template>
  <div class="equipment-Information-box dialog-box button-box">
    <el-dialog
      title="设备点巡检任务详情"
      :visible.sync="dialogEqui"
      :close-on-click-modal="false"
      :before-close="closeEqui"
    >
      <div class="content-box form-box">
        <!-- <div class="cancel-box" @click="closeEqui">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div> -->
        <div class="equip-box">
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备名称：</div>
              <div class="item-content">
                <span>{{ pointDetails.name }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备编号：</div>
              <div class="item-content">
                <span>{{ pointDetails.code }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备点坐标：</div>
              <div class="item-content">
                <span>{{ pointDetails.point }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备点巡检时间：</div>
              <div class="item-content">
                <span>{{ pointDetails.time }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">巡检状态：</div>
              <div class="item-content">
                <span>{{ pointDetails.inspectionStatusStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备点状态：</div>
              <div class="item-content">
                <span>{{ pointDetails.statusStr }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">地址：</div>
              <div class="item-content">
                <span>{{ pointDetails.address }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">巡检内容：</div>
              <div class="item-content">
                <div class="content-text">
                  {{ pointDetails.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">附件：</div>
              <div class="item-content">
                <div class="enclosure-box">
                  <div
                    v-for="(item, index) in pointDetails.resourcelist"
                    :key="index"
                    class="enclosure-item"
                  >
                    <div class="enclosure-title">{{ item.fileName }}</div>
                    <div class="enclosure-download">下载</div>
                    <div class="enclosure-preview">预览</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEqui">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('taskManagement');
export default {
  name: 'EquipmentInformation',
  props: ['dialogEqui'],
  computed: {
    ...mapState(['pointDetails'])
  },
  data() {
    return {};
  },
  methods: {
    closeEqui() {
      let data = {
        dialogEqui: false,
        data: []
      };
      this.$emit('getEquiData', data);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.equip-box {
  padding: 0 20px;
  .list-item {
    display: flex;
    justify-content: space-between;
    min-height: 40px;
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

        .content-text {
          line-height: 20px;
          margin-top: 10px;
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
          }
        }
      }
    }
    .has-two-item {
      width: 46%;
    }
  }
}
</style>

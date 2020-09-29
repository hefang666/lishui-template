<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="事件详情" :visible.sync="dialogView">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeView">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="list-box">
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">工单类型：</div>
              <div class="item-content">
                <span>{{ orderDetails.typeStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">负责人：</div>
              <div class="item-content">
                <span>{{ orderDetails.person }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">工单状态：</div>
              <div class="item-content">
                <span>{{ orderDetails.typeStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">工单提交时间：</div>
              <div class="item-content">
                <span>{{ orderDetails.person }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">完成时间：</div>
              <div class="item-content">
                <span>{{ orderDetails.typeStr }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">预计完成时间：</div>
              <div class="item-content">
                <span>{{ orderDetails.person }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">工单内容：</div>
              <div class="item-content">
                <span>{{ orderDetails.content }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">附件：</div>
              <div class="item-content">
                <div class="enclosure-box">
                  <div class="enclosure-item">
                    <div class="enclosure-title">附件名字</div>
                    <div class="enclosure-download">下载</div>
                    <div class="enclosure-preview">预览</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="workOrder-back-box">
            <!-- 查漏、查漏延伸 -->
            <div
              v-if="orderDetails.type == 1 || orderDetails.type == 2"
              class="workOrder-box"
            >
              <!-- 查漏 -->
              <div class="back-box">
                <div class="back-title">查漏：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <!-- 查漏延伸 -->
              <div class="back-box">
                <div class="back-title">查漏延伸：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <!-- 查漏地点 -->
              <div class="back-box">
                <div class="back-title">查漏地点：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 维修管道、维修管道延伸、贫水区改造 -->
            <div
              v-if="
                orderDetails.type == 3 ||
                orderDetails.type == 4 ||
                orderDetails.type == 6
              "
              class="workOrder-box"
            >
              <!-- 维修 -->
              <div class="back-box">
                <div class="back-title">维修：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <!-- 改管 -->
              <div class="back-box">
                <div class="back-title">改管：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <!-- 阀门 -->
              <div class="back-box">
                <div class="back-title">阀门：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <!-- 消防栓 -->
              <div class="back-box">
                <div class="back-title">消防栓：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <!-- 贫水区改造地点 -->
              <div class="back-box">
                <div class="back-title">贫水区改造地点：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 违章罚款 -->
            <div v-if="orderDetails.type == 5" class="workOrder-box">
              <!-- 违章单位 -->
              <div class="back-box">
                <div class="back-title">违章单位：</div>
                <div class="back-content">
                  <div
                    v-for="(item, index) in 11"
                    :key="index"
                    class="back-item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeView">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('workOrderManagement');
export default {
  name: 'OrderDetail',
  props: ['dialogView'],
  computed: {
    ...mapState(['orderDetails'])
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeView() {
      let data = false;
      this.$emit('closeView', data);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
  .content-box {
    height: 500px;
    overflow: auto;
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
              }
            }
          }
        }
        .has-two-item {
          width: 46%;
        }
      }
      .workOrder-back-box {
        width: 100%;
        .back-box {
          display: flex;
          .back-title {
            width: 100px;
            text-align: right;
          }
          .back-content {
            flex: 1;
            width: 100%;
            .back-item {
              width: 46%;
              line-height: 20px;
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
    }
  }
}
</style>

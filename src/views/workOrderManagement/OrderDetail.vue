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
                <span>********巡检任务</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">负责人：</div>
              <div class="item-content">
                <span>张三</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">工单内容：</div>
              <div class="item-content">
                <span>这里是备注内容备注内容备注内容</span>
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
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeView">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  props: ['dialogView'],
  data() {
    return {};
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeView() {
      let data = false;
      this.$emit('closeView', data);
    },
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

<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="访客记录" :visible.sync="dialogView">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeView">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="info-box">
            <div class="list-item">
                <div class="list-items has-two-item">
                <div class="item-title">名称：</div>
                <div class="item-content">
                    <span>水电费</span>
                </div>
                </div>
                <div class="list-items has-two-item">
                <div class="item-title">证件号码：</div>
                <div class="item-content">
                    <span>74546546</span>
                </div>
                </div>
            </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeView">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: 'ViewTask',
    props:['dialogView'],
    data() {
      return {

      }
    },
    methods: {
      // 点击取消或者右上角的×关闭查看弹窗
       closeView() {
        let data = {
            dialogView: false,
            data: []
        };
        this.$emit('getViewData', data);
        },
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
    .info-box {
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
        }
        }
        .has-two-item {
        width: 46%;
        }
    }
    }
</style>
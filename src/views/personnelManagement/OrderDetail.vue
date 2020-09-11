<template>
  <div class="planDetail-box dialog-box button-box">
    <el-dialog title="工单详情" :visible.sync="dialogOrderDetail">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeOrder">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="plan-content-box">
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">工单类型：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">负责人：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">工单内容：</div>
              <div class="item-content">
                <span>3小时20分</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">附件：</div>
              <div class="item-content">
                <span>3小时20分</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备名称：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备编号：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备坐标点：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">地址：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备点状态：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">异常类型：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">事件类型：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
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
                <span>2019-01-01 18:00</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">联系方式：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">事件状态：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">提交工单时间：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">巡检内容：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">损坏：</div>
              <div class="item-content">
                <span>2019-01-01 18:00</span>
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
    <view-route
      :dialog-route="dialogRoute"
      @getRouteData="getRouteData"
    ></view-route>
  </div>
</template>

<script>
import ViewRoute from '@/views/public/ViewRoute.vue';
export default {
  name: 'OrderDetail',
  props: ['dialogOrderDetail'],
  components: {
    ViewRoute
  },
  data() {
    return {
      dialogRoute: false
    }
  },
  methods: {
    closeOrder(){
      let data = {
        dialogOrderDetail: false
      }
      this.$emit('getOrderDetailData', data);
    },
    // 点击查看路线，打开查看路线弹窗
    viewRoute() {
      this.dialogRoute = true;
    },
    // 关闭查看路线弹窗
    getRouteData(data) {
      this.dialogRoute = data.dialogRoute;
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
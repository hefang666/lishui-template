<template>
  <div class="planDetail-box dialog-box button-box">
    <el-dialog
      title="计划详情"
      :visible.sync="dialogPlanDetail"
      :close-on-click-modal="false"
      :before-close="closePlan"
    >
      <div class="content-box form-box">
        <div class="plan-content-box">
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">计划名称：</div>
              <div class="item-content">
                <span>{{ planDetails.name }}</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">负责人：</div>
              <div class="item-content">
                <span>{{ planDetails.person }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">巡检片区：</div>
              <div class="item-content">
                <span>{{ planDetails.areaName }}</span>
                <el-button
                  @click="viewRoute"
                  class="view-button"
                >
                  查看路线
                </el-button>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">参与人：</div>
              <div class="item-content">
                <span>{{ planDetails.participant }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">计划时效：</div>
              <div class="item-content">
                <span>{{ planDetails.endTime }}</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">计划周期：</div>
              <div class="item-content">
                <span>{{ planDetails.cycleStr }}</span>
                <div
                  v-for="(item, index) in planDetails.taskLists"
                  :key="index"
                  class="cycle-box">
                  {{ item.beginTime }}——{{ item.endTime }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePlan">取 消</el-button>
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
import {createNamespacedHelpers} from 'vuex';
const {mapState: planState} = createNamespacedHelpers('planManagement');
const {mapActions: areaActions} = createNamespacedHelpers('area');
export default {
  name: 'PlanDetail',
  props: ['dialogPlanDetail'],
  components: {
    ViewRoute
  },
  computed: {
    ...planState(['planDetails'])
  },
  data() {
    return {
      dialogRoute: false
    }
  },
  methods: {
    ...areaActions(['getAreaDetailInfo']),
    closePlan(){
      let data = {
        dialogPlanDetail: false
      }
      this.$emit('getPlanDetailData', data);
    },
    // 点击查看路线，打开查看路线弹窗
    viewRoute() {
      // this.dialogRoute = true;
      let param = {
        Id: this.planDetails.areaId
      }
      this.getAreaDetailInfo(param).then(res => {
        if (res.success) {
          // console.log(res);
          this.dialogRoute = true;
        }
      }).catch(() => {
        // this.setMessage('未获取到区域id，无法查看路线');
        // this.dialogMessage = true;
      })
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
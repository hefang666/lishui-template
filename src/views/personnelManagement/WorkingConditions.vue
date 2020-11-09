<template>
  <div class="workingConditions-box dialog-box button-box">
    <el-dialog title="任务详情"
      :visible.sync="dialogWorking"
      :close-on-click-modal="false"
      :before-close="closeWorking"
    >
      <div class="content-box form-box">
        <div class="tabs-box">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="综合情况" name="generalSituation">
              <div class="basicInfo-box">
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">当前负责巡检计划：</div>
                    <div class="item-content">
                      <span>{{ details.currentPlanCount }}件</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">当前计划巡检设备：</div>
                    <div class="item-content">
                      <span>{{ details.currentDeviceCount }}个</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年完成巡检任务：</div>
                    <div class="item-content">
                      <span>{{ details.taskCount }}个</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">今年完成巡检设备：</div>
                    <div class="item-content">
                      <span>{{ details.deviceCount }}个</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计巡检管道：</div>
                    <div class="item-content">
                      <span>{{ details.pipelineCount }}公里</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计上报事件：</div>
                    <div class="item-content">
                      <span>{{ details.eventCount }}件</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计暂停时间：</div>
                    <div class="item-content">
                      <span>{{ details.suspendTimeStr }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计关闭任务：</div>
                    <div class="item-content">
                      <span>{{ details.taskCloseCount }}件</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计完成工单：</div>
                    <div class="item-content">
                      <span>{{ details.workOrderCount }}件</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="负责计划" name="planning">
              <div class="plainning-box">
                <div class="table-box">
                  <el-table
                    ref="multipleTable"
                    :data="planList"
                    :stripe="true"
                    tooltip-effect="dark"
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @row-click="clickPlanRow"
                  >
                    <el-table-column
                      align="center"
                      prop="name"
                      label="计划名称"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="cycleStr"
                      label="巡检周期"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="person"
                      label="负责人"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="endTime"
                      label="预计到期时间"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="statusStr"
                      label="计划状态"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column align="center" width="70" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="SeePlan(scope.row)"
                          >查看</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <page
                  :page-data="[30, 40, 50, 100]"
                  :total="planTotal"
                  @changePageSize="changePlanPageSize"
                  @changeCurrentPage="changePlanCurrentPage"
                ></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="负责任务" name="task">
              <div class="task-box">
                <div class="table-box">
                  <el-table
                    ref="multipleTable"
                    :data="taskList"
                    :stripe="true"
                    tooltip-effect="dark"
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @row-click="clickPlanRow"
                  >
                    <el-table-column
                      align="center"
                      prop="name"
                      label="任务名称"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="typeStr"
                      label="任务类别"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="person"
                      label="负责人"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      min-width="120"
                      prop="endTime"
                      label="实际完成时间"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="suspendTimeStr"
                      label="暂停时长"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="statusStr"
                      label="任务状态"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column align="center" width="70" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="SeeTask(scope.row)"
                          >查看</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <page
                  :page-data="[30, 40, 50, 100]"
                  :total="taskTotal"
                  @changePageSize="changeTaskPageSize"
                  @changeCurrentPage="changeTaskCurrentPage"
                ></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="负责工单" name="workOrder">
              <div class="workOrder-box">
                <div class="table-box">
                  <el-table
                    ref="multipleTable"
                    :data="orderList"
                    :stripe="true"
                    tooltip-effect="dark"
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @row-click="clickPlanRow"
                  >
                    <el-table-column
                      align="center"
                      prop="typeStr"
                      label="工单类型"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="person"
                      label="负责人"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="creationTime"
                      label="提交时间"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="completeTime"
                      label="完成时间"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="statusStr"
                      label="工单状态"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column align="center" width="70" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="SeeOrder(scope.row)"
                        >
                          查看
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <page
                  :page-data="[30, 40, 50, 100]"
                  :total="orderTotal"
                  @changePageSize="changeOrderPageSize"
                  @changeCurrentPage="changeOrderCurrentPage"
                ></page>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeWorking">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 任务详情弹窗 -->
    <plan-detail
      :dialog-plan-detail="dialogPlanDetail"
      @getPlanDetailData="getPlanDetailData"
    ></plan-detail>
    <!-- 任务详情弹窗 -->
    <order-detail
      :dialog-order-detail="dialogOrderDetail"
      @getOrderDetailData="getOrderDetailData"
    ></order-detail>
    <!-- 查看任务弹窗 -->
    <view-task :dialog-view="dialogView" @getViewData="getViewData"></view-task>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import PlanDetail from './PlanDetail.vue';
import OrderDetail from './OrderDetail.vue';
import ViewTask from './viewTask/ViewTask.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: personState, mapActions: personActions} = createNamespacedHelpers('personManagement');
const {mapActions: planActions} = createNamespacedHelpers('planManagement');
const {mapActions: taskActions} = createNamespacedHelpers('taskManagement');
const {mapActions: orderActions} = createNamespacedHelpers('workOrderManagement');
export default {
  name: 'AddTask',
  props: ['dialogWorking'],
  components: {
    Page,
    PlanDetail,
    ViewTask,
    OrderDetail
  },
  computed: {
    ...personState([
      'details',
      'checkedId',
      'taskList',
      'planList',
      'orderList',
      'taskTotal',
      'planTotal',
      'orderTotal'
    ])
  },
  data() {
    return {
      // tabs当前聚焦在那一个上面
      activeName: 'generalSituation',

      checkedName: '',

      // 是否显示计划详情弹窗
      dialogPlanDetail: false,

      // 是否显示工单详情弹窗
      dialogOrderDetail: false,

      // 是否显示任务详情弹窗
      dialogView: false,

      // 计划数据
      planCurrentPage: 1,
      planPageSize: 30,

      // 任务数据
      taskCurrentPage:1,
      taskPageSize: 30,

      // 工单数据
      orderCurrentPage: 1,
      orderPageSize: 30
    };
  },
  methods: {
    ...personActions(['getPlan', 'getTask', 'getOrder']),
    ...planActions(['getPlanDetails']),
    ...taskActions(['GetTaskDetails']),
    ...orderActions(['GetWorkOrderDetails']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeWorking() {
      this.activeName = 'generalSituation';
      let data = false;
      this.$emit('getWorkingData', data);
    },
    // 点击查看路线，打开查看路线弹窗
    viewRoute() {
      this.dialogRoute = true;
    },

    // tabs切换时的点击事件
    handleClick(tab) {
      if (tab.name == 'planning') {
        // 负责计划
        this.getPlanList();
      } else if (tab.name == 'task') {
        // 负责任务
        this.getTaskList();
      } else if (tab.name == 'workOrder') {
        // 负责工单
        this.getOrderList();
      }
    },

    // 获取计划列表
    getPlanList() {
      let param = {
        userId: this.checkedId,
        pageIndex: this.planCurrentPage,
        maxResultCount:this.planPageSize
      };
      console.log(param);
      this.getPlan(param);
    },

    // 获取任务列表
    getTaskList() {
      let param = {
        userId: this.checkedId,
        pageIndex: this.taskCurrentPage,
        maxResultCount:this.taskPageSize
      };
      console.log(param);
      this.getTask(param);
    },

    // 获取工单列表
    getOrderList() {
      let param = {
        userId: this.checkedId,
        pageIndex: this.taskCurrentPage,
        maxResultCount:this.taskPageSize
      };
      console.log(param);
      this.getOrder(param);
    },

    // 获取计划从分页传过来的每页多少条数据
    changePlanPageSize(data) {
      console.log(data);
      this.planPageSize = data;
    },
    // 获取计划从分页传过来的当前页数
    changePlanCurrentPage(data) {
      console.log(data);
      this.planCurrentPage = data;
    },

    // 获取任务从分页传过来的每页多少条数据
    changeTaskPageSize(data) {
      console.log(data);
      this.taskPageSize = data;
    },
    // 获取任务从分页传过来的当前页数
    changeTaskCurrentPage(data) {
      console.log(data);
      this.taskCurrentPage = data;
    },

    // 获取工单从分页传过来的每页多少条数据
    changeOrderPageSize(data) {
      console.log(data);
      this.orderPageSize = data;
    },
    // 获取工单从分页传过来的当前页数
    changeOrderCurrentPage(data) {
      console.log(data);
      this.orderCurrentPage = data;
    },

    // 查看计划按钮
    SeePlan(row) {
      let param = {
        id: row.id
      };
      this.getPlanDetails(param).then(res => {
        if (res.success) {
          this.dialogPlanDetail = true;
        }
      }).catch(() => {
        console.log('获取失败了');
      });
    },

    // 查看任务
    SeeTask(row) {
      let param = {
        id: row.id
      };
      this.GetTaskDetails(param).then(res => {
        if (res.success) {
          this.dialogView = true;
        }
      }).catch(() => {
        console.log('获取失败');
      });
    },

    // 查看工单
    SeeOrder(row) {
      let param = {
        id: row.id
      };
      this.GetWorkOrderDetails(param).then(res => {
        if (res.success) {
          this.dialogOrderDetail = true;
        }
      }).catch(() => {
        console.log('获取失败');
      });
    },

    // 选中的行
    clickPlanRow(val) {
      console.log(val);
      this.checkedName = val.name;
    },

    // 关闭计划详情弹窗
    getPlanDetailData(data) {
      this.dialogPlanDetail = data.dialogPlanDetail
    },

    // 关闭计划详情弹窗
    getOrderDetailData(data) {
      this.dialogOrderDetail = data.dialogOrderDetail
    },

    // 关闭查看弹窗
    getViewData(data) {
      this.dialogView = data.dialogView;
    },
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.workingConditions-box {
  .content-box {
    .tabs-box {
      .basicInfo-box {
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
              width: 120px;
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

      .plainning-box,
      .task-box,
      .workOrder-box {
        padding: 0 20px 10px 20px;
        .table-box {
          margin: 0 0 10px 0;
          border: 1px solid #ddd;
          box-sizing: border-box;
          border-bottom: none;
        }
      }
    }
  }
}
</style>

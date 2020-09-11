<template>
  <div class="workingConditions-box dialog-box button-box">
    <el-dialog title="任务详情" :visible.sync="dialogWorking">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeWorking">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="tabs-box">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="综合情况" name="generalSituation">
              <div class="basicInfo-box">
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">当前负责巡检计划：</div>
                    <div class="item-content">
                      <span>1件</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">当前计划巡检设备：</div>
                    <div class="item-content">
                      <span>408个</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年完成巡检任务：</div>
                    <div class="item-content">
                      <span>0个</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">今年完成巡检设备：</div>
                    <div class="item-content">
                      <span>0个</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计巡检管道：</div>
                    <div class="item-content">
                      <span>0公里</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计上报事件：</div>
                    <div class="item-content">
                      <span>0件</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计暂停时间：</div>
                    <div class="item-content">
                      <span>0小时0分</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计关闭任务：</div>
                    <div class="item-content">
                      <span>1件</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年累计完成工单：</div>
                    <div class="item-content">
                      <span>1件</span>
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
                    :data="plainningData"
                    :stripe="true"
                    tooltip-effect="dark"
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @row-click="clickPlanRow"
                  >
                    <el-table-column
                      align="center"
                      prop="planName"
                      label="计划名称"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="inspectionCycle"
                      label="巡检周期"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="inCharge"
                      label="负责人"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="expectedMaturity"
                      label="预计到期时间"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="planningStatus"
                      label="计划状态"
                    ></el-table-column>
                    <el-table-column align="center" width="70" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="SeePlan(scope.$index, scope.row)"
                          >查看</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <page
                  :page-data="[30, 40, 50, 100]"
                  :total="400"
                  @changePageSize="changePageSize"
                  @changeCurrentPage="changeCurrentPage"
                ></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="负责任务" name="task">
              <div class="task-box">
                <div class="table-box">
                  <el-table
                    ref="multipleTable"
                    :data="taskData"
                    :stripe="true"
                    tooltip-effect="dark"
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @row-click="clickPlanRow"
                  >
                    <el-table-column
                      align="center"
                      prop="taskName"
                      label="任务名称"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="taskCategory"
                      label="任务类别"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="inCharge"
                      label="负责人"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      min-width="120"
                      prop="completionTime"
                      label="实际完成时间"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="duration"
                      label="暂停时长"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="taskStatus"
                      label="任务状态"
                    ></el-table-column>
                    <el-table-column align="center" width="70" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="SeeTask(scope.$index, scope.row)"
                          >查看</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <page
                  :page-data="[30, 40, 50, 100]"
                  :total="400"
                  @changePageSize="changePageSize"
                  @changeCurrentPage="changeCurrentPage"
                ></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="负责工单" name="workOrder">
              <div class="workOrder-box">
                <div class="table-box">
                  <el-table
                    ref="multipleTable"
                    :data="workOrderData"
                    :stripe="true"
                    tooltip-effect="dark"
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @row-click="clickPlanRow"
                  >
                    <el-table-column
                      align="center"
                      prop="orderType"
                      label="工单类型"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="inCharge"
                      label="负责人"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="submissionTime"
                      label="提交时间"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="completionTime"
                      label="完成时间"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="orderStatus"
                      label="工单状态"
                    ></el-table-column>
                    <el-table-column align="center" width="70" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="SeeOrder(scope.$index, scope.row)"
                          >查看</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <page
                  :page-data="[30, 40, 50, 100]"
                  :total="400"
                  @changePageSize="changePageSize"
                  @changeCurrentPage="changeCurrentPage"
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
export default {
  name: 'AddTask',
  props: ['dialogWorking'],
  components: {
    Page,
    PlanDetail,
    ViewTask,
    OrderDetail
  },
  data() {
    return {
      // tabs当前聚焦在那一个上面
      activeName: 'generalSituation',
      addForm: {
        taskName: '巡检任务1',
        inCharge: '测试人员',
        estimatedStartTime: '2020-09-23 23:00:00',
        estimatedEndTime: '2020-09-24 23:00:00',
        taskType: '普通任务',
        inspectionArea: '巡检片区1',
        remarks: '这里是备注内容'
      },
      plainningData: [
        {
          planName: '巡检任务',
          inspectionCycle: '每月一次',
          inCharge: '张三',
          expectedMaturity: '2019-12-3 18:00:00',
          planningStatus: '进行中'
        }
      ],
      taskData: [
        {
          taskName: '巡检任务',
          taskCategory: '每月一次',
          inCharge: '张三',
          completionTime: '2019-12-3 18:00:00',
          duration: '3小时',
          taskStatus: '进行中'
        }
      ],
      workOrderData: [
        {
          orderType: '巡检任务',
          inCharge: '张三',
          submissionTime: '2019-12-3 18:00:00',
          completionTime: '2019-12-3 18:00:00',
          orderStatus: '进行中'
        }
      ],
      checkedName: '',
      // 是否显示计划详情弹窗
      dialogPlanDetail: false,
      // 是否显示工单详情弹窗
      dialogOrderDetail: false,
      // 是否显示任务详情弹窗
      dialogView: false
    };
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeWorking() {
      let data = {
        dialogWorking: false,
        data: []
      };
      this.$emit('getWorkingData', data);
    },
    // 点击查看路线，打开查看路线弹窗
    viewRoute() {
      this.dialogRoute = true;
    },

    // tabs切换时的点击事件
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    },
    // 查看计划按钮
    SeePlan() {
      this.dialogPlanDetail = true;
    },
    // 查看任务
    SeeTask() {
      this.dialogView = true;
    },
    // 查看工单
    SeeOrder() {
      this.dialogOrderDetail = true;
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
        }
      }
    }
  }
}
</style>

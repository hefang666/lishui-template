<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="任务详情" :visible.sync="dialogView">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeView">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="tabs-box">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="综合情况" name="basicInfo">
              <div class="basicInfo-box">
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">设备名称：</div>
                    <div class="item-content">
                      <span>********巡检任务</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">设备编号：</div>
                    <div class="item-content">
                      <span>张三</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">设备坐标：</div>
                    <div class="item-content">
                      <span>进行中</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">地址：</div>
                    <div class="item-content">
                      <span>张三、李四</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年被巡检次数：</div>
                    <div class="item-content">
                      <span>临时任务</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">今年触发事件次数：</div>
                    <div class="item-content">
                      <span>2019-01-01 18:00</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年转工单次数：</div>
                    <div class="item-content">
                      <span>2019-01-01 18:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="巡检任务" name="equipmentInfo">
              <div class="equipmentInfo-box">
                <div class="table-box">
                  <el-table
                    ref="multipleTable"
                    :data="equipmentTaskList"
                    :stripe="true"
                    tooltip-effect="dark"
                    :show-overflow-tooltip="true"
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @row-click="clickRow"
                  >
                    <el-table-column
                      align="center"
                      prop="taskName"
                      label="任务名称"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="taskTypeString"
                      label="任务类别"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="personInChargeName"
                      label="负责人"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="endTime"
                      label="实际完成时间"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="suspendTimeString"
                      label="暂停时长"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="taskStatusString"
                      label="任务状态"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      align="center"
                      label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="handleSee(scope.$index, scope.row)"
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
            <el-tab-pane label="事件列表" name="inspectionPath">
              <div class="inspectionPath-box">
                <div class="table-box">
                  <el-table
                    ref="multipleTable"
                    :data="equipmentTaskList"
                    :stripe="true"
                    tooltip-effect="dark"
                    :show-overflow-tooltip="true"
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                    @row-click="clickRow"
                  >
                    <el-table-column
                      align="center"
                      prop="taskName"
                      label="任务名称"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="taskTypeString"
                      label="任务类别"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="personInChargeName"
                      label="负责人"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="endTime"
                      label="实际完成时间"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="suspendTimeString"
                      label="暂停时长"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="taskStatusString"
                      label="任务状态"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      align="center"
                      label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="SeeEventDetail(scope.$index, scope.row)"
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
        <el-button @click="closeView">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 查看任务弹窗 -->
    <view-task-detail
      :dialog-view-detail="dialogViewDetail"
      @closeViewDetail="closeViewDetail"></view-task-detail>

    <!-- 查看事件弹窗 -->
    <view-event-detail
      :dialog-event-view="dialogEventView"
      @closeViewEvent="closeViewEvent"></view-event-detail>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import ViewTaskDetail from './ViewTaskDetail.vue';
import ViewEventDetail from './ViewEventDetail.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('equipment');
export default {
  name: 'viewDetail',
  props: ['dialogView'],
  components: {
    Page,
    ViewTaskDetail,
    ViewEventDetail
  },
  computed: {
    ...mapState(['equipmentTaskList'])
  },
  data() {
    return {
      // tabs当前聚焦在那一个上面
      activeName: 'basicInfo',
      addForm: {
        taskName: '巡检任务1',
        inCharge: '测试人员',
        estimatedStartTime: '2020-09-23 23:00:00',
        estimatedEndTime: '2020-09-24 23:00:00',
        taskType: '普通任务',
        inspectionArea: '巡检片区1',
        remarks: '这里是备注内容'
      },
      tableData: [
        {
          equipmentName: '阀门',
          equipmentNumber: '123456789',
          equipmentPoints: '正常',
          inspectionStatus: '已巡检'
        },
        {
          equipmentName: '阀门',
          equipmentNumber: '123456789',
          equipmentPoints: '异常',
          inspectionStatus: '已巡检'
        },
        {
          equipmentName: '阀门',
          equipmentNumber: '123456789',
          equipmentPoints: '未知',
          inspectionStatus: '未巡检'
        }
      ],
      checkedName: '',

      // 是否显示设备点巡检信息详情弹窗
      dialogEqui: false,

      // 是否显示查看路线弹窗
      dialogRoute: false,

      // 是否显示查看任务弹窗
      dialogViewDetail: false,
      
      // 是否显示查看事件弹窗
      dialogEventView: false
    };
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeView() {
      let data = {
        dialogView: false,
        data: []
      };
      this.$emit('closeView', data);
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
    // 查看任务
    handleSee() {},
    // 查看事件
    SeeEventDetail() {},
    // 选中的行
    clickRow(val) {
      console.log(val);
      this.checkedName = val.name;
    },
    // 关闭查看任务弹窗
    closeViewDetail(data) {
      this.dialogViewDetail = data.dialogViewDetail;
    },

    // 关闭查看事件弹窗
    closeViewEvent(data) {
      this.dialogEventView = data;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
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

      .equipmentInfo-box,
      .inspectionPath-box {
        padding: 0 15px;
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

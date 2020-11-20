<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog
      title="任务详情"
      :visible.sync="dialogView"
      :close-on-click-modal="false"
      :before-close="closeView"
    >
      <div class="content-box form-box">
        <!-- <div class="cancel-box" @click="closeView">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div> -->
        <div class="tabs-box">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="综合情况" name="basicInfo">
              <div class="basicInfo-box">
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">设备名称：</div>
                    <div class="item-content">
                      <span>{{ equipmentDetails.name }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">设备编号：</div>
                    <div class="item-content">
                      <span>{{ equipmentDetails.code }}</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">设备坐标：</div>
                    <div class="item-content" style="overflow: hidden;">
                      <span>{{ equipmentDetails.point }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">地址：</div>
                    <div class="item-content">
                      <span>{{ equipmentDetails.address }}</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年被巡检次数：</div>
                    <div class="item-content">
                      <span>{{ equipmentDetails.inspectionCount }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">今年触发事件次数：</div>
                    <div class="item-content">
                      <span>{{ equipmentDetails.eventCount }}</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">今年转工单次数：</div>
                    <div class="item-content">
                      <span>{{ equipmentDetails.workCount }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="巡检任务" name="equipmentInfo">
              <div class="equipmentInfo-box">
                <div class="table-box">
                  <el-table
                    :data="equipmentTaskList"
                    :stripe="true"
                    tooltip-effect="dark"
                    :show-overflow-tooltip="true"
                    border
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
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
                    <el-table-column width="100" align="center" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="handleSee(scope.row)"
                          >查看</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <page
                  :page-data="equipmentTaskPage"
                  :total="equipmentTaskTotal"
                  @changePageSize="changeTaskPageSize"
                  @changeCurrentPage="changeTaskCurrentPage"
                ></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="事件列表" name="inspectionPath">
              <div class="inspectionPath-box">
                <div class="table-box">
                  <el-table
                    :data="equipmentEventList"
                    :stripe="true"
                    tooltip-effect="dark"
                    :show-overflow-tooltip="true"
                    border
                    height="400"
                    style="width: 100%"
                    :highlight-current-row="true"
                  >
                    <el-table-column
                      align="center"
                      prop="typeStr"
                      label="事件类型"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="person"
                      label="报告人"
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
                      prop="errorType"
                      label="异常类型"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="statusStr"
                      label="事件状态"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column width="100" align="center" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          class="operate-button"
                          @click="SeeEventDetail(scope.row)"
                          >查看</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <page
                  :page-data="equipmentEventPage"
                  :total="equipmentEventTotal"
                  @changePageSize="changeEventPageSize"
                  @changeCurrentPage="changeEventCurrentPage"
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
      @closeViewDetail="closeViewDetail"
    ></view-task-detail>

    <!-- 查看事件弹窗 -->
    <view-event-detail
      :dialog-event-view="dialogEventView"
      @closeViewEvent="closeViewEvent"
    ></view-event-detail>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      @closeMessage="closeMessage"
    ></message>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import ViewTaskDetail from './ViewTaskDetail.vue';
import ViewEventDetail from './ViewEventDetail.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: equipmentState, mapActions: equipmentActions} = createNamespacedHelpers('equipment');
const {mapActions: taskActions} = createNamespacedHelpers('taskManagement');
const {mapActions: eventActions} = createNamespacedHelpers('eventManagement');
const {mapActions: areaActions} = createNamespacedHelpers('area');
export default {
  name: 'Viewdetail',
  props: ['dialogView'],
  components: {
    Page,
    ViewTaskDetail,
    ViewEventDetail,
    Message
  },
  computed: {
    ...equipmentState([
      'equipmentTaskList',
      'equipmentEventList',
      'equipmentDetails',
      'equipmentTaskTotal',
      'equipmentTaskPage',
      'equipmentEventTotal',
      'equipmentEventPage'
    ])
  },
  data() {
    return {
      // tabs当前聚焦在那一个上面
      activeName: 'basicInfo',
      
      checkedName: '',

      // 是否显示设备点巡检信息详情弹窗
      dialogEqui: false,

      // 是否显示查看路线弹窗
      dialogRoute: false,

      // 是否显示查看任务弹窗
      dialogViewDetail: false,

      // 是否显示查看事件弹窗
      dialogEventView: false,

      // 任务列表当前所在页数
      taskCurrentPage: 1,

      // 任务列表当前页条数
      taskPageSize: 30,

      // 事件列表当前所在页数
      eventCurrentPage: 1,

      // 事件列表当前页条数
      eventPageSize: 30,
      
      // 是否显示消息提示框
      dialogMessage: false,

      // 提示消息
      messageText: ''
    };
  },
  methods: {
    ...equipmentActions(['GetDeviceTaskList', 'GetDeviceEventList']),
    ...taskActions(['GetTaskDetails']),
    ...eventActions(['GetEventDetails']),
    ...areaActions(['getAreaDetailInfo']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeView() {
      this.activeName = 'basicInfo';
      let data = {
        dialogView: false,
        data: []
      };
      this.$emit('closeView', data);
    },
    // 获取任务列表
    getTaskData() {
      let param = {
        Id: this.equipmentDetails.id,
        pageIndex: this.taskCurrentPage,
        MaxResultCount: this.taskPageSize
      };
      this.GetDeviceTaskList(param).then(() => {
        console.log();
      }).catch((err) => {
        this.messageText = err.message;
        this.dialogMessage = true;
      });
    },
    // 获取事件列表
    getEventData() {
      let param = {
        Id: this.equipmentDetails.id,
        pageIndex: this.eventCurrentPage,
        MaxResultCount: this.eventPageSize
      };
      this.GetDeviceEventList(param).then(() => {
        console.log();
      }).catch(err => {
        this.messageText = err.message;
        this.dialogMessage = true;
      });
    },
    // tabs切换时的点击事件
    handleClick(tab) {
      console.log(tab);
      if (tab.name == 'equipmentInfo') {
        // 获取任务列表
        this.getTaskData();

        // let param = {
        //   Id: this.equipmentDetails.id,
        //   pageIndex: this.taskCurrentPage,
        //   MaxResultCount: this.taskPageSize
        // };
        // this.GetDeviceTaskList(param).then(() => {
        //   console.log();
        // }).catch((err) => {
        //   this.messageText = err.message;
        //   this.dialogMessage = true;
        // });
      } else if (tab.name == 'inspectionPath') {
        // 获取事件列表
        this.getEventData();

        // let param = {
        //   Id: this.equipmentDetails.id,
        //   pageIndex: this.eventCurrentPage,
        //   MaxResultCount: this.eventPageSize
        // };
        // this.GetDeviceEventList(param).then(() => {
        //   console.log();
        // }).catch(err => {
        //   this.messageText = err.message;
        //   this.dialogMessage = true;
        // });
      }
    },
    // 获取从分页传过来的每页多少条数据(任务)
    changeTaskPageSize(data) {
      // console.log(data);
      this.taskPageSize = data;
      this.getTaskData();
    },
    // 获取从分页传过来的当前页数（任务）
    changeTaskCurrentPage(data) {
      // console.log(data);
      this.taskCurrentPage = data;
      this.getTaskData();
    },
    // 获取从分页传过来的每页多少条数据（事件）
    changeEventPageSize(data) {
      // console.log(data);
      this.eventPageSize = data;
      this.getEventData();
    },
    // 获取从分页传过来的当前页数（事件）
    changeEventCurrentPage(data) {
      // console.log(data);
      this.eventCurrentPage = data;
      this.getEventData();
    },
    // 查看任务
    handleSee(row) {
      // console.log(row);
      let param = {
        Id: row.id
      };
      this.GetTaskDetails(param).then(res => {
        if (res.success) {
          let param = {
            Id: res.result.areaId
          }
          this.getAreaDetailInfo(param).then(res => {
            // console.log(res)
            if (res.success) {
              this.dialogViewDetail = true;
            }
          }).catch(err => {
          this.messageText = err.message;
          this.dialogMessage = true;
        });
        }
      });
      // this.dialogViewDetail = true;
    },
    // 查看事件
    SeeEventDetail(row) {
      console.log(row);
      let param = {
        Id: row.id
      };
      this.GetEventDetails(param).then(res => {
        if (res.success) {
      //     let param = {
      //       Id: res.result.areaId
      //     }
      //     this.getAreaDetailInfo(param).then(res => {
      //       // console.log(res)
      //       if (res.success) {
              this.dialogEventView = true;
      //       }
      //     });
        }
      }).catch(err => {
          this.messageText = err.message;
          this.dialogMessage = true;
        });
      // this.dialogEventView = true;
    },
    // 关闭查看任务弹窗
    closeViewDetail(data) {
      this.dialogViewDetail = data.dialogViewDetail;
    },

    // 关闭查看事件弹窗
    closeViewEvent(data) {
      this.dialogEventView = data;
    },

    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },
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
          /* border: 1px solid #ddd;
          box-sizing: border-box; */
        }
      }
    }
  }
}
</style>

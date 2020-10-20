<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog
      title="任务详情"
      :visible.sync="dialogView"
      :close-on-click-modal="false"
      :before-close="closeView"
    >
      <div class="content-box form-box">
        <div class="tabs-box">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="basicInfo">
              <div class="basicInfo-box">
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">任务名称：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.name }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">任务负责人：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.person }}</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">任务状态：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.statusStr }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">参与人：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.participant }}</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">任务类别：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.typeStr }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">预计结束时间：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.planEndTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">实际结束时间：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.endTime }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">开始时间：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.startTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items has-two-item">
                    <div class="item-title">暂停时间：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.pauseTime }}</span>
                    </div>
                  </div>
                  <div class="list-items has-two-item">
                    <div class="item-title">巡检片区：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.areaName }}</span>
                      <el-button @click="viewRoute" class="view-button"
                        >查看路线</el-button
                      >
                    </div>
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-items">
                    <div class="item-title">备注：</div>
                    <div class="item-content">
                      <span>{{ taskDetail.remark }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="设备点巡检信息" name="equipmentInfo">
              <div class="equipmentInfo-box">
                <div class="table-box">
                  <el-table
                    :data="inspectionPointList"
                    :stripe="true"
                    tooltip-effect="dark"
                    height="400"
                    border
                    style="width: 100%"
                    :highlight-current-row="true"
                  >
                    <el-table-column
                      align="center"
                      prop="name"
                      label="设备名称"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="code"
                      label="设备编号"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="statusStr"
                      label="设备点情况"
                    ></el-table-column>
                    <el-table-column
                      align="center"
                      prop="inspectionStatusStr"
                      label="巡检状态"
                    ></el-table-column>
                    <el-table-column align="center" label="操作">
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
                  :page-data="inspectionPointPage"
                  :total="inspectionPointTotal"
                  @changePageSize="changePageSize"
                  @changeCurrentPage="changeCurrentPage"
                ></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="巡检路径" name="inspectionPath">
              <div class="inspectionPath-box">
                <div class="map-box">
                  <map-route ref="map" :mapid="'ss_' + taskDetail.id"></map-route>
                </div>
                <div class="inspectionPath-info-box button-box">
                  <div class="inspectionPath-info-item">
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        巡检路线：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        {{ taskDetail.areaName }}
                      </div>
                    </div>
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        设备点数：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        {{ areaDetail.pointCount }}
                      </div>
                    </div>
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        管道长度：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        {{ areaDetail.pipelineLength }}
                      </div>
                    </div>
                  </div>
                  <div class="inspectionPath-info-item">
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        规划路径：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        <el-button type="primary" plain>
                          显示
                        </el-button>
                      </div>
                    </div>
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        预计里程：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        1.95km
                      </div>
                    </div>
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        预计花费时间：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        0.10小时
                      </div>
                    </div>
                  </div>
                  <div class="inspectionPath-info-item">
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        实际路径：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        <el-button type="primary" plain>
                          隐藏
                        </el-button>
                      </div>
                    </div>
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        实际花费时间：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        0.00小时
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeView">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 设备点详情弹窗 -->
    <equipment-info
      :dialog-equi="dialogEqui"
      @getEquiData="getEquiData"
    ></equipment-info>

    <!-- 查看路线弹窗 -->
    <view-route
      :dialog-route="dialogRoute"
      @getRouteData="getRouteData"
    ></view-route>

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
import EquipmentInfo from './EquipmentInformation.vue';
import ViewRoute from '@/views/public/ViewRoute.vue';
import MapRoute from '@/components/mapRoute/index.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: taskState, mapActions: taskActions} = createNamespacedHelpers('taskManagement');
const {mapActions: areaActions} = createNamespacedHelpers('area');
export default {
  name: 'ViewTask',
  props: ['dialogView'],
  components: {
    Page,
    EquipmentInfo,
    ViewRoute,
    MapRoute,
    Message
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
      // 当前页数
      currentPage: 1,

      // 当前每页多少条
      pageSize: 1,

      // 是否显示提示弹窗
      dialogMessage: false
    };
  },
  computed: {
    ...taskState([
      'taskDetail',
      'inspectionPointList',
      'inspectionPointTotal',
      'inspectionPointPage',
      'areaDetail',
      'messageText'
    ])
  },
  mounted() {
    console.log(this.inspectionPointPage);
    this.pageSize = this.inspectionPointPage[0];
  },
  methods: {
    ...taskActions([
      'GetInspectionPointList',
      'GetPointDetails',
      'GetAreaByTaskId',
      'setMessage'
    ]),
    ...areaActions(['getAreaDetailInfo']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeView() {
      let data = {
        dialogView: false
      };
      this.$emit('getViewData', data);
    },
    // 点击查看路线，打开查看路线弹窗
    viewRoute() {
      let param = {
        Id: this.taskDetail.areaId
      }
      this.getAreaDetailInfo(param)
      this.dialogRoute = true;
    },

    // tabs切换时的点击事件
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'equipmentInfo') {
        // 获取设备点详情
        this.getData();
      } else if (tab.name == 'inspectionPath') {
        // 巡检路径信息
        let param = {
          Id: this.taskDetail.id
        };
        this.GetAreaByTaskId(param);
      }
    },
    
    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },

    // 获取设备点列表
    getData() {
      let param = {
        Id: this.taskDetail.id,
        pageIndex: this.currentPage,
        maxResultCount: this.pageSize
      };
      this.GetInspectionPointList(param);
    },
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    },
    // 查看按钮
    handleSee(row) {
      console.log(row);
      let param = {
        deviceId: row.id,
        status: row.status,
        inspectionStatus: row.inspectionStatus,
        taskId: this.taskDetail.id
      };
      this.GetPointDetails(param).then(res => {
        if (res.success) {
          this.dialogEqui = true;
        }
      }).catch(() => {
        this.dialogMessage = true;
      });
      
    },
    // 获取从设备点详细信息弹窗传来的值
    getEquiData(data) {
      this.dialogEqui = data.dialogEqui;
    },
    // 关闭查看路线弹窗
    getRouteData(data) {
      this.dialogRoute = data.dialogRoute;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
  .content-box {
    height: 100%;
    .tabs-box {
      height: 100%;
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

      .equipmentInfo-box {
        padding: 0 40px;
        .table-box {
          margin: 0 0 10px 0;
          box-sizing: border-box;
        }
      }

      .inspectionPath-box {
        display: flex;
        justify-content: space-between;
        .map-box {
          width: 70%;
          height: 450px;
        }

        .inspectionPath-info-box {
          flex: 1;
          .inspectionPath-info-item {
            padding: 20px 15px;
            border-bottom: 1px dashed #0099cc;

            .inspectionPath-info-items {
              display: flex;
              height: 35px;
              line-height: 35px;
            }
          }
        }
      }
    }
  }
}
</style>

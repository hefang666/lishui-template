<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog
      title="任务详情"
      :visible.sync="dialogViewDetail"
      :close-on-click-modal="false"
      :before-close="closeViewDetail"
    >
      <div class="content-box form-box">
        <!-- <div class="cancel-box" @click="closeViewDetail">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div> -->
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
                      <span>{{ taskDetail.participants }}</span>
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
                  :page-data="[30, 40, 50, 100]"
                  :total="400"
                  @changePageSize="changePageSize"
                  @changeCurrentPage="changeCurrentPage"
                ></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="巡检路径" name="inspectionPath">
              <div class="inspectionPath-box">
                <div class="map-box"></div>
                <div class="inspectionPath-info-box button-box">
                  <div class="inspectionPath-info-item">
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        巡检路线：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        *****巡检线路
                      </div>
                    </div>
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        设备点数：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        15个
                      </div>
                    </div>
                    <div class="inspectionPath-info-items">
                      <div class="inspectionPath-info-item-title">
                        管道长度：
                      </div>
                      <div class="inspectionPath-info-item-content">
                        5.78km
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
        <el-button @click="closeViewDetail">取 消</el-button>
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
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import EquipmentInfo from './EquipmentInformation.vue';
import ViewRoute from '@/views/public/ViewRoute.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('taskManagement');
export default {
  name: 'viewTask',
  props: ['dialogViewDetail'],
  components: {
    Page,
    EquipmentInfo,
    ViewRoute
  },
  computed: {
    ...mapState(['taskDetail', 'inspectionPointList'])
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

      // 当前页数
      currentPage: 1,

      // 当前每页数量
      pageSize: 30
    };
  },
  methods: {
    ...mapActions(['GetInspectionPointList', 'GetInspectionPointList', 'GetPointDetails']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeViewDetail() {
      let data = {
        dialogViewDetail: false,
        data: []
      };
      this.$emit('closeViewDetail', data);
    },
    // 点击查看路线，打开查看路线弹窗
    viewRoute() {
      this.dialogRoute = true;
    },

    // tabs切换时的点击事件
    handleClick(tab) {
      console.log(tab);
      if (tab.name == 'equipmentInfo') {
        this.getData();
      }
    },
    // 获取数据
    getData() {
      let param = {
        Id: this.taskDetail.id,
        pageIndex: this.currentPage,
        maxResultCount: this.pageSize
      }
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
        taskId: this.taskDetail.id,
        inspectionStatus: row.inspectionStatus,
        status: row.status
      }
      console.log(param);
      this.GetPointDetails(param);
      this.dialogEqui = true;
    },
    // 选中的行
    clickRow(val) {
      console.log(val);
      this.checkedName = val.name;
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
          border: 1px solid #ddd;
          box-sizing: border-box;
        }
      }

      .inspectionPath-box {
        display: flex;
        justify-content: space-between;
        .map-box {
          width: 70%;
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

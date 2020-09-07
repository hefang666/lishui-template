<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="查看路线" :visible.sync="dialogRoute">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeRoute">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="map-box"></div>
        <div class="content-right-box">
          <div class="right-box">
            <div class="inspection-route-information-box">
              <div class="inspection-title">巡检路线</div>
              <div class="inspection-content">
                <div class="inspection-info-box-top">
                  <div class="inspection-item">
                    <div class="item-left">路线名称：</div>
                    <div class="item-right">每月巡检路线</div>
                  </div>
                  <div class="inspection-item">
                    <div class="item-left">起点：</div>
                    <div class="item-right">104.1629,30.0214</div>
                  </div>
                  <div class="inspection-item">
                    <div class="item-left">终点：</div>
                    <div class="item-right">104.1629,30.0214</div>
                  </div>
                </div>
                <div class="inspection-info-box-bottom">
                  <div class="inspection-item-box">
                    <div class="inspection-item">
                      <div class="item-left">预计时间：</div>
                      <div class="item-right">0.05小时</div>
                    </div>
                    <div class="inspection-item">
                      <div class="item-left">预计里程：</div>
                      <div class="item-right">1。93km</div>
                    </div>
                  </div>
                  <div class="inspection-item-box">
                    <div class="inspection-item">
                      <div class="item-left">设备点：</div>
                      <div class="item-right">51个</div>
                    </div>
                    <div class="inspection-item">
                      <div class="item-left">管线：</div>
                      <div class="item-right">5183.89km</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="equipment-pipeline-information-box">
              <div class="tabs-box-route">
                <el-tabs
                  v-model="activeName"
                  type="card"
                  @tab-click="handleClick"
                >
                  <el-tab-pane label="设备" name="equipment">
                    <div class="equipment-box">
                      <div class="table-box-route">
                        <el-table
                          ref="multipleTable"
                          :data="equipmentData"
                          :stripe="true"
                          tooltip-effect="dark"
                          height="420"
                          style="width: 100%"
                          :highlight-current-row="true"
                          @row-click="clickRowEqui"
                        >
                          <el-table-column
                            align="center"
                            prop="equipmentNumber"
                            label="设备编号"
                          ></el-table-column>
                          <el-table-column
                            align="center"
                            prop="equipmentName"
                            label="设备名称"
                          ></el-table-column>
                          <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                              <el-button
                                type="text"
                                class="operate-button"
                                @click="
                                  handleSeeEquipment(scope.$index, scope.row)
                                "
                                >查看</el-button
                              >
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="管道" name="theConduit">
                    <div class="theConduit-box">
                      <div class="table-box-route">
                        <el-table
                          ref="multipleTable"
                          :data="conduitData"
                          :stripe="true"
                          tooltip-effect="dark"
                          height="420"
                          style="width: 100%"
                          :highlight-current-row="true"
                          @row-click="clickRowConduit"
                        >
                          <el-table-column
                            align="center"
                            prop="conduitNumber"
                            label="设备编号"
                          ></el-table-column>
                          <el-table-column
                            align="center"
                            prop="conduitName"
                            label="设备名称"
                          ></el-table-column>
                          <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                              <el-button
                                type="text"
                                class="operate-button"
                                @click="
                                  handleSeeConduit(scope.$index, scope.row)
                                "
                                >查看</el-button
                              >
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRoute">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddTask',
  props: ['dialogRoute'],
  components: {},
  data() {
    return {
      // tabs当前聚焦在那一个上面
      activeName: 'equipment',
      // 设备数据
      equipmentData: [
        {
          equipmentName: '阀门',
          equipmentNumber: '123456789'
        },
        {
          equipmentName: '阀门',
          equipmentNumber: '123456789'
        }
      ],
      // 管道数据
      conduitData: [
        {
          conduitName: '阀门',
          conduitNumber: '123456789'
        },
        {
          conduitName: '阀门',
          conduitNumber: '123456789'
        },
        {
          conduitName: '阀门',
          conduitNumber: '123456789'
        }
      ],
      checkedNameEqui: '',
      checkedNameConduit: ''
    };
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeRoute() {
      let data = {
        dialogRoute: false,
        data: []
      };
      this.$emit('getRouteData', data);
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
    // 设备查看按钮
    handleSeeEquipment() {},
    // 管道查看按钮
    handleSeeConduit() {},
    // 设备选中的行
    clickRowEqui(val) {
      console.log(val);
      this.checkedNameEqui = val.name;
    },
    // 管道选中的行
    clickRowConduit(val) {
      console.log(val);
      this.checkedNameConduit = val.name;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
  .content-box {
    height: 480px;
    .map-box {
      width: 100%;
      height: 100%;
      background: rosybrown;
    }
    .content-right-box {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 460px;
      width: 315px;
      background: #ffffff;
      overflow: hidden;
      border-radius: 5px;
      .right-box {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .inspection-route-information-box {
          .inspection-title {
            height: 33px;
            line-height: 33px;
            background: #4b77be;
            font-size: 12px;
            color: #ffffff;
            text-align: center;
            border-radius: 5px;
          }

          .inspection-content {
            padding: 0 6px;
            .inspection-info-box-top {
              padding: 10px 0;
              border-bottom: 1px dashed #0099cc;
              .inspection-item {
                display: flex;
                line-height: 30px;
                font-size: 12px;
                .item-left {
                  margin-right: 5px;
                  width: 70px;
                  text-align: right;
                }
              }
            }

            .inspection-info-box-bottom {
              padding: 10px 0;
              .inspection-item-box {
                display: flex;
                justify-content: space-between;
                .inspection-item {
                  width: 50%;
                  display: flex;
                  line-height: 30px;
                  font-size: 12px;
                  .item-left {
                    margin-right: 5px;
                    width: 60px;
                    text-align: right;
                  }
                }
              }
            }
          }
        }

        .equipment-pipeline-information-box {
          height: 460px;
          .tabs-box-route {
            .equipment-box,
            .theConduit-box {
              .table-box-route {
                .operate-button {
                  color: #337ab7;
                }

                .operate-button:hover {
                  color: #23527c;
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

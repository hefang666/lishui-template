<template>
  <div class="chooseEquipment-box">
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
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="设备" name="equipment">
            <div class="equipment-box">
              <div class="table-box-route">
                <el-table
                  ref="multipleTable"
                  :data="equipData.devDtos"
                  :stripe="true"
                  tooltip-effect="dark"
                  height="420"
                  style="width: 100%"
                  :highlight-current-row="true"
                  @row-click="clickRowEqui"
                >
                  <el-table-column
                    align="center"
                    prop="deviceCode"
                    label="设备编号"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="deviceName"
                    label="设备名称"
                  ></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        class="operate-button"
                        @click="handleSeeEquipment(scope.$index, scope.row)"
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
                  :data="equipData.pipDtos"
                  :stripe="true"
                  tooltip-effect="dark"
                  height="420"
                  style="width: 100%"
                  :highlight-current-row="true"
                  @row-click="clickRowConduit"
                >
                  <el-table-column
                    align="center"
                    prop="deviceCode"
                    label="设备编号"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="deviceName"
                    label="设备名称"
                  ></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        class="operate-button"
                        @click="handleSeeConduit(scope.$index, scope.row)"
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
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('xunjianPublic');
export default {
  name: 'ChooseEquipment',
  data() {
    return {
      // tabs当前聚焦在那一个上面
      activeName: 'equipment',
      checkedInfo: ''
    };
  },
  computed: {
    ...mapState(['equipData'])
  },
  methods: {
    // tabs切换时的点击事件
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 设备选中的行
    clickRowEqui(val) {
      this.checkedInfo = val;
    },
    // 管道选中的行
    clickRowConduit(val) {
      this.checkedInfo = val;
    },
    // 设备查看按钮
    handleSeeEquipment() {},
    // 管道查看按钮
    handleSeeConduit() {}
  }
};
</script>

<style scoped lang="scss">
.chooseEquipment-box {
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
</style>

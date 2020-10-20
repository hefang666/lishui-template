<template>
  <div class="chooseEquipment-box">
    <div class="inspection-route-information-box">
      <div class="inspection-title">巡检路线</div>
      <div class="inspection-content">
        <div class="inspection-info-box-top">
          <div class="inspection-item">
            <div class="item-left">路线名称：</div>
            <div class="item-right">{{ areaDetailsInfo.name }}</div>
          </div>
          <div class="inspection-item">
            <div class="item-left">设备点：</div>
            <div class="item-right">{{ areaDetailsInfo.pointCount }}</div>
          </div>
          <!-- <div class="inspection-item">
            <div class="item-left">起点：</div>
            <div class="item-right">104.1629,30.0214</div>
          </div>
          <div class="inspection-item">
            <div class="item-left">终点：</div>
            <div class="item-right">104.1629,30.0214</div>
          </div> -->
        </div>
        <!-- <div class="inspection-info-box-bottom">
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
              <div class="item-right">{{ areaDetailsInfo.pointCount }}</div>
            </div>
            <div class="inspection-item">
              <div class="item-left">管线：</div>
              <div class="item-right">5183.89km</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="equipment-pipeline-information-box">
      <div class="tabs-box-route">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="设备" name="equipment">
            <div class="equipment-box">
              <div class="table-box table-box-route">
                <el-table
                  ref="multipleTable"
                  :data="areaDetailsInfo.deviceLists"
                  :stripe="true"
                  border
                  tooltip-effect="dark"
                  max-height="420"
                  style="width: 100%"
                  :highlight-current-row="true"
                  @selection-change="clickRowEqui"
                  @row-click="clickEqui"
                >
                  <el-table-column
                    v-if="typeText == 'choose'  && typeStr == 'multiple'"
                    type="selection"
                    align="center"
                    width="50"
                  ></el-table-column>
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
                  <el-table-column
                    align="center"
                    label="操作"
                    width="60"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        class="operate-button"
                        @click="handleSeeEquipment(scope.row)"
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
              <div class="table-box table-box-route">
                <el-table
                  ref="multipleTable"
                  :data="areaDetailsInfo.pipelineLists"
                  :stripe="true"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="420"
                  border
                  :highlight-current-row="true"
                  @selection-change="clickRowConduit"
                  @row-click="clickConduit"
                >
                  <el-table-column
                    v-if="typeText == 'choose' && typeStr == 'multiple'"
                    type="selection"
                    align="center"
                    width="50"
                  ></el-table-column>
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
                  <el-table-column
                    align="center"
                    label="操作"
                    width="60"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        class="operate-button"
                        @click="handleSeeConduit(scope.row)"
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
// const {mapState: } = createNamespacedHelpers('xunjianPublic');
const {mapState: areaState} = createNamespacedHelpers('area');
export default {
  name: 'ChooseEquipment',
  props: ['typeText', 'typeStr'],
  data() {
    return {
      // tabs当前聚焦在那一个上面
      activeName: 'equipment',
      // 选择的设备
      checkedEqui: [],
      // 选择的管道
      checkedCon: [],

      // 单选设备(设备或管道，只能选一个)
      devInfo: ''
    };
  },
  computed: {
    ...areaState(['areaDetailsInfo'])
  },
  methods: {
    // tabs切换时的点击事件
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 设备选中的行（多选）
    clickRowEqui(val) {
      this.checkedEqui = val;
      console.log(this.checkedEqui);
    },
    // 设备选择的行（单选）
    clickEqui(val) {
      console.log(val);
      this.devInfo = val;
    },
    // 管道选中的行（多选）
    clickRowConduit(val) {
      this.checkedCon = val;
      console.log(this.checkedCon);
    },
    // 管道选中的行（单选）
    clickConduit(val) {
      console.log(val);
      this.devInfo = val;
    },
    // 设备查看按钮
    handleSeeEquipment(row) {
      this.$emit('clickView', row);
    },
    // 管道查看按钮
    handleSeeConduit(row) {
      this.$emit('clickView', row);
    }
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
        /* border-bottom: 1px dashed #0099cc; */
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
    max-height: 460px;
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

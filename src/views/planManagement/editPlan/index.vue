<template>
  <div class="editTask-box dialog-box button-box">
    <el-dialog title="修改任务" :visible.sync="dialogEdit">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeEdit">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <div>
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>任务名称：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-input
                      v-model="editPlanDetails.name"
                      autocomplete="off"
                    ></el-input>
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>负责人：</span>
                </div>
                <div class="content">
                  <el-button
                    class="choose-active"
                    type="primary"
                    plain
                    v-if="editPlanDetails.person != ''"
                    v-model="editPlanDetails.person"
                    >{{ editPlanDetails.person }}</el-button
                  >
                  <el-button type="primary" plain @click="choosePerson"
                    >选择人员</el-button
                  >
                </div>
              </div>
            </div>
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>巡检片区：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <!-- <el-input type="inspectionArea" v-model="editForm.inspectionArea" autocomplete="off"></el-input> -->
                    <el-button
                      type="primary"
                      plain
                      @click="chooseArea"
                    >
                      选择片区
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>参与人：</span>
                </div>
                <div class="content">
                  <el-button
                    class="choose-active"
                    type="primary"
                    plain
                    v-for="(item, index) in editPlanDetails.participant"
                    :key="index"
                  >
                    {{ item.trueName }}
                  </el-button>
                  <el-button
                    type="primary"
                    plain
                    @click="choosePar"
                  >
                    选择人员
                  </el-button>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>计划周期：</span>
                </div>
                <div class="content">
                </div>
              </div>
            </div>
            <div
              v-if="editPlanDetails.cycle == 1 || editPlanDetails.cycle == 2"
              class="list-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>计划时效：</span>
                </div>
                <div class="content">
                  <el-date-picker
                    v-model="editPlanDetails.endTime"
                    type="date"
                    format="yyyy-MM-dd"
                    placeholder="请选择日期"
                  ></el-date-picker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEdit">取 消</el-button>
        <el-button type="primary" @click="determine">保存</el-button>
      </div>
    </el-dialog>

    <choose-people
      :dialog-charge="dialogCharge"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>
    <choose-area
      :dialog-area="dialogArea"
      @closeChooseArea="closeChooseArea"
      @checkedArea="checkedArea"
    ></choose-area>
  </div>
</template>

<script>
import ChoosePeople from '../public/ChoosePeople.vue';
import ChooseArea from '../public/ChooseArea.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
const {mapState: planState} = createNamespacedHelpers('planManagement');
export default {
  name: 'EditTask',
  props: ['dialogEdit'],
  components: {
    ChoosePeople,
    ChooseArea
  },
  data() {
    return {
      // 负责人弹窗状态
      dialogCharge: false,
      // 巡检片区弹窗状态
      dialogArea: false
    };
  },
  computed: {
    ...planState(['editPlanDetails'])
  },
  methods: {
    ...xunjianActions(['getOrganizationData', 'getRoleData']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeEdit() {
      let data = false;
      console.log(data);
      this.$emit('closeEdit', data);
    },
    // 点击选择负责人按钮
    choosePerson() {
      this.dialogCharge = true;
    },
    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      this.dialogCharge = data.dialogCharge;
    },
    // 选择负责人弹窗选择了负责人并点击了确定按钮
    checkedPerson(data) {
      this.dialogCharge = data.dialogCharge;
      this.editForm.inCharge = data.name;
    },
    // 点击选择片区按钮
    chooseArea() {
      this.dialogArea = true;
    },
    // 点击选择参与人
    choosePar() {
      this.getOrganizationData();
      this.getRoleData();
      this.dialogPar = true;
    },
    // 关闭选择片区弹窗
    closeChooseArea(data) {
      this.dialogArea = data.dialogArea;
    },
    // 选择片区弹窗选择了片区并点击了确定按钮
    checkedArea(data) {
      console.log(data);
      this.dialogArea = data.dialogArea;
      // this.editForm.inCharge = data.name;
    },

    // 保存
    determine() {
      console.log(this.editPlanDetails.name);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.editTask-box {
  .content-box {
    .list-item {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .items-box {
        flex: 1;
        display: flex;
        .title {
          width: 120px;
          text-align: right;
          line-height: 28px;
          .tips {
            color: red;
          }
        }
        .content {
          line-height: 28px;
        }
        .conten {
          width: 76%;
          .tabs-content {
            padding-top: 10px;
            display: flex;
            .title-box {
              margin-right: 15px;
              .tips {
                color: red;
              }
            }
            .select-box {
              width: 150px;
            }
          }
          .custom-box {
            padding-top: 10px;
            .item-box {
              display: flex;
              margin-top: 10px;
              .title-box {
                width: 80px;
              }
              .item-content-box {
                flex: 1;
                display: flex;
                .time-box {
                  width: 180px;
                  /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
                    width: 100%;
                  }
                }
                .text-box {
                  line-height: 28px;
                  margin: 0 20px;
                }
                .icon-box {
                  width: 28px;
                  height: 28px;
                  margin-left: 20px;
                  .icon {
                    font-size: 20px;
                    line-height: 28px;
                    color: #4b77be;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
    .has-two-item {
      .items-box {
        width: 46%;
      }
      .choose-active {
        color: #ffffff;
        background: #4b77be;
        border: none;
        cursor: auto;
        margin-bottom: 10px;
      }

      .list-item-content-box {
        width: 220px;
      }
    }
  }
}
</style>

<template>
  <div class="editTask-box dialog-box button-box">
    <el-dialog title="修改任务" :visible.sync="dialogEdit">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeEdit">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <div :model="taskDetail">
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>任务名称：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-input
                      type="taskName"
                      v-model="taskDetail.name"
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
                    v-if="taskDetail.person != ''"
                    v-model="taskDetail.person"
                    >{{ taskDetail.person }}</el-button
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
                  <span>任务状态：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    {{ taskDetail.statusStr }}
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>参与人：</span>
                </div>
                <div class="content">
                  <span>{{ taskDetail.participant }}</span>
                  <!-- <el-button
                    class="choose-active"
                    type="primary"
                    plain
                    v-if="taskDetail.inCharge != ''"
                    v-for="(item, index) in taskDetail.participant"
                    :key="index"
                    >{{ item }}</el-button
                  > -->
                  <el-button type="primary" plain @click="choosePart"
                    >选择人员</el-button
                  >
                </div>
              </div>
            </div>
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>任务类别：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    {{ taskDetail.typeStr }}
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span>暂停时长：</span>
                </div>
                <div class="content">
                  {{ taskDetail.pauseTime }}
                </div>
              </div>
            </div>
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>预计开始时间：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-date-picker
                      v-model="taskDetail.planStartTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="预计任务开始时间"
                    ></el-date-picker>
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>预计结束时间：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-date-picker
                      v-model="taskDetail.planEndTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="预计任务结束时间"
                    ></el-date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>巡检片区：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <!-- <el-input type="inspectionArea" v-model="taskDetail.areaName" autocomplete="off"></el-input> -->
                    <el-button type="primary" plain @click="chooseArea"
                      >选择片区</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span>备注：</span>
                </div>
                <div class="conten">
                  <el-input
                    type="textarea"
                    :rows="3"
                    v-model="taskDetail.remark"
                    autocomplete="off"
                  ></el-input >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEdit">取 消</el-button>
        <el-button type="primary" @click="Edit">保存</el-button>
      </div>
    </el-dialog>

    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="selectType"
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
import ChoosePeople from '@/views/public/ChoosePeople.vue';
import ChooseArea from '@/views/public/ChooseArea.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('taskManagement');
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
      dialogArea: false,
      // 选择任务类型（负责人（单选）、参与人（多选））
      selectType: '',
      // 负责人信息
      person: '',
      // 参与人
      partData: []
    };
  },
  computed: {
    ...mapState(['taskDetail'])
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeEdit() {
      let data = {
        dialogEdit: false,
        data: []
      };
      this.$emit('getEditData', data);
    },
    // 点击选择负责人按钮
    choosePerson() {
      this.selectType = 'single';
      this.dialogCharge = true;
    },
    // 点击选择参与人按钮
    choosePart() {
      this.selectType = 'multiple';
      this.dialogCharge = true;
    },
    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      console.log(data);
      this.dialogCharge = data.dialogCharge;
    },
    // 选择人员弹窗选择了人并点击了确定按钮
    checkedPerson(data) {
      console.log(data);
      if (data.type == 'single') {
        // 负责人
        this.person = data.personinfo;
        this.taskDetail.person = data.personinfo.trueName;
      } else if (data.type == 'multiple') {
        // 参与人
        this.partData = data.personinfo;
        this.taskDetail.participant = [];
        this.partData.forEach(item => {
          this.taskDetail.participant.push(item.trueName);
        })
      }
      this.dialogCharge = data.dialogCharge;
    },
    // 点击选择片区按钮
    chooseArea() {
      this.dialogArea = true;
    },
    // 关闭选择片区弹窗
    closeChooseArea(data) {
      this.dialogArea = data.dialogArea;
    },
    // 选择片区弹窗选择了片区并点击了确定按钮
    checkedArea(data) {
      this.dialogArea = data.dialogArea;
      // this.editForm.inCharge = data.name;
    },
    // 保存
    Edit() {
      // let personId;
      // if (this.person == '') {
      //   personId = this.taskDetail.p
      // }
      // let param = {
      //   id: this.taskDetail.id,
      //   name: this.taskDetail.name,
        // personId: 
      // }
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
          width: 79%;
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
      }

      .list-item-content-box {
        width: 220px;
      }
    }
  }
}
</style>

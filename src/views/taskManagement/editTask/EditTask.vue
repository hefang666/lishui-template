<template>
  <div class="editTask-box dialog-box button-box">
    <el-dialog
      title="修改任务"
      :visible.sync="dialogEdit"
      :close-on-click-modal="false"
      :before-close="closeEdit"
    >
      <div class="content-box form-box">
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
                      type="taskName"
                      v-model="taskDetails.name"
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
                    v-if="taskDetails.person != ''"
                    v-model="taskDetails.person"
                    >{{ taskDetails.person }}</el-button
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
                    {{ taskDetails.statusStr }}
                  </div>
                </div>
              </div>
              <div v-if="taskDetails.type == 2" class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>参与人：</span>
                </div>
                <div class="content">
                  <el-button
                    class="choose-active"
                    type="primary"
                    plain
                    v-for="(item, index) in taskDetails.user"
                    :key="index"
                  >
                    {{ item.userName }}
                  </el-button>
                  <!-- <span
                    v-for="(item, index) in taskDetails.participants"
                    :key="index"
                  >
                    {{ item }}
                  </span> -->
                  <!-- <span>{{ taskDetails.participant }}</span> -->
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
                    {{ taskDetails.typeStr }}
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span>暂停时长：</span>
                </div>
                <div class="content">
                  {{ taskDetails.pauseTime }}
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
                      v-model="taskDetails.planStartTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      :picker-options="pickerOptions"
                      placeholder="预计任务开始时间"
                      @change="editStartTime"
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
                      v-model="taskDetails.planEndTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      :picker-options="pickerOptions"
                      placeholder="预计任务结束时间"
                      @change="editEndTime"
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
                  {{ taskDetails.areaName }}
                  <!-- <div class="list-item-content-box">
                    <el-button
                      class="choose-active"
                      type="primary"
                      plain
                      v-if="taskDetail.areaName != ''"
                      v-model="taskDetail.areaName"
                      >{{ taskDetail.areaName }}</el-button
                    >
                  </div> -->
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span v-if="taskDetails.type == 1" class="tips">*</span>
                  <span>备注：</span>
                </div>
                <div class="conten">
                  <el-input
                    type="textarea"
                    :rows="3"
                    v-model="taskDetails.remark"
                    autocomplete="off"
                  ></el-input>
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


    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      :icon="iconStr"
      @closeMessage="closeMessage"
    ></message>

    <!-- 选择人员 -->
    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="selectType"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <!-- 选择片区 -->
    <!-- <choose-area
      :dialog-area="dialogArea"
      :type="'view'"
      @closeChooseArea="closeChooseArea"
      @checkedArea="checkedArea"
    ></choose-area> -->
  </div>
</template>

<script>
import ChoosePeople from '@/views/public/ChoosePeople.vue';
// import ChooseArea from '@/views/public/ChooseArea.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: taskState, mapActions: taskActions} = createNamespacedHelpers('taskManagement');
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
import {parseTime, judgeTime} from '@/utils/index';
export default {
  name: 'EditTask',
  props: ['dialogEdit'],
  components: {
    ChoosePeople,
    // ChooseArea,
    Message
  },
  data() {
    return {
      // 负责人弹窗状态
      dialogCharge: false,

      // 巡检片区弹窗状态
      // dialogArea: false,

      // 选择任务类型（负责人（单选）、参与人（多选））
      selectType: '',

      // 负责人信息
      person: '',

      // 参与人
      partData: [],

      // 是否显示消息提示弹窗
      dialogMessage: false,

      // 日期限制
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
          return time.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      },

      //
      iconStr: 'el-icon-warning-outline'
    };
  },
  computed: {
    ...taskState(['taskDetails', 'messageText'])
  },
  methods: {
    ...taskActions(['UpdateTask', 'setMessage']),
    ...xunjianActions(['getOrganizationData', 'getRoleData']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeEdit() {
      let data = false;
      this.$emit('closeEdit', data);
    },
    // 点击选择负责人按钮
    choosePerson() {
      // console.log('点击了选择负责人');
      this.$nextTick(() => {
        this.selectType = 'single';
        // console.log(this.selectType);
        this.dialogCharge = true;
        this.getOrganizationData();
        this.getRoleData();
      })
    },
    // 点击选择参与人按钮
    choosePart() {
      // console.log('点击了选择参与人');
      this.$nextTick(() => {
        this.selectType = 'multiple';
        // console.log(this.selectType);
        this.dialogCharge = true;
        this.getOrganizationData();
        this.getRoleData();
      })
    },
    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      // console.log(data);
      this.dialogCharge = data.dialogCharge;
    },
    // 选择人员弹窗选择了人并点击了确定按钮
    checkedPerson(data) {
      // console.log(data);
      if (data.type == 'single') {
        // 负责人
        this.person = data.personinfo;
        this.taskDetails.person = data.personinfo[0].trueName;
        this.taskDetails.personId = data.personinfo[0].id;
      } else if (data.type == 'multiple') {
        // 参与人
        this.partData = data.personinfo;
        this.taskDetails.participants = [];
        this.taskDetails.participantIds = [];
        this.taskDetails.user = [];
        this.partData.forEach(item => {
          this.taskDetails.participants.push(item.trueName);
          this.taskDetails.participantIds.push(item.id);
          this.taskDetails.user.push({
            userName: item.trueName
          });
        });
      }
      this.dialogCharge = data.dialogCharge;
    },
    // 点击选择片区按钮
    // chooseArea() {
    //   this.dialogArea = true;
    // },
    // 关闭选择片区弹窗
    // closeChooseArea(data) {
    //   this.dialogArea = data.dialogArea;
    // },
    // 选择片区弹窗选择了片区并点击了确定按钮
    // checkedArea(data) {
    //   this.dialogArea = data.dialogArea;
    // },
    // 修改开始时间
    editStartTime(val) {
      this.taskDetails.planStartTime = parseTime(val, '{y}-{m}-{d} {h}:{i}');
    },
    // 修改结束时间
    editEndTime(val) {
      this.taskDetails.planEndTime = parseTime(val, '{y}-{m}-{d} {h}:{i}');
    },

    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },
    // 保存
    Edit() {
      if (this.taskDetails.planStartTime == '') {
        this.setMessage('开始时间不能为空');
        this.iconStr = 'el-icon-warning-outline'
        this.dialogMessage = true;
        return;
      }

      if (this.taskDetails.planEndTime == '') {
        this.setMessage('结束时间不能为空');
        this.iconStr = 'el-icon-warning-outline'
        this.dialogMessage = true;
        return;
      }

      let now = new Date();
      now = parseTime(now, '{y}-{m}-{d} {h}:{i}');

      if (judgeTime(now, this.taskDetails.planStartTime)) {
        if (!judgeTime(this.taskDetails.planStartTime, this.taskDetails.planEndTime)) {
          this.setMessage('结束时间不能小于当前时间');
          this.iconStr = 'el-icon-warning-outline'
          this.dialogMessage = true;
          return;
        }
      }else {
        this.setMessage('任务开始时间不能小于当前时间');
        this.iconStr = 'el-icon-warning-outline'
        this.dialogMessage = true;
        return;
      }

      if (this.taskDetails.name == '') {
        this.setMessage('任务名称不能为空');
        this.iconStr = 'el-icon-warning-outline'
        this.dialogMessage = true;
        return;
      }

      if (this.taskDetails.type == 1 && (this.taskDetails.remark == '' || this.taskDetails.remark == null)) {
        // if () {
          this.setMessage('任务备注不能为空');
          this.iconStr = 'el-icon-warning-outline'
          this.dialogMessage = true;
          return;
        // }
      }
      

      let param;
      if (this.taskDetails.type == 1) {
        // 临时任务
        param = {
          Id: this.taskDetails.id,
          name: this.taskDetails.name,
          personId: this.taskDetails.personId,
          person: this.taskDetails.person,
          startTime: this.taskDetails.planStartTime,
          endTime: this.taskDetails.planEndTime,
          remark: this.taskDetails.remark,
        }
      } else if (this.taskDetails.type == 2) {
        // 计划任务（需要添加参与人信息）
        param = {
          Id: this.taskDetails.id,
          name: this.taskDetails.name,
          personId: this.taskDetails.personId,
          person: this.taskDetails.person,
          startTime: this.taskDetails.planStartTime,
          endTime: this.taskDetails.planEndTime,
          remark: this.taskDetails.remark,
          participantIds: this.taskDetails.participantIds,
          participants: this.taskDetails.participants
        }
      }
      
      this.UpdateTask(param).then(res => {
        if (res.success) {
          this.setMessage('修改成功');
          this.iconStr = 'el-icon-circle-check'
          this.dialogMessage = true;
          let data = false;
          this.$emit('getEditData', data);
        }
      }).catch(() => {
        this.iconStr = 'el-icon-warning-outline'
        this.dialogMessage = true;
        let data = false;
        this.$emit('getEditData', data);
      });
      
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

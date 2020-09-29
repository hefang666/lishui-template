<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog
      title="新增任务"
      :visible.sync="dialogAdd"
      :before-close="closeAdd"
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
                      v-model="taskName"
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
                    v-if="inCharge != ''"
                    v-model="inCharge"
                    >{{ inCharge }}</el-button
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
                  <span>预计开始时间：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-date-picker
                      v-model="estimatedStartTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      :picker-options="pickerOptions"
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
                      v-model="estimatedEndTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      :picker-options="pickerOptions"
                      placeholder="预计任务结束时间"
                    ></el-date-picker>
                  </div>
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
                    <el-select
                      v-model="taskType"
                      placeholder="请选择任务类别"
                      @change="selectType"
                    >
                      <el-option label="临时任务" value="1"></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>巡检片区：</span>
                </div>
                <div class="content">
                  <el-button
                    class="choose-active"
                    type="primary"
                    plain
                    v-if="areaInfo.name != ''"
                    v-model="areaInfo.name"
                    >{{ areaInfo.name }}</el-button
                  >
                  <el-button
                    type="primary"
                    plain
                    @click="chooseArea"
                  >
                    选择片区
                  </el-button >
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>备注：</span>
                </div>
                <div class="conten">
                  <el-input
                    type="textarea"
                    :rows="3"
                    v-model="remarks"
                    autocomplete="off"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">保 存</el-button>
        <el-button @click="closeAdd">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      @closeMessage="closeMessage"
    ></message>

    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="'single'"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <choose-area
      :dialog-area="dialogArea"
      :type="'view'"
      @closeChooseArea="closeChooseArea"
      @checkedArea="checkedArea"
    ></choose-area>
  </div>
</template>

<script>
import ChoosePeople from '@/views/public/ChoosePeople.vue';
import ChooseArea from '@/views/public/ChooseArea.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
const {mapState: taskState ,mapActions: taskActions} = createNamespacedHelpers('taskManagement');
import {parseTime, judgeTime} from '@/utils/index';
export default {
  props: ['dialogAdd'],
  components: {
    ChoosePeople,
    ChooseArea,
    Message
  },
  computed: {
    ...taskState(['messageText'])
  },
  data() {
    return {
      // 任务名称
      taskName: '',

      // 负责人姓名
      inCharge: '',

      // 负责人id
      personId: '',

      // 开始时间
      estimatedStartTime: '',
      
      // 结束时间
      estimatedEndTime: '',

      // 任务类型
      taskType: '',

      // 任务类型id
      taskTypeId: '',

      // 区域信息
      areaInfo: {
        areaPoint: '',
        id: '',
        name: '',
        pipelineLength: 0,
        pointCount: 0,
      },

      // 备注
      remarks: '',

      // 负责人弹窗状态
      dialogCharge: false,

      // 巡检片区弹窗状态
      dialogArea: false,

      // 是否显示消息弹窗
      dialogMessage: false,

      // 选择的设备信息
      equiInfo: [],

      // 选择的管道信息
      conInfo: [],

      // 日期限制
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
          return time.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      }
    };
  },
  methods: {
    ...xunjianActions([
      'getOrganizationData',
      'getRoleData',
      'getAreaLists'
    ]),
    ...taskActions(['addTask', 'setMessage']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      let data = false;
      console.log(data);
      this.$emit('closeAdd', data);
    },
    // 点击选择负责人按钮
    choosePerson() {
      this.dialogCharge = true;
      this.getOrganizationData();
      this.getRoleData();
    },
    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      console.log(data);
      this.dialogCharge = data.dialogCharge;
    },
    // 选择负责人弹窗选择了负责人并点击了确定按钮
    checkedPerson(data) {
      console.log(data);
      this.dialogCharge = data.dialogCharge;
      this.inCharge = data.personinfo[0].trueName;
      this.personId = data.personinfo[0].id;
    },
    // 点击确定新建任务
    add() {
      // 验证
      if (this.taskName == '') {
        this.setMessage('任务名称不能为空');
        this.dialogMessage = true;
        return;
      }

      if (this.personId == '') {
        this.setMessage('请选择负责人！');
        this.dialogMessage = true;
        return;
      }

      if (this.estimatedStartTime == '') {
        this.setMessage('请选择任务开始时间');
        this.dialogMessage = true;
        return;
      } else {
        this.estimatedStartTime = parseTime(this.estimatedStartTime, '{y}-{m}-{d} {h}:{i}');
      }

      if (this.estimatedEndTime == '') {
        this.setMessage('请选择任务结束时间');
        this.dialogMessage = true;
        return;
      } else {
        this.estimatedEndTime = parseTime(this.estimatedEndTime, '{y}-{m}-{d} {h}:{i}');
      }

      let now = new Date();
      now = parseTime(now, '{y}-{m}-{d} {h}:{i}');
      if (judgeTime(now, this.estimatedStartTime)) {
        if (!judgeTime(this.estimatedStartTime, this.estimatedEndTime)) {
          this.setMessage('任务结束时间必须大于等于开始时间');
          this.dialogMessage = true;
        }
      } else {
        this.setMessage('任务开始时间必须大于当前时间');
        this.dialogMessage = true;
      }

      if (this.taskType == '') {
        this.setMessage('请选择任务类型');
        this.dialogMessage = true;
        return;
      }

      if (this.areaInfo.name == '') {
        this.setMessage('请选择任务片区');
        this.dialogMessage = true;
        return;
      }

      if (this.remarks == '') {
        this.setMessage('请输入任务备注');
        this.dialogMessage = true;
        return;
      }

      let param = {
        name: this.taskName,
        personId: this.personId,
        startTime: this.estimatedStartTime,
        endTime: this.estimatedEndTime,
        areaId: this.areaInfo.id,
        type: this.taskType,
        person: this.inCharge
      }

      this.addTask(param);

      let data = false;

      this.$emit('closeAdd', data);
    },
    // 点击选择片区按钮
    chooseArea() {
      let param = {
        pageIndex: 1,
        maxResultCount: 30
      }
      console.log(param);
      this.getAreaLists(param);
      this.dialogArea = true;
    },
    // 关闭选择片区弹窗
    closeChooseArea(data) {
      this.dialogArea = data.dialogArea;
    },
    // 选择片区弹窗选择了片区并点击了确定按钮
    checkedArea(data) {
      console.log(data);
      this.dialogArea = data.dialogArea;
      this.areaInfo = data.areaInfo;

      // 可选择设备（暂时先不做，后面再完善）
      if (data.type == 'choose') {
        // this.
      }
      // this.addForm.inCharge = data.name;
    },
    // 选择任务类别
    selectType(val) {
      this.taskType = val;
    },
    //  关闭消息提示框
    closeMessage(data) {
      console.log(data);
      this.dialogMessage = data;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
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

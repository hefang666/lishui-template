<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="新增任务" :visible.sync="dialogAdd">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeAdd">
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
                    >{{ editForm.inCharge }}</el-button
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
                    >
                      <el-option label="普通任务" value="puTong"></el-option>
                      <el-option label="临时任务" value="liShi"></el-option>
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
                  <div class="list-item-content-box">
                    <!-- <el-input type="inspectionArea" v-model="editForm.inspectionArea" autocomplete="off"></el-input> -->
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
                    v-model="remarks"
                    autocomplete="off"
                  ></el-input >
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

    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="'multiple'"
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
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
const {mapActions: taskActions} = createNamespacedHelpers('taskManagement');
export default {
  props: ['dialogAdd'],
  components: {
    ChoosePeople,
    ChooseArea
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
      // 区域名称
      inspectionArea: '',
      // 区域id
      areaId: '',
      // 备注
      remarks: '',
      // 负责人弹窗状态
      dialogCharge: false,
      // 巡检片区弹窗状态
      dialogArea: false
    };
  },
  methods: {
    ...xunjianActions(['getOrganizationData', 'getRoleData']),
    ...taskActions(['addTask']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      let data = {
        dialogAdd: false,
        data: []
      };
      this.$emit('getAddData', data);
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
    // 选择任务类别
    getType(val) {
      this.taskTypeId = val;
    },
    // 点击确定新建任务
    add() {
      // 验证
      // if (this.taskName == '') {
      //   alert('任务名称不能为空');
      //   return
      // }

      // if (this.personId == '') {
      //   alert('请选择负责人！');
      //   return
      // }

      // if (this.estimatedStartTime == '') {
      //   alert('请选择任务开始时间');
      //   return
      // }

      // if (this.estimatedEndTime == '') {
      //   alert('请选择任务结束时间');
      //   return
      // }

      // if (this.taskTypeId == '') {
      //   alert('请选择任务类型');
      //   return
      // }

      // if (this.areaId == '') {
      //   alert('请选择任务片区');
      //   return
      // }

      // let param = {
      //   name: this.taskName,
      //   personId: this.personId,
      //   startTime: this.estimatedStartTime,
      //   endTime: this.estimatedEndTime,
      //   areaId: this.areaId,
      //   type: this.taskTypeId,
      //   person: this.inCharge
      // }
      let param = {
        name: '测试的第六个巡检任务',
        personId: 3,
        startTime: '2020-09-12 12:00',
        endTime: '2020-09-13 18:00',
        areaId: 12,
        type: 1,
        person: '王五',
        remark: '这是我建的第五个测试任务（测试时间格式）'
      }

      console.log(param);
      this.addTask(param);
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
      console.log(data);
      this.dialogArea = data.dialogArea;
      // this.addForm.inCharge = data.name;
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

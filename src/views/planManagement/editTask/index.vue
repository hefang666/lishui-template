<template>
  <div class="editTask-box dialog-box button-box">
    <el-dialog title="修改任务" :visible.sync="editModalVisble">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeEdit">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :model="editForm">
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="任务名称："
                label-width="120px"
                prop="taskName"
                :rules="[{required: true, message: '任务名称不能为空'}]"
              >
                <div class="list-item-content-box">
                  <el-input
                    type="taskName"
                    v-model="editForm.taskName"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item
                class="has-two-item"
                label="任务负责人："
                label-width="120px"
              >
                <el-button
                  class="choose-active"
                  type="primary"
                  plain
                  v-if="editForm.inCharge != ''"
                  v-model="editForm.inCharge"
                  >{{ editForm.inCharge }}</el-button
                >
                <el-button type="primary" plain @click="choosePerson"
                  >选择人员</el-button
                >
              </el-form-item>
            </div>
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="开始时间："
                label-width="120px"
              >
                <div class="list-item-content-box">
                  <el-date-picker
                    v-model="editForm.estimatedStartTime"
                    type="datetime"
                    placeholder="预计任务开始时间"
                  ></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item
                class="has-two-item"
                label="预计结束时间："
                label-width="120px"
              >
                <div class="list-item-content-box">
                  <el-date-picker
                    v-model="editForm.estimatedEndTime"
                    type="datetime"
                    placeholder="预计任务结束时间"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </div>
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="任务类别："
                label-width="120px"
                prop="taskType"
                :rules="[
                  {
                    required: true,
                    message: '任务类别不能为空',
                    trigger: 'change'
                  }
                ]"
              >
                <div class="list-item-content-box">
                  <el-select
                    v-model="editForm.taskType"
                    placeholder="请选择任务类别"
                  >
                    <el-option label="普通任务" value="puTong"></el-option>
                    <el-option label="临时任务" value="liShi"></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                class="has-two-item"
                label="巡检片区："
                label-width="120px"
              >
                <div class="list-item-content-box">
                  <!-- <el-input type="inspectionArea" v-model="editForm.inspectionArea" autocomplete="off"></el-input> -->
                  <el-button type="primary" plain @click="chooseArea"
                    >选择片区</el-button
                  >
                </div>
              </el-form-item>
            </div>
            <el-form-item label="备注：" label-width="120px"
              ><el-input
                type="textarea"
                :rows="3"
                v-model="editForm.remarks"
                autocomplete="off"
              ></el-input
            ></el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEdit">取 消</el-button>
        <el-button type="primary" @click="closeEdit">保存</el-button>
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
const {mapState, mapActions} = createNamespacedHelpers('planManagement');
export default {
  name: 'EditTask',
  components: {
    ChoosePeople,
    ChooseArea
  },
  data() {
    return {
      editForm: {
        taskName: '',
        inCharge: '测试人员',
        estimatedStartTime: '',
        estimatedEndTime: '',
        taskType: '',
        inspectionArea: '',
        remarks: '',
        aa: true
      },
      // 负责人弹窗状态
      dialogCharge: false,
      // 巡检片区弹窗状态
      dialogArea: false
    };
  },
  computed: {
    ...mapState(['editModalVisble'])
  },
  methods: {
    ...mapActions(['changeModalStatus']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeEdit() {
      this.changeModalStatus({
        name: 'editModalVisble',
        status: false
      })
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
    // 关闭选择片区弹窗
    closeChooseArea(data) {
      this.dialogArea = data.dialogArea;
    },
    // 选择片区弹窗选择了片区并点击了确定按钮
    checkedArea(data) {
      console.log(data);
      this.dialogArea = data.dialogArea;
      // this.editForm.inCharge = data.name;
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

      .has-two-item {
        width: 46%;

        .choose-active {
          color: #ffffff;
          background: #4b77be;
          border: none;
          padding: 7px 6px;
          cursor: auto;
        }

        .list-item-content-box {
          width: 220px;
        }
      }
    }
  }
}
</style>

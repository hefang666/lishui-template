<template>
  <div class="addOrder-box dialog-box">
    <el-dialog
      title="新增工单"
      :visible.sync="dialogAdd"
      :close-on-click-modal="false"
      :before-close="closeAdd"
    >
      <div class="content-box  form-box">
        <div class="content_box">
          <el-form>
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>工单类型：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-select
                      v-model="orderType"
                      placeholder="请选择工单类型"
                      @change="selectType"
                    >
                      <el-option
                        v-for="(item, index) in orderTypeData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
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
                  >
                    {{ inCharge }}
                  </el-button>
                  <el-button
                    type="primary"
                    plain
                    @click="choosePerson"
                  >
                    选择人员
                  </el-button>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span>预计完成时间：</span>
                </div>
                <div class="content">
                  <el-date-picker
                    v-model="completionTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    :picker-options="pickerOptions"
                    placeholder="预计完成时间"
                  ></el-date-picker>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>工单内容：</span>
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
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>巡检片区：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-button
                      class="choose-active"
                      type="primary"
                      plain
                      v-if="areaInfo.id != ''"
                      v-model="areaInfo.name"
                    >
                      {{ areaInfo.name }}
                    </el-button>
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
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span>附件上传：</span>
                </div>
                <div class="conten">
                  <upload ref="upload" @showPreview="showPreview"></upload>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选择人员 -->
    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="'single'"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <!-- 选择区域 -->
    <choose-area
      :dialog-area="dialogArea"
      :type="'choose'"
      @closeChooseArea="closeChooseArea"
      @checkedArea="checkedArea"
    ></choose-area>

    <!-- 预览弹窗 -->
    <preview
      :dialog-preview="dialogPreview"
      :file-data="fileData"
      @closePreview="closePreview"
    ></preview>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      @closeMessage="closeMessage"
    ></message>
  </div>
</template>

<script>
import ChoosePeople from '@/views/public/ChoosePeople.vue';
import ChooseArea from '@/views/public/ChooseArea.vue';
import Upload from '@/components/upLoad/index.vue';
import Preview from '@/components/upLoad/Preview.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
const {mapState: workOrderState, mapActions: workOrderActions} = createNamespacedHelpers('workOrderManagement');
const {mapActions: uploadActions} = createNamespacedHelpers('upload');
import {parseTime, judgeTime} from '@/utils/index';
export default {
  name: 'AddOrder',
  props: ['dialogAdd'],
  components: {
    ChoosePeople,
    ChooseArea,
    Upload,
    Preview,
    Message
  },
  data() {
    return {
      // 负责人弹窗状态
      dialogCharge: false,

      // 工单类型
      orderType: '',

      // 负责人
      inCharge: '',

      // 负责人信息
      personInfo: '',

      // 备注
      remarks: '',

      // 是否显示预览弹窗
      dialogPreview: false,

      // 要预览的文件
      fileData: '',

      // 巡检片区弹窗状态
      dialogArea: false,

      // 片区信息
      // 区域信息
      areaInfo: {
        areaPoint: '',
        id: '',
        name: '',
        pipelineLength: 0,
        pointCount: 0,
      },

      // 是否显示提示消息弹窗
      dialogMessage: false,

      // 日期限制
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
          // return time.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      },

      // 预计完成时间
      completionTime: '',

      // 设备信息
      devInfo: ''
    };
  },
  computed: {
    ...workOrderState(['orderTypeData', 'messageText'])
  },
  methods: {
    ...workOrderActions(['setMessage', 'InsertWorkOrder']),
    ...xunjianActions([
      'getOrganizationData',
      'getRoleData',
      'getAreaLists'
    ]),
    ...uploadActions(['clearFileDate']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      // console.log('点击了取消');
      this.clearFileDate();
      let data = {
        dialogAdd: false
      };
      this.$emit('closeAdd', data);
    },
    // 点击选择负责人按钮
    choosePerson() {
      this.getOrganizationData();
      this.getRoleData();
      this.dialogCharge = true;
    },

    // 点击选择片区弹窗
    chooseArea() {
      let param = {
        pageIndex: 1,
        maxResultCount: 30
      }
      // console.log(param);
      this.getAreaLists(param);
      this.dialogArea = true;
    },

    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      this.dialogCharge = data.dialogCharge;
    },
    // 选择负责人弹窗选择了负责人并点击了确定按钮
    checkedPerson(data) {
      this.dialogCharge = data.dialogCharge;
      this.inCharge = data.personinfo[0].trueName;
      this.personInfo = data.personinfo;
    },
    // 打开预览弹窗
    showPreview(data) {
      this.dialogPreview = data.flag;
      this.fileData = data.data;
    },
    // 关闭预览弹窗
    closePreview(data) {
      this.dialogPreview = data;
    },
    // 改变工单状态
    selectType(val) {
      this.orderType = val;
    },
    // 关闭选择片区弹窗
    closeChooseArea(data) {
      this.dialogArea = data.dialogArea;
    },
    // 选择片区弹窗选择了片区并点击了确定按钮
    checkedArea(data) {
      // console.log(data);
      this.dialogArea = data.dialogArea;
      this.areaInfo = data.areaInfo;
      if (data.typestr == 'single') {
        this.devInfo = data.devInfo;
      }
    },
    // 关闭消息提示弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },
    // 点击确定新增工单
    determine() {
      // console.log(this.completionTime);
      // console.log(this.$refs.upload.fileListData);

      if (this.orderType == '') {
        this.setMessage('请选择工单类型');
        this.dialogMessage = true;
        return;
      }

      if (this.inCharge == '') {
        this.setMessage('请选择负责人');
        this.dialogMessage = true;
        return;
      }

      if (this.remarks == '') {
        this.setMessage('请输入工单内容');
        this.dialogMessage = true;
        return;
      }

      if (this.areaInfo.id == '') {
        this.setMessage('请选择巡检片区');
        this.dialogMessage = true;
        return;
      }

      if (this.completionTime != '') {
        this.completionTime = parseTime(this.completionTime, '{y}-{m}-{d} {h}:{i}');
        let nowDate = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}');
        if (judgeTime(nowDate, this.completionTime)) {
          // 时间符合要求
        } else {
          this.setMessage('预计完成时间不能小于当前时间');
          this.dialogMessage = true;
          return;
        }
      }

      let param = {
        personId: this.personInfo.id,
        person: this.inCharge,
        type: this.orderType,
        status: 1,
        planCompleteTime: this.completionTime,
        areaId: this.areaInfo.id,
        content: this.remarks,
        source: 1,
        resourceInfoList: this.$refs.upload.fileListData,
        deviceId: this.devInfo.id,
      };
      // console.log(param);
      this.InsertWorkOrder(param).then(res => {
        // 成功
        if (res.success) {
          this.clearFileDate();
          let data = false;
          this.$emit('getAdd', data);
        }
      }).catch(() => {
        this.dialogMessage = true;
        let data = {
          dialogAdd: false
        };
        this.$emit('closeAdd', data);
      })
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.addOrder-box {
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
        color: #ffffff !important;
        background: #4b77be !important;
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

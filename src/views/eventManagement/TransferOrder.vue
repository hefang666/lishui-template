<template>
  <div class="addTask-box">
    <div class="dialog-box dialog_box button-box">
      <el-dialog
        title="转工单"
        :visible.sync="dialogTransfer"
        :before-close="closeTransfer"
      >
        <div class="content-box form-box">
          <div class="content_box select_box">
            <div>
              <div class="list-item">
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
                        v-for="(item,index) in orderTypeData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-item has-two-item">
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
                <div class="items-box">
                  <div class="title">
                    <span class="tips">*</span>
                    <span>预计完成时间：</span>
                  </div>
                  <div class="content">
                    <el-date-picker
                      v-model="endTime"
                      type="datetime"
                      :picker-options="pickerOptions"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="预计完成时间"
                    ></el-date-picker>
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
            </div>
            <div class="list-box">
              <div class="list-item has-two-item">
                <div class="list-items has-two-item">
                  <div class="item-title">设备名称：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.deviceName }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">设备编号：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.deviceCode }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item has-two-item">
                <div class="list-items has-two-item">
                  <div class="item-title">设备点坐标：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.devicePoint }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">地址：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.address }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item has-two-item">
                <div class="list-items has-two-item">
                  <div class="item-title">设备点状态：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.deviceStatusStr }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">异常类型：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.errorType }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item has-two-item">
                <div class="list-items has-two-item">
                  <div class="item-title">事件类型：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.typeStr }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">事件提交时间：</div>
                  <div class="item-content">
                    <span>2019-01-01 9:00</span>
                  </div>
                </div>
              </div>
              <div class="list-item has-two-item">
                <div class="list-items has-two-item">
                  <div class="item-title">报告人：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.createUser }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">联系方式：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.phone }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item has-two-item">
                <div class="list-items has-two-item">
                  <div class="item-title">事件状态：</div>
                  <div class="item-content">
                    <span>转工单</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">提交工单时间：</div>
                  <div class="item-content">
                    <span>2019-01-01 9:00</span>
                  </div>
                </div>
              </div>
              <div class="list-item has-two-item">
                <div class="list-items">
                  <div class="item-title">预估损失水量：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.predictWaterLoss }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items">
                  <div class="item-title">巡检内容：</div>
                  <div class="item-content">
                    <span>{{ eventDetails.content }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items">
                  <div class="item-title">附件：</div>
                  <div class="item-content">
                    <div class="enclosure-box">
                      <div
                        v-for="(item, index) in eventDetails.resourcelist"
                        :key="index"
                        class="enclosure-item">
                        <div class="enclosure-title">{{ item.fileName }}</div>
                        <div class="enclosure-download">下载</div>
                        <div class="enclosure-preview">预览</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeTransfer">取 消</el-button>
          <el-button type="primary" @click="determineTransfer">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      :close-on-click-modal="false"
      @closeMessage="closeMessage"
    ></message>

    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="'single'"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <!-- 预览弹窗 -->
    <preview
      :dialog-preview="dialogPreview"
      :file-data="fileData"
      @closePreview="closePreview"
    ></preview>
  </div>
</template>

<script>
import ChoosePeople from '@/views/public/ChoosePeople.vue';
import Upload from '@/components/upLoad/index.vue';
import Preview from '@/components/upLoad/Preview.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: eventState, mapActions: eventActions} = createNamespacedHelpers('eventManagement');
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
import {parseTime, judgeTime} from '@/utils/index';
// import ChooseArea from '@/views/public/ChooseArea.vue';
export default {
  name: 'TransferOrder',
  props: ['dialogTransfer'],
  components: {
    ChoosePeople,
    Upload,
    Preview,
    Message
  },
  computed: {
    ...eventState(['orderTypeData', 'eventDetails', 'messageText'])
  },
  data() {
    return {
      // 人员
      inCharge: '',
      // 人员信息
      personInfo: {},

      // 备注
      remarks: '',

      // 负责人弹窗状态
      dialogCharge: false,

      // 工单类型
      orderType: 1,

      // 是否显示预览弹窗
      dialogPreview: false,

      // 选中要预览的文件
      fileData: '',

      // 是否显示提示消息弹窗
      dialogMessage: false,

      // 预计完成时间
      endTime: '',

      // 日期限制
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
          // return time.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      }
    };
  },
  methods: {
    ...eventActions(['UpdateEvent', 'setMessage']),
    ...xunjianActions([
      'getOrganizationData',
      'getRoleData'
    ]),
    // 点击取消或者右上角的×关闭新增弹窗
    closeTransfer() {
      console.log('点击了取消');
      let data = {
        dialogTransfer: false,
        data: []
      };
      this.$emit('closeTransfer', data);
    },
    // 点击选择负责人按钮
    choosePerson() {
      this.getOrganizationData();
      this.getRoleData();
      this.dialogCharge = true;
    },
    
    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      this.dialogCharge = data.dialogCharge;
    },
    // 选择负责人弹窗选择了负责人并点击了确定按钮
    checkedPerson(data) {
      console.log(data);
      this.dialogCharge = data.dialogCharge;
      this.inCharge = data.personinfo[0].trueName;
      this.personInfo = data.personinfo[0];
    },
    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
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
    // 选择工单类型
    selectType(val) {
      this.orderType = val;
    },
    // 点击确定，进行转工单操作
    determineTransfer() {
      console.log(this.orderType);
      console.log(this.inCharge);
      if (this.inCharge == '') {
        this.setMessage('请选择负责人');
        this.dialogMessage = true;
        return;
      }

      if (this.orderType == '') {
        this.setMessage('请选择工单类型');
        this.dialogMessage = true;
        return;
      }

      if (this.endTime == '') {
        this.setMessage('请选择预计完成时间');
        this.dialogMessage = true;
        return;
      }

      let time = parseTime(this.endTime, '{y}-{m}-{d} {h}:{i}');
      let nowDate = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}');

      if (!judgeTime(nowDate, time)) {
        this.setMessage('预计完成时间不能小于当前时间');
        this.dialogMessage = true;
        return;
      }

      let param = {
        Id: this.eventDetails.id,
        status: 2,
        type: this.orderType,
        personId: this.personInfo.id,
        person: this.personInfo.trueName,
        planCompleteTime: time,
        content: this.remarks
      };
      this.UpdateEvent(param).catch(() => {
        this.dialogMessage = true;
      });

      let data = false;
      this.$emit('checkedTransfer', data);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
  .dialog_box {
    /deep/ .el-dialog__body {
      padding:0;
      height: 480px;
      overflow-y: auto;
    }
  }
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

    .list-box {
      padding: 0 40px;

      .list-item {
        display: flex;
        justify-content: space-between;

        .list-items {
          display: flex;
          flex: 1;

          .item-title,
          .item-content span {
            font-size: 12px;
          }

          .item-title {
            width: 100px;
            text-align: right;
            margin-right: 5px;
          }

          .item-content {
            span {
              color: #999999;
            }

            .view-button {
              margin-left: 10px;
            }
            /deep/ .el-button {
              color: #4b77be;
              border-color: #4b77be;
            }
            /deep/ .el-button:hover {
              background: #4b77be;
              color: #ffffff;
            }
            .enclosure-box {
              .enclosure-item {
                display: flex;

                .enclosure-title,
                .enclosure-download,
                .enclosure-preview {
                  padding: 0 10px;
                }
              }
            }
          }
        }
        .has-two-item {
          width: 46%;
        }
      }
    }
  }
}
</style>

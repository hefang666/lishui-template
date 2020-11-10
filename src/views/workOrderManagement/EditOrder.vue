<template>
  <div class="addTask-box">
    <div class="dialog-box dialog_box button-box">
      <el-dialog
        title="修改工单"
        :visible.sync="dialogEdit"
        :close-on-click-modal="false"
        :before-close="closeEdit"
      >
        <div class="content-box form-box">
          <div class="content_box select_box">
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
                        v-model="orderDetails.type"
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
                      v-if="orderDetails.person != ''"
                      v-model="orderDetails.person"
                    >
                      {{ orderDetails.person }}
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
              <div class="list-item has-two-item">
                <div class="items-box">
                  <div class="title">
                    <span>巡检片区：</span>
                  </div>
                  <div class="content">
                    <div class="list-item-content-box">
                      <el-button
                        class="choose-active"
                        type="primary"
                        plain
                        v-if="orderDetails.person != ''"
                        v-model="orderDetails.person"
                      >
                        {{ orderDetails.areaId }}
                      </el-button>
                    </div>
                  </div>
                </div>
                <div class="items-box">
                  <div class="title">
                    <!-- <span class="tips">*</span> -->
                    <span>预计完成时间：</span>
                  </div>
                  <div class="content">
                    <el-date-picker
                      v-model="orderDetails.planCompleteTime"
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
                      v-model="orderDetails.content"
                      autocomplete="off"
                    ></el-input>
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
            <div v-if="orderDetails.eventDetails != null" class="list-box">
              <div class="list-item">
                <div class="list-items has-two-item">
                  <div class="item-title">设备名称：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.deviceName }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">设备编号：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.deviceCode }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items has-two-item">
                  <div class="item-title">设备点坐标：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.devicePoint }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">地址：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.address }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items has-two-item">
                  <div class="item-title">设备点状态：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.deviceStatusStr }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">异常类型：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.errorType }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items has-two-item">
                  <div class="item-title">事件类型：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.typeStr }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">事件提交时间：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.creationTime }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items has-two-item">
                  <div class="item-title">报告人：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.creationName }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">联系方式：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.phone }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items has-two-item">
                  <div class="item-title">事件状态：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.statusStr }}</span>
                  </div>
                </div>
                <div class="list-items has-two-item">
                  <div class="item-title">提交工单时间：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.creationTime }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items">
                  <div class="item-title">巡检内容：</div>
                  <div class="item-content">
                    <span>{{ orderDetails.eventDetails.content }}</span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div class="list-items">
                  <div class="item-title">附件：</div>
                  <div class="item-content">
                    <div class="enclosure-box">
                      <div
                        v-for="(item, index) in orderDetails.resourcelist"
                        :key="index"
                        class="enclosure-item"
                      >
                        <div class="enclosure-title">{{ item.fileName }}</div>
                        <div class="enclosure-download" @click="downLoadPic(item)">下载</div>
                        <div class="enclosure-preview" @click="previewImg(item)">预览</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeEdit">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <choose-people
      :dialog-charge="dialogCharge"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

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
import Upload from '@/components/upLoad/index.vue';
import Preview from '@/components/upLoad/Preview.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: workOrderState, mapActions: workOrderActions} = createNamespacedHelpers('workOrderManagement');
const {mapActions: uploadActions} = createNamespacedHelpers('upload');
import {parseTime, judgeTime} from '@/utils/index';
export default {
  name: 'EditOrder',
  props: ['dialogEdit'],
  components: {
    ChoosePeople,
    Upload,
    Preview,
    Message,
  },
  computed: {
    ...workOrderState(['orderTypeData', 'orderDetails', 'messageText'])
  },
  data() {
    return {
      // 负责人弹窗状态
      dialogCharge: false,
      // 是否显示预览弹窗
      dialogPreview: false,
      // 选择的工单类型
      orderType: '',
      // 选中要预览的图片信息
      fileData: '',
      // 日期限制
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
          // return time.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      },
      // 是否显示提示消息弹窗
      dialogMessage: false,
      // 负责人信息
      personInfo: ''
    };
  },
  methods: {
    ...workOrderActions(['setMessage']),
    ...uploadActions(['downloadFile']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeEdit() {
      console.log('点击了取消');
      let data = {
        dialogEdit: false,
        data: []
      };
      this.$emit('closeEdit', data);
    },
    // 点击选择负责人按钮
    choosePerson() {
      this.dialogCharge = true;
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
      this.orderDetails.person = data.personinfo[0].trueName;
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
    // 关闭消息提示弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },
    // 修改工单类型
    selectType(val) {
      this.orderDetails.type = val;
      console.log(this.orderDetails.type);
    },
    // 点击确定修改工单
    determine() {
      if (this.orderDetails.type == '') {
        // alert('请选择工单类型');
        this.setMessage('请选择工单类型');
        this.dialogMessage = true;
        return;
      }

      if (this.orderDetails.person == '') {
        this.setMessage('负责人不能为空');
        this.dialogMessage = true;
        return;
      }

      
      if (this.orderDetails.content == '') {
        this.setMessage('工单类容不能为空');
        this.dialogMessage = true;
        return;
      }

      if (this.orderDetails.planCompleteTime != '') {
        this.orderDetails.planCompleteTime = parseTime(this.orderDetails.planCompleteTime, '{y}-{m}-{d} {h}:{i}');
        let nowDate = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}');
        if (judgeTime(nowDate, this.orderDetails.planCompleteTime)) {
          // 时间符合要求
        } else {
          this.setMessage('预计完成时间不能小于当前时间');
          this.dialogMessage = true;
          return;
        }
      }

      // 修改工单操作
    },
    // 预览
    previewImg(data) {
      this.fileData = data;
      this.dialogPreview = true;
    },
    // 下载
    downLoadPic(data) {
      var param = {
        downLoadName: data.fileName,
        fileName: data.url
      };
      this.downloadFile(param);
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
      padding: 0;
      height: 480px;
      overflow-y: auto;
    }
  }
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
          cursor: auto;
        }

        .list-item-content-box {
          width: 220px;
        }
      }
    }

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

    .list-box {
      padding: 0 40px;

      .list-item {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;

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

                .enclosure-download,
                .enclosure-preview {
                  color: #4b77be;
                }

                .enclosure-download:hover,
                .enclosure-preview:hover {
                  color: #4288f8;
                  cursor: pointer;
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

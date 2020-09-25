<template>
  <div class="addTask-box">
    <div class="dialog-box dialog_box button-box">
      <el-dialog title="转工单" :visible.sync="dialogEdit">
        <div class="content-box form-box">
          <div class="cancel-box" @click="closeEdit">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </div>
          <div class="content_box select_box">
            <el-form :model="addForm">
              <div class="list-item">
                <el-form-item
                  class="has-two-item"
                  label="工单类型："
                  label-width="120px"
                >
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
                </el-form-item>
                <el-form-item
                  class="has-two-item"
                  label="负责人："
                  label-width="120px"
                >
                  <el-button
                    class="choose-active"
                    type="primary"
                    plain
                    v-if="addForm.inCharge != ''"
                    v-model="addForm.inCharge"
                    >{{ addForm.inCharge }}</el-button
                  >
                  <el-button type="primary" plain @click="choosePerson"
                    >选择人员</el-button
                  >
                </el-form-item>
              </div>
              <el-form-item label="工单内容：" label-width="120px"
                ><el-input
                  type="textarea"
                  :rows="3"
                  v-model="addForm.remarks"
                  autocomplete="off"
                ></el-input
              ></el-form-item>
              <el-form-item label="附件上传：" label-width="120px">
                <upload ref="upload" @showPreview="showPreview"></upload>
              </el-form-item>
            </el-form>
            <div class="list-box">
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
          <el-button @click="closeEdit">取 消</el-button>
          <el-button type="primary" @click="closeEdit">确 定</el-button>
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
  </div>
</template>

<script>
import ChoosePeople from '@/views/public/ChoosePeople.vue';
import Upload from '@/components/upLoad/index.vue';
import Preview from '@/components/upLoad/Preview.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('workOrderManagement');
export default {
  name: 'EditOrder',
  props: ['dialogEdit'],
  components: {
    ChoosePeople,
    Upload,
    Preview
  },
  computed: {
    ...mapState(['orderTypeData', 'orderDetails'])
  },
  data() {
    return {
      addForm: {
        taskName: '',
        inCharge: '测试人员',
        estimatedStartTime: '',
        estimatedEndTime: '',
        taskType: '',
        inspectionArea: '',
        remarks: ''
      },
      // 负责人弹窗状态
      dialogCharge: false,
      selectType: 0,
      exceptionType: 0,
      // 是否显示预览弹窗
      dialogPreview: false,
      // 选择的工单类型
      orderType: '',
      // 选中要预览的图片信息
      fileData: ''
    };
  },
  methods: {
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
      this.addForm.inCharge = data.name;
    },
    // 打开预览弹窗
    showPreview(data) {
      this.dialogPreview = data.flag;
      this.fileData = data.data;
    },
    // 关闭预览弹窗
    closePreview(data) {
      this.dialogPreview = data;
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

<template>
  <div class="addOrder-box dialog-box">
    <el-dialog title="新增工单" :visible.sync="dialogAdd">
      <div class="content-box  form-box">
        <div class="cancel-box" @click="closeAdd">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
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
                      v-for="(item,index) in orderTypeData"
                      :key="index"
                      :label="item.label"
                      :value="item.value"></el-option>
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
                  >{{ inCharge }}</el-button
                >
                <el-button type="primary" plain @click="choosePerson"
                  >选择人员</el-button
                >
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
                  ></el-input >
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
      @closeChooseArea="closeChooseArea"
      @checkedArea="checkedArea"
    ></choose-area>

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
import ChooseArea from '@/views/public/ChooseArea.vue';
import Upload from '@/components/upLoad/index.vue';
import Preview from '@/components/upLoad/Preview.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('workOrderManagement');
export default {
  name: 'addOrder',
  props: ['dialogAdd'],
  components: {
    ChoosePeople,
    ChooseArea,
    Upload,
    Preview
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
      areaInfo: ''
    }
  },
  computed: {
    ...mapState(['orderTypeData'])
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      console.log('点击了取消');
      let data = {
        dialogAdd: false,
        data: []
      };
      this.$emit('closeAdd', data);
    },
    // 点击选择负责人按钮
    choosePerson() {
      this.dialogCharge = true;
    },
    
    // 点击选择片区弹窗
    chooseArea() {
      this.dialogArea = true;
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
      console.log(data);
      this.dialogArea = data.dialogArea;
    },
    // 点击确定新增工单
    determine() {
      if (this.orderType == '') {
        alert('请选择工单类型');
        return
      }

      if (this.inCharge == '') {
        alert('请选择负责人');
        return
      }

      if (this.remarks == '') {
        alert('请输入工单内容');
        return
      }

      if (this.areaInfo == '') {
        alert('请选择巡检片区');
        return
      }

      let param = {
        personId: this.personInfo.id,
        person: this.inCharge,
        status: 1,
        deviceId: 1,
        planCompleteTime: '',
        areaId: '',
        resourceInfoList: ''
      }
      console.log(param);
    }
  }
}
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
<template>
  <div class="addOrder-box dialog-box">
    <el-dialog title="新增工单" :visible.sync="dialogAdd">
      <div class="content-box  form-box">
        <div class="cancel-box" @click="closeAdd">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
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
                  @change="orderType"
                >
                  <el-option
                    v-for="(item,index) in orderTypeData"
                    :key="index"
                    :label="item.label"
                    :value="item.value"></el-option>
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
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="closeAdd">确 定</el-button>
      </div>
    </el-dialog>

    <choose-people
      :dialog-charge="dialogCharge"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <!-- 预览弹窗 -->
    <preview
      :dialog-preview="dialogPreview"
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
  name: 'addOrder',
  props: ['dialogAdd'],
  components: {
    ChoosePeople,
    Upload,
    Preview
  },
  data() {
    return {
      // 负责人弹窗状态
      dialogCharge: false,
      orderType: '',
      addForm: {
        taskName: '',
        inCharge: '测试人员',
        estimatedStartTime: '',
        estimatedEndTime: '',
        taskType: '',
        inspectionArea: '',
        remarks: ''
      },
      dialogPreview: false
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
      this.dialogPreview = data;
    },
    // 关闭预览弹窗
    closePreview(data) {
      this.dialogPreview = data;
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
  }
}

</style>
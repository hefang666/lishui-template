<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="修改车辆信息" :visible.sync="visible" :close-on-click-modal="false" :dialog-edit="dialogEdit">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeEdit">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :model="editForm" :rules="rules" ref="editFormRef">
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="车牌号码："
                label-width="120px"
                prop="number"
                >
                <div class="list-item-content-box">
                  <el-input
                    type="text"
                    v-model="editForm.number"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="车主姓名："
                label-width="120px"
                prop="ownerName"
                >
                <div class="list-item-content-box">
                  <el-input
                    type="text"
                    v-model="editForm.ownerName"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item
                class="has-two-item"
                label="联系电话："
                label-width="120px"
                prop="phoneNumber"
                >
                <div class="list-item-content-box">
                  <el-input
                    type="text"
                    v-model="editForm.phoneNumber"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="车辆颜色："
                label-width="120px"
                prop="color"
                >
                <div class="list-item-content-box">
                  <el-input
                    type="text"
                    v-model="editForm.color"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item
                class="has-two-item"
                label="车辆分类："
                label-width="120px"
                prop="type"
                >
                <div class="list-item-content-box">
                  <el-select 
                    v-model="editForm.type" 
                    placeholder="请选择车辆类型">
                    <el-option 
                    label="标准民用车" 
                    value="0">
                    </el-option>
                    <el-option 
                    label="工程车辆" 
                    value="1">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="list-item">
              <el-form-item
                label="备注：" 
                label-width="120px"
                >
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  :rows="3"
                  maxlength="200"
                  v-model="editForm.remark"
                  show-word-limit
                  style="width:635px;"
                  >
                </el-input>
              </el-form-item>
            </div>
            <div class="list-item">
              <el-form-item 
                label="登记时间：" 
                label-width="120px">
                <el-date-picker
                v-model="editForm.registrationTime"
                type="datetime"
                placeholder="登记时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item
                class="has-two-item"
                label="IMEI："
                label-width="120px"
                prop="iemi"
                >
                <div class="list-item-content-box">
                  <el-input
                    type="text"
                    v-model="editForm.iemi"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEdit">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import { UpdateCar } from '@/api/car'

export default {
  name: 'EditTask',
  props: {
    dialogEdit: {
      type: Boolean,
      default: false
    },
    editData: Object
  },
  data() {
    return {
      editForm: {
        id: 0,
        organizationId: 0,
        number: '',
        ownerName: '',
        phoneNumber: '',
        color: '',
        type: 0,
        brand: '',
        remark: '',
        registrationTime: '',
        iemi: ''
       
      },
      rules:{
        number: [
          { required: true, message: "请输入车牌号码", trigger: "blur" }
        ],
        ownerName: [
          { required: true, message: "请输入车主姓名", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
      },
      visible: this.dialogEdit,
      
    };
  },
  watch: {
    // 监听编辑的对象
    editData(obj){
      this.editForm = obj
    },
    // 监听编辑弹窗
    dialogEdit() {
      this.visible = this.dialogEdit;
    }
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeEdit() {
      this.$refs.editFormRef.resetFields() 
      this.$emit("update:dialogEdit", false);
    },
    // 修改车辆信息并提交
    editSubmit() {
      this.$refs.editFormRef.validate(async valid => {
        // 如果valid的值为true，说明校验成功，反之则校验失败
        if (!valid) return
        UpdateCar(this.editForm).then(res => {
          console.log(res)
          if(res.success){
              this.$emit("update:dialogEdit", false);
              this.$message.success('修改成功！')
              this.$parent.getList()
          }
        })
      })
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
      .has-two-item {
        width: 46%;
        .list-item-content-box {
          width: 220px;
        }
      }
    }
  }
}
</style>

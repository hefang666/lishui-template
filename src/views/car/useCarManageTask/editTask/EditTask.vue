<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="修改用车信息" :close-on-click-modal="false" :visible.sync="visible" :dialog-edit="dialogEdit">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeEdit">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :model="editForm" :rules="rules" ref="editFormRef">
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="选择车辆："
                label-width="120px"
                prop="carNumber"
                >
                <div class="list-item-content-box">
                   <el-select
                    v-model="editForm.carNumber"
                    placeholder="请选择车辆"
                    >
                    <el-option
                    v-for="item in carListData"
                    :key="item.id"
                    :id="item.id"
                    :value="item.value"
                    />
                    </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="选择用车人："
                label-width="120px"
                prop="userName"
                >
                <div class="list-item-content-box">
                  <el-select 
                    v-model="editForm.userName" 
                    placeholder="请选择用车人">
                    <el-option 
                    label="张三" 
                    value="0">
                    </el-option>
                    <el-option 
                    label="李四" 
                    value="1">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="用车时间："
                label-width="120px"
                >
                <div class="list-item-content-box">
                    <el-date-picker
                    v-model="date_value"
                    type="datetimerange"
                    format="yyyy-MM-dd hh:mm"
                    value-format="yyyy-MM-dd hh:mm"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeDate"
                    >
                    </el-date-picker>
                </div>
              </el-form-item>
            </div>
            <el-form-item 
              label="事由：" 
              label-width="120px"
            ><el-input
              type="textarea"
              :rows="3"
              maxlength="200"
              v-model="editForm.reason"
              show-word-limit
              autocomplete="off"
              ></el-input
            ></el-form-item>
            
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
import { UpdateCarUseRecord, GetByOrgId } from '@/api/car'

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
        carId: '',
        carNumber:'',
        userId: '',
        userName: '',
        beginTime: '',
        endTime: '',
        reason: ''
       
      },
      // 车辆列表数据
      carListData: [],
      // 日期时间
      date_value: '',
      // 车辆下拉列表数据
      rules:{
        carNumber: [
          { required: true, message: "车辆不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用车人不能为空", trigger: "blur" }
        ]
        
      },
      visible: this.dialogEdit,
      
    };
  },
  created(){
    this.getCarList()
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
    // 获取用车时间
    changeDate() {
      this.addForm.beginTime = this.date_value[0]
      this.addForm.endTime = this.date_value[1]
    },
    // 获取车辆下拉列表
    getCarList() {
      var _this = this
      let parms = {
        orgId: this.orgId,
        carType: this.carType
      }
      GetByOrgId(parms).then(res => {
        res.result.forEach((e) => {
          // console.log(e)
          _this.carListData.push({
            value: e.number,
            id: e.id
          })
        })
      })
    },
    // 点击取消或者右上角的×关闭新增弹窗
    closeEdit() {
      this.$refs.editFormRef.resetFields() 
      this.$emit("update:dialogEdit", false);
    },
    // 修改用车信息并提交
    editSubmit() {
      this.$refs.editFormRef.validate(async valid => {
        // 如果valid的值为true，说明校验成功，反之则校验失败
        if (!valid) return
        UpdateCarUseRecord(this.editForm).then(res => {
          console.log(res)
          if(res.success){
              this.$emit("update:dialogEdit", false);
              this.$message.success('修改成功！')
              // this.$parent.getList()
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
/deep/.form-box .el-input__icon,
/deep/.el-date-editor .el-range-separator{
  line-height: 22px !important;
}
</style>

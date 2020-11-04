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
                prop="carId"
                >
                <div class="list-item-content-box">
                  <el-select
                    v-model="editForm.carId"
                    clearable
                    placeholder="请选择车辆"
                    @change="changeCar"
                    >
                      <el-option
                      v-for="item in carListData"
                      :key="item.id"
                      :label="item.label"
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
                prop="userId"
                >
                <div class="list-item-content-box">
                  <el-select
                    v-model="editForm.userId"
                    placeholder="请选择用车人"
                    @change="changeUser"
                  >
                    <el-option
                      v-for="(item,index) in userListData"
                      :key="index"
                      :label="item.value"
                      :value="item.id"
                    />
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
                <div>
                  <!-- <el-date-picker
                  v-model="date_value"
                  type="datetimerange"
                  format="yyyy-MM-dd hh:mm"
                  value-format="yyyy-MM-dd hh:mm"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeDate"
                  >
                  </el-date-picker> -->
                  <el-date-picker
                  v-model="editForm.beginTime"
                  type="datetime"
                  :formatter="dateFormat"
                  placeholder="请选择开始时间"
                ></el-date-picker>
                <span class="to-style">-</span>
                <el-date-picker
                  v-model="editForm.endTime"
                  type="datetime"
                  :formatter="dateFormat"
                  placeholder="请选择结束时间"
                ></el-date-picker>
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
        <el-button @click="closeEdit">取消</el-button>
        <el-button type="primary" @click="editSubmit">确定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import { UpdateCarUseRecord } from '@/api/car'
import moment from 'moment'

export default {
  name: 'EditTask',
  props: {
    dialogEdit: {
      type: Boolean,
      default: false
    },
    editFormData: Object,
    carListData: {
      type: Array,
      default: function() {
        return []
      }
    },
    userListData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      editForm: {
        carId: '',
        carNumber: '',
        userId: '',
        userName: '',
        userPhone: '',
        beginTime: '',
        endTime: '',
        reason: ''
      },
      // 车辆列表数据
      // carListData: [],
      // // 用车人列表数据
      // userListData: [],
      // 日期时间
      // date_value: '',
      // 车辆下拉列表数据
      rules:{
        carId: [
          { required: true, message: "车辆不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用车人不能为空", trigger: "blur" }
        ]
        
      },
      visible: this.dialogEdit,
      
    };
  },
 
  watch: {
    // 监听修改用车信息的对象
    editFormData(obj){
      this.editForm = obj
    },
    // 监听修改用车信息弹窗
    dialogEdit() {
      this.visible = this.dialogEdit;
    }
  },
 
  methods: {
    // 获取用车时间
    // changeDate() {
    //   this.editForm.beginTime = this.date_value[0]
    //   this.editForm.endTime = this.date_value[1]
    // },
    // 时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined || date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    // 选择车辆
    changeCar(val){
      this.carListData.map(item => {
        if(Number(item.value) == val){
          this.editForm.carNumber = item.label
        }
      })
    },
    // 选择用车人
    changeUser(val){
      this.userListData.map(item => {
        if(Number(item.id) == val){
          this.editForm.userName = item.value
        }
      })
    },
  
    // 点击取消或者右上角的×关闭修改弹窗
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
          // console.log(res)
          if(res.success){
            this.$emit("update:dialogEdit", false);
            this.$message.success('修改成功！')
            this.$parent.getList()
          }
        })
        .catch(err=>{
          console.log(err)
          this.$message({
            message: '该车在该时间范围内已经被使用，请重新选择',
            type: 'warning'
          });
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
        // width: 46%;
        .list-item-content-box {
          width: 220px;
        }
      }
      .to-style{
        padding:5px 10px;
      }
    }
  }
}
/deep/.form-box .el-input__icon,
/deep/.el-date-editor .el-range-separator{
  line-height: 22px !important;
}
</style>

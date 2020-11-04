<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="新增用车信息" :close-on-click-modal="false" :visible.sync="visible" :dialog-add="dialogAdd" @close="dialogClose">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeAdd">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :rules="addFormRules" :model="form"  ref="addFormRef">
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="选择车辆："
                label-width="120px"
                prop="carId"
                >
                <div class="list-item-content-box">
                  <el-select
                    v-model="form.carId"
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
                    v-model="form.userId"
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
                  v-model="data_value"
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
                  v-model="form.beginTime"
                  type="datetime"
                  :formatter="dateFormat"
                  placeholder="请选择开始时间"
                ></el-date-picker>
                <span class="to-style">-</span>
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  :formatter="dateFormat"
                  placeholder="请选择结束时间"
                ></el-date-picker>
                </div>
              </el-form-item>
            </div>
            <el-form-item label="事由：" label-width="120px"
              ><el-input
                type="textarea"
                :rows="3"
                maxlength="200"
                v-model="form.reason"
                show-word-limit
                autocomplete="off"
              ></el-input
            ></el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { AddCarUseRecord } from '@/api/car'
import moment from 'moment'

export default {
  name: 'AddTask',
  props: {
    dialogAdd: {
      type: Boolean,
      default: false
    },
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
      // 新增用车信息参数
      form: {
        carId: '',
        carNumber: '',
        userId: '',
        userName: '',
        userPhone: '',
        beginTime: '',
        endTime: '',
        reason: ''
      },
      // 车辆下拉列表数据
      // carListData: [],
      // 用车人下拉列表数据
      // userListData: [],
      addFormRules:{
        carId: [
          { required: true, message: "车辆不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用车人不能为空", trigger: "blur" }
        ],
      },
      visible: this.dialogAdd,
    };
  },
  watch: {
    dialogAdd() {
      this.visible = this.dialogAdd
    }
  },
  methods: {
    // 清空表单
    dialogClose(){
      this.form =  {
        carId: '',
        carNumber: '',
        userId: '',
        userName: '',
        userPhone: '',
        beginTime: '',
        endTime: '',
        reason: ''
      }
    },
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
      // console.log('val :>> ', val);
      this.carListData.map(item => {
        if(Number(item.value) == val){
          this.form.carNumber = item.label
        }
      })
    },
    // 选择用车人
    changeUser(val){
      // console.log('this.userListData :>> ', this.userListData);
      this.userListData.map(item => {
        if(Number(item.id) == val){
          this.form.userName = item.value
        }
      })
    },
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      this.$refs.addFormRef.resetFields() // 监听对话框关闭事件
      this.$emit("update:dialogAdd", false);
    },
    // 新增信息并提交
    addSubmit() {
      this.$refs.addFormRef.validate(async valid => {
        // 如果valid的值为true，说明校验成功，反之则校验失败
        if (!valid) return
        AddCarUseRecord(this.form).then(res => {
          if(res.success){
            this.$emit("update:dialogAdd", false);
            this.$message.success('添加成功！')
            this.$parent.getList()
          }
        }).catch(err=>{
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

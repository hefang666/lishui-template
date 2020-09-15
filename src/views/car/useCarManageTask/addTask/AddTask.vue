<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="新增用车信息" :visible.sync="visible" :dialog-add="dialogAdd">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeAdd">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="选择车辆："
                label-width="120px"
                prop="carId"
                >
                <div class="list-item-content-box">
                   <el-select
                    v-model="addForm.carId"
                    clearable
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
                prop="userId"
                >
                <div class="list-item-content-box">
                  <el-select 
                    v-model="addForm.userId" 
                    clearable
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
                    v-model="data_value"
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
            <el-form-item label="事由：" label-width="120px"
              ><el-input
                type="textarea"
                :rows="3"
                maxlength="200"
                v-model="addForm.reason"
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
import { AddCarUseRecord, GetByOrgId } from '@/api/car'

export default {
  name: 'AddTask',
  props: {
    dialogAdd: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      addForm: {
        carId: '',
        userId: '',
        beginTime: '',
        endTime: '',
        reason: ''
      },
      data_value:'',
      // 车辆下拉列表数据
      carListData: [],
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
  created(){
    this.getCarList()
  },
  watch: {
    dialogAdd() {
      this.visible = this.dialogAdd
    }
  },
  methods: {
    // 获取用车时间
    changeDate() {
      this.addForm.beginTime = this.data_value[0]
      this.addForm.endTime = this.data_value[1]
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
    //    console.log(_this.carListData)
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
        AddCarUseRecord(this.addForm).then(res => {
          console.log(res)
           if(res.success){
              // this.dialogAdd = false
              this.$emit("update:dialogAdd", false);
              this.$message.success('添加成功！')
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
/deep/.form-box .el-input__icon,
/deep/.el-date-editor .el-range-separator{
  line-height: 22px !important;
}
</style>

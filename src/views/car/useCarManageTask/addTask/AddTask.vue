<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="新增用车信息" :close-on-click-modal="false" :visible.sync="visible" :dialog-add="dialogAdd">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeAdd">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :rules="addFormRules"  :model="form"  ref="addFormRef">
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
                    >
                      <el-option
                      v-for="item in carListData"
                      :key="item.value"
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
                prop="userName"
                >
                <div class="list-item-content-box">
                  <el-select
                    v-model="form.userName"
                    placeholder="请选择用车人"
                  >
                    <el-option
                      v-for="item in userListData"
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
                label="电话号码："
                label-width="120px"
                prop="userPhone"
                >
                <div class="list-item-content-box">
                  <el-input
                    type="text"
                    v-model="form.userPhone"
                    autocomplete="off"
                  ></el-input>
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
                  format="yyyy-MM-dd hh:mm"
                  value-format="yyyy-MM-dd hh:mm"
                  placeholder="请选择开始时间"
                ></el-date-picker>
                <span class="to-style">-</span>
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  format="yyyy-MM-dd hh:mm"
                  value-format="yyyy-MM-dd hh:mm"
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
import { AddCarUseRecord, GetByOrgId } from '@/api/car'
import { GetOrgUserList } from '@/api/visitor'

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
    // 验证手机号规则
    var checkMobile = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (regMobile.test(value)) {
        // 验证通过，合法的手机号
        return callback()
      }
      // 验证不通过，不合法
      callback(new Error('请输入合法的手机号'))
    }
    return {
      // 新增用车信息参数
      form: {
        carId: '',
        userName: '',
        userPhone: '',
        beginTime: '',
        endTime: '',
        reason: ''
      },
      // 时间日期值
      // data_value:'',
      // 车辆下拉列表数据
      carListData: [],
      // 用车人下拉列表数据
      userListData: [],
      addFormRules:{
        carId: [
          { required: true, message: "车辆不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用车人不能为空", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
      },
      visible: this.dialogAdd,
    };
  },
  // computed: {
  //   ...mapState({
  //     carId: state => state.car.carId
  //   })
  // },
  
  created(){
    this.getCarList(),
    this.getUserList()
  },
  watch: {
    dialogAdd() {
      this.visible = this.dialogAdd
    }
  },
  methods: {
    // 获取用车时间
    // changeDate() {
    //   this.form.beginTime = this.data_value[0]
    //   this.form.endTime = this.data_value[1]
    // },
    
    // 获取车辆下拉列表
    getCarList() {
      var _this = this
      let parms = {
        orgId: 10294,
        numberOrName:'',
        carType: 0
      }
      GetByOrgId(parms).then(res => {
        res.result.forEach((e) => {
          e.carNumber = e.number
          // console.log(e)
          _this.carListData.push({
            value: e.id.toString(),
            label: e.carNumber
          })
        //  console.log(_this.carListData)
        })
      })
    },
    // 获取用车人下拉列表
    getUserList() {
      var _this = this
      let parm = {
        orgIds: []
      }
      GetOrgUserList(parm).then(res => {
        res.result.map(item => {
          item.users.map(items => {
            _this.userListData.push({
            value: items.nickName,
            id: items.id
          })
          })
        })
      })
    },
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      this.$refs.addFormRef.resetFields() // 监听对话框关闭事件
      this.$emit("update:dialogAdd", false);
    },
    // 新增信息并提交
    addSubmit() {
      // this.addForm.carId = this.$store.state.car.carId
      this.$refs.addFormRef.validate(async valid => {
        // 如果valid的值为true，说明校验成功，反之则校验失败
        if (!valid) return
        AddCarUseRecord(this.form).then(res => {
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

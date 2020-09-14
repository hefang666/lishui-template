<template>
  <div class="container">
    <div class="snt-list-left-col">
      <c-tree></c-tree>
    </div>
    <div class="snt-table-right-col">
      <div class="form-box">
        <el-form
          ref="ruleForm"
          inline
          :model="ruleForm"
          :rules="rules"
          :label-position="labelPosition"
          label-width="110px"
        >
        <div class="list-item">
          <el-form-item 
            class="has-two-item" 
            label="车牌号码：" 
            label-width="120px" 
            prop="number"
           >
            <el-input 
            type="text" 
            v-model="ruleForm.number"
            ></el-input>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item 
            class="has-two-item" 
            label="负责人：" 
            label-width="120px" 
            prop="ownerName"
           >
            <el-input 
            type="text" 
            v-model="ruleForm.ownerName"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="has-two-item" 
            label="联系电话："
            label-width="120px" 
            prop="phoneNumber">
            <el-input
            type="text" 
            v-model="ruleForm.phoneNumber"
            ></el-input>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item 
            class="has-two-item" 
            label="车辆颜色：" 
            label-width="120px" 
            >
            <el-input 
            type="text" 
            v-model="ruleForm.color"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="has-two-item" 
            label="车辆分类："
            label-width="120px"
            >
            <el-select 
              v-model="ruleForm.type" 
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
          </el-form-item>
        </div> 
        <!-- <div class="list-item">
          <el-form-item
            class="has-two-item" 
            label="品牌分类："
            label-width="120px"
            >
            <el-select 
              v-model="ruleForm.brand" 
              placeholder="请选择品牌分类">
              <el-option 
              label="宝马" 
              value="0">
              </el-option>
              <el-option 
              label="奔驰" 
              value="1">
              </el-option>
            </el-select>
          </el-form-item>
        </div> -->
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
              v-model="ruleForm.remark"
              show-word-limit
              style="width:660px;"
              >
            </el-input>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item
            class="has-two-item"
            label="登记时间："
            label-width="120px"
          >
            <div class="list-item-content-box">
              <el-date-picker
                v-model="ruleForm.registrationTime"
                type="datetime"
                placeholder="登记时间"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item 
            class="has-two-item" 
            label="IMEI：" 
            label-width="120px" 
            >
            <el-input 
            type="text" 
            v-model="ruleForm.iemi"
            ></el-input>
          </el-form-item>
        </div>  
          
          <div class="footer-btn">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
            <el-button @click="goToLink">管理列表</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import { InsertCar } from '@/api/car';

export default {
  components: { cTree },
  data() {
    // 验证手机号的验证规则
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
      labelPosition: "left",
      ruleForm: {
        organizationId: 0,
        number: "",
        ownerName: "",
        phoneNumber: "",
        color: "",
        type: "",
        brand: "",
        remark: "",
        registrationTime: "",
        iemi: ""
      },
      rules: {
        number: [
          { required: true, message: "请输入车牌号码", trigger: "blur" },
        ],
        ownerName: [
          { required: true, message: "请输入负责人", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        
      },
      
    };
  },
  created(){
   
  },
  methods: {
    // 保存车辆登记信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          InsertCar([this.ruleForm]).then(res => {
            console.log(res)
            // this.getList()
            this.$message.success('创建成功！')
            }).catch(err => {
            console.log(err)
          })
        } else {
          console.log("创建失败！");
          return false;
        }
      });
    },
   
    // 跳转到列表
    goToLink() {
      this.$router.replace("/car/CarManage");
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.container{
  width:100%;
  display: flex;
  overflow: hidden;
}
.snt-list-left-col {
  position: absolute;
  width: 190px;
  min-height:calc(100vh - 24px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
}
.snt-table-right-col {
  margin-left: 190px;
  overflow: hidden;
  padding:30px;
  flex: 1;

  .form-box {
    width: 950px;
    padding: 20px;
    margin-right: 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
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
  .footer-btn {
    margin: auto;
    text-align: center;
  }
  //上传图片
  .org-img {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    height: 80px;
    width: 80px;
  }
  .avatar-uploader {
    border: none;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar-uploader ::v-deep .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .no-avatar-wrapper {
    display: flex;
    align-items: center;
    .intro-text {
      display: flex;
      margin-left: 20px;
      font-size: 14px;
      color: #ababab;
      flex-direction: column;
      align-items: flex-start;
      > div {
        line-height: 30px;
      }
      .upload-text {
        color: #f4f4f4;
      }
    }
  }
}

</style>

<template>
  <div class="container">
    <div class="snt-list-left-col">
      <c-tree :treeData="treeData"></c-tree>
    </div>
    <div class="snt-table-right-col">
      <div class="form-box">
        <el-form
          ref="ruleForm"
          inline
          :model="ruleForm"
          :rules="rules"
          label-width="110px"
        >
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
              v-model="ruleForm.number"
              ></el-input>
            </div>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item 
            class="has-two-item" 
            label="负责人：" 
            label-width="120px" 
            prop="ownerName"
           >
           <div class="list-item-content-box">
            <el-input 
            type="text" 
            v-model="ruleForm.ownerName"
            ></el-input>
           </div>
          </el-form-item>
          <el-form-item
            class="has-two-item" 
            label="联系电话："
            label-width="120px" 
            prop="phoneNumber">
            <div class="list-item-content-box">
            <el-input
            type="text" 
            v-model="ruleForm.phoneNumber"
            ></el-input>
            </div>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item 
            class="has-two-item" 
            label="车辆颜色：" 
            label-width="120px" 
            >
            <div class="list-item-content-box">
              <el-input 
              type="text" 
              v-model="ruleForm.color"
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
              v-model="ruleForm.type" 
              placeholder="请选择车辆类型"
              >
              <el-option 
              label="标准民用车" 
              :value="0">
              </el-option>
              <el-option 
              label="工程车辆" 
              :value="1">
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
            <div class="list-item-content-box">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              :rows="3"
              maxlength="200"
              v-model="ruleForm.remark"
              show-word-limit
              style="width:700px;"
              >
            </el-input>
            </div>
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
            <div class="list-item-content-box">
            <el-input 
            type="text" 
            v-model="ruleForm.iemi"
            ></el-input>
            </div>
          </el-form-item>
        </div>  
          <div class="footer-btn">
            <el-button 
            type="primary" 
            @click="submitForm('ruleForm')"
            >保存</el-button>
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
import { GetOrgagencyTree } from '@/api/role';

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
    // 正则验证车牌,验证通过返回true,不通过返回false
    var isLicensePlate = (rule, value, callback) => {
      const regLicensePlate = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
      if (regLicensePlate.test(value)) {
        // 验证通过，合法的车牌号
        return callback()
      }
      // 验证不通过，不合法
      callback(new Error('请输入合法的车牌号'))
    }
    return {
      treeData: [], // 组织机构树
      ruleForm: {
        organizationId: '',
        number: "",
        ownerName: "",
        phoneNumber: "",
        color: "",
        type: '',
        brand: "",
        remark: "",
        registrationTime: "",
        iemi: ""
      },
      // 车辆类型值
      // type_value:'',
      rules: {
        number: [
          { required: true, message: "请输入车牌号码", trigger: "blur" },
          { validator: isLicensePlate, trigger: "blur" }
        ],
        ownerName: [
          { required: true, message: "请输入负责人", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择车辆类型", trigger: "blur" },
        ]
        
      },
      
    };
  },
  mounted(){
    this.getTreeData()
  },
  methods: {
    // 加载组织机构树
    getTreeData() {
      GetOrgagencyTree().then(res => {
        // console.log(res)
        if(res.success) {
          this.treeData = res.result
          let id = res.result[0].id
          this.ruleForm.organizationId = id
          // this.getList()
        }else {
          return false
        }
      })
    },
    // 获取车辆类型
    // changeType() {
    //   this.ruleForm.type = this.type_value[0]
    //   this.ruleForm.type = this.type_value[1]
    // },
    // 保存车辆登记信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          InsertCar([this.ruleForm]).then(res => {
            // console.log(res)
            if(res.success) {
              this.$message.success('登记车辆成功！')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log("登记车辆失败！");
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
  /deep/.el-button--primary{
    background-color: #4b77be;
    border-color: #4b77be;
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

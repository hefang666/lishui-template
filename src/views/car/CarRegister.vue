<template>
  <div class="container">
    <div class="m-tree-left-col">
      <c-tree></c-tree>
    </div>
    <div class="m-grid-right-col">
      <div class="form-box">
        <el-form
          ref="ruleForm"
          inline
          :model="ruleForm"
          :rules="rules"
          :label-position="labelPosition"
          label-width="110px"
        >
          <div>
            <el-form-item label="车牌号码：" prop="carNumber">
              <el-input v-model="ruleForm.carNumber"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="负责人：" prop="person">
            <el-input v-model="ruleForm.person"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="tel">
            <el-input v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="车辆颜色：" prop="color">
            <el-input v-model="ruleForm.color"></el-input>
          </el-form-item>
          <el-form-item label="车辆分类：" prop="carType">
            <el-select v-model="ruleForm.carType" placeholder="请选择车辆类型">
              <el-option label="标准民用车" value="0"></el-option>
              <el-option label="工程车辆" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="ruleForm.remarks"
              maxlength="200"
              show-word-limit
              style="width:540px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="登记时间：" prop="registerDate">
            <el-date-picker
              v-model="ruleForm.registerDate"
              type="datetime"
              placeholder="请选择登记时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="IMEI：" prop="imei">
            <el-input v-model="ruleForm.imei"></el-input>
          </el-form-item>
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
export default {
  components: { cTree },
  data() {
    return {
      labelPosition: "right",
      ruleForm: {
        carNumber: "",
        person: "",
        tel: "",
        color: "",
        carType: "",
        registerDate: ""
      },
      rules: {
        carNumber: [
          { required: true, message: "请输入车牌号码", trigger: "blur" }
        ],
        person: [{ required: true, message: "请输入负责人", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 1, max: 10, message: "长度在10字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 页面跳转
    goToLink() {
      this.$router.replace("/car/CarManage");
    }
  }
};
</script>

<style scoped lang="scss">
.container{
  width:100%;
  display: flex;
  overflow: hidden;
}
.m-tree-left-col {
  position: absolute;
  width: 190px;
  min-height:calc(100vh - 24px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
}
.m-grid-right-col {
  margin-left: 190px;
  overflow: hidden;
  padding:30px;
  flex: 1;
}
.form-box {
  width: 950px;
  padding: 20px;
  margin-right: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.footer-btn {
  margin: auto;
  text-align: center;
}
</style>

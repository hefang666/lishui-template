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
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型：" prop="documentType">
            <el-select v-model="ruleForm.documentType" placeholder="请选择类型">
              <!-- <el-option
                v-for="item in documentTypeData"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              /> -->
              <el-option label="身份证" value="0"></el-option>
              <el-option label="军官证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" prop="number">
            <el-input v-model="ruleForm.number"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：" prop="tel">
            <el-input v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="车牌号码：">
            <el-input v-model="ruleForm.carNumber"></el-input>
          </el-form-item>
          <div>
            <el-form-item label="来访公司：">
              <el-input
                v-model="ruleForm.company"
                style="width:540px;"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="来访事由：">
              <el-input
                v-model="ruleForm.matter"
                style="width:540px;"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="被访人：" prop="intervieweesId">
            <el-select
              v-model="ruleForm.intervieweesId"
              placeholder="请选择被访人"
            >
              <el-option
                v-for="item in intervieweesData"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="同行人数：" prop="numberPeers">
            <el-input
              v-model.number="ruleForm.numberPeers"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div>
            <el-form-item label="证件照片：" prop="img">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="来访时间：" prop="visitDate">
              <el-date-picker
                v-model="ruleForm.visitDate"
                type="datetime"
                placeholder="请选择来访时间"
              >
              </el-date-picker>
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
export default {
  components: { cTree },
  data() {
    return {
      labelPosition: "left",
      ruleForm: {
        name: "",
        documentType: "",
        number: "",
        tel: "",
        carNumber: "",
        company: "",
        matter: "",
        intervieweesId: "",
        numberPeers: "",
        img: "",
        visitDate: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在20字符", trigger: "blur" }
        ],
        documentType: [
          { required: true, message: "请选择类型", trigger: "blur" }
        ],
        number: [{ min: 1, max: 10, message: "长度在10字符", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 1, max: 10, message: "长度在10字符", trigger: "blur" }
        ],
        carNumber: [
          { required: true, message: "请输入车牌号码", trigger: "blur" }
        ],
        intervieweesId: [
          { required: true, message: "请选择被访人", trigger: "blur" }
        ],
        numberPeers: [{ type: "number", message: "请输入数字值" }]
      },
      // 被访人列表数据
      intervieweesData: [],
      imageUrl: ""
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
    // 上传照片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    goToLink() {
      this.$router.replace("/visitor/VisitorManage");
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

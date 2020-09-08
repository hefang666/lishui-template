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
          <el-form-item label="姓名：" prop="VisitorName">
            <el-input v-model="ruleForm.VisitorName"></el-input>
          </el-form-item>
          <el-form-item label="证件类型：" prop="IdCardType">
            <el-select v-model="ruleForm.IdCardType" placeholder="请选择类型">
              <!-- <el-option
                v-for="item in documentTypeData"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              /> -->
              <el-option label="身份证" value="身份证"></el-option>
              <el-option label="军官证" value="军官证"></el-option>
              <el-option label="护照" value="护照"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" prop="IdCardNumber">
            <el-input v-model="ruleForm.IdCardNumber"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：" prop="PhoneNumber">
            <el-input v-model="ruleForm.PhoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="车牌号码：">
            <el-input v-model="ruleForm.CarNumber"></el-input>
          </el-form-item>
          <div>
            <el-form-item label="来访公司：">
              <el-input
                v-model="ruleForm.Company"
                style="width:540px;"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="来访事由：">
              <el-input
                v-model="ruleForm.Reason"
                style="width:540px;"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="被访人：" prop="Interviewees">
            <el-select
              v-model="ruleForm.Interviewees"
              placeholder="请选择被访人"
            >
              <el-option
                v-for="item in intervieweesData"
                :key="item.id"
                :id="item.id"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="同行人数：" prop="VisitorCount">
            <el-input
              v-model.number="ruleForm.VisitorCount"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div>
            <el-form-item label="证件照片：" prop="IdCardPhoto">
              <el-upload
                class="avatar-uploader"
                action="/api/UploadFiles/UploadProfilePicture"
                :show-file-list="false"
                :with-credentials="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/*"
              >
                <div class="no-avatar-wrapper">
                  <img class="org-img" v-if="imageUrl" :src="imageUrl" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="intro-text">
                    <!-- <div class="upload-text">点击上传</div> -->
                    <div>建议上传图片尺寸为25*25，大小不超过 5M</div>
                  </div>
                </div>
              </el-upload>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="来访时间：" prop="VisitingTime">
              <el-date-picker
                v-model="ruleForm.VisitingTime"
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
import { PostUserList, getUpload, GetInsertRecord } from '@/api/visitor';

export default {
  components: { cTree },
  data() {
    return {
      labelPosition: "left",
      ruleForm: {
        VisitorName: "",
        IdCardType: "",
        IdCardNumber: "",
        PhoneNumber: "",
        CarNumber: "",
        Company: "",
        Reason: "",
        Interviewees: "",
        VisitorCount: "",
        IdCardPhoto: "",
        VisitingTime: ""
      },
      rules: {
        VisitorName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在20字符", trigger: "blur" }
        ],
        IdCardType: [
          { required: true, message: "请选择类型", trigger: "blur" }
        ],
        IdCardNumber: [{ min: 1, max: 10, message: "长度在10字符", trigger: "blur" }],
        PhoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 1, max: 10, message: "长度在10字符", trigger: "blur" }
        ],
        CarNumber: [
          { required: true, message: "请输入车牌号码", trigger: "blur" }
        ],
        Interviewees: [
          { required: true, message: "请选择被访人", trigger: "blur" }
        ],
        VisitorCount: [{ type: "number", message: "请输入数字值" }]
      },
      // 被访人列表数据
      intervieweesData: [],
      imageUrl: ""
    };
  },
  created(){
    this.getInterviewees()
  },
  methods: {
    // 获取被访人列表
    getInterviewees() {
      var _this = this
      let parm = {
        orgId:10294,
        isContainSublevel:true,
        pageIndex:1,
        maxResultCount:10
      }
      PostUserList(parm).then(res => {
        console.log(res)
        // let data = res.result.items
        // for(let i=0; i<data.length; i++){
        //     data[i].value = data[i].id
        //     data[i].label = data[i].nickName
        // }
        // console.log(data)
        // this.userlist = data
        // console.log(this.userlist)
        res.result.items.forEach((e) => {
          // console.log(e)
          _this.intervieweesData.push({
            value: e.nickName,
            id: e.id
          })
        })
        // console.log(_this.intervieweesData)
      })
    },
    // 新增访客记录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          GetInsertRecord(this.ruleForm).then(res => {
            console.log(res)
            this.$message.success('创建成功！')
            }).catch(err => {
            console.log(err)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上传照片
    beforeAvatarUpload(file) {
      const isLt4M = file.size / 1024 < 1024 * 5;
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 5M!");
      }
      return isLt4M;
    },
    handleAvatarSuccess(file) {
      if (file.code == "SUCCESS") {
        this.$emit("input", file.data);
      }
    },
    getUpload(id) {
      getUpload({ fileId: id }).then(res => {
        if (res.result) {
          this.imageUrl = res.result;
        }
      });
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
</style>

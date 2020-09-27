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
            label="姓名：" 
            label-width="120px" 
            prop="visitorName"
           >
           <div class="list-item-content-box">
            <el-input 
            type="text" 
            v-model="ruleForm.visitorName"
            ></el-input>
           </div>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item 
          class="has-two-item" 
          label="证件类型：" 
          prop="idCardType" 
          label-width="120px">
            <div class="list-item-content-box">
              <el-select v-model="ruleForm.idCardType" placeholder="请选择证件类型">
                <el-option label="身份证" :value="0"></el-option>
                <el-option label="军官证" :value="1"></el-option>
                <el-option label="护照" :value="2"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item 
            class="has-two-item" 
            label-width="120px" 
            label="证件号码：" 
            prop="idCardNumber">
            <div class="list-item-content-box">
              <el-input type="text" v-model="ruleForm.idCardNumber"></el-input>
            </div>
          </el-form-item>
         
        </div>
        <div class="list-item">
          <el-form-item 
          class="has-two-item" 
          label-width="120px" 
          label="电话号码：" 
          prop="phoneNumber">
          <div class="list-item-content-box">
            <el-input type="text" v-model="ruleForm.phoneNumber"></el-input>
          </div>
          </el-form-item>
          <el-form-item 
          class="has-two-item" 
          label-width="120px"
          label="车牌号码："
          prop="carNumber"
          >
          <div class="list-item-content-box">
            <el-input type="text" v-model="ruleForm.carNumber"></el-input>
          </div>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item 
          class="has-two-item" 
          label-width="120px" 
          label="来访公司：">
          <div class="list-item-content-box">
            <el-input
              type="text"
              v-model="ruleForm.company"
              style="width:700px;"
            ></el-input>
          </div>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item 
          class="has-two-item" 
          label-width="120px"
          label="来访事由：">
          <div class="list-item-content-box">
            <el-input
              type="text" 
              v-model="ruleForm.reason"
              style="width:700px;"
            ></el-input>
          </div>
          </el-form-item>
        </div>
        <div class="list-item">
          <el-form-item 
          class="has-two-item" 
          label-width="120px"
          label="被访人：" 
          prop="interviewees">
          <div class="list-item-content-box">
            <el-select
              v-model="ruleForm.interviewees"
              placeholder="请选择被访人"
            >
              <el-option
                v-for="item in intervieweesData"
                :key="item.id"
                :id="item.id"
                :value="item.value"
              />
            </el-select>
          </div>
          </el-form-item>
          <el-form-item 
          class="has-two-item" 
          label-width="120px"
          label="同行人数：" 
          >
          <div class="list-item-content-box">
            <el-input
              type="text"
              v-model.number="ruleForm.visitorCount"
              autocomplete="off"
            ></el-input>
          </div>
          </el-form-item>
        </div>
          <div class="list-item">
            <el-form-item 
            label-width="120px"
            label="证件照片：" 
            prop="idCardPhoto">
              <el-upload
                class="avatar-uploader"
                action="http://192.168.9.44:9090/api/UploadFiles/UploadProfilePicture"
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
                    <div>建议上传图片尺寸为25*25，大小不超过 5M</div>
                  </div>
                </div>
              </el-upload>
            </el-form-item>
          </div>
          <div class="list-item">
            <el-form-item label="来访时间：" prop="visitTime">
              <div class="list-item-content-box">
              <el-date-picker
                v-model="ruleForm.visitTime"
                type="datetime"
                placeholder="请选择来访时间"
              ></el-date-picker>
              </div>
            </el-form-item>
          </div>
          <div class="footer-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="goToLink">管理列表</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import { PostUserList, GetInsertRecord } from '@/api/visitor';
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
      // 组织机构树
      treeData: [],
      ruleForm: {
        visitorName: "",
        idCardType: '',
        idCardNumber: "",
        phoneNumber: "",
        carNumber: "",
        address: "",
        company: "",
        reason: "",
        interviewees: "",
        visitorCount: '',
        idCardPhoto: "",
        visitTime: "",
        checkStatus: 1,
        checkAddress: "",
        resource: 1,
        code: ""

      },
      rules: {
        visitorName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在20字符", trigger: "blur" }
        ],
        idCardType: [
          { required: true, message: "证件类型不能为空", trigger: "blur" }
        ],
        idCardNumber: [{ min: 1, max: 10, message: "长度在10字符", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        carNumber: [
          { required: true, message: "请输入车牌号码", trigger: "blur" },
          { validator: isLicensePlate, trigger: "blur" }
        ],
        interviewees: [
          { required: true, message: "请选择被访人", trigger: "blur" }
        ],
        // visitorCount: [{ required: true,type: "number", message: "请输入数字值",trigger: "blur" }],
        visitTime: [
          { required: true, message: "请输入来访时间", trigger: "blur" },
        ]
      },
      // 被访人下拉列表
      intervieweesData: [],
      // 图片地址
      imageUrl: ""
    };
  },
  created(){
    this.getInterviewees(),
    this.getTreeData()// 加载组织机构树
  },
  methods: {
    // 加载组织机构树
    getTreeData() {
      GetOrgagencyTree().then(res => {
        // console.log(res)
        if(res.success) {
          this.treeData = res.result
        }else {
          return false
        }
        
      })
    },
    // 获取被访人列表
    getInterviewees() {
      var _this = this
      let parm = {
        orgId: 10294,
        isContainSublevel: true,
        pageIndex: 1,
        maxResultCount: 10
      }
      PostUserList(parm).then(res => {
        res.result.items.forEach((e) => {
          // console.log(e)
          _this.intervieweesData.push({
            value: e.nickName,
            id: e.id
          })
        })
      })
    },
    // 保存访客记录信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          GetInsertRecord(this.ruleForm).then(res => {
            if(res.success) {
              this.$message.success('登记成功！')
              //  this.getList()
            }
            }).catch(err => {
            console.log(err)
          })
        } else {
          console.log("登记失败！");
          return false;
        }
      });
    },
    // 上传证件照片
    beforeAvatarUpload(file) {
      // console.log(file)
      const isLt4M = file.size / 1024 < 1024 * 5;
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 5M!");
      }
      return isLt4M;
    },
    handleAvatarSuccess(file) {
      let url = "http://192.168.9.44:9090/" + file.result.items[0].url
      console.log(file)
      if (file.success) {
        // this.imageUrl = file.result.items[0].url;
        this.imageUrl = url;
        console.log(this.imageUrl)
      }
    },
    // 跳转到列表
    goToLink() {
      this.$router.replace("/visitor/VisitorManage");
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

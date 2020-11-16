<template>
  <div class="container">
    <div class="snt-list-left-col">
      <div class="list-box">
        <div class="snt-left-list">
          <div 
            :class="{active: currentIndex === index}" 
            v-for="(item, index) in pointPowerData" 
            :key="index" 
            @click="changeList(index)">
            <span>{{item.pointName}}</span>
          </div>
        </div>
      </div>
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
                <el-option label="身份证" :value="1"></el-option>
                <el-option label="军官证" :value="2"></el-option>
                <el-option label="护照" :value="3"></el-option>
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
              style="width:692px;"
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
              style="width:692px;"
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
                :label="item.label"
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
                format="yyyy-MM-dd hh:mm:ss"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="请选择来访时间"
              ></el-date-picker>
              </div>
            </el-form-item>
          </div>
          <div class="footer-btn">
            <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button> -->
            <KtButton type="primary" size="small" @click="submitForm('ruleForm')" label='保存' perms='Security.Visitor.Register.Add'/>
            <el-button size="small" @click="goToLink">管理列表</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { PostUserList, GetInsertRecord, GetPointPower } from '@/api/visitor';

export default {
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
      if (value=='' || regLicensePlate.test(value)) {
        // 验证通过，合法的车牌号
        return callback()
      }
      // 验证不通过，不合法
      callback(new Error('请输入合法的车牌号'))
    }
   
    return {
      // 表单参数
      ruleForm: {
        visitorName: '',
        idCardType: '',
        idCardNumber: '',
        phoneNumber: '',
        idCardPhoto: '',
        carNumber: '',
        address: '',
        reason: '',
        company: '',
        interviewees: '',
        visitorCount: 0,
        remark: '',
        visitTime: '',
        leaveTime:'',
        checkStatus: 1,
        checkAddress: '',
        resource: 1,
        code: ''
      },
      // 表单验证规则
      rules: {
        visitorName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在20个字符", trigger: "blur" }
        ],
        idCardType: [
          { required: true, message: "证件类型不能为空", trigger: "blur" }
        ],
        idCardNumber: [
          { required: true, min: 18, max: 20, message: "长度必须在20个字符以内", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        carNumber: [
          { required: false, message: "请输入车牌号码", trigger: "blur" },
          { validator: isLicensePlate, trigger: "blur" }
        ],
        interviewees: [
          { required: true, message: "请选择被访人", trigger: "blur" }
        ],
        visitorCount: [
          { required: false, type: "number", message: "请输入数字值",trigger: "blur" }
        ],
        visitTime: [
          { required: true, message: "请输入来访时间", trigger: "blur" },
        ]
      },
      // 访客登记点数据
      pointPowerData:[],
      currentIndex: 0, // 默认选中第一个
      // 被访人下拉列表
      intervieweesData: [],
      // 图片地址
      imageUrl: ""
    };
  },
  mounted(){
    this.getInterviewees(), // 加载被访人下拉列表
    this.getPointPower() // 加载访客登记点
  },
  methods: {
    // 获取访客登记点
    getPointPower(){
      GetPointPower().then(res => {
        console.log(res)
        if(res.success){
          this.pointPowerData = res.result
        }
      })
    },
    // 点击切换列表事件
    changeList(index) {
      // console.log(index)
      this.currentIndex = index
      this.ruleForm.code = this.pointPowerData[this.currentIndex].pointName
    },
    // 获取被访人列表
    getInterviewees() {
      var _this = this
      let parm = {
        orgId: 10294,
        isContainSublevel: false,
        // isExport: true,
        isAdvanced: false,
        advanced: {
          sex: null,
          status: null,
          position: null
        },
        filter: '',
        pageIndex: 1,
        maxResultCount: 30
      }
      PostUserList(parm).then(res => {
        let newsData = []
        res.result.items.forEach((e) => {
          // console.log(e)
          newsData.push({
            // value: e.nickName,
            // id: e.id
            value:e.id,
            label:e.nickName
          })
        })
        _this.intervieweesData = newsData
      })
    },
    // 保存访客记录信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.code = this.pointPowerData[this.currentIndex].pointName
          // console.log(this.ruleForm.code)
          GetInsertRecord(this.ruleForm).then(res => {
            if(res.success) {
              this.$message.success('登记成功！')
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '该访客已被登记',
              type: 'warning'
            });
          })
        } else {
          // console.log("登记失败！");
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
      // console.log(file)
      if (file.success) {
        // this.imageUrl = file.result.items[0].url;
        this.imageUrl = url;
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
  height: 100%;
  width: 190px;
  min-height:calc(100vh - 10px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
  .list-box div{
    height: 26px;
    line-height: 26px;
    color: #4b77be;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    &.active {
      background: #4b77be;
      color: #fff;
    }
    
  }
  .list-box div:first-child{
    margin-top: 10px;
  }
}
.snt-table-right-col {
  margin-left: 190px;
  overflow: hidden;
  padding:30px;
  flex: 1;

  .form-box {
    width: 935px;
    height: 776px;
    padding: 20px;
    margin-right: 50px;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
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
    border-radius: 4px;
    height: 104px;
    width: 104px;
  }
  .avatar-uploader {
    border: none;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    background:  rgba(0,0,0,0.04);
    color: #8c939d;
    height: 104px;
    width: 104px;
    line-height: 104px;
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

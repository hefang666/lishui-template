<template>
  <div class="dailyupload">
    <div class="dailybox">
      <el-form
        :model="dailyruleForm"
        :rules="dailyrules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文件类型:">
          {{
            dailyruleForm.reportType == '1'
              ? '化验室每日结果简报'
              : '化验室每月结果简报'
          }}
        </el-form-item>
        <el-form-item label="日期:" prop="reportDate">
          <i></i>
          <el-date-picker
            v-model="dailyruleForm.reportDate"
            type="datetime"
            placeholder="选择日期"
            @change="handlechangedate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="选择文件:">
          <el-row>
            <el-col :span="8" class="filecol">
              <el-input v-model="fileName" width="100px" disabled></el-input>
            </el-col>
          </el-row>
          <el-row class="dailyrow">
            <el-col :span="6">
              <el-upload
                class="upload-demo"
                action="http://192.168.9.44:9090/api/UploadFiles/UploadProfilePicture"
                accept=".xlsx"
                ref="uploadExcel"
                :before-upload="handlebefore"
                :on-success="handleSuccess"
                :on-error="handleError"
              >
                <el-button size="small" type="primary" icon="el-icon-folder-add"
                  >点击上传</el-button
                >
              </el-upload>
            </el-col>
            <el-col :span="16">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-download"
                @click="exportExcel"
                >下载模板</el-button
              >
              <span class="downspan">请根据提供的EXCEL模板填写上传上传！</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="标题:" prop="name">
          <el-input
            v-model="dailyruleForm.name"
            :placeholder="'化验室每日结果简报' + dailyruleForm.reportDate"
            class="dailyinput"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input
            type="textarea"
            v-model="dailyruleForm.remark"
            class="dailyinput"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handledailsubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    reportType: {
      type: String
    }
  },
  data() {
    return {
      //选择文件
      fileName: '',
      //上传文件
      file: '',
      // 表单
      dailyruleForm: {
        reportType: this.reportType,
        reportDate: '',
        name: '',
        remark: ''
      },
      //表单验证
      dailyrules: {
        reportDate: [{required: true, message: '请选择日期', trigger: 'blur'}],
        name: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ],
        remark: [
          {required: true, message: '请输入备注', trigger: 'blur'},
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    handlechangedate(e) {
      let y = e.getFullYear();
      let m = (e.getMonth() + 1 + '').padStart(2, '0');
      let d = (e.getDate() + '').padStart(2, '0');
      let h = (e.getHours() + '').padStart(2, '0');
      let mm = (e.getMinutes() + '').padStart(2, '0');
      let s = (e.getSeconds() + '').padStart(2, '0');
      this.dailyruleForm.reportDate =
        y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    },
    handlebefore(file) {
      console.log(file);
      this.file = file;
      const extension = file.name.split('.')[1] === 'xls';
      const extension2 = file.name.split('.')[1] === 'xlsx';
      if (!extension && !extension2) {
        this.$message.warning('上传模板只能是 xls、xlsx格式!');
        return;
      }
      this.fileName = file.name;
      // setTimeout(() => {
      //   // this.submitUpload();
      // }, 500);
      // return false; // 返回false不会自动上传
    },
    // 文件上传成功时的钩子
    handleSuccess(file) {
      console.log(file);
      this.dailyruleForm.path = file.result.items[0].url;
      this.$message.success({
        title: '成功',
        message: `文件上传成功`
      });
    },
    // 文件上传失败时的钩子
    handleError() {
      this.$message.error({
        title: '错误',
        message: `文件上传失败`
      });
    },
    exportExcel() {
      if (this.reportType == 1) {
        window.location.href =
          'http://192.168.9.44:9090/ImportTemplate/%E5%8C%96%E9%AA%8C%E5%AE%A4%E6%AF%8F%E6%97%A5%E6%A3%80%E6%B5%8B%E7%BB%93%E6%9E%9C%E7%AE%80%E6%8A%A5.xlsx';
      } else {
        window.location.href =
          'http://192.168.9.44:9090/ImportTemplate/%E6%B0%B4%E8%B4%A8%E6%A3%80%E9%AA%8C%E6%9C%88%E6%8A%A5%E8%A1%A8.xlsx';
      }
    },

    // 提交
    handledailsubmit() {
      if (this.dailyruleForm.path == undefined) {
        this.$message.error('文件必须上传');
        return;
      }
      this.$refs.ruleForm.validate(val => {
        if (val) {
          this.$HTTPPOST(this.api.InsertDailyReport, this.dailyruleForm)
            .then(res => {
              if (res.success) {
                this.$message.success('添加成功');
                this.$refs.ruleForm.resetFields();
                this.fileName = '';
                if (this.reportType == 1) {
                  this.$router.push('/dailymanagement');
                } else {
                  this.$router.push('/mounthmanagement');
                }
              }
            })
            .catch(err => {
              console.log('请求失败', err.response);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.dailyupload {
  padding: 20px;
}
.dailybox {
  width: 70%;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
}
.filecol {
  margin-right: 10px !important;
}
.downspan {
  margin-left: 10px;
}
.dailyinput {
  width: 50%;
}
.dailyrow {
  margin-top: 10px;
}
</style>

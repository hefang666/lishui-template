<template>
  <div id="upload">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="#"
      :on-change="onChange"
      :on-remove="handleRemove"
      multiple
      :on-exceed="handleExceed"
      accept=".pdf"
      :limit="5"
      :file-list="fileList"
      :auto-upload="false"
      show-file-list
    >
      <el-button slot="trigger" size="small" type="primary"
        >选取文件<i class="el-icon-upload el-icon--right"></i
      ></el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <!-- <div slot="tip" class="el-upload__tip">只能上传pdf文件</div> -->
    </el-upload>
    <!--上传显示进度条-->
    <div v-show="progressFlag" class="head-img">
      <el-progress
        :text-inside="true"
        :stroke-width="14"
        :percentage="progressPercent"
        status="success"
      ></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [], // 储存多文件
      progressFlag: false, // 进度条初始值隐藏
      progressPercent: 0 // 进度条初始值
    };
  },
  methods: {
    //上传函数
    submitUpload() {
      //重新命名 方便setTimeout函数 --因为setTimeout函数在vue内部中无效
      var that = this;
      that.$refs.upload.submit();
      //判断上传文件数量
      if (this.fileList.length == 0) {
        that.$message({
          message: "请选择导入的文件",
          type: "warning",
          duration: "2000" //显示时间
        });
      } else {
        //创建FormData();主要用于发送表单数据
        let paramFormData = new FormData();
        //遍历 fileList
        that.fileList.forEach(file => {
          paramFormData.append("files", file.raw);
          paramFormData.append("fileNames", file.name);
        });
        //修改progressFlag值
        that.progressFlag = true;
        //控制台打印文件信息
        console.log(paramFormData.getAll("files"));
        //axios 发出请求
        // axios({
        //   url: "url",
        //   method: "post",
        //   data: paramFormData,
        //   headers: { "Content-Type": "multipart/form-data" },
        //   onUploadProgress: progressEvent => {
        //     // progressEvent.loaded:已上传文件大小
        //     // progressEvent.total:被上传文件的总大小
        //     //进度条
        //     that.progressPercent =
        //       ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        //   }
        // })
        //   .then(res => {
        //     if (res.data == "success" && that.progressPercent === 100) {
        //       setTimeout(function() {
        //         that.$message({
        //           message: "导入成功！",
        //           type: "success",
        //           duration: "2000"
        //         });
        //         that.progressFlag = false;
        //         that.progressPercent = 0;
        //         that.$refs.upload.clearFiles();
        //       }, 1000);
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     that.progressFlag = false;
        //     that.progressPercent = 0;
        //     that.$refs.upload.clearFiles();
        //     that.$message({
        //       message: "导入失败！",
        //       type: "error",
        //       duration: "2000"
        //     });
        //   });
      }
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 5 个文件`);
    }
  }
};
</script>

<style lang="scss">
#upload {
  width: 800px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 30px;
}
.head-img {
  width: 650px;
}
</style>

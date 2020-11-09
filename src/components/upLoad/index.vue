<template>
  <div class="upload-box">
    <el-upload
      class="upload-demo"
      :action="actionUrl"
      :multiple="multiple"
      :limit="limit"
      :show-file-list="showList"
      :on-success="handleSuccess"
      :on-err="handleError">
      <el-button size="small" type="primary">
        <i class="el-icon-plus icon-text"></i>
        点击上传
      </el-button>
    </el-upload>
    <div v-if="fileListData.length != 0" class="list-box">
      <el-table
      :data="fileListData"
      style="width: 100%">
      <el-table-column
        prop="fileName"
        label="文件名">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="showPreview(scope.row)">预览</el-button>
          <el-button type="primary" @click="download(scope.row)">下载</el-button>
          <el-button type="primary" @click="deletePic(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('upload');
export default {
  name: 'upload',
  data() {
    return {
      // 是否显示上传列表
      showList: false,

      // 是否能多选
      multiple: true,

      // 一次最多上传限制
      limit: 3,

      // 返回的图片列表
      listData: []

    }
  },
  computed: {
    ...mapState(['fileListData', 'actionUrl'])
  },
  methods: {
    ...mapActions(['setFileListData', 'downloadFile', 'delFil']),
    // 上传成功后
    handleSuccess(response) {
      response.result.items.forEach(item => {
        this.listData.push(item)
      })
      this.setFileListData(this.listData);
    },
    // 上传失败
    handleError(err, file, fileList) {
      this.$message.warning('上传失败，请重新上传！')
      console.log(err);
      console.log(file);
      console.log(fileList)
    },
    // 打开弹窗
    showPreview(row) {
      console.log(row);
      let data = {
        flag: true,
        data: row
      }
      this.$emit('showPreview', data)
    },
    // 下载附件
    download(row) {
      let param = {
        fileName: row.url,
        downLoadName: row.fileName
      }
      this.downloadFile(param);
    },
    // 删除
    deletePic(index) {
      console.log(index);
      var arr = ['a', 'b', 'c', 'd'];
      arr.splice(0, 1);
      console.log(arr);
      this.delFil(index);
    }
  }
}
</script>

<style scoped lang="scss">
.upload-box {
  .list-box {
    width: 90%;
    /deep/ .el-table {
      font-size: 12px;
    }
    /deep/ .el-table thead {
      font-weight: 400;
      color: #333333;
    }
    /deep/ .el-table th.is-leaf,
    /deep/ .el-table td {
      border-bottom: none;
    }
    /deep/ .el-table th, {
      padding: 2px 0;
      line-height: 23px;
    }
    /deep/ .el-table td {
      padding: 5px;
    }
  }
}
</style>
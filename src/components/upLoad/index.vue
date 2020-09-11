<template>
  <div class="upload-box">
    <el-upload
      class="upload-demo"
      :action="actionUrl"
      :multiple="multiple"
      :on-success="handleSuccess"
      :on-err="handleError">
      <el-button size="small" type="primary">
        <i class="el-icon-plus icon-text"></i>
        点击上传
      </el-button>
    </el-upload>
    <div v-if="fileList.length != 0" class="list-box">
      <el-table
      :data="fileList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="文件名">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="showPreview(scope.$index, scope.row)">预览</el-button>
          <el-button type="primary">下载</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('upload');
export default {
  name: 'upload',
  data() {
    return {
      // 是否显示上传列表
      showList: false,

      // 是否能多选
      multiple: false,

      // 一次最多上传限制
      limit: 1,

      // 上传地址
      actionUrl: 'https://jsonplaceholder.typicode.com/posts/',

      fileUrl: ''

    }
  },
  computed: {
    ...mapState(['fileList'])
  },
  methods: {
    // 上传成功后
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList)
    },
    // 上传失败
    handleError(err, file, fileList) {
      this.$message.warning('上传失败，请重新上传！')
      console.log(err);
      console.log(file);
      console.log(fileList)
    },
    // 打开弹窗
    showPreview({id, row}) {
      console.log(id + '，' + row);
      let data = true;
      this.$emit('showPreview', data)
    },
  },
  mounted() {
    console.log(this.fileList)
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
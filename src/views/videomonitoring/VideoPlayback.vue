<template>
  <div class="video">
    <div class="left" ref="left">
      <div class="monitoringTit">实施监控</div>
      <el-input
        size="mini"
        placeholder="搜索..."
        suffix-icon="el-icon-search"
        class="monitoringInput"
        v-model="filterText"
      ></el-input>
      <el-tree
        :data="data"
        ref="tree"
        :props="defaultProps"
        default-expand-all
        :render-content="renderContent"
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
      ></el-tree>
    </div>
    <div class="right seach-right">
      <el-input
        placeholder="请输入文件名称"
        prefix-icon="el-icon-search"
        v-model="videosearch"
        size="mini"
      ></el-input>
      <el-date-picker
        v-model="videoTime"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00']"
        @change="handlevideoTchange"
        size="mini"
      ></el-date-picker>
      <div class="button-box" style="display:inline-block">
        <el-button type="primary" size="mini">查询</el-button>
      </div>

      <!-- 表格 -->
      <div class="table-box">
        <el-table
          :data="videolist"
          :header-cell-style="{background: '#4b77be', color: 'white'}"
          border
          ref="videoRef"
          @selection-change="handleVideoChange"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column
            prop="nickname"
            label="文件名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createtime"
            label="创建时间"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template>
              <el-button type="text" @click="handleoutplay">播放</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 视频弹框 -->
      <el-dialog
        title="视频回放"
        :visible.sync="outpladialogVisible"
        width="50%"
      >
        <!-- 视频组件 -->
        <VideoPlayer
          :state="outpladialogVisible"
          src="http://vjs.zencdn.net/v/oceans.mp4"
          poster="https://file.digitaling.com/eImg/uimages/20150907/1441607120885946.gif"
        ></VideoPlayer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="outpladialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import VideoPlayer from './../../components/VideoPlayer';
export default {
  components: {
    VideoPlayer
  },
  data() {
    return {
      //树形结构
      data: [],
      // 过滤树形字段
      filterText: '',
      // 树形结构关系
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      //视频回放文件名称
      videosearch: '',
      // 视频回放时间
      videoTime: '',
      // 播放组件是否显示
      outpladialogVisible: false,
      // table列表
      videolist: [
        {
          nickname: '2018-09-09摄像头录像文件',
          createtime: '2018-03-16 14:08:28'
        }
      ]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.handleinto();
  },
  methods: {
    // 初始化树形结构
    handleinto() {
      this.$HTTPPOST(this.api.LoadForTree).then(res => {
        this.data = res.result;
      });
    },
    // 过滤树形结构
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(val) {
      console.log('val :>> ', val);
      if (!val.children) {
        let newid = val.id.split('-').pop();
        console.log('newid :>> ', newid);
      }
    },
    //table选择
    handleVideoChange() {},
    // 选择时间
    handlevideoTchange() {
      //   console.log(this.videoTime[0]);
      this.videoTime[0] = this.time(this.videoTime[0]);
      this.videoTime[1] = this.time(this.videoTime[1]);
    },
    time(date) {
      let y = date.getFullYear();
      let m = (date.getMonth() + 1 + '').padStart(2, '0');
      let d = (date.getDate() + '').padStart(2, '0');
      let hh = (date.getHours() + '').padStart(2, '0');
      let mm = (date.getMinutes() + '').padStart(2, '0');
      let ss = (date.getSeconds() + '').padStart(2, '0');
      console.log(y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss);
      return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    },
    // 点击播放按钮
    async handleoutplay() {
      this.outpladialogVisible = true;

      try {
        let data = await this.$HTTPGET(this.api.detail);
        console.log('data', data);
      } catch (error) {
        console.log('error', error);
      }
    },
    // 树形添加图标
    renderContent(h, {node, data}) {
      if (!data.children) {
        return (
          <span class="custom-tree-node">
            <i class="el-icon-s-custom"></i>
            <span>{node.label}</span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.video {
  /* padding: 20px; */
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  overflow: hidden;
}
.el-table {
  margin-top: 15px;
  /* font-size: 12px; */
}
.left {
  position: absolute;
  width: 190px;
  padding: 10px;
  min-height: calc(100vh - 24px);
  overflow: hidden;
  transition: width 0.28s;
  border-right: 1px solid #e6e6e6;
  /* background-color: #00569F;
  color: #fff; */
}
.right {
  margin-left: 190px;
  overflow: hidden;
  flex: 1;
  padding: 10px;
}
.monitoringTit {
  font-weight: bold;
}
.monitoringInput {
  margin: 10px 0;
}
/* .el-tree{
    background-color: #00569F;
    color: #fff;
} */
.seach-right {
  /deep/ .el-input__inner {
    height: 28px;
    line-height: 28px;
    border: 1px solid #4b77be;
    margin-right: 10px;
  }
  /deep/ .el-input {
    width: 250px;
    font-size: 12px;
    margin-right: 10px;
  }
}
/deep/ .el-table .cell{
  line-height: normal;
}
/deep/ .el-table td{
  padding: 0;
}
</style>

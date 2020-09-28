<template>
  <div class="realtimepreview">
    <div class="left">
      <div class="monitoringTit">实时预览</div>
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
      ></el-tree>
    </div>
    <div class="right">
      <div class="videoDiv">
        <hkvideo></hkvideo>
      </div>
      <div class="iconwap">
        <i class="el-icon-monitor" onclick="changeWndNum(1)"></i>
      </div>
      <div class="iconwap">
        <i class="el-icon-menu" onclick="changeWndNum(2)"></i>
      </div>
      <div class="iconwap">
        <i class="el-icon-s-grid" onclick="changeWndNum(3)"></i>
      </div>
      <div class="iconwap">
        <i class="el-icon-full-screen" onclick="clickFullScreen();"></i>
      </div>
    </div>
  </div>
</template>
<script>
import hkvideo from './../haikangvideo/hkvideo.vue';
export default {
  components: {
    hkvideo
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
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created () {
    var Wheight = window.innerHeight - 60;
    window.queryheight(Wheight,2)
  },
  mounted() {
    this.handleinto();
  },
  methods: {
    handleNodeClick(val) {
      let id = val.id.split('-').pop();
      this.handlePreview(id);
    },
    // 初始化树形结构
    handleinto() {
      this.$HTTPPOST(this.api.LoadForTree).then(res => {
        this.data = res.result;
      });
    },
    // 过滤树形结构
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.name.indexOf(value) !== -1;
    // },
    handlePreview(id) {
       window.clickLogin('1.207.61.91',5581,'admin','sntsoft998')
        // window.clickLogin();
        // 测试
        window.PlayAll();
      let data = {
        cameraIds: [id]
      };
      console.log('data :>> ', data);
      // this.$HTTPPOST(this.api.Preview, data).then(res => {
      //   console.log('res :>> ', res);
      //   let {result} = res;
      //   console.log('result :>> ', result[0]);
        
      // });
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
<style scoped>
.realtimepreview {
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  overflow: hidden;
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
.videoDiv {
  width: 100%;
}
.monitoringTit {
  font-weight: bold;
  margin-bottom: 10px;
}
.monitoringInput {
  margin: 10px 0;
}
.videobox {
  width: 30%;
  /* border: 1px solid blue; */
  margin-bottom: 5px;
}
.iconwap {
  display: inline-block;
  font-size: 22px;
  margin-right: 5px;
}
</style>

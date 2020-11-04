<template>
  <div class="c-tree">
    <div class="list-box">
      <!-- 树形控件 -->
      <div class="tree" >
        <el-tree
          :data="treeData"
          accordion
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          @node-click="handleCheckChange"
          :render-content="addTreeIcon"
          check-on-click-node
        ></el-tree>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    treeData: Array
  },
  data() {
    return {
      // 默认data数组参数
      defaultProps: {     
        children: 'children',
        label: 'orgName',
      },
    }
  },
  created(){
    this.$nextTick(function () {
      this.$refs.tree.setCurrentKey(1); 
    })
  },
  methods: {
    // 节点被点击时的回调 
    handleCheckChange(data) { 
      // console.log(data)
      this.$emit('changeTree', data.id)
    }, 
    // 给树形控件添加图标
    addTreeIcon(h, {node, data}) {
      if (!data.children) {
        return (
          <span class="custom-tree-node">
            <i class="el-icon-office-building" style="font-size:14px;margin-right:6px;"></i>
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

<style lang="scss" scoped>
  .title{
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #4b77be;
    margin-top: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .list-box div{
    height: 26px;
    line-height: 26px;
    margin-top: 10px;
    text-align: center;
    color: #4b77be;
    cursor: pointer;
    font-size: 14px;
    &.active {
      background: #4b77be;
      color: #fff;
    }
  }
// /deep/ .custom-tree-node span,/deep/.custom-tree-node i{
//   color: #4b77be;
// }

/deep/ .el-tree-node__content:hover {
  background: rgba(255, 255, 255, 0.05);
}

/deep/ .el-tree-node:focus > .el-tree-node__content {
  background-color:#c7ddfd;
  color: #4b77be;
}

/deep/.el-tree--highlight-current
 
  .el-tree-node.is-current
 
  > .el-tree-node__content {
 
  background-color:#4b77be;
  color: #fff;
 
}
/deep/ .el-tree__empty-block{
  min-height: 28px;
}
/deep/ .el-tree__empty-text{
  color: #ababab;
}



</style>


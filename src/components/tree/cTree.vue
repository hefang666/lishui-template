<template>
  <div class="c-tree">
    <div class="list-box">
      <!-- 树形控件 -->
      <div class="tree">
        <el-tree
          :data="treeData"
          accordion
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          @node-click="handleCheckChange"
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
      // 树节点
      // treeData: [],      
      // 默认data数组参数
      defaultProps: {     
        children: 'children',
        label: 'orgName',
      },
    }
  },
  mounted() {},
  methods: {
    // 节点被点击时的回调 
    handleCheckChange(data) { 
      // console.log(data)
      this.$emit('changeTree', data.id)
      // this.$parent.getList()
    }, 
    
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
    // height: 30px;
    // line-height: 30px;
    margin-top: 10px;
    // background: #4b77be;
    // color: #fff;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    &.active {
      background: #4b77be;
      color: #fff;
    }
  }
  /deep/.el-tree{
    background: #4b77be;
    color: #fff;
  }
  
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


</style>


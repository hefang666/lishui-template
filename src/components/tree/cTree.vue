<template>
  <div class="c-tree">
    <!-- <el-tree
      :data="treeData"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick"
    ></el-tree> -->
    <el-tree
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree">
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 左侧树
      treeData: 
        // {
        //   label: "自来水公司",
        //   children: [
        //     {
        //       label: "供水服务公司1"
        //     },
        //     {
        //       label: "供水服务公司2"
        //     }
        //   ]
        // },
        // {
        //   label: "清泉建设公司",
        //   children: [
        //     {
        //       label: "工程科"
        //     },
        //     {
        //       label: "材料科"
        //     }
        //   ]
        // }
        [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }]
        }],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // handleNodeClick(data) {
    //   console.log(data);
    // }
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>

<style>
  
</style>

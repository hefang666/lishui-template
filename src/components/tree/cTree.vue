<template>
  <div class="c-tree">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      // 左侧树
      treeData: [
        {
          label: "自来水公司",
          children: [
            {
              label: "供水服务公司1"
            },
            {
              label: "供水服务公司2"
            }
          ]
        },
        {
          label: "清泉建设公司",
          children: [
            {
              label: "工程科"
            },
            {
              label: "材料科"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted(){
    
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style>
  
</style>

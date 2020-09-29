<template>
  <div class="tree-box">
    <div v-if="title" class="tree-title">{{ title }}</div>
    <el-tree
      :data="treedata"
      :show-checkbox="showcheckbox"
      :node-key="keyname"
      :props="defaultProps"
      ref="tree"
      highlight-current
      :expand-on-click-node="expandClickStatus"
      :check-on-click-node="checkClickStatus"
      @node-click="nodeClick"
    >
      <span slot-scope="{data}" :class="data.disabled ? 'not-active' : 'ke-active'">
        <span v-if="data.icon && data.icon.startsWith('icon-')" :class="['iconfont', 'icon-box', data.icon]">
          <!-- <img :src="data.icon" alt=""> -->
        </span>
        <img v-else-if="data.icon" src="data.icon" />
        <span>{{ data[labelname] }}</span>
      </span>
    </el-tree>
    <!-- <button @click="getCheckedList">按钮</button> -->
  </div>
</template>

<script>
import '@/fonts/iconfont.css';
export default {
  props: {
    // 树数据
    treedata: {
      type: Array,
      default: () => {
        [];
      }
    },
    // 是否有title
    title: {
      type: String,
      default: ''
    },
    // 当树名key名不是type的时候传入通过keyname传入属性名
    keyname: {
      type: String,
      default: 'type'
    },
    // 当树名的属性名不是label的时候传入通过labelname传入属性名
    labelname: {
      type: String,
      default: 'label'
    },
    // 当一个节点的子节点名不是children的时候通过childrenname传入
    childrenname: {
      type: String,
      default: 'children'
    },
    // 是否出现复选框
    showcheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expandClickStatus: false,
      checkClickStatus: true,
      defaultProps: {
        children: this.childrenname,
        label: this.labelname
      }
    };
  },
  methods: {
    getCheckedList() {
      return this.$refs.tree.getCheckedKeys();
      // console.log(this.$refs.tree.getCheckedNodes())
      // console.log(this.$refs.tree.getCheckedKeys())
    },
    // 处理点击每一个节点做的事件并返回节点数据
    nodeClick(nodeData, node, comp) {
      this.$emit('nodeClick', {
        nodeData,
        node,
        comp
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.tree-box {
  width: 100%;
  height: 100%;
  overflow: auto;
  .tree-title {
    width: 100%;
    height: 24px;
    line-height: 24px;
    padding-left: 20px;
    background: #e4efff;
    color: $menuActiveText;
  }

  .not-active {
    color: #999999;
  }

  .ke-active {
    .icon-gongsi {
      color: #f6aa7b;
    }
    .icon-zuzhi {
      color: #40d8e5;
    }
  }

  .icon-box {
    margin-right: 5px;
  }
  /deep/ .el-tree {
    display: flex;
  }
  /deep/ .el-tree-node > .el-tree-node__children {
    overflow: visible;
  }
  /deep/ .el-tree-node__content {
    display: block;
  }
  /deep/ .el-tree-node {
    min-width: 100%;
  }
}
</style>

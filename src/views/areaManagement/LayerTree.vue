<template>
  <div>
    <div v-if="title" class="tree-title">{{ title }}</div>
    <el-tree
      :data="treedata"
      :show-checkbox="showcheckbox"
      :node-key="keyname"
      ref="tree"
      highlight-current
      :expand-on-click-node="expandClickStatus"
      :check-on-click-node="checkClickStatus"
      @node-click="nodeClick"
      @check-change="checkChange"
    >
      <span slot-scope="{data}">
        <span v-if="data.icon && data.icon.startsWith('el-icon')" class="el-icon-delete-solid"></span>
        <span v-else-if="data.icon" class="tree-icon-img">
          <img :src="host + data.icon"/>
        </span>
        <span>{{ data[labelname] }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import {host} from '@/api/api';
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
    // 是否出现复选框
    showcheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      host,
      expandClickStatus: false,
      checkClickStatus: true
    };
  },
  methods: {
    getCheckedList() {
      return this.$refs.tree.getCheckedKeys();
    },
    // 处理点击每一个节点做的事件并返回节点数据
    nodeClick(nodeData, node, comp) {
      this.$emit('nodeClick', {
        nodeData,
        node,
        comp
      });
    },
    checkChange () {
      let checkedList = this.$refs.tree.getCheckedNodes();
      this.$emit('checkedChange', checkedList)

    }
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.tree-title {
  width: 100%;
  height: 24px;
  line-height: 24px;
  padding-left: 20px;
  background: #e4efff;
  color: $menuActiveText;
}
</style>

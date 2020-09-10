<template>
  <el-button-group class="snt-button-box">
    <el-button
      v-for="(item, current) in list"
      type="primary"
      plain
      :class="{'is-active': current === currentIndex}"
      @click="changeGroup(item, current)"
      :key="current"
    >
      {{ item }}
    </el-button>
  </el-button-group>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentIndex: this.index
    };
  },
  methods: {
    changeGroup(item, index) {
      this.currentIndex = index;
      this.$emit('change', {
        current: item,
        index
      });
    }
  }
};
</script>

<style lang="scss">
.snt-button-box {
  &.el-button-group {
    .el-button--primary:first-child {
      border-right-color: #4b77be;
    }
    .el-button--primary:last-child {
      border-left-color: #4b77be;
    }
    .el-button--primary:not(:first-child):not(:last-child) {
      border-left-color: #4b77be;
      border-right-color: #4b77be;
    }
    .el-button {
      padding: 6px 15px;
      height: 28px;
      font-size: 12px;
    }
    .el-button--primary:hover,
    .el-button--primary.is-plain:hover {
      color: #ffffff;
      background: #4b77be;
    }
    .el-button--primary:focus,
    .el-button--primary:hover {
      color: #4b77be;
      background: #ffffff;
    }
    .el-button--primary.is-active,
    .el-button--primary:active {
      color: #4b77be;
      background: #ffffff;
    }
    .el-button--primary.is-plain {
      color: #4b77be;
      background: #fff;
      border-color: #4b77be;
    }
    .el-button--primary.is-plain.is-active,
    .el-button--primary.is-plain:active {
      color: #fff;
      background: #4b77be;
    }
    .el-button--primary:focus,
    .el-button--primary.is-plain:focus {
      color: #fff;
      background: #4b77be;
    }
  }
}
</style>

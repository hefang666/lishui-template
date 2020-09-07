<template>
  <div class="header-box">
    <div class="header-left">
      <snt-buttongroup
        @change="searchConditional"
        :list="statusList"
      ></snt-buttongroup>
      <snt-search class="m-l-20" />
    </div>
    <div class="header-right">
      <snt-buttongroup
        @change="changeHandle"
        :list="list"
      ></snt-buttongroup>
    </div>
  </div>
</template>
<script>
import Search from '@/components/search';
import ButtonGroup from '@/components/buttonGroup';
export default {
  components: {
    'snt-search': Search,
    'snt-buttongroup': ButtonGroup
  },
  data() {
    return {
      list: ['新增', '重启', '暂停', '删除', '导出'],
      statusList: ['全部', '进行中', '暂停', '已到期'],
      multipleSelection: [],

      // 当前分页
      currentPage: 1,

      // 是否显示新增弹窗
      dialogAdd: false,

      // 当前选中的筛选类别名字（顶部左侧的input组 all）
      searchName: 'all'
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 按状态筛选则并为input添加样式
    searchConditional(name) {
      this.searchName = name;
    },
    // 打开新增弹窗
    changeHandle() {
    },

    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    }
  }
};
</script>

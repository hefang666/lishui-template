<template>
  <div class="header-box">
    <div class="header-left">
      <snt-buttongroup
        @change="searchConditional"
        :list="list"
      ></snt-buttongroup>
      <snt-search class="m-l-20" />
    </div>
    <div class="header-right">
      <snt-buttongroup @change="addTask" :list="list"></snt-buttongroup>
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
      tableData: [
        {
          taskName: '巡检任务',
          taskType: '临时任务',
          inCharge: '张三',
          player: '李四、王五',
          estimatedStartTime: '2019-01-01 9:00',
          estimatedEndTime: '2019-01-01 17:00',
          actualCompletionTime: ' ',
          timeOut: '3小时20分',
          missionStatus: '待完成'
        },
        {
          taskName: '巡检任务',
          taskType: '临时任务',
          inCharge: '张三',
          player: '李四、王五',
          estimatedStartTime: '2019-01-01 9:00',
          estimatedEndTime: '2019-01-01 17:00',
          actualCompletionTime: ' ',
          timeOut: '3小时20分',
          missionStatus: '待完成'
        },
        {
          taskName: '巡检任务',
          taskType: '临时任务',
          inCharge: '张三',
          player: '李四、王五',
          estimatedStartTime: '2019-01-01 9:00',
          estimatedEndTime: '2019-01-01 17:00',
          actualCompletionTime: ' ',
          timeOut: '3小时20分',
          missionStatus: '待完成'
        },
        {
          taskName: '巡检任务',
          taskType: '临时任务',
          inCharge: '张三',
          player: '李四、王五',
          estimatedStartTime: '2019-01-01 9:00',
          estimatedEndTime: '2019-01-01 17:00',
          actualCompletionTime: ' ',
          timeOut: '3小时20分',
          missionStatus: '待完成'
        },
        {
          taskName: '巡检任务',
          taskType: '临时任务',
          inCharge: '张三',
          player: '李四、王五',
          estimatedStartTime: '2019-01-01 9:00',
          estimatedEndTime: '2019-01-01 17:00',
          actualCompletionTime: ' ',
          timeOut: '3小时20分',
          missionStatus: '待完成'
        },
        {
          taskName: '巡检任务',
          taskType: '临时任务',
          inCharge: '张三',
          player: '李四、王五',
          estimatedStartTime: '2019-01-01 9:00',
          estimatedEndTime: '2019-01-01 17:00',
          actualCompletionTime: ' ',
          timeOut: '3小时20分',
          missionStatus: '待完成'
        }
      ],
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

    // 关闭任务
    handleClose(index, row) {
      console.log(index, row);
    },

    // 查看任务
    handleSee(index, row) {
      console.log(index, row);
    },

    // 完成任务
    handleComplete(index, row) {
      console.log(index, row);
    },

    // 修改任务
    handleEdit(index, row) {
      console.log(index, row);
    },

    // 按状态筛选则并为input添加样式
    searchConditional(name) {
      this.searchName = name;
    },
    // 打开新增弹窗
    addTask(item) {
      console.log(item);
      this.dialogAdd = true;
    },
    // 关闭新增弹窗
    getAddData(data) {
      console.log(data);
      this.dialogAdd = data.dialogAdd;
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

<template>
  <div class="task_management_pages button-box">
    <div class="header-box">
      <div class="header-left">
        <el-button-group>
          <el-button
            type="primary"
            plain
            :class="searchName == 'all' ? 'item-active' : ''"
            @click="searchConditional('all')"
          >
            全部
          </el-button>
          <el-button
            type="primary"
            plain
            :class="searchName == 'toBeCompleted' ? 'item-active' : ''"
            @click="searchConditional('toBeCompleted')"
            >待完成</el-button
          >
          <el-button
            type="primary"
            plain
            :class="searchName == 'haveInHand' ? 'item-active' : ''"
            @click="searchConditional('haveInHand')"
            >进行中</el-button
          >
          <el-button
            type="primary"
            plain
            :class="searchName == 'overdue' ? 'item-active' : ''"
            @click="searchConditional('overdue')"
            >已超期</el-button
          >
          <el-button
            type="primary"
            plain
            :class="searchName == 'suspend' ? 'item-active' : ''"
            @click="searchConditional('suspend')"
            >暂停</el-button
          >
          <el-button
            type="primary"
            plain
            :class="searchName == 'completed' ? 'item-active' : ''"
            @click="searchConditional('completed')"
            >已完成</el-button
          >
          <el-button
            type="primary"
            plain
            :class="searchName == 'closed' ? 'item-active' : ''"
            @click="searchConditional('closed')"
            >已关闭</el-button
          >
        </el-button-group>
        <div class="search-box">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchWords"
          ></el-input>
          <el-button class="search-button" type="primary">查询</el-button>
        </div>
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain @click="addTask">新增</el-button>
          <el-button type="primary" plain>删除</el-button>
          <el-button type="primary" plain>暂停</el-button>
          <el-button type="primary" plain>导出</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="content-box">
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :stripe="true"
          tooltip-effect="dark"
          height="830"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="taskName"
            label="任务名称"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="taskType"
            label="任务类别"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="inCharge"
            label="负责人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="player"
            label="参与人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="estimatedStartTime"
            min-width="110"
            label="预计开始时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="estimatedEndTime"
            min-width="110"
            label="预计完成时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="actualCompletionTime"
            min-width="110"
            label="实际完成时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="timeOut"
            label="暂停时长"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="missionStatus"
            label="任务状态"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" min-width="200">
            <template slot-scope="scope">
              <div class="operate-box">
                <el-button
                  type="text"
                  class="operate-button operate-button-active"
                  disabled="disabled"
                  @click="handleClose(scope.$index, scope.row)"
                  >关闭</el-button
                >
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleComplete(scope.$index, scope.row)"
                  >完成</el-button
                >
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleSee(scope.$index, scope.row)"
                  >查看</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <page
        :pageData="[30, 40, 50, 100]"
        :total="400"
        @changePageSize="changePageSize"
        @changeCurrentPage="changeCurrentPage"
      ></page>
    </div>

    <!-- 新增任务弹框 -->
    <add-task :dialogAdd="dialogAdd" @getAddData="getAddData"></add-task>
  </div>
</template>

<script>
import AddTask from './addTask/AddTask.vue';
import Page from '@/components/page/Page.vue';
export default {
  name: 'TaskManagement',
  components: {
    AddTask,
    Page
  },
  data() {
    return {
      searchWords: '',
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
    addTask() {
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
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.task_management_pages {
  padding: 10px;

  .header-box {
    display: flex;
    justify-content: space-between;

    .header-left {
      display: flex;

      .search-box {
        margin-left: 20px;
        display: flex;

        .search-button {
          margin-left: 5px;
        }
      }
    }
  }

  .content-box {
    margin-top: 10px;

    .table-box {
      border: 1px solid #ddd;
      box-sizing: border-box;
    }

    .page-box {
      margin-top: 10px;
    }
  }
}
</style>

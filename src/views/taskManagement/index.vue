<template>
  <div class="task_management_pages button-box">
    <div class="header-box">
      <div class="header-left">
        <el-button-group>
          <el-button
            type="primary"
            plain
            v-for="(item,index) in statusList"
            :key="index"
            :class="{'item-active': index == currentIndex}"
            @click="searchConditional(index)"
          >
            {{item}}
          </el-button>
        </el-button-group>
        <snt-search :placeholder="'请输入任务名称'" />
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
          :data="taskList"
          :stripe="true"
          tooltip-effect="dark"
          height="830"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="name"
            label="任务名称"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="type"
            label="任务类别"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="person"
            label="负责人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="participants"
            label="参与人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="planTime"
            min-width="110"
            label="预计开始时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="planEndTime"
            min-width="110"
            label="预计完成时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="endTime"
            min-width="110"
            label="实际完成时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="stopTime"
            label="暂停时长"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="status"
            label="任务状态"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="180">
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
      <div class="page-box">
        <page
          :page-data="[30, 40, 50, 100]"
          :total="400"
          @changePageSize="changePageSize"
          @changeCurrentPage="changeCurrentPage"
        ></page>
      </div>
    </div>

    <!-- 新增任务弹框 -->
    <add-task :dialog-add="dialogAdd" @getAddData="getAddData"></add-task>
    <!-- 查看任务弹窗 -->
    <view-task :dialog-view="dialogView" @getViewData="getViewData"></view-task>
    <!-- 修改任务的弹窗 -->
    <edit-task :dialog-edit="dialogEdit" @getEditData="getEditData"></edit-task>
  </div>
</template>

<script>
import AddTask from './addTask/AddTask.vue';
import Page from '@/components/page/Page.vue';
import ViewTask from './viewTask/ViewTask.vue';
import EditTask from './editTask/EditTask.vue';
import Search from '@/components/search';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('taskManagement');
export default {
  name: 'TaskManagement',
  components: {
    AddTask,
    Page,
    ViewTask,
    EditTask,
    'snt-search': Search
  },
  computed: {
    ...mapState(['taskList'])
  },
  data() {
    return {
      // 搜索框输入的搜索关键字
      searchWords: '',

      // table多选数组
      multipleSelection: [],

      // 当前分页
      currentPage: 1,

      // 是否显示新增弹窗
      dialogAdd: false,

      // 是否显示查看弹窗
      dialogView: false,

      // 是否显示修改弹窗
      dialogEdit: false,

      // 当前选中的筛选类别名字（顶部左侧的input组 all）
      searchName: 'all',

      // 按状态筛选的状态内容
      statusList: ['全部', '待完成', '进行中', '已超期', '暂停', '已完成', '已关闭'],

      // 当前是第几个状态被选中
      currentIndex: 0
    };
  },
  methods: {
    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    // 关闭任务
    handleClose(index, row) {
      console.log(index, row);
    },

    // 查看任务
    handleSee(index, row) {
      console.log(index, row);
      this.dialogView = true;
    },

    // 完成任务
    handleComplete(index, row) {
      console.log(index, row);
    },

    // 修改任务
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogEdit = true;
    },

    // 按状态筛选则并为input添加样式
    searchConditional(index) {
      this.currentIndex = index;
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
    // 关闭查看弹窗
    getViewData(data) {
      this.dialogView = data.dialogView;
    },
    // 关闭修改弹窗
    getEditData(data) {
      this.dialogEdit = data.dialogEdit;
    },
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
      this.currentPage = data;
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
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

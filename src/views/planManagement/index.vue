<template>
  <div class="task_management_pages">
    <page-top></page-top>
    <div class="content-box">
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="planList"
          :stripe="true"
          tooltip-effect="dark"
          height="830"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="taskName"
            label="计划名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="taskType"
            label="巡检周期"
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
            label="预计到期时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="estimatedEndTime"
            label="计划状态"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <div class="operate-box">
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
    <!-- <add-task :dialogAdd="dialogAdd" @getAddData="getAddData"></add-task> -->
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import Top from './Top.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('planManagement');
export default {
  components: {
    Page,
    'page-top': Top
  },
  data() {
    return {
      multipleSelection: [],

      // 当前分页
      currentPage: 1,

      // 是否显示新增弹窗
      dialogAdd: false,

      // 当前选中的筛选类别名字（顶部左侧的input组 all）
      searchName: 'all'
    };
  },
  computed: {
    ...mapState(['planList'])
  },
  methods: {
    ...mapActions(['changePlanList']),
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

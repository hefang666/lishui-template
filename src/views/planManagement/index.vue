<template>
  <div class="task_management_pages">
    <page-top ref='top'></page-top>
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
            prop="name"
            label="计划名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cycle"
            label="巡检周期"
          ></el-table-column>
          <el-table-column
            prop="participant"
            label="负责人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="person"
            label="参与人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="planEndTime"
            label="预计到期时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="statuStr"
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
                  @click="handleEdit(scope.id, scope.row)"
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
      currentPage: 1
    };
  },
  mounted() {
    this.getPlanList();
  },
  computed: {
    ...mapState(['planList', 'editModalVisble', 'addModalVisible'])
  },
  methods: {
    ...mapActions(['changePlanList', 'getPlanList', 'changeModalStatus']),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit (id, row) {
      console.log(id, row)
      this.changeModalStatus({
        name: 'editModalVisble',
        status: true
      });
    },
    handleSee (id, row) {
      console.log(id, row)
      this.changeModalStatus({
        name: 'checkModalVisible',
        status: true
      });
    }
    
  }
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

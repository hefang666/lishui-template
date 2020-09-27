<template>
  <div class="task_management_pages button-box">
    <!-- <page-top ref='top'></page-top> -->
    <div class="header-box">
      <div class="header-left">
        <div class="left-button">
          <el-button-group>
            <el-button
              type="primary"
              plain
              v-for="(item, index) in statusList"
              :key="index"
              :class="{'item-active': index == currentState}"
              @click="searchConditional(index)"
            >
              {{ item }}
            </el-button>
          </el-button-group>
        </div>
        <div class="left-search">
          <snt-search :placeholder="'请输入任务名称'" />
        </div>
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain @click="openAdd">新增</el-button>
          <el-button type="primary" plain>重启</el-button>
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
            prop="endTime"
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
                  @click="handleEdit(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleSee(scope.row)"
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
    <add-plan
      :dialog-add="dialogAdd"
      @getAddData="getAddData"
    ></add-plan>

    <!-- 任务详情弹窗 -->
    <view-plan
      :dialog-view="dialogView"
      @closeView="closeView"
    ></view-plan>
  </div>
</template>

<script>
import Search from '@/components/search';
import Page from '@/components/page/Page.vue';
import AddPlan from './addPlan/index.vue';
import ViewPlan from './viewPlan/ViewPlan.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('planManagement');
export default {
  components: {
    'snt-search': Search,
    Page,
    AddPlan,
    ViewPlan
    // 'page-top': Top
  },
  data() {
    return {
      // 按状态筛选的状态内容
      statusList: [
        '全部',
        '进行中',
        '暂停',
        '已到期'
      ],

       // 当前活动状态
       currentState: 0,

      // table多选后的数据
      multipleSelection: [],
      // 当前分页
      currentPage: 1,

      // 当前每页数量
      pageSize: 30,

      // 是否打开新增弹窗
      dialogAdd: false,

      // 是否打开详情弹窗
      dialogView: false
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(['planList'])
  },
  methods: {
    ...mapActions([
      'getPlanList',
      'getMounthDate',
      'getPlanDetails'
    ]),
    // 按状态筛选则并为input添加样式
    searchConditional(index) {
      this.currentState = index;
      this.$store.commit('taskManagement/update_taskStatus', index);
      this.getTaskList(this.pageInfo);
    },
    // 获取列表数据
    getData() {
      let param = {
        status: this.currentState,
        pageIndex: this.currentPage,
        maxResultCount: this.pageSize
      }
      console.log(param);
      this.getPlanList(param);
    },
    // 获取从新增页面返回来的值
    getAddData(data) {
      this.dialogAdd = data;
    },
    // 打开新增弹窗
    openAdd() {
      this.getMounthDate();
      this.dialogAdd = true;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit (row) {
      console.log(row);
      let param = {
        Id: row.id
      };
      this.getPlanDetails(param);
    },
    handleSee (row) {
      console.log(row);
      let param = {
        Id: row.id
      };
      this.getPlanDetails(param);
      // this.dialogView = true;
    },
    //关闭查看弹窗
    closeView(data) {
      this.dialogView = data;
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
      .left-button {

      }
      .left-search {
        .search-box {
          margin-left: 20px;
          display: flex;

          .search-button {
            margin-left: 5px;
          }
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

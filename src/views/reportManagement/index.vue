<template>
  <div class="reportManagement-box button-box">
    <div class="header-box">
      <div class="header-left">
        <el-button-group>
          <el-button
            type="primary"
            plain
            v-for="(item, index) in statusList"
            :key="index"
            :class="{'item-active': index == currentIndex}"
            @click="searchConditional(index)"
          >
            {{ item }}
          </el-button>
        </el-button-group>
        <snt-search :placeholder="'请输入任务名称'" />
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain>导出</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="content-box">
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="reportList"
          :stripe="true"
          tooltip-effect="dark"
          height="830"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="name"
            label="报表名称"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="type"
            label="部门类型"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="planTime"
            min-width="110"
            label="开始日期"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="planEndTime"
            min-width="110"
            label="结束日期"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="endTime"
            min-width="110"
            label="填报时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operate-box">
                <el-button
                  type="text"
                  class="operate-button"
                  @click="download(scope.$index, scope.row)"
                  >下载</el-button
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

    <!-- 查看弹窗 -->
    <view-table
      :dialog-show="dialogShow"
      :table-name="tableName"
      :component-name="componentName"
      @closeTable="closeTable"></view-table>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import Search from '@/components/search';
import ViewTable from './viewTable.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('reportManagement');
export default {
  name: 'ReportManagement',
  data() {
    return {
      // 按状态筛选的状态内容
      statusList: ['全部', '稽查', '生产科', '管线所', '维护组'],
      currentIndex: 0,
      multipleSelection: [],
      dialogShow: true,
      tableName: '测试数据',
      componentName: 'MaintenanceGroup'
    };
  },
  components: {
    Page,
    'snt-search': Search,
    ViewTable
  },
  computed: {
    ...mapState(['reportList'])
  },
  methods: {
    // 按状态筛选则并为input添加样式
    searchConditional(index) {
      this.currentIndex = index;
    },
    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    download() {},
    handleSee() {},
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
      this.currentPage = data;
    },

    // 关闭查看弹窗
    closeTable(data) {
      this.dialogShow = data;
    }
  },
  mounted() {
    console.log(this.componentName);
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.reportManagement-box {
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

<template>
  <div class="task_management_pages button-box">
    <div class="header-box">
      <div class="header-left">
        <snt-search :placeholder="'请输入姓名'" />
      </div>
      <div class="header-right button-box">
        <div class="attendance-export-box">
          <el-date-picker
            v-model="month"
            type="month"
            class="attendance-box"
            placeholder="出勤导出"
          >
          </el-date-picker>
          <el-button class="attendance-button" type="primary" plain
            >出勤导出</el-button
          >
        </div>
        <el-button type="primary" plain>导出</el-button>
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
            prop="personName"
            label="人员姓名"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="department" label="所属部门"></el-table-column>
          <el-table-column
            prop="contactInformation"
            label="联系方式"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="onlineTime"
            label="今日上线时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="offlineTime"
            label="今日离线时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="工作情况" min-width="200">
            <template slot-scope="scope">
              <div class="operate-box">
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleSee(scope.$index, scope.row)"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  class="operate-button"
                  @click="AttenadanceCheck(scope.$index, scope.row)"
                  >出勤查看</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <page
        :page-data="[30, 40, 50, 100]"
        :total="400"
        @changePageSize="changePageSize"
        @changeCurrentPage="changeCurrentPage"
      ></page>
    </div>

    <!-- 工作情况弹窗 -->
    <working
      :dialog-working="dialogWorking"
      @getWorkingData="getWorkingData"></working>
    
      <!-- 出勤 -->
      <attendance
        :dialog-attend="dialogAttend"
        @getAttendData="getAttendData"
      ></attendance>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import Search from '@/components/search';
import Working from './WorkingConditions.vue';
import Attendance from './Attendance.vue';
export default {
  name: 'TaskManagement',
  components: {
    Page,
    'snt-search': Search,
    Working,
    Attendance
  },
  data() {
    return {
      searchWords: '',
      tableData: [
        {
          personName: '张三',
          department: '森鑫炬',
          contactInformation: '12345678901',
          onlineTime: '2019-01-01 9:00',
          offlineTime: '2019-01-01 17:00'
        }
      ],
      multipleSelection: [],

      // 当前分页
      currentPage: 1,

      // 选择的月份
      month: '',
      // 是否显示查看工作情况弹窗
      dialogWorking: false,
      // 是否显示查看出勤
      dialogAttend: true
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 查看
    handleSee(index, row) {
      console.log(index, row);
      this.dialogView = true;
    },

    // 出勤查看
    AttenadanceCheck(index, row) {
      console.log(index, row);
    },

    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    },
    // 关闭工作情况弹窗
    getWorkingData(data) {
      this.dialogWorking = data.dialogWorking
    },
    // 关闭出勤弹窗
    getAttendData(data) {
      this.dialogAttend = data.dialogAttend
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

    .header-right {
      display: flex;
      .attendance-export-box {
        position: relative;
        margin-right: 5px;
        overflow: hidden;
        .attendance-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 74px;
          height: 28px;
          opacity: 0;
          cursor: pointer;
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

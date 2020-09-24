<template>
  <div class="task_management_pages button-box">
    <div class="header-box">
      <div class="header-left">
        <snt-search :placeholder="'请输入姓名'" @submit="handlesubmit" />
      </div>
      <div class="header-right button-box">
        <div class="attendance-export-box">
          <el-date-picker
            v-model="month"
            type="month"
            class="attendance-box"
            placeholder="出勤导出"
            @change="handechange"
          >
          </el-date-picker>
          <el-button class="attendance-button" type="primary" plain
            >出勤导出</el-button
          >
        </div>
        <el-button type="primary" plain @click="handlexport">导出</el-button>
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
            prop="userName"
            label="人员姓名"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="location" label="所属部门"></el-table-column>
          <el-table-column
            prop="mobile"
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
        :total="total"
        @changePageSize="changePageSize"
        @changeCurrentPage="changeCurrentPage"
      ></page>
    </div>

    <!-- 出勤 -->
    <working
      :dialog-working="dialogWorking"
      @getWorkingData="getWorkingData"
    ></working>

    <!-- 出勤查看弹窗 -->
    <attendance
      :total="dialogAttendTOT"
      :tableData="attendance"
      :dialog-attend="dialogAttend"
      @getAttendData="getAttendData"
      @attenquery="attenquery"
    ></attendance>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import Search from '@/components/search';
import Working from './WorkingConditions.vue';
import Attendance from './Attendance.vue';
import {GetByDay, ExportMonthList, GetByUserId} from '@/api/personnel';
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
      // 初始化table
      tableData: [],
      // table选中
      multipleSelection: [],
      // 出勤弹框table
      attendance: [],
      // 输入框姓名
      userName: '',
      // 当前分页
      currentPage: 1,
      // 多少页
      maxResultCount: 30,
      // 总数
      total: 0,
      // 选择的月份
      month: '',
      // 是否显示查看工作情况弹窗
      dialogWorking: false,
      // 是否显示查看出勤
      dialogAttend: false,
      // 查看出勤(携带id)
      dialogAttendID: 0,
      // 查看出勤(总页数)
      dialogAttendTOT: 0
    };
  },
  mounted() {
    this.tableinfo();
  },
  methods: {
    // 初始化table
    tableinfo(oneDay, userName) {
      let data = {
        oneDay,
        userName,
        pageIndex: this.currentPage,
        maxResultCount: this.maxResultCount
      };
      GetByDay(data).then(res => {
        this.tableData = res.result.items;
        this.total = res.result.totalCount;
      });
    },
    // 选择月(出勤导出)
    handechange() {
      if (this.multipleSelection.length != 1) {
        this.$message.error('请选择一条数据');
        return;
      }
      let date = this.month;
      let y = date.getFullYear();
      let m = (date.getMonth() + 1 + '').padStart(2, '0');
      let oneMonth = y + '-' + m;
      let userId = this.multipleSelection[0].userId;
      let data = {
        oneMonth,
        userId
      };
      ExportMonthList(data).then(res => {
        console.log('res :>> ', res);
        window.location.href =
          'http://192.168.9.44:9090' + `${res.result.dataUrl}`;
      });
    },
    // 导出
    handlexport() {},
    // table选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('val :>> ', val);
    },
    handlesubmit(userName) {
      this.userName = userName;
      this.tableinfo('', userName);
    },
    // 点击查看
    handleSee(index, row) {
      console.log(index, row);
      this.dialogWorking = true;
    },

    // 出勤查看
    AttenadanceCheck(index, row) {
      console.log(index, row);
      this.dialogAttendID = row.userId;
      let data = {
        userId: row.userId,
        pageIndex: this.currentPage,
        maxResultCount: this.maxResultCount
      };
      GetByUserId(data).then(res => {
        if (res.success) {
          res.result.items.map(item => {
            item.oneDay = item.oneDay.replace(/\//g, '-');
          });
          this.attendance = res.result.items;
        }
      });
      this.dialogAttend = true;
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
      this.dialogWorking = data.dialogWorking;
    },
    //出勤弹窗点击查询(emit)
    attenquery(oneDay) {
      let data = {
        oneDay,
        userId: this.dialogAttendID,
        pageIndex: this.currentPage,
        maxResultCount: this.maxResultCount
      };
      GetByUserId(data).then(res => {
        console.log('res :>> ', res);
        this.attendance = res.result.items
        this.dialogAttendTOT = res.result.totalCount
      });
    },
    // 关闭出勤弹窗
    getAttendData() {
      this.dialogAttend = false;
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

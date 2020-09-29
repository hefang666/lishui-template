<template>
  <div class="task_management_pages button-box">
    <div class="header-box">
      <div class="header-left">
        <snt-search :placeholder="'请输入姓名'" @submit="handlesubmit" />
      </div>
      <div class="header-right button-box">
        <div class="date-box">
          <el-button-group>
            <el-button type="primary" plain>查看</el-button>
            <el-button type="primary" plain>出勤查看</el-button>
            <el-button type="primary" plain>出勤导出</el-button>
          </el-button-group>
          <el-date-picker
            v-model="month"
            type="month"
            class="attendance-box"
            :picker-options="pickerOptions"
            placeholder="出勤导出"
            @change="handechange"
          >
          </el-date-picker>
        </div>
        <el-button type="primary" plain @click="handlexport">导出</el-button>
      </div>
    </div>
    <div class="content-box">
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="personList"
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
                  @click="AttenadanceCheck(scope.row)"
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

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      @closeMessage="closeMessage"
    ></message>

    <!-- 出勤 -->
    <working
      :dialog-working="dialogWorking"
      @getWorkingData="getWorkingData"
    ></working>

    <!-- 出勤查看弹窗 -->
    <attendance
      :dialog-attend="dialogAttend"
      :attendance-id="dialogAttendID"
      @getAttendData="getAttendData"
    ></attendance>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import Search from '@/components/search';
import Working from './WorkingConditions.vue';
import Attendance from './Attendance.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('personManagement');

import {parseTime} from '@/utils/index';
export default {
  name: 'TaskManagement',
  components: {
    Page,
    'snt-search': Search,
    Working,
    Attendance,
    Message
  },
  computed: {
    ...mapState(['personList']),
  },
  data() {
    return {
      searchWords: '',
      

      // table选中
      multipleSelection: [],

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
      dialogAttendTOT: 0,

      // 提示消息
      messageText: '',

      // 是否显示提示消息框
      dialogMessage: false,

      // 出勤导出的快捷键
      pickerOptions: {
        shortcuts: [
          {
            text: '今日',
            onClick(picker) {
              let date = new Date();
              picker.$emit('pick', {date, script: '今日'});
            }
          },
          {
            text: '清除',
            onClick(picker) {
              picker.$emit('pick', {script: '清除'});
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.tableinfo();
  },
  methods: {
    ...mapActions(['GetByDay', 'GetByUserId']),
    // 初始化table
    tableinfo(oneDay, userName) {
      let data = {
        oneDay,
        userName,
        pageIndex: this.currentPage,
        maxResultCount: this.maxResultCount
      };
      console.log(data);
      this.GetByDay(data);
    },
    caozuo() {
      console.log('拿到了函数');
    },
    // 选择月(出勤导出)
    handechange() {
      if (this.onlyOne()) {
        // 时间
        let date;

        if (this.month.script != undefined) {
          if (this.month.script == '今日') {
            date = parseTime(this.month.date, '{y}-{m}-{d}');
          } else if (this.month.script == '清除') {
            return;
          }
        } else {
          date = parseTime(this.month, '{y}-{m}');
        }
        console.log(this.month);
        let param = {
          oneMonth: date,
          userId: this.multipleSelection[0].userId
        };
        console.log(param);
      }
    },

    // 判断是否只选了一行（有些操作只能选择一行）并进行相关的提示
    onlyOne() {
      if (this.multipleSelection.length == 0) {
        console.log('请选择要操作数据');
        this.messageText = '请选择要操作数据';
        this.dialogMessage = true;
        return false;
      } else if (this.multipleSelection.length > 1) {
        this.messageText = '只能选择一行数据';
        this.dialogMessage = true;
        console.log('只能选择一行数据');
        return false;
      } else {
        return true;
      }
    },

    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },

    // 导出
    handlexport() {},
    // table选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    AttenadanceCheck(row) {
      this.dialogAttendID = row.userId;
      let param = {
        userId: row.userId,
        pageIndex: 1,
        maxResultCount: 10
      };
      this.GetByUserId(param);
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
      .date-box {
        position: relative;
        margin-right: 5px;
        .attendance-box {
          position: absolute;
          top: 0;
          right: 0;
          width: 74px;
          height: 28px;
          opacity: 0;
          cursor: pointer;
          z-index: 30;
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

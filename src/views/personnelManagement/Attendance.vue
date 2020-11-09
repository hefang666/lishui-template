<template>
  <div class="choosePeople-box dialog-box button-box">
    <el-dialog
      title="出勤查看"
      :visible.sync="dialogAttend"
      :close-on-click-modal="false"
      :before-close="closeAttend"
    >
      <div class="content-box">
        <div class="content_box">
          <div class="search-box">
            <el-date-picker
              v-model="searchWords"
              type="month"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-button class="search-button" type="primary" @click="attenquery"
              >查询</el-button
            >
          </div>
          <div class="table-box">
            <el-table
              :data="attendanceList"
              :stripe="true"
              tooltip-effect="dark"
              height="400"
              style="width: 100%"
              :highlight-current-row="true"
            >
              <el-table-column prop="oneDay" label="日期"></el-table-column>
              <el-table-column
                prop="onlineTime"
                label="上线时间"
              ></el-table-column>
              <el-table-column
                prop="offlineTime"
                label="下线时间"
              ></el-table-column>
              <el-table-column align="center" width="70" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    class="operate-button"
                    @click="handleSee(scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <page
            :page-data="[10, 30, 50, 100]"
            :total="attendanceTotal"
            @changePageSize="changePageSize"
            @changeCurrentPage="changeCurrentPage"
          ></page>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAttend">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 人员轨迹弹窗 -->
    <online
      :dialog-online="dialogOnline"
      :user-id="checkedId"
      @closeOnline="closeOnline"
    ></online>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import Online from './OnlineTrajectory.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('personManagement');
import {parseTime} from '@/utils/index';
export default {
  name: 'Attendance',
  props: ['dialogAttend', 'attendanceId'],
  components: {
    Page,
    Online
  },
  data() {
    return {
      // 搜索的关键字
      searchWords: '',

      // 当前选中页数
      currentPage: 1,

      // 当前每页条数
      pageSize: 10,

      // 是否显示人员轨迹弹窗
      dialogOnline: false,
      
      // 当前选中的id
      checkedId: ''
    };
  },
  computed: {
    ...mapState(['attendanceList', 'attendanceTotal'])
  },
  methods: {
    ...mapActions(['GetByUserId']),
    //查询
    attenquery() {
      let date = parseTime(
        this.searchWords,
        '{y}-{m}'
      )
      let param = {
        oneDay: date,
        userId: this.ID,
        pageIndex: this.currentPage,
        maxResultCount: this.pageSize
      }
      this.GetByUserId(param);
    },

    closeAttend() {
      this.$emit('getAttendData');
    },
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    },
    // 查看
    handleSee(row) {
      this.checkedId = row.userId;
      this.dialogOnline = true;
      console.log(row);
    },

    // 关闭人员轨迹弹窗
    closeOnline(data) {
      console.log(data);
      this.dialogOnline = data;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.content-box {
  .search-box {
    display: flex;

    .el-input {
      width: 200px;
    }

    .search-button {
      margin-left: 5px;
    }
  }

  .table-box {
    margin: 10px 0;
    border: 1px solid #ddd;
    box-sizing: border-box;
    border-bottom: none;
    .el-table--striped
      .el-table__body
      tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
      td {
      background-color: #f5f5f5;
    }
  }
}
</style>

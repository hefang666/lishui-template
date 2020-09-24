<template>
  <div class="choosePeople-box dialog-box button-box">
    <el-dialog
      title="出勤查看"
      :visible.sync="dialogAttend"
      :before-close="closeAttend"
    >
      <div class="content-box">
        <div class="cancel-box" @click="closeAttend">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <div class="search-box">
            <el-date-picker
              v-model="searchWords"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-button class="search-button" type="primary" @click="attenquery"
              >查询</el-button
            >
          </div>
          <div class="table-box">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :stripe="true"
              tooltip-effect="dark"
              height="400"
              style="width: 100%"
              :highlight-current-row="true"
              @row-click="clickRow"
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
                    @click="handleSee(scope.$index, scope.row)"
                    >查看</el-button
                  >
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAttend">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
export default {
  name: 'Attendance',
  props: ['dialogAttend', 'tableData','total'],
  components: {
    Page
  },
  data() {
    return {
      searchWords: '',
      checkedName: ''
    };
  },
  methods: {
    //查询
    attenquery() {
      let dates = this.searchWords;
      let y = dates.getFullYear();
      let m = (dates.getMonth() + 1 + '').padStart(2, '0');
      let d = (dates.getDate() + '').padStart(2, '0');
      this.searchWords = y + '-' + m + '-' + d;
      console.log('object :>> ', this.searchWords);
      this.$emit('attenquery',this.searchWords)
    },
    closeAttend() {
      this.$emit('getAttendData');
    },
    // 选中的行
    clickRow(val) {
      console.log(val);
      this.checkedName = val.name;
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
    handleSee() {}
  },
  mounted() {}
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

    .el-table--striped
      .el-table__body
      tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
      td {
      background-color: #f5f5f5;
    }
  }
}
</style>

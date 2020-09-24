<template>
  <div class="inspection-box button-box">
    <div class="header-box">
      <div class="header-left">
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
          :data="equipmentList"
          :stripe="true"
          tooltip-effect="dark"
          height="830"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="name"
            label="设备名称"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="number" label="设备编号"></el-table-column>
          <el-table-column
            prop="cishu"
            label="今年巡检次数"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="chufa"
            label="今年触发事件次数"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="order"
            label="今年转工单次数"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operate-box">
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

    <!-- 查看 -->
    <view-detail :dialog-view="dialogView" @closeView="closeView"></view-detail>
  </div>
</template>

<script>
import Search from '@/components/search';
import Page from '@/components/page/Page.vue';
import ViewDetail from './ViewDetail.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('equipment');
export default {
  name: 'Equipment',
  components: {
    'snt-search': Search,
    Page,
    ViewDetail
  },
  computed: {
    ...mapState(['equipmentList'])
  },
  data() {
    return {
      // 搜索框输入的搜索关键字
      searchWords: '',

      // table多选数组
      multipleSelection: [],

      // 当前分页
      currentPage: 1,

      // 当前页数
      pageSize: 30,

      // 是否显示查看
      dialogView: false
    };
  },
  methods: {
    ...mapActions(['GetDeviceInspectionList']),
    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },

    // 查看任务
    handleSee(index, row) {
      console.log(index, row);
      // this.dialogView = true;
    },

    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
      this.currentPage = data;
    },
    // 关闭查看
    closeView(data) {
      this.dialogView = data.dialogView;
    },
    getData() {
      let param = {
        pageIndex: this.currentPage,
        maxResultCount: this.pageSize
      }
      console.log(param);
      this.GetDeviceInspectionList(param);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.inspection-box {
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

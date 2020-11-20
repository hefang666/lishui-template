<template>
  <div class="inspection-box button-box">
    <div class="header-box">
      <div class="header-left">
        <snt-search
          :placeholder="'请输入设备名称或编码'" 
          @changeSearch="getSearchWord"
          @submit="searchInspect"
        />
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain @click="See">查看</el-button>
          <el-button type="primary" plain @click="exportData">导出</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="content-box">
      <div class="table-box">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="equipmentList"
          :stripe="true"
          border
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
          <el-table-column prop="code" label="设备编号"></el-table-column>
          <el-table-column
            prop="inspectionCount"
            label="今年巡检次数"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="eventCount"
            label="今年触发事件次数"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="workCount"
            label="今年转工单次数"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column width="100" align="center" label="操作">
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
      <div class="page-box">
        <page
          :page-data="equipmentPage"
          :total="equipmentTotal"
          @changePageSize="changePageSize"
          @changeCurrentPage="changeCurrentPage"
        ></page>
      </div>
    </div>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      @closeMessage="closeMessage"
    ></message>

    <!-- 查看 -->
    <view-detail :dialog-view="dialogView" @closeView="closeView"></view-detail>
  </div>
</template>

<script>
import Search from '@/components/search';
import Page from '@/components/page/Page.vue';
import ViewDetail from './ViewDetail.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('equipment');
// const {mapActions: areaActions} = createNamespacedHelpers('area');
import {exportExcel} from '@/utils/index';
export default {
  name: 'Equipment',
  components: {
    'snt-search': Search,
    Page,
    ViewDetail,
    Message
  },
  computed: {
    ...mapState(['equipmentList', 'equipmentPage', 'equipmentTotal'])
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
      dialogView: false,

      // 是否显示消息提示弹窗
      dialogMessage: false,

      // 提示消息
      messageText: '',

      // 加载状态
      loading: true
    };
  },
  methods: {
    ...mapActions(['GetDeviceInspectionList', 'GetDeviceInspectionDetails']),
    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },

    // 判断是否只选了一行（有些操作只能选择一行）并进行相关的提示
    onlyOne() {
      if (this.multipleSelection.length == 0) {
        // console.log('请选择要操作数据');
        this.messageText = '请选择要操作数据';
        this.dialogMessage = true;
        return false;
      } else if (this.multipleSelection.length > 1) {
        this.messageText = '只能选择一行数据';
        this.dialogMessage = true;
        // console.log('只能选择一行数据');
        return false
      } else {
        return true;
      }
    },

    // 查看
    See() {
      if (this.onlyOne()) {
        let param = {
          Id: this.multipleSelection[0].id
        };
        this.GetDeviceInspectionDetails(param).then(res => {
          if (res.success) {
            this.dialogView = true;
          }
        }).catch((err) => {
          this.messageText = err.Message;
          this.dialogMessage = true;
        });
      }
    },

    // 行里的查看
    handleSee(row) {
      let param = {
        Id: row.id
      };
      this.GetDeviceInspectionDetails(param).then(res => {
        if (res.success) {
          this.dialogView = true;
        }
      }).catch(err => {
        this.messageText = err.Message;
        this.dialogMessage = true;
      });
    },

    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },
    
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      // console.log(data);
      this.pageSize = data;
      this.getData();
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      // console.log(data);
      this.currentPage = data;
      this.getData();
    },
    // 关闭查看
    closeView(data) {
      this.dialogView = data.dialogView;
    },
    getData() {
      let param = {
        nameOrCode: this.searchWords,
        pageIndex: this.currentPage,
        maxResultCount: this.pageSize
      }
      this.GetDeviceInspectionList(param).then(res => {
        if (res.success) {
          this.loading = false;
        }
      }).catch((err) => {
        this.loading = false;
        this.messageText = err.Message;
        this.dialogMessage = true;
      });
    },
    // 获得从搜索组件穿回来的搜索关键字
    getSearchWord(data) {
      this.searchWords = data;
      // console.log(this.searchWords);
    },
    // 点击搜索
    searchInspect(data) {
      // console.log(data);
      this.searchWords = data;
      this.getData();
    },
    // 导出
    exportData() {
      let HeaderData = [
        '设备名称',
        '设备编号',
        '今年巡检次数',
        '今年触发事件次数',
        '今年转工单次数'
      ];
      let TextName = [
        'name',
        'code',
        'inspectionCount',
        'eventCount',
        'workCount'
      ];
      let tableData;
      let tableName = '设备列表';
      if (this.multipleSelection.length == 0) {
        tableData = this.equipmentList;
      } else {
        tableData = this.multipleSelection;
      }
      exportExcel(HeaderData, TextName, tableData, tableName);
    }
  },
  mounted() {
    this.pageSize = this.equipmentPage[0];

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

    .page-box {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}

</style>

<template>
  <div class="choosePeople-box dialog-box button-box">
    <el-dialog title="选择路线" :visible.sync="dialogArea">
      <div class="content-box">
        <div class="cancel-box" @click="closeChooseArea">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <div class="table-box">
            <el-table
              ref="multipleTable"
              :data="areaList"
              :stripe="true"
              tooltip-effect="dark"
              height="400"
              style="width: 100%"
              :highlight-current-row="true"
              @row-click="clickRow"
            >
              <el-table-column
                align="center"
                prop="name"
                label="片区名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="pipeLength"
                label="管道长度"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="number"
                label="设备点数量"
              ></el-table-column>
              <el-table-column align="center" label="操作">
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
            :total="400"
            @changePageSize="changePageSize"
            @changeCurrentPage="changeCurrentPage"
          ></page>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChooseArea">返回</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查看路线弹窗 -->
    <view-route
      :dialog-route="dialogRoute"
      @getRouteData="getRouteData"
    ></view-route>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import ViewRoute from '@/views/public/ViewRoute.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('xunjianPublic');
export default {
  name: 'ChooseArea',
  props: ['dialogArea'],
  components: {
    Page,
    ViewRoute
  },
  data() {
    return {
      searchWords: '',
      areaInfo: '',
      dialogRoute: false
    };
  },
  computed: {
    ...mapState(['areaList'])
  },
  methods: {
    closeChooseArea() {
      let data = {
        dialogArea: false
      };
      this.$emit('closeChooseArea', data);
    },
    // 选中的行
    clickRow(val) {
      this.areaInfo = val;
    },
    // 点击确定
    determine() {
      if (this.areaInfo == '') {
        alert('请选择巡检片区！');
        return;
      } else {
        let data = {
          areaInfo: this.areaInfo,
          dialogArea: false
        };

        this.$emit('checkedArea', data);
      }
    },
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    },
    // 查看按钮
    handleSee() {
      this.dialogRoute = true;
    },
    // 关闭查看路线弹窗
    getRouteData(data) {
      this.dialogRoute = data.dialogRoute;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
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
    margin: 0 0 10px 0;
    border: 1px solid #ddd;
    box-sizing: border-box;
    .el-table--striped
      .el-table__body
      tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
      td {
      background-color: #f5f5f5;
    }

    .operate-button {
      color: #337ab7;
    }

    .operate-button:hover {
      color: #23527c;
      text-decoration: underline;
    }
  }
}
</style>

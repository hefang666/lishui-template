<template>
  <div class="choosePeople-box dialog-box button-box">
    <el-dialog
      title="选择路线"
      :visible.sync="dialogArea"
      :before-close="closeChooseArea"
    >
      <div class="content-box">
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
                prop="pipelineLength"
                label="管道长度"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="pointCount"
                label="设备点数量"
              ></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="type == 'view'"
                    type="text"
                    class="operate-button"
                    @click="handleSee(scope.row)"
                    >查看</el-button
                  >
                  <el-button
                    v-if="type == 'choose'"
                    type="text"
                    class="operate-button"
                    @click="handleChoose(scope.row)"
                    >选择设备</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <page
            :page-data="[30, 40, 50, 100]"
            :total="areaTotal"
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
      :typestr="typeStr"
      @getRouteData="getRouteData"
    ></view-route>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import ViewRoute from '@/views/public/ViewRoute.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: xunjianState} = createNamespacedHelpers('xunjianPublic');
const {mapActions: areaActions} = createNamespacedHelpers('area');
export default {
  name: 'ChooseArea',
  props: ['dialogArea', 'type'],
  components: {
    Page,
    ViewRoute
  },
  data() {
    return {
      // 搜素的关键字
      searchWords: '',

      // 选择的片区信息
      areaInfo: '',

      // 是否显示查看路线弹窗
      dialogRoute: false,

      // 查看还是选择
      typeStr: '',

      // 选择的设备信息
      equiInfo: [],

      // 选择的管道信息
      conInfo: []
    };
  },
  computed: {
    ...xunjianState(['areaList', 'areaTotal'])
  },
  methods: {
    ...areaActions(['getAreaDetailInfo']),
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
      if (this.type == 'choose') {
        if (this.areaInfo == '') {
          alert('请选择巡检片区！');
          return;
        } else if (this.equiInfo.length != 0 || this.conInfo.length != 0) {
          let data = {
            areaInfo: this.areaInfo,
            equiInfo: this.equiInfo,
            conInfo: this.conInfo,
            dialogArea: false,
            type: 'choose'
          };
          this.$emit('checkedArea', data);
        } else {
          alert('请选择设备!');
        }
      } else if (this.type == 'view') {
        if (this.areaInfo == '') {
          alert('请选择巡检片区！');
          return;
        } else {
          let data = {
            areaInfo: this.areaInfo,
            dialogArea: false,
            type: 'view'
          };

          this.$emit('checkedArea', data);
        }
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
    handleSee(row) {
      console.log(row);
      let param = {
        Id: row.id
      }
      this.getAreaDetailInfo(param);
      this.typeStr = 'view';
      this.dialogRoute = true;
    },
    handleChoose(row) {
      let param = {
        Id: row.id
      }
      this.getAreaDetailInfo(param);
      this.typeStr = 'choose';
      this.dialogRoute = true;
    },
    // 关闭查看路线弹窗
    getRouteData(data) {
      console.log(data);
      this.dialogRoute = data.dialogRoute;

      if (this.typeStr == 'choose') {
        this.equiInfo = data.equiInfo;
        this.conInfo = data.conInfo;
      }
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
    border-bottom: none;
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

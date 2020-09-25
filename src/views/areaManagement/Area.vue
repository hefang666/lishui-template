<template>
  <div class="area-lists-box">
    <div class="table-box area-content-box">
      <el-table
        size="mini"
        ref="multipleTable"
        :data="areaList"
        :stripe="true"
        tooltip-effect="dark"
        height="100%"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="35" type="selection">
        </el-table-column>
        <el-table-column
          prop="name"
          label="片区名称"
          width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pipelineLength"
          label="管道长度"
          width="65"
        ></el-table-column>
        <el-table-column
          prop="pointCount"
          label="设备点数"
          width="65"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="58" label="显示">
          <template slot-scope="scope">
            <el-switch @change="changeSwitchStatus(scope.$index, scope.row.switch)" v-model="scope.row.switch">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label-class-name="handle" width="50" label="操作">
          <template slot-scope="scope">
            <a @click="updateCurrentInfo(scope.row.id)" class="text-primary">修改</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <page
        :page-data="[30, 40, 50, 100]"
        :total="areaListInfo.totalCount"
        layout="sizes,pager,jump"
        @changePageSize="changePageSize"
        @changeCurrentPage="changeTablePage"
      ></page>
    </div>
  </div>
</template>

<script>
import page from '@/components/page/Page.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('area');
export default {
  data() {
    return {};
  },
  components: {
    page
  },
  computed: {
    ...mapState(['areaList', 'areaListInfo'])
  },
  mounted() {
    // let areaListInfo = this.areaListInfo;
    this.getAreaListFunc();
  },
  methods: {
    ...mapActions([
      'getAreaListFunc',
      'changeHandleStatus',
      'getAreaDetailInfo',
      'changeAreaInfo',
      'chooseAreaId',
      'changePageCount',
      'changeCurrentPage'
    ]),
    handleSelectionChange(selection) {
      let areaIdList = [];
      selection.forEach(item => {
        areaIdList.push(item.id)
      });
      this.chooseAreaId(areaIdList);
    },
    // 显示或者关闭图层
    changeSwitchStatus(index, status) {
      let routeData = this.areaList[index];
      let map = this.$parent.$parent.$parent.$parent.$refs.map;
      map.showOrCloseRouteLayer(routeData, status);
    },

    // 点击修改按钮修改当前的
    updateCurrentInfo(id) {
      let _this = this;
      this.getAreaDetailInfo({
        id
      }).then(response => {
        let result = response.result;
        // 显示更改片区的信息区域
        this.changeHandleStatus(2);
        // 显示地图中的片区
        let map = _this.$parent.$parent.$parent.$parent.$refs.map;
        // map.showOrCloseRouteLayer(result, true);
        map.drawEditMapArea({areaPoint: result.areaPoint});
        let areaInfo = {
          lineLength: result.pipelineLength,
          area: result.areaPoint,
          selectLine: result.pipelineLists,
          selectPoint: result.deviceLists,
          id: result.id
        }
        _this.$parent.$parent.$parent.$parent.$refs.areaInfo.setName(result.name);
        this.changeAreaInfo(areaInfo);
        map.setAreaObj(areaInfo);
      })
    },

    changePageSize(data) {
      this.changePageCount(data);
      this.getAreaListFunc();
    },

    changeTablePage(data) {
      this.changeCurrentPage(data);
      this.getAreaListFunc();
    }
  }
};
</script>

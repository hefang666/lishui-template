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
          prop="routeName"
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
          <template>
            <a>修改</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <page
        :page-data="[30, 40, 50, 100]"
        :total="totalCount"
        layout="sizes,pager,jump"
      ></page>
    </div>
  </div>
</template>

<script>
import page from '@/components/page/Page.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('area');
export default {
  data() {
    return {};
  },
  components: {
    page
  },
  computed: {
    ...mapState(['areaList', 'totalCount'])
  },
  methods: {
    handleSelectionChange() {
      console.log(11);
    },
    // 显示或者关闭图层
    changeSwitchStatus(index, status) {
      let routeData = this.areaList[index];
      let map = this.$parent.$parent.$parent.$parent.$refs.map;
      map.showOrCloseRouteLayer(routeData, status);
    }
  }
};
</script>

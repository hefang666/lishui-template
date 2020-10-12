<template>
  <div class="table-box">
    <el-table
      size="mini"
      ref="multipleTable"
      :data="tabledata"
      :stripe="true"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        prop="deviceCode"
        label="设备编号"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="deviceName"
        label="设备名称"
      ></el-table-column>
      <el-table-column label-class-name="handle" width="80" label="操作">
        <template slot-scope="scope">
          <a @click="showDeviceInfo(scope.$index)">查看</a>
          <a @click="deleteFunc(scope.$index)" class="ml-5">移除</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import {createNamespacedHelpers} from 'vuex';
// const {mapState, mapActions} = createNamespacedHelpers('area');
export default {
  props: {
    tabledata: {
      type: Array,
      default: () => {
        [];
      }
    },
    type: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // ...mapActions(['deleteDeviceSigle']),
    showDeviceInfo(index) {
      this.$emit('showInfo', index);
    },
    deleteFunc (index) {
      this.$emit('deleteDevice', {
        type: this.type,
        index
      })
    }
  },
}
</script>
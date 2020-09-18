<template>
  <div class="area-manage area-list-namage">
    <Search icon="" placeholder="请输入片区名称"></Search>
    <div class="area-tabs">
      <el-tabs v-model="activeName" class="snt-card-tabs" type="card">
        <el-tab-pane label="片区管理" name="area">
          <Area/>
        </el-tab-pane>
        <el-tab-pane class="layer-pane" label="图层管理" name="layer">
          <Layer />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Search from '@/components/search';
import Area from './Area';
import Layer from './Layer'
export default {
  data() {
    return {
      activeName: 'area'
    };
  },
  components: {
    Search,
    Area,
    Layer
  }
};
</script>

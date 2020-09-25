<template>
  <div class="area-manage area-list-namage">
    <Search :loading="loading" @changeSearch="changeSearch" @submit="submitSearchWord" icon="" placeholder="请输入片区名称"></Search>
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
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('area');
export default {
  data() {
    return {
      activeName: 'area',
      loading: false
    };
  },
  computed: {
    ...mapState(['searchName'])
  },
  components: {
    Search,
    Area,
    Layer
  },
  methods: {
    ...mapActions(['getAreaListFunc', 'changeSearchName']),
    submitSearchWord() {
      this.loading = true;
      this.getAreaListFunc().then(()=> {
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    changeSearch(word) {
      this.changeSearchName(word)
    }
  },
};
</script>

<template>
  <div class="">
    <LayerTree
      :treedata="pointList"
      :showcheckbox="showcheckbox"
      title="管点图层"
      @checkedChange="changePoint"
    />
    <LayerTree
      :treedata="lineList"
      :showcheckbox="showcheckbox"
      title="管线图层"
      @checkedChange="changeLine"
    />
  </div>
</template>

<script>
import LayerTree from './LayerTree';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('area');
export default {
  data() {
    return {
      showcheckbox: true
    };
  },
  computed: {
    ...mapState(['pointList', 'lineList'])
  },
  mounted() {
    this.getPointAndLine();
  },
  components: {
    LayerTree
  },
  methods: {
    ...mapActions(['getPointAndLine', 'changeCheckedPoint', 'changeCheckedLine']),
    nodeClick({nodeData}) {
      console.log(nodeData);
    },
    changePoint(list) {
      this.changeCheckedPoint(list);
    },
    changeLine(list) {
      this.changeCheckedLine(list);
    }
  }
};
</script>

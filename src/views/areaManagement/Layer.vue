<template>
  <div class="">
    <LayerTree
      :treedata="treeData"
      :showcheckbox="showcheckbox"
      @nodeClick="nodeClick"
      title="管点图层"
    />
    <LayerTree
      :treedata="treeData"
      :showcheckbox="showcheckbox"
      @nodeClick="nodeClick"
      title="管线图层"
    />
  </div>
</template>

<script>
import LayerTree from './LayerTree';
export default {
  data() {
    return {
      showcheckbox: true,
      treeData: [{
        type: 1,
        label: '阀门',
        icon: 'cc',
        children: [{
          type: 4,
          label: '蝶阀',
          children: [{
            type: 10,
            label: '蝶阀',
            icon: 'bb'
          }]
        }]
      }, {
        type: 2,
        label: '井',
        icon: 'cc',
        children: [{
          type: 5,
          icon: 'cc',
          label: '阀门井'
        }, {
          type: 6,
          icon: 'cc',
          label: '检修井'
        }]
      }],
    };
  },
  components: {
    LayerTree
  },
  methods: {
    nodeClick({nodeData}) {
      console.log(nodeData);
    }
  }
};
</script>

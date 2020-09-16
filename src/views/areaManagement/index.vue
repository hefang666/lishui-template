<template>
  <div class="area-panet">
    <AreaManage></AreaManage>
    <Map ref="map"></Map>
    <AreaInfo></AreaInfo>
  </div>
</template>

<script>
import Map from './AreaMap';
import AreaManage from './AreaManage';
import AreaInfo from './areaInfo';
export default {
  components: {
    Map,
    AreaManage,
    AreaInfo
  }
};
</script>

<style lang="scss">
/* @import '~@/styles/style.scss'; */
</style>

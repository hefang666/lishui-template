<template>
  <div class="map-route" :style="{width: width + 'px', height: height + 'px'}" >
    <div class="map" id="map"></div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  .map-route {
    width: 100%;
    height: 100%;
    .map {
      width: 100%;
      height: 100%;
    }
  }
</style>
<template>
  <div id="map"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default {
  data(){
    return{
      map: null
    }
  },
  mounted(){
    this.initMap()
  },
  methods:{
     // 初始化地图
    initMap() {
      this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        projection: "EPSG:4326",    //使用这个坐标系
        center: [118.83500,32.0835479], 
        zoom: 15
      })
    });
    }
  }
}
</script>

<style>

</style>
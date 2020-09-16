<template>
  <div class="mapbox">
    <div id="areamap" class="areamap"></div>
  </div>
</template>

<script>
import {mapwms} from '@/api/api';
import {isStringEmpty} from '@/utils';
export default {
  data() {
    return {
      zoomMap: 15,
      drawAreaSoure: {}
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var SNTGIS = window.SNTGIS;
      var pointLayer = new SNTGIS.layer.TileWMS({
        url: mapwms,
        layers: 'OpenGIS:GisPoint',
        layerName: '管点图'
      });
      pointLayer.setMaxResolution(0.0000107288);
      var lineLayer = new SNTGIS.layer.TileWMS({
        url: mapwms,
        layers: 'OpenGIS:GisLine',
        layerName: '管线图'
      });
      const tdMap = new SNTGIS.layer.TDMap({
        token: '7ab767e38fe3d9c04f144a091cff214f',
        type: 1,
        layerName: '天地图电子底图'
      });
      const dmLayer = new SNTGIS.layer.TDMap({
        token: '7ab767e38fe3d9c04f144a091cff214f',
        type: 4,
        layerName: '天地图电子底图'
      });
      const zoomMap = this.zoomMap;
      this.map = new SNTGIS.Map({
        layers: [tdMap, dmLayer, pointLayer, lineLayer],
        center: [104.1526230224237, 30.01244851052735],
        zoom: zoomMap,
        maxZoom: 18,
        minZoom: 5,
        target: 'areamap'
      });
      this.$nextTick(() => {
        this.drawAreaLayer();
        this.featureSelectComp();
      });
    },
    // 初始化区域图层
    drawAreaLayer() {
      var SNTGIS = window.ol;
      // 区域样式
      var drawAreaStyle = new SNTGIS.style.Style({
        fill: new SNTGIS.style.Fill({
          color: 'rgba(75, 119, 190, 0.5)'
        }),
        stroke: new SNTGIS.style.Stroke({
          color: 'rgba(255, 255, 255, 0.5)',
          width: 2
        }),
        image: new SNTGIS.style.Circle({
          radius: 7,
          fill: new SNTGIS.style.Fill({
            color: 'rgba(75, 119, 190, 0.5)'
          })
        })
      });
      var drawAreaSoure = new SNTGIS.source.Vector({});
      this.drawAreaSoure = drawAreaSoure;
      // 区域图层
      var drawAreaLayer = new SNTGIS.layer.Vector({
        source: drawAreaSoure,
        updateWhileInteracting: true,
        style: drawAreaStyle
      });
      this.map.addLayer(drawAreaLayer);
    },

    // 地图选择控件
    featureSelectComp() {
      // 地图选择控件
      var featureSelect = new window.ol.interaction.Select({
        multi: true,
        hitTolerance: 5
      });
      this.featureSelect = featureSelect;
      // 添加选择控件
      this.map.addInteraction(featureSelect);
    },

    // 根据选中的列表展示图层或者关闭图层
    showOrCloseRouteLayer(routeData, isShow) {
      if (isShow) {
        this.showRouteLayer(routeData);
      } else {
        this.closeRouteLayer(routeData);
      }
    },

    // 显示相应列的图层
    showRouteLayer(routeData) {
      if (!isStringEmpty(routeData.routeArea)) {
        let routeAreaPointsArr = routeData.routeArea.split(';');
        let pointsArray = new Array();
        let xArray = new Array();
        let yArray = new Array();
        for (let i = 0; i < routeAreaPointsArr.length - 1; i++) {
          let element = routeAreaPointsArr[i];
          let routeAreaPointArr = element.split(',');
          xArray.push(routeAreaPointArr[0]);
          yArray.push(routeAreaPointArr[1]);
          pointsArray.push(routeAreaPointArr);
        }
        var areaFeatyre = new window.ol.Feature({
          geometry: new window.ol.geom.Polygon([pointsArray])
        });
        this.drawAreaSoure.addFeature(areaFeatyre);

        // 完成区域绘制之后将地图的中心点适配到区域范围
        var xmax = Math.max.apply(null, xArray);
        var xmin = Math.min.apply(null, xArray);
        var ymax = Math.max.apply(null, yArray);
        var ymin = Math.min.apply(null, yArray);
        this.map.getView().fit([xmin, ymin, xmax, ymax]);
      }
    },

    // 关闭相应列的区域
    closeRouteLayer(routeData) {
      let routeArea = routeData.routeArea
      if(!isStringEmpty(routeArea)) {
        let routeAreaPointsArr = routeArea.split(';');
        let pointsArray = new Array();
        for (let i = 0; i < routeAreaPointsArr.length - 1; i++) {
          let element = routeAreaPointsArr[i];
          let routeAreaPointArr = element.split(',');
          pointsArray.push(routeAreaPointArr);
        }
        let areaFeatyre = new window.ol.Feature({
          geometry: new window.ol.geom.Polygon([pointsArray])
        });
        //drawAreaSoure1.removeFeature(areaFeatyre);
        this.delFeatureFromSource(this.drawAreaSoure, areaFeatyre);
      }
    },
    // 删除区域  source 删除的图层   feature: 删除的区域
    delFeatureFromSource(source, feature) {
      var sourceArray = source.getFeatures();
      for (let index = 0; index < sourceArray.length; index++) {
        let element = sourceArray[index];
        if (JSON.stringify(feature.values_.geometry.flatCoordinates) == JSON.stringify(element.values_.geometry.flatCoordinates)) {
          source.removeFeature(element);
          return;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.mapbox {
  width: 100%;
  height: 100%;
  position: absolute;
  .areamap {
    width: 100%;
    height: 100%;
  }
}
</style>

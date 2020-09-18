<template>
  <div class="mapbox">
    <div id="areamap" class="areamap"></div>
    <div id="contextmenu_container" class="contextmenu">
      <ul class="contextmenu-lists">
          <li><a @click="selectByArea" href="#" id="popup-area-select">选择区域内设备</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapwms, workSpace} from '@/api/api';
import {isStringEmpty} from '@/utils';
export default {
  data() {
    return {
      // 管点图层
      pointLayer: {},
      // 管线图层
      lineLayer: {},
      zoomMap: 15,
      // 显示区域的图层
      drawAreaSource: {},
      drawAreaStyle: {},
      // 画区域的图层
      drawMapAreaSource: {},
      drawMapAreaLayer: {},
      // 存储画出来区域中的信息
      areaObj: {},
      // 选择绘制区域内设备的按钮弹出层
      menuOverlay: {},
      // 选中区域、管线、管点图层
      featureSelect: {}
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
      this.pointLayer = pointLayer;
      pointLayer.setMaxResolution(0.0000107288);
      var lineLayer = new SNTGIS.layer.TileWMS({
        url: mapwms,
        layers: 'OpenGIS:GisLine',
        layerName: '管线图'
      });
      this.lineLayer = lineLayer;
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
        this.drawAreaLayerFunc();
        this.initDrawMap();
        this.featureSelectComp();
        this.initMenuOverLay();
      });
    },
    // 初始化绘制区域图层
    initDrawMap() {
      let _this= this;
      let SNTGIS = window.ol;
      let drawMapAreaSource = new SNTGIS.source.Vector({});
      this.drawMapAreaSource = drawMapAreaSource;
      // 区域图层
      let drawMapAreaLayer = new SNTGIS.layer.Vector({
        source: drawMapAreaSource,
        updateWhileInteracting: true,
        style: _this.drawAreaStyle
      });
      this.drawMapAreaLayer = drawMapAreaLayer;
      this.map.addLayer(drawMapAreaLayer);
    },
    // 初始化区域图层
    drawAreaLayerFunc() {
      let SNTGIS = window.ol;
      // 区域样式
      let drawAreaStyle = new SNTGIS.style.Style({
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
      this.drawAreaStyle = drawAreaStyle;
      let drawAreaSource = new SNTGIS.source.Vector({});
      this.drawAreaSource = drawAreaSource;
      // 区域图层
      let drawAreaLayer = new SNTGIS.layer.Vector({
        source: drawAreaSource,
        updateWhileInteracting: true,
        style: drawAreaStyle
      });
      this.drawAreaLayer = drawAreaLayer
      this.map.addLayer(drawAreaLayer);
    },

    // 初始化选中设备区域的按钮图层
    initMenuOverLay() {
      let _this = this;
      let menuOverlay = new window.ol.Overlay({
        element: document.querySelector("#contextmenu_container"),
        positioning: 'center-center'
      })
      this.menuOverlay = menuOverlay;
      this.map.addOverlay(menuOverlay)

      // 按钮图层出现的事件
      this.map.getViewport().addEventListener('contextmenu', function(event) {
        if(_this.drawMapAreaSource.getFeatures().length > 0) {
          event.preventDefault();
          let coordinate = _this.map.getEventCoordinate(event);
          menuOverlay.setPosition(coordinate);
        }
      })
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
        this.drawAreaSource.addFeature(areaFeatyre);

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
        this.delFeatureFromSource(this.drawAreaSource, areaFeatyre);
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
    },
    // 画区域实现调用的方式
    drawAreaFunc() {
      let _this = this;
      let drawMapAreaSource = new window.ol.source.Vector({
        wrapX: false
      });
      this.drawMapAreaSource = drawMapAreaSource;
      this.drawMapAreaLayer.setSource(drawMapAreaSource);

      // 开始画区域
      let drawArea = new window.ol.interaction.Draw({
        source: drawMapAreaSource,
        type: 'Polygon'
      });

      this.map.addInteraction(drawArea);

      drawArea.on('drawend', function(evt) {
        console.log(evt);
        let areaObj = _this.areaObj;
        areaObj.area = '';

        // 将画出来区域的顶点连接成用;连接的字符串
        let flats = evt.feature.values_.geometry.flatCoordinates;
        for (let i = 0; i < flats.length; i = i + 2) {
          areaObj.area += flats[i] + ",";
          areaObj.area += flats[i + 1] + ";";
        }
        _this.map.removeInteraction(drawArea);
      });
    },

    // 获取地图中所有的GIS图层
    getMapShowGisLayers() {
      let layerList = this.map.getLayers().getArray();
      let layerArray = new Array();
      for (let i = 0; i < layerList.length; i++) {
        if (layerList[i].values_.title) {
          layerArray.push(layerList[i]);
        }
      }
      return layerArray;
    },

    // 选中绘制区域内的管点管线
    selectByArea() {
      let _this = this;
      if(_this.drawMapAreaSource.getFeatures().length > 0) {
        // 获取选中的图层边界点
        let areaExtent = _this.areaObj.area.split(';').join(' ');
        console.log(areaExtent)
        areaExtent = areaExtent.substring(0, areaExtent.length-1)
        console.log(areaExtent)
        window.SNTGIS.workSpace = workSpace;

        // 获取区域与管线图层相交的所有元素
        window.SNTGIS.NetWork.getFeaturesByCoords(_this.lineLayer, areaExtent, function(data){
          console.log(data)
        })
      }
    },

    // 重置区域图层
    resetDrawArea() {
      let _this = this;
      // 清空要素选择
      try {
        _this.featureSelect.getFeatures().clear();
      } catch (error) {
        _this.featureSelect.getFeatures().clear();
      }
      _this.areaObj.selectedLinesArray = [];
      _this.areaObj.selectedPointsArray = [];

      // 清空面区域
      _this.drawMapAreaSource = new window.ol.source.Vector({});
      _this.drawMapAreaLayer.setSource(_this.drawMapAreaSource);

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

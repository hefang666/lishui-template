<template>
  <div class="mapbox">
    <div id="areamap" class="areamap"></div>
    <div id="contextmenu_container" class="contextmenu">
      <ul class="contextmenu-lists">
        <li><a @click="selectByArea" href="#" id="popup-area-select">选择区域内设备</a></li>
      </ul>
    </div>
    <div ref="popup" class="pop-boxer">
      <a ref="closer" @click="closeOverlay" class="pop-closer">
        <!-- <i class="el-icon-close"></i> -->
      </a>
      <!-- <div v-if="featureType == 'point'" class="pop-container">
        <p>设备名称：{{ currentFeature.values_.PointName }}</p>
        <p>坐标:{{ currentFeature.values_.geometry.flatCoordinates[0] + ',' + currentFeature.values_.geometry.flatCoordinates[1] }}</p>
        <p>地址:{{ currentFeature.values_.Location }}</p>
      </div> -->
      <div class="pop-container">
        <p>设备名称：{{ currentDeviceInfo.deviceName }}</p>
        <p>坐标:{{ currentDeviceInfo.devicePoint }}</p>
        <p>地址:{{ currentDeviceInfo.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapwms,
    workSpace
  } from '@/api/api';
  import {
    isStringEmpty
  } from '@/utils';
  import {
    createNamespacedHelpers
  } from 'vuex';
  const {
    mapState
  } = createNamespacedHelpers('area');
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
        // 地图弹出设备管点管线弹出
        overlay: {},
        // 画区域的图层
        drawMapAreaSource: {},
        drawMapAreaLayer: {},
        // 存储画出来区域中的信息
        areaObj: {},
        // 选择绘制区域内设备的按钮弹出层
        menuOverlay: {},
        // 选中区域、管线、管点图层
        featureSelect: {},
        // 当前弹出设备信息
        currentDeviceInfo: {},

        pointInArea: [],
        lineInArea: []
      };
    },
    computed: {
      ...mapState(['areaList', 'checkedPoint', 'checkedLine', 'areaInfo'])
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
          this.initMapOverlay();
        });
      },
      // 初始化绘制区域图层
      initDrawMap() {
        let _this = this;
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
        this.map.getViewport().addEventListener('contextmenu', function (event) {
          if (_this.drawMapAreaSource.getFeatures().length > 0) {
            event.preventDefault();
            let coordinate = _this.map.getEventCoordinate(event);
            menuOverlay.setPosition(coordinate);
          }
        })
      },

      // 初始化地图管点及管线设备信息的图层
      initMapOverlay() {
        let container = this.$refs.popup;
        let overlay = new window.ol.Overlay({
          element: container,
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          },
          positioning: 'center-center'
        });
        this.overlay = overlay;
        this.map.addOverlay(overlay);
      },

      // 显示地图上管点管线的设备信息
      setMapOverLayInfo(deviceInfo) {
        this.currentDeviceInfo = deviceInfo;
        this.overlay.setPosition(deviceInfo.devicePoint.split(','));
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
        console.log(routeData)
        if (isShow) {
          this.showRouteLayer(routeData, 1);
        } else {
          this.closeRouteLayer(routeData);
        }
      },

      // 显示相应列的图层
      showRouteLayer(routeData, status) {
        if (!isStringEmpty(routeData.areaPoint)) {
          let routeAreaPointsArr = routeData.areaPoint.split(';');
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
          console.log('ccc')
          if (status === 1) {
            this.drawAreaSource.addFeature(areaFeatyre);
          } else {
            this.drawMapAreaSource.addFeature(areaFeatyre);
          }

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
        let routeArea = routeData.areaPoint
        if (!isStringEmpty(routeArea)) {
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
          if (JSON.stringify(feature.values_.geometry.flatCoordinates) == JSON.stringify(element.values_.geometry
              .flatCoordinates)) {
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

        drawArea.on('drawend', function (evt) {
          let areaObj = _this.areaObj;
          areaObj.area = '';

          // 将画出来区域的顶点连接成用;连接的字符串
          let flats = evt.feature.values_.geometry.flatCoordinates;
          for (let i = 0; i < flats.length; i = i + 2) {
            areaObj.area += flats[i] + ",";
            areaObj.area += flats[i + 1] + ";";
          }
          _this.map.removeInteraction(drawArea);
          _this.getCommonEle(areaObj.area);

        });
      },

      // 根据区域得出与区域相交的元素
      getCommonEle(areaPoint) {
        let _this = this;
        // 获取选中的图层边界点
        let areaExtent = areaPoint.split(';').join(' ');
        areaExtent = areaExtent.substring(0, areaExtent.length - 1)
        window.SNTGIS.workSpace = workSpace;

        // 获取区域与管线图层相交的所有元素
        window.SNTGIS.NetWork.getFeaturesByCoords(_this.lineLayer, areaExtent, function (data) {
          // _this.getSelectLineList(data)
          _this.lineInArea = data;
        })
        // 获取区域与管点图层相交的所有元素
        window.SNTGIS.NetWork.getFeaturesByCoords(_this.pointLayer, areaExtent, function (data) {
          _this.pointInArea = data;
          // _this.getSelectPointList(data)
        })
      },

      // 根据传入的区域范围绘制区域并获取橡胶的管点管线
      drawEditMapArea(routeData) {
        this.resetDrawArea();
        this.showRouteLayer(routeData, 2);
        this.getCommonEle(routeData.areaPoint);
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
        if (_this.drawMapAreaSource.getFeatures().length > 0) {
          if (this.checkedLine.length < 0 && this.checkedPoint.length < 0) {
            this.$message.error('请选择管点或者管线');
            return false;
          }
          this.menuOverlay.setPosition('');
          _this.getSelectLineList(_this.lineInArea);
          _this.getSelectPointList(_this.pointInArea);
        }
      },

      // 获取选中区域内所有的管线列表信息
      getSelectLineList(allLineList) {
        let _this = this;
        let selectLine = [];
        let checkedLine = _this.checkedLine;
        let lineLength = 0;
        for (let i = 0; i < allLineList.length; i++) {
          for (let j = 0; j < checkedLine.length; j++) {
            if (allLineList[i].properties.Material == checkedLine[j].label) {
              let x = (allLineList[i].geometry.coordinates[0][0] + allLineList[i].geometry.coordinates[1][0]) / 2;
              let y = (allLineList[i].geometry.coordinates[0][1] + allLineList[i].geometry.coordinates[1][1]) / 2;
              lineLength += allLineList[i].properties.LineLength;
              selectLine.push({
                deviceCode: allLineList[i].properties.LineNumber,
                deviceName: allLineList[i].properties.Material,
                devicePoint: x + ',' + y,
                address: allLineList[i].properties.Location,
                lineLength: allLineList[i].properties.LineLength
              });
            }
          }
        }
        this.areaObj.lineLength = lineLength;
        this.areaObj.selectLine = selectLine;
      },

      // 获取选中区域内所有的管点列表信息
      getSelectPointList(allPointList) {
        let _this = this;
        let selectPoint = [];
        let checkedPoint = _this.checkedPoint;
        for (let i = 0; i < allPointList.length; i++) {
          for (let j = 0; j < checkedPoint.length; j++) {
            if (allPointList[i].properties.PointName == checkedPoint[j].label) {
              selectPoint.push({
                deviceCode: allPointList[i].properties.PointNumbe,
                deviceName: allPointList[i].properties.PointName,
                devicePoint: allPointList[i].geometry.coordinates.join(','),
                address: allPointList[i].properties.Location,
              });
            }
          }
        }
        this.areaObj.selectPoint = selectPoint;
      },

      // 设置区域信息
      setAreaObj(areaObj) {
        this.areaObj = areaObj;
      },

      // 获取区域信息
      getAreaInfo() {
        return this.areaObj
      },

      // 关闭设备管点的弹出提示
      closeOverlay() {
        this.overlay.setPosition(undefined);
        this.$refs.closer.blur();
        return false;
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
        this.areaObj = {}
        // _this.areaObj.selectedLinesArray = [];
        // _this.areaObj.selectedPointsArray = [];

        // 清空面区域
        _this.drawMapAreaSource = new window.ol.source.Vector({});
        _this.drawMapAreaLayer.setSource(_this.drawMapAreaSource);
        _this.closeOverlay();
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
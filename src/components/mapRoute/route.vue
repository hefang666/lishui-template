<template>
  <div class="map-route" :style="{width: width + 'px', height: height + 'px'}">
    <div class="map" :id="mapid"></div>
    <div ref="popup" class="pop-boxer">
      <a ref="closer" @click="closeOverlay" class="pop-closer">
        <!-- <i class="el-icon-close"></i> -->
      </a>
      <div class="pop-container">
        <p>设备名称：{{ currentDevice.deviceName }}</p>
        <p>坐标:{{ currentDevice.devicePoint }}</p>
        <p>地址:{{ currentDevice.address }}</p>
      </div>
    </div>
  </div>
</template>
<script>
/**
 *  从外部调用地图显示区域范围 及 显示管道及管线 
 *  方法： setAreaInfo(区域信息)
 *  areaInfo {Object} 区域信息
 *  areaPoint 区域顶点 '经度，纬度；经度，维度；'
 *  deviceLists 管点列表
 *  pipelineLists  管线列表
 *  
 *  从外部调用弹出设备信息的浮框
 *  方法： getDeviceTooltip(设备信息)
 *  currentDevice {Object} 区域信息
 *  deviceName 设备名称
 *  devicePoint 设备坐标位置
 *  address 设备地址中文
 * 
 *  重置地图中的片区和管点管线
 *  方法：clearMapLayer
 * 
*/
import {
    // mapwms,
    workSpace
} from '@/api/api';
import {isStringEmpty} from '@/utils';
// import {Base64} from 'js-base64';
import {
  mapwms,
  // workSpace,
  geoserverUrl,
  // geoserverUrlConstPoint,
  // geoserverUrlConstLine
} from '@/api/api';
// import {createNamespacedHelpers} from 'vuex';
// const {mapState} = createNamespacedHelpers('mapdata');
export default {
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    // 传入地图id
    mapid: {
      type: String,
      default: 'map'
    },

    areaInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      areaInfoNew: {},
      // 地图
      map: {},
      // 管点图层
      pointLayer: {},
      // 管线图层
      lineLayer: {},
      // 默认地图放到比例
      zoomMap: 16,
      geoserverUrl: geoserverUrl,
      // 设备服务地址
      // geoserverUrlConstPoint: geoserverUrlConstPoint,
      // 管线服务地址
      // geoserverUrlConstLine: geoserverUrlConstLine,
      // 开始区域数据源
      // drawStartSoure: {},
      // 结束区域数据源
      // drawEndSoure: {},
      // 必经区域数据源
      // drawFromSoure: {},
      // 选择数据源
      featureSelect: {},
      // 路径数据源
      drawNavRouteSource: {},
      // 区域数据源
      drawAreaSoure: {},
      drawPointSource: {},
      drawLineSource: {},
      // 设备及管道信息的弹出
      overlay: {},
      featureType: '',
      currentFeature: {},
      // 最终保存的路径对象
      pathObj: {},
      // mapImg: {
      //   蝶阀: bufferfly
      // }
      pointListInArea: [],
      lineListInArea: [],
      currentDevice: {},
      drawPointLayer: {},
      drawLineLayer: {},
      drawAreaLayer: {},
      // 区域居中位置
      mapLocation: [],
      initMapStatus: false
    };
  },
  // computed: {
  //   ...mapState(['mapdata'])
  // },
  mounted() {
    console.log('地图加载了')
    // this.$nextTick(() => {
    //   this.showRouteMsgInMap(this.mapdata);
    // });
  },

  // watch: {
  //   areaInfo (areaInfo){
  //     console.log(areaInfo)
  //   }
  // },
  // updated () {
  //   this.clearMapLayer();
  //   this.$nextTick(() => {
  //     this.setAreaInfo(this.areaInfo);
  //   })
  // },
  methods: {  
    // 初始化地图
    initMap() { 
      // 初始化地图
      const SNTGIS = window.SNTGIS;
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
        target: this.mapid
      });
      this.init();
    },

    // 初始化图层
    init() {
      this.drawAreaLayerFunc();
      // this.drawStartLayer();
      // this.drawEndLayer();
      // this.drawFromLayer();
      // this.drawNavRouteLayer();
      this.addInteraction();
      this.mapOverlay();
      this.drawLineLayerFunc();
      this.drawPointLayerFunc();
      this.setAreaInfo(this.areaInfo)
    },
    

    // 绘制区域图层
    drawAreaLayerFunc() {
      // 画区域图层参数
      var drawAreaStyle = new window.ol.style.Style({ // 区域样式
        fill: new window.ol.style.Fill({
          color: 'rgba(75, 119, 190, 0.5)'
        }),
        stroke: new window.ol.style.Stroke({
          color: 'rgba(255, 255, 255, 0.5)',
          width: 2
        }),
        image: new window.ol.style.Circle({
          radius: 7,
          fill: new window.ol.style.Fill({
            color: 'rgba(75, 119, 190, 0.5)'
          })
        })
      });
      // 区域数据源
      var drawAreaSoure = new window.ol.source.Vector({});
      this.drawAreaSoure = drawAreaSoure;
      // 区域图层
      var drawAreaLayer = new window.ol.layer.Vector({
        source: drawAreaSoure,
        updateWhileInteracting: true,
        style: drawAreaStyle
      });
      this.drawAreaLayer = drawAreaLayer;
      this.map.addLayer(drawAreaLayer);
    },

    drawLineLayerFunc() {
      let drawLineStyle = new window.ol.style.Style({
        fill: new window.ol.style.Fill({
          color: 'rgba(252, 7, 7, 0.5)'
        }),
        stroke: new window.ol.style.Stroke({
          color: 'rgba(48, 99, 181, 0.5)',
          width: 4
        }),
      })
      let drawLineSource = new window.ol.source.Vector({});
      this.drawLineSource = drawLineSource;

      var drawLineLayer = new window.ol.layer.Vector({
        source: drawLineSource,
        updateWhileInteracting: true,
        style: drawLineStyle
      });
      this.drawLineLayer = drawLineLayer;
      this.map.addLayer(drawLineLayer);
    },

    drawPointLayerFunc() {
      let drawPointStyle = new window.ol.style.Style({
        fill: new window.ol.style.Fill({
          color: 'rgba(196, 211, 231, 0.5)'
        }),
        stroke: new window.ol.style.Stroke({
          color: 'rgba(252, 7, 7, 1)',
          width: 3
        })
        // image: new window.ol.style.Circle({
        //   stroke: new window.ol.style.Stroke({
        //     color: 'rgba(190, 91, 75, 0.5)',
        //     size: 1
        //   })
        // })

      })
      let drawPointSource = new window.ol.source.Vector({});
      this.drawPointSource = drawPointSource;
      var drawPointLayer = new window.ol.layer.Vector({
        source: drawPointSource,
        updateWhileInteracting: true,
        style: drawPointStyle
      });
      this.drawPointLayer = drawPointLayer;
      this.map.addLayer(drawPointLayer);
    },

    // 绘制选中元素图层
    addInteraction() {
      var featureSelect = new window.ol.interaction.Select({
        multi: true,
        hitTolerance: 2
      });
      this.featureSelect = featureSelect;
      this.map.addInteraction(this.featureSelect);
    },

    // 根据传入的数据在地图展示路线信息
    /*
        startPoint 开始点
        endPoint 结束点
        mustPoints 必经点
        routeArea 范围  '经度，纬度；经度，纬度;'
        planPoints 路线集合,
        devDtos 设备数组，
        pipDtos 管道数组
    */

    // 地图渲染及片区渲染
    setMapArea(areaInfo) {
      console.log(this.initMapStatus + 'ccccccccccccc')
      if(!this.initMapStatus) {
        this.initMapStatus = true;
        this.initMap();
      }
      this.setAreaInfo(areaInfo);
    },

    setAreaInfo(areaInfo) {
      this.areaInfoNew = areaInfo
      if(!areaInfo.areaPoint) return false;
      this.clearMapLayer();
      areaInfo.areaPoint = areaInfo.areaPoint.substring(0, areaInfo.areaPoint.length -1 )
      // this.areaInfo = areaInfo;
      this.showAreaMap(areaInfo);
      
    },
    showAreaMap(areaInfo) {
      if(!areaInfo.areaPoint) return false;
      let {
        areaPoint,
        deviceLists,
        pipelineLists
      } = areaInfo;
      console.log(areaPoint)
      // let _this = this;
      // 绘制区域
      let xArray = new Array();
      let yArray = new Array();
      if (!isStringEmpty(areaPoint)) {
        let routeAreaPointsArr = areaPoint.split(';');
        let pointsArray = new Array();
        for (let i = 0; i < routeAreaPointsArr.length - 1; i++) {
          let element = routeAreaPointsArr[i];
          let routeAreaPointArr = element.split(',');
          xArray.push(routeAreaPointArr[0]);
          yArray.push(routeAreaPointArr[1]);
          pointsArray.push(routeAreaPointArr);
        }
        let areaFeatyre = new window.ol.Feature({
          geometry: new window.ol.geom.Polygon([pointsArray])
        });
        this.drawAreaSoure.addFeature(areaFeatyre);
        let xmax = Math.max.apply(null, xArray);
        let xmin = Math.min.apply(null, xArray);
        let ymax = Math.max.apply(null, yArray);
        let ymin = Math.min.apply(null, yArray);
        this.mapLocation.push(xmin, ymin, xmax, ymax)
        this.map.getView().setZoom(this.zoomMap);
        console.log(this.map.getView().getZoom())
        this.map.getView().fit([xmin, ymin, xmax, ymax], this.map.getSize());
      }

      // 选中管点 及 管线
      this.getCommonEle(areaPoint, deviceLists, pipelineLists);
    },

    // 根据区域得出与区域相交的元素
    getCommonEle(areaPoint, deviceLists, pipelineLists) {
      let _this = this;
      // 获取选中的图层边界点
      let areaExtent = areaPoint.split(';').join(' ');
      console.log(areaExtent)
      // areaExtent = areaExtent.substring(0, areaExtent.length - 1)
      window.SNTGIS.workSpace = workSpace;

      if(deviceLists.length > 0) {
        // 获取区域与管点图层相交的所有元素
        console.log(_this.pointLayer)
        window.SNTGIS.NetWork.getFeaturesByCoords(_this.pointLayer, areaExtent, function (data) {
          _this.pointListInArea = data;
          let selectPointList = _this.getSelectPointList(data, deviceLists);
          _this.drawPointSelect(selectPointList)
        })
      }

      if(pipelineLists.length > 0) {
        // 获取区域与管线图层相交的所有元素
        window.SNTGIS.NetWork.getFeaturesByCoords(_this.lineLayer, areaExtent, function (data) {
          _this.lineListInArea = data;
          let selectLineList = _this.getSelectLineList(data, pipelineLists);
          _this.drawLineSelect(selectLineList)
        })
      }
    },

    // 选中管线
    drawLineSelect(selectLineList) {
      for(let i = 0; i< selectLineList.length; i++) {
        // console.log(selectLineList[i].deviceLoaction)
        let lineFeatype = new window.ol.Feature({
          geometry: new window.ol.geom.Polygon([selectLineList[i].deviceLoaction])
        })
        this.drawLineSource.addFeature(lineFeatype);
      }
    },

    // 选中管点
    drawPointSelect(selectPointList) {
      for(let i = 0; i< selectPointList.length; i++) {
        let pointFeatype = new window.ol.Feature({
          geometry: new window.ol.geom.Circle(selectPointList[i].deviceLoaction, 0.00005)
        })
        this.drawPointSource.addFeature(pointFeatype);
      }
    },

    // 获取选中区域内所有的选中管线列表信息
    getSelectLineList(allLineList, checkedLine) {
        let selectLine = [];
        for (let j = 0; j < checkedLine.length; j++) {
          for (let i = 0; i < allLineList.length; i++) {
            if (allLineList[i].properties.LineNumber == checkedLine[j].deviceCode) {
              let x = (allLineList[i].geometry.coordinates[0][0] + allLineList[i].geometry.coordinates[1][0]) / 2;
              let y = (allLineList[i].geometry.coordinates[0][1] + allLineList[i].geometry.coordinates[1][1]) / 2;
              selectLine.push({
                deviceCode: allLineList[i].properties.LineNumber,
                deviceName: allLineList[i].properties.Material,
                devicePoint: x + ',' + y,
                address: allLineList[i].properties.Location,
                deviceLoaction: allLineList[i].geometry.coordinates
              });
              break;
            }
          }
        }
        return selectLine
      },

      // 获取选中区域内所有的选中管点列表信息
      getSelectPointList(allPointList, checkedPoint) {
        let selectPoint = [];
        for (let j = 0; j < checkedPoint.length; j++) {
          for (let i = 0; i < allPointList.length; i++) {
            if (allPointList[i].properties.PointNumbe == checkedPoint[j].deviceCode) {
              selectPoint.push({
                deviceCode: allPointList[i].properties.PointNumbe,
                deviceName: allPointList[i].properties.PointName,
                devicePoint: allPointList[i].geometry.coordinates.join(','),
                address: allPointList[i].properties.Location,
                deviceLoaction: allPointList[i].geometry.coordinates
              });
              break;
            }
          }
        }

        return selectPoint;
        // this.areaObj.selectPoint = selectPoint;
      },
    // showRouteMsgInMap(mapdata) {
    //   let {
    //     startPoint,
    //     endPoint,
    //     mustPoints,
    //     planPoints,
    //     routeArea,
    //     devDtos,
    //     pipDtos
    //   } = mapdata;
    //   let _this = this;

    //   // 绘制起点
    //   let startPoints = startPoint.split(',');
    //   let startFeature = this.drowFeatrue(startPoints);
    //   this.drawStartSoure.addFeature(startFeature);

    //   // 绘制终点
    //   let endPoints = endPoint.split(',');
    //   let endFeature = this.drowFeatrue(endPoints);
    //   this.drawEndSoure.addFeature(endFeature);

    //   // 绘制必经点
    //   if (!isStringEmpty(mustPoints)) {
    //     let mustPointsArr = mustPoints.split(';');
    //     for (let i = 0; i < mustPointsArr.length - 1; i++) {
    //       let element = mustPointsArr[i];
    //       var mustPointArr = element.split(',');
    //       var mustFeature = this.drowFeatrue(mustPointArr);
    //       this.drawFromSoure.addFeature(mustFeature);
    //     }
    //   }

    //   // 绘制路径
    //   if (!isStringEmpty(planPoints)) {
    //     let planPointsArr = planPoints.split(';');
    //     let pointsPlanArray = new Array();
    //     for (let i = 0; i < planPointsArr.length - 1; i++) {
    //       let point = planPointsArr[i].split(',');
    //       let px = parseFloat(point[0]);
    //       let py = parseFloat(point[1]);
    //       let pointarr = new Array();
    //       pointarr.push(px);
    //       pointarr.push(py);
    //       pointsPlanArray.push(pointarr);
    //     }
    //     let routeFeatyre = new window.ol.Feature({
    //       geometry: new window.ol.geom.LineString(pointsPlanArray)
    //     });
    //     this.drawNavRouteSource.addFeature(routeFeatyre);
    //   }

    // 绘制区域
    // let xArray = new Array();
    // let yArray = new Array();
    // if (!isStringEmpty(routeArea)) {
    //   let routeAreaPointsArr = routeArea.split(';');
    //   let pointsArray = new Array();
    //   for (let i = 0; i < routeAreaPointsArr.length - 1; i++) {
    //     let element = routeAreaPointsArr[i];
    //     let routeAreaPointArr = element.split(',');
    //     xArray.push(routeAreaPointArr[0]);
    //     yArray.push(routeAreaPointArr[1]);
    //     pointsArray.push(routeAreaPointArr);
    //   }
    //   let areaFeatyre = new window.ol.Feature({
    //     geometry: new window.ol.geom.Polygon([pointsArray])
    //   });
    //   this.drawAreaSoure.addFeature(areaFeatyre);
    //   let xmax = Math.max.apply(null, xArray);
    //   let xmin = Math.min.apply(null, xArray);
    //   let ymax = Math.max.apply(null, yArray);
    //   let ymin = Math.min.apply(null, yArray);
    //   this.map.getView().fit([xmin, ymin, xmax, ymax]);
    // }

    //   // 绘制设备图层
    //   var loadLayersArray = new Array();
    //   for (let index = 0; index < devDtos.length; index++) {
    //     let element = devDtos[index];
    //     let layer = element.deviceName;
    //     if (!this.isLayerInArray(layer)) {
    //       if (loadLayersArray.indexOf(layer) < 0) {
    //         loadLayersArray.push(layer);
    //         this.addPointLayerByName(layer);
    //       }
    //     }
    //   }
    //   for (let index = 0; index < pipDtos.length; index++) {
    //     let element = pipDtos[index];
    //     let layer = element.deviceName;
    //     if (!this.isLayerInArray(layer)) {
    //       if (loadLayersArray.indexOf(layer) < 0) {
    //         loadLayersArray.push(layer);
    //         this.addLineLayerByName(layer, 'blue');
    //       }
    //     }
    //   }
    //   // 选中要素
    //   var interval = setInterval(function() {
    //     var selectArrays = _this.featureSelect.getFeatures().getArray();
    //     loadLayersArray = _this.checkSelectFeatures(selectArrays, loadLayersArray);
    //     if (loadLayersArray.length <= 0) {
    //       _this.selectAllFeatures(devDtos, pipDtos);
    //       _this.selectByAreaFunc();
    //       clearInterval(interval);
    //     }
    //     _this.selectAllFeatures(devDtos, pipDtos);
    //   }, 100);
    // },

    // 画顶点
    // drowFeatrue(point) {
    //   var featrure = new window.ol.Feature({
    //     geometry: new window.ol.geom.Point(point)
    //   });
    //   return featrure;
    // },

    // 绘制开始区域图层
    // drawStartLayer() {
    //   var drawStartStyle = new window.ol.style.Style({ // 区域样式
    //     image: new window.ol.style.Icon({
    //       size: [32, 48],
    //       anchor: [0.5, 0.6],
    //       src: start
    //     })
    //   });
    //   var drawStartSoure = new window.ol.source.Vector({});
    //   this.drawStartSoure = drawStartSoure;
    //   var drawStartLayer = new window.ol.layer.Vector({
    //     source: drawStartSoure,
    //     updateWhileInteracting: true,
    //     style: drawStartStyle
    //   });
    //   this.map.addLayer(drawStartLayer);
    // },

    // 绘制结束区域图层
    // drawEndLayer() {
    //   // 画终点图层参数
    //   var drawEndStyle = new window.ol.style.Style({ // 区域样式
    //     image: new window.ol.style.Icon({
    //       size: [32, 48],
    //       anchor: [0.5, 0.6],
    //       src: end
    //     })
    //   });
    //   var drawEndSoure = new window.ol.source.Vector({});
    //   this.drawEndSoure = drawEndSoure;
    //   var drawEndLayer = new window.ol.layer.Vector({ // 区域图层
    //     source: drawEndSoure,
    //     updateWhileInteracting: true,
    //     style: drawEndStyle
    //   });
    //   this.map.addLayer(drawEndLayer);
    // },

    // 绘制必经区域路径图层
    // drawFromLayer() {
    //   // 画必经点图层参数
    //   var drawFromStyle = new window.ol.style.Style({ // 区域样式
    //     image: new window.ol.style.Icon({
    //       size: [32, 48],
    //       anchor: [0.5, 0.6],
    //       src: location
    //     })
    //   });
    //   var drawFromSoure = new window.ol.source.Vector({}); // 区域数据源
    //   this.drawFromSoure = drawFromSoure;
    //   var drawFromLayer = new window.ol.layer.Vector({ // 区域图层
    //     source: drawFromSoure,
    //     updateWhileInteracting: true,
    //     style: drawFromStyle
    //   });
    //   this.map.addLayer(drawFromLayer);
    // },

    // 模拟导航路线参数
    // drawNavRouteLayer() {
    //   var _this = this;
    //   var drawNavRouteSource = new window.ol.source.Vector({}); // 区域数据源
    //   this.drawNavRouteSource = drawNavRouteSource;
    //   var drawNavRouteLayer = new window.ol.layer.Vector({ // 区域图层
    //     source: drawNavRouteSource,
    //     updateWhileInteracting: true,
    //     style: function(feature) {
    //       return _this.getNavRouteStyle(feature);
    //     }
    //   });
    //   this.map.addLayer(drawNavRouteLayer);
    // },

    // 获取模拟导航路线样式
    // getNavRouteStyle(feature) {
    //   var geometry = feature.getGeometry();
    //   var styles = [
    //     // linestring
    //     new window.ol.style.Style({
    //       stroke: new window.ol.style.Stroke({
    //         color: 'red',
    //         width: 2
    //       })
    //     })
    //   ];
    //   geometry.forEachSegment(function(start, end) {
    //     var dx = end[0] - start[0];
    //     var dy = end[1] - start[1];
    //     var rotation = Math.atan2(dy, dx);
    //     // arrows
    //     styles.push(
    //       new window.ol.style.Style({
    //         geometry: new window.ol.geom.Point(end),
    //         image: new window.ol.style.Icon({
    //           src: arrow,
    //           anchor: [0.75, 0.5],
    //           rotateWithView: true,
    //           rotation: -rotation
    //         })
    //       })
    //     );
    //   });
    //   return styles;
    // },
    // 通过设备名字添加图层到地图
    // addPointLayerByName(layername) {
    //   let _this = this;
    //   var layerList = this.map.getLayers().getArray();
    //   for (let i = 0; i < layerList.length; i++) {
    //     let url = layerList[i].values_.title;
    //     if (url) {
    //       if (url == layername) {
    //         return;
    //       }
    //     }
    //   }
    //   let url = this.geoserverUrl + this.geoserverUrlConstPoint + layername;
    //   let vectorSource = new window.ol.source.Vector({
    //     format: new window.ol.format.GeoJSON(),
    //     loader: function() {
    //       var ajax = new XMLHttpRequest();
    //       ajax.open('get', url);
    //       // ajax.open("GET", url, true, userName, passWord);
    //       ajax.withCredentials = true;
    //       ajax.setRequestHeader(
    //         'Authorization',
    //         _this.authenticateUser('admin', 'Sntsoft123')
    //       );
    //       ajax.send();
    //       ajax.onreadystatechange = function() {
    //         if (ajax.readyState == 4 && ajax.status == 200) {
    //           vectorSource.addFeatures(
    //             vectorSource.getFormat().readFeatures(ajax.responseText));
    //         }
    //       };
    //     }
    //   });
    //   var layer = new window.ol.layer.Vector({
    //     source: vectorSource,
    //     title: layername,
    //     style: new window.ol.style.Style({
    //       image: new window.ol.style.Icon({
    //         size: [16, 16],
    //         src: _this.mapImg[layername]
    //       })
    //     })
    //   });
    //   this.map.addLayer(layer);
    //   return layer;
    // },

    // 通过管道名字添加图层，并同时设置管道颜色
    // addLineLayerByName(layername, color) {
    //   let _this = this;
    //   var layerList = this.map.getLayers().getArray();
    //   for (let i = 0; i < layerList.length; i++) {
    //     let url = layerList[i].values_.title;
    //     if (url) {
    //       if (url == layername) {
    //         return;
    //       }
    //     }
    //   }
    //   let url = this.geoserverUrl + this.geoserverUrlConstLine + layername;
    //   let vectorSource = new window.ol.source.Vector({
    //     format: new window.ol.format.GeoJSON(),
    //     loader: function() {
    //       var ajax = new XMLHttpRequest();
    //       ajax.open('get', url);
    //       // ajax.open("GET", url, true, userName, passWord);
    //       ajax.withCredentials = true;
    //       ajax.setRequestHeader(
    //         'Authorization',
    //         _this.authenticateUser('admin', 'Sntsoft123')
    //       );
    //       ajax.send();
    //       ajax.onreadystatechange = function() {
    //         if (ajax.readyState == 4 && ajax.status == 200) {
    //           vectorSource.addFeatures(
    //             vectorSource.getFormat().readFeatures(ajax.responseText));
    //         }
    //       };
    //     }
    //   });
    //   var layer = new window.ol.layer.Vector({
    //     source: vectorSource,
    //     title: layername,
    //     style: new window.ol.style.Style({
    //       stroke: new window.ol.style.Stroke({
    //         color: color,
    //         width: 2
    //       })
    //     }) 
    //   });
    //   this.map.addLayer(layer);
    //   return layer;
    // },
    
    

    // 加密账号
    // authenticateUser(user, password) {
    //   var token = user + ':' + password;
    //   var hash = Base64.encode(token);
    //   return 'Basic ' + hash;
    // },

    // 判断当前layer是否在图层中
    // isLayerInArray(layername) {
    //   var layerList = this.map.getLayers().getArray();
    //   for (let i = 0; i < layerList.length; i++) {
    //     var url = layerList[i].values_.source.url_;
    //     if (url && url.indexOf('name:' + layername) >= 0) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },

    // 判断选中的设备
    // checkSelectFeatures(selectArrays, loadLayersArray) {
    //   for (var index = 0; index < selectArrays.length; index++) {
    //     var feature = selectArrays[index];
    //     if (feature.id_.indexOf('Point') >= 0) {
    //       let i = loadLayersArray.indexOf(feature.values_.PointName);
    //       if (i > -1) {
    //           loadLayersArray.splice(i, 1);
    //       }
    //     } else if (feature.id_.indexOf('Line') >= 0) {
    //       let i = loadLayersArray.indexOf(feature.values_.Material);
    //       if (i > -1) {
    //         loadLayersArray.splice(i, 1);
    //       }
    //     }
    //   }
    //   return loadLayersArray;
    // },
    // 选中所有的路线中管道和设备的feature
    // selectAllFeatures(devDtos, pipDtos) {
    //   let layerArray = this.getMapShowGisLayers();
    //   if (layerArray.length > 0) {
    //     this.featureSelect.getFeatures().clear();
    //     for (let i = 0; i < layerArray.length; i++) {
    //       let layerN = layerArray[i];
    //       let featuresSe = layerN.getSource().getFeatures();
    //       if (featuresSe.length > 0) {
    //         if (layerN.getSource().getFeatures()[0].values_.geometry.ol_lm.change[0].bindTo.id_.indexOf('Point') > 0) {
    //           for (let index = 0; index < featuresSe.length; index++) {
    //             let element = featuresSe[index];
    //             if (this.queryMapnoInSets(element.values_.PointNumbe, 'point', devDtos)) {
    //               this.featureSelect.getFeatures().push(element);
    //             }
    //           }
    //         } else {
    //           for (let index = 0; index < featuresSe.length; index++) {
    //             let element = featuresSe[index];
    //             if (this.queryMapnoInSets(element.values_.LineNumber, 'line', pipDtos)) {
    //               this.featureSelect.getFeatures().push(element);
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // },

    // 生成设备列表
    // selectByAreaFunc() {
    //   var selectedPointsArray = new Array();
    //   var selectedLinesArray = new Array();
    //   var selectArrays = this.featureSelect.getFeatures().getArray();
    //   if (selectArrays.length > 0) {
    //     for (let index = 0; index < selectArrays.length; index++) {
    //       let element = selectArrays[index];
    //       if (element.id_.indexOf('Point') >= 0) {
    //         selectedPointsArray.push(element);
    //       } else if (element.id_.indexOf('Line') >= 0) {
    //         selectedLinesArray.push(element);
    //       }
    //     }
    //     this.pathObj.selectedPointsArray = selectedPointsArray;
    //     this.pathObj.selectedLinesArray = selectedLinesArray;
    //     this.pointLineFunc();
    //   } else {
    //     // top.sweet("", "未选中任何管道或者设备，无法生成列表！", "info");
    //     // alert("未选中任何管道或者设备，无法生成列表！");
    //   }
    // },

    //设备点及管线、设备及管道数据
    // pointLineFunc() {
    //   // pathObj
    //   let point = this.pathObj.selectedPointsArray; //设备点数组
    //   let line = this.pathObj.selectedLinesArray; //管线数组
    //   let pointNum = point.length; //设备点个数
    //   let longSun = 0; //管线总长
    //   let pointArray = []; //列表点数组
    //   let lineArray = []; //列表线数组

    //   for (let i = 0; i < line.length; i++) {
    //     let long = line[i].values_.length * 100000;
    //     longSun += long;
    //     let x =
    //     (line[i].values_.geometry.flatCoordinates[0] +
    //     line[i].values_.geometry.flatCoordinates[2]) / 2;
    //     let y =
    //     (line[i].values_.geometry.flatCoordinates[1] +
    //     line[i].values_.geometry.flatCoordinates[3]) / 2;
    //     let obj = {
    //       deviceType: 1,
    //       //设备编号
    //       deviceCode: line[i].values_.LineNumber,
    //       //点名称
    //       deviceName: line[i].values_.Material,
    //       //点坐标
    //       devicePoint: x + ',' + y,
    //       //地址
    //       address: line[i].values_.Location
    //     };
    //     lineArray.push(obj);
    //   }

    //   for (let i = 0; i < point.length; i++) {
    //     let obj = {
    //       deviceType: 0,
    //       //设备编号
    //       deviceCode: point[i].values_.PointNumbe,
    //       //线名称
    //       deviceName: point[i].values_.PointName,
    //       //点坐标
    //       devicePoint:
    //       point[i].values_.geometry.flatCoordinates[0] +
    //       ',' +
    //       point[i].values_.geometry.flatCoordinates[1],
    //       //地址
    //       address: point[i].values_.Location
    //     };
    //     pointArray.push(obj);
    //   }
    //   console.log(pointNum, longSun);
    //   // document.querySelector('#pointNum').text(pointNum);
    //   // document.querySelector('#lineLong').text(longSun.toFixed(2));
    //   this.pathObj.pointArray = pointArray;
    //   this.pathObj.lineArray = lineArray;

    //   // this.equipmentPointFunc(pathObj.pointArray);
    //   // this.lineFunc(pathObj.lineArray);
    // },

    // 获取地图中所有的GIS图层
    // getMapShowGisLayers() {
    //   var layerList = this.map.getLayers().getArray();
    //   var layerArray = new Array();
    //   for (var i = 0; i < layerList.length; i++) {
    //     if (layerList[i].values_.title) {
    //       layerArray.push(layerList[i]);
    //     }
    //   }
    //   return layerArray;
    // },

    // 查询设备编号是否在数据集中
    // queryMapnoInSets(mapno, featureType, data) {
    //   if (featureType == 'point') {
    //     for (let index = 0; index < data.length; index++) {
    //       let element = data[index];
    //       let layer = element.deviceCode;
    //       if (layer == mapno) {
    //         return true;
    //       }
    //     }
    //   } else {
    //     for (let index = 0; index < data.length; index++) {
    //       let element = data[index];
    //       let layer = element.deviceCode;
    //       if (layer == mapno) {
    //         return true;
    //       }
    //     }
    //   }
    //   return false;
    // },

    // 从这里开始展示从父组件查看当前管道以及设备信息的事件

    mapOverlay() {
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

    closeOverlay() {
      // 关闭地图上的区域及管点管线
      this.overlay.setPosition(undefined);
      this.$refs.closer.blur();
      return false;
    },

    // 关闭管点管线图层
    clearMapLayer() {
      this.drawPointLayer.getSource().clear();
      this.drawLineLayer.getSource().clear();
      this.drawAreaLayer.getSource().clear();
      this.closeOverlay();
    },
    
    /*
      以下另个方法参数描述
      @param {String} str 传入设备信息  '设备编号; 设备名称'  'JL15324, 球墨铸铁'
    */
    // 展示点
    // ShowPointFunc(str) {
    //   var strArr = str.split(';');
    //   this.getFeatureByMapNo(strArr[0], strArr[1], 'point');
    // },

    // 展示线
    // ShowLineFunc(str) {
    //   var strArr = str.split(';');
    //   this.getFeatureByMapNo(strArr[0], strArr[1], 'line');
    // },

   
    getDeviceTooltip(currentDevice) {
      this.currentDevice = currentDevice;

      this.$nextTick(() => {
        let positioning = currentDevice.devicePoint.split(',')
        this.overlay.setPosition(positioning);
        this.map.getView().fit([positioning[0], positioning[1],positioning[0], positioning[1]], this.map.getSize());
        // this.map.getView().fit(this.mapLocation);

      })
    }
     /**
     * 通过设备号  管网材质类别   管线或者管点    查询要素,featureType为point则为点
     * @param {String} mapNo  设备编号
     * @param {String} material  设备图层
     * @param {String} featureType  是点还是线，是点就传point
     * @param {String} state  设备状态
     */
    // getFeatureByMapNo(mapNo, material, featureType, state) {
    //   console.log(state);
    //   // 首先判断地图中是否有该图层
    //   let layerNow,
    //     _this = this;
    //   let layerList = _this.map.getLayers().getArray();
    //   for (let i = 0; i < layerList.length; i++) {
    //     let url = layerList[i].values_.title;
    //     if (url == material) {
    //       layerNow = layerList[i];
    //       break;
    //     }
    //   }
    //   if (layerNow) {
    //     let featuresArray = layerNow.getSource().getFeatures();
    //     for (let i = 0; i < featuresArray.length; i++) {
    //       if (featureType == 'point') {
    //         if (featuresArray[i].values_.PointNumbe == mapNo) {
    //           let coordinate = featuresArray[i].values_.geometry.flatCoordinates;
    //           _this.featureType = 'point';
    //           _this.currentFeature = featuresArray[i];
    //           _this.$nextTick(() => {
    //             _this.overlay.setPosition(coordinate);
    //           });
    //         }
    //       } else {
    //         if (featuresArray[i].values_.LineNumber == mapNo) {
    //           let coordinate = featuresArray[i].values_.geometry.flatCoordinates;
    //           _this.featureType = 'line';
    //           _this.currentFeature = featuresArray[i];
    //           var coordinatel = new Array();
    //           coordinatel.push((coordinate[0] + coordinate[2]) / 2);
    //           coordinatel.push((coordinate[1] + coordinate[3]) / 2);
    //           _this.$nextTick(() => {
    //             _this.overlay.setPosition(coordinatel);
    //           });
    //         }
    //       }
    //     }
    //   } else {
    //     // 没有该图层则添加该图层
    //     // if (featureType == "point") {
    //     //     layerNow = addPointLayerByName(material);
    //     // } else {
    //     //     layerNow = addLineLayerByName(material, "blue");
    //     // }
    //     // alert("系统已自动添加" + material + "图层," + "请再次点击查看!")
    //   }
    // }
  }
};
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
.ol-unselectable {
  display: block !important;
}
</style>

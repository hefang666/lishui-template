<template>
  <div class="map-route" :style="{width: width + 'px', height: height + 'px'}">
    <div class="map" :id="mapid"></div>
    <div ref="popup" class="pop-boxer">
      <a ref="closer" @click="closeOverlay" class="pop-closer">
        <!-- <i class="el-icon-close"></i> -->
      </a>
      <div v-if="featureType == 'point'" class="pop-container">
        <p>设备名称：{{ currentFeature.values_.PointName }}</p>
        <p>坐标:{{ currentFeature.values_.geometry.flatCoordinates[0] + ',' + currentFeature.values_.geometry.flatCoordinates[1] }}</p>
        <p>地址:{{ currentFeature.values_.Location }}</p>
      </div>
      <div v-if="featureType== 'line'" class="pop-container">
        <p>设备名称：{{ currentFeature.values_.Material }}</p>
        <p>坐标:{{ currentFeature.values_.geometry.flatCoordinates[0] + ',' + currentFeature.values_.geometry.flatCoordinates[1] }}</p>
        <p>地址:{{ currentFeature.values_.Location }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import start from './start.png';
import end from './end.png';
import arrow from './arrow.png';
import location from './location.png';
import bufferfly from './bufferfly.png';
import {isStringEmpty} from '@/utils';
import {Base64} from 'js-base64';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('mapdata');
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
    }
  },
  data() {
    return {
      // 地图
      map: {},
      // 默认地图放到比例
      zoomMap: '14',
      geoserverUrl: 'https://www.rsxgps.com:9091',
      // 设备服务地址
      geoserverUrlConstPoint: '/geoserver/OpenGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OpenGIS%3AGetPointByName_Ins&outputFormat=application%2Fjson&viewparams=name:',
      // 管线服务地址
      geoserverUrlConstLine: '/geoserver/OpenGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OpenGIS%3AGetLineByName_Ins&outputFormat=application%2Fjson&viewparams=name:',
      // 开始区域数据源
      drawStartSoure: {},
      // 结束区域数据源
      drawEndSoure: {},
      // 必经区域数据源
      drawFromSoure: {},
      // 选择数据源
      featureSelect: {},
      // 路径数据源
      drawNavRouteSource: {},
      // 区域数据源
      drawAreaSoure: {},
      // 设备及管道信息的弹出
      overlay: {},
      featureType: '',
      currentFeature: {},
      // 最终保存的路径对象
      pathObj: {},
      mapImg: {
        蝶阀: bufferfly
      }
    };
  },
  computed: {
    ...mapState(['mapdata'])
  },
  mounted() {
    // 初始化地图
    const SNTGIS = window.SNTGIS;
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
      layers: [tdMap, dmLayer],
      center: [104.1526230224237, 30.01244851052735],
      zoom: zoomMap,
      maxZoom: 18,
      minZoom: 5,
      target: this.mapid
    });
    this.init();
    this.$nextTick(() => {
      this.showRouteMsgInMap(this.mapdata);
    });
  },
  methods: {  
    // 初始化图层
    init() {
      this.drawAreaLayer();
      this.drawStartLayer();
      this.drawEndLayer();
      this.drawFromLayer();
      this.drawNavRouteLayer();
      this.addInteraction();
      this.mapOverlay();
    },
    // 根据路线数据在地图展示路线信息
    /*
        startPoint 开始点
        endPoint结束点
        mustPoints必经点
        routeArea范围
        planPoints路线集合,
        devDtos 设备数组，
        pipDtos 管道数组
    */
    showRouteMsgInMap(mapdata) {
      let {
        startPoint,
        endPoint,
        mustPoints,
        planPoints,
        routeArea,
        devDtos,
        pipDtos
      } = mapdata;
      let _this = this;

      // 绘制起点
      let startPoints = startPoint.split(',');
      let startFeature = this.drowFeatrue(startPoints);
      this.drawStartSoure.addFeature(startFeature);

      // 绘制终点
      let endPoints = endPoint.split(',');
      let endFeature = this.drowFeatrue(endPoints);
      this.drawEndSoure.addFeature(endFeature);

      // 绘制必经点
      if (!isStringEmpty(mustPoints)) {
        let mustPointsArr = mustPoints.split(';');
        for (let i = 0; i < mustPointsArr.length - 1; i++) {
          let element = mustPointsArr[i];
          var mustPointArr = element.split(',');
          var mustFeature = this.drowFeatrue(mustPointArr);
          this.drawFromSoure.addFeature(mustFeature);
        }
      }

      // 绘制路径
      if (!isStringEmpty(planPoints)) {
        let planPointsArr = planPoints.split(';');
        let pointsPlanArray = new Array();
        for (let i = 0; i < planPointsArr.length - 1; i++) {
          let point = planPointsArr[i].split(',');
          let px = parseFloat(point[0]);
          let py = parseFloat(point[1]);
          let pointarr = new Array();
          pointarr.push(px);
          pointarr.push(py);
          pointsPlanArray.push(pointarr);
        }
        let routeFeatyre = new window.ol.Feature({
          geometry: new window.ol.geom.LineString(pointsPlanArray)
        });
        this.drawNavRouteSource.addFeature(routeFeatyre);
      }

      // 绘制区域
      let xArray = new Array();
      let yArray = new Array();
      if (!isStringEmpty(routeArea)) {
        let routeAreaPointsArr = routeArea.split(';');
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
        this.map.getView().fit([xmin, ymin, xmax, ymax]);
      }

      // 绘制设备图层
      var loadLayersArray = new Array();
      for (let index = 0; index < devDtos.length; index++) {
        let element = devDtos[index];
        let layer = element.deviceName;
        if (!this.isLayerInArray(layer)) {
          if (loadLayersArray.indexOf(layer) < 0) {
            loadLayersArray.push(layer);
            this.addPointLayerByName(layer);
          }
        }
      }
      for (let index = 0; index < pipDtos.length; index++) {
        let element = pipDtos[index];
        let layer = element.deviceName;
        if (!this.isLayerInArray(layer)) {
          if (loadLayersArray.indexOf(layer) < 0) {
            loadLayersArray.push(layer);
            this.addLineLayerByName(layer, 'blue');
          }
        }
      }
      // 选中要素
      var interval = setInterval(function() {
        var selectArrays = _this.featureSelect.getFeatures().getArray();
        loadLayersArray = _this.checkSelectFeatures(selectArrays, loadLayersArray);
        if (loadLayersArray.length <= 0) {
          _this.selectAllFeatures(devDtos, pipDtos);
          _this.selectByAreaFunc();
          clearInterval(interval);
        }
        _this.selectAllFeatures(devDtos, pipDtos);
      }, 100);
    },

    // 画顶点
    drowFeatrue(point) {
      var featrure = new window.ol.Feature({
        geometry: new window.ol.geom.Point(point)
      });
      return featrure;
    },

    // 绘制开始区域图层
    drawStartLayer() {
      var drawStartStyle = new window.ol.style.Style({ // 区域样式
        image: new window.ol.style.Icon({
          size: [32, 48],
          anchor: [0.5, 0.6],
          src: start
        })
      });
      var drawStartSoure = new window.ol.source.Vector({});
      this.drawStartSoure = drawStartSoure;
      var drawStartLayer = new window.ol.layer.Vector({
        source: drawStartSoure,
        updateWhileInteracting: true,
        style: drawStartStyle
      });
      this.map.addLayer(drawStartLayer);
    },

    // 绘制结束区域图层
    drawEndLayer() {
      // 画终点图层参数
      var drawEndStyle = new window.ol.style.Style({ // 区域样式
        image: new window.ol.style.Icon({
          size: [32, 48],
          anchor: [0.5, 0.6],
          src: end
        })
      });
      var drawEndSoure = new window.ol.source.Vector({});
      this.drawEndSoure = drawEndSoure;
      var drawEndLayer = new window.ol.layer.Vector({ // 区域图层
        source: drawEndSoure,
        updateWhileInteracting: true,
        style: drawEndStyle
      });
      this.map.addLayer(drawEndLayer);
    },

    // 绘制必经区域路径图层
    drawFromLayer() {
      // 画必经点图层参数
      var drawFromStyle = new window.ol.style.Style({ // 区域样式
        image: new window.ol.style.Icon({
          size: [32, 48],
          anchor: [0.5, 0.6],
          src: location
        })
      });
      var drawFromSoure = new window.ol.source.Vector({}); // 区域数据源
      this.drawFromSoure = drawFromSoure;
      var drawFromLayer = new window.ol.layer.Vector({ // 区域图层
        source: drawFromSoure,
        updateWhileInteracting: true,
        style: drawFromStyle
      });
      this.map.addLayer(drawFromLayer);
    },

    // 模拟导航路线参数
    drawNavRouteLayer() {
      var _this = this;
      var drawNavRouteSource = new window.ol.source.Vector({}); // 区域数据源
      this.drawNavRouteSource = drawNavRouteSource;
      var drawNavRouteLayer = new window.ol.layer.Vector({ // 区域图层
        source: drawNavRouteSource,
        updateWhileInteracting: true,
        style: function(feature) {
          return _this.getNavRouteStyle(feature);
        }
      });
      this.map.addLayer(drawNavRouteLayer);
    },

    // 获取模拟导航路线样式
    getNavRouteStyle(feature) {
      var geometry = feature.getGeometry();
      var styles = [
        // linestring
        new window.ol.style.Style({
          stroke: new window.ol.style.Stroke({
            color: 'red',
            width: 2
          })
        })
      ];
      geometry.forEachSegment(function(start, end) {
        var dx = end[0] - start[0];
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        // arrows
        styles.push(
          new window.ol.style.Style({
            geometry: new window.ol.geom.Point(end),
            image: new window.ol.style.Icon({
              src: arrow,
              anchor: [0.75, 0.5],
              rotateWithView: true,
              rotation: -rotation
            })
          })
        );
      });
      return styles;
    },

    // 绘制区域图层
    drawAreaLayer() {
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
      this.map.addLayer(drawAreaLayer);
    },

    // 通过设备名字添加图层到地图
    addPointLayerByName(layername) {
      let _this = this;
      var layerList = this.map.getLayers().getArray();
      for (let i = 0; i < layerList.length; i++) {
        let url = layerList[i].values_.title;
        if (url) {
          if (url == layername) {
            return;
          }
        }
      }
      let url = this.geoserverUrl + this.geoserverUrlConstPoint + layername;
      let vectorSource = new window.ol.source.Vector({
        format: new window.ol.format.GeoJSON(),
        loader: function() {
          var ajax = new XMLHttpRequest();
          ajax.open('get', url);
          // ajax.open("GET", url, true, userName, passWord);
          ajax.withCredentials = true;
          ajax.setRequestHeader(
            'Authorization',
            _this.authenticateUser('admin', 'Sntsoft123')
          );
          ajax.send();
          ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
              vectorSource.addFeatures(
                vectorSource.getFormat().readFeatures(ajax.responseText));
            }
          };
        }
      });
      var layer = new window.ol.layer.Vector({
        source: vectorSource,
        title: layername,
        style: new window.ol.style.Style({
          image: new window.ol.style.Icon({
            size: [16, 16],
            src: _this.mapImg[layername]
          })
        })
      });
      this.map.addLayer(layer);
      return layer;
    },

    // 通过管道名字添加图层，并同时设置管道颜色
    addLineLayerByName(layername, color) {
      let _this = this;
      var layerList = this.map.getLayers().getArray();
      for (let i = 0; i < layerList.length; i++) {
        let url = layerList[i].values_.title;
        if (url) {
          if (url == layername) {
            return;
          }
        }
      }
      let url = this.geoserverUrl + this.geoserverUrlConstLine + layername;
      let vectorSource = new window.ol.source.Vector({
        format: new window.ol.format.GeoJSON(),
        loader: function() {
          var ajax = new XMLHttpRequest();
          ajax.open('get', url);
          // ajax.open("GET", url, true, userName, passWord);
          ajax.withCredentials = true;
          ajax.setRequestHeader(
            'Authorization',
            _this.authenticateUser('admin', 'Sntsoft123')
          );
          ajax.send();
          ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
              vectorSource.addFeatures(
                vectorSource.getFormat().readFeatures(ajax.responseText));
            }
          };
        }
      });
      var layer = new window.ol.layer.Vector({
        source: vectorSource,
        title: layername,
        style: new window.ol.style.Style({
          stroke: new window.ol.style.Stroke({
            color: color,
            width: 2
          })
        })
      });
      this.map.addLayer(layer);
      return layer;
    },

    addInteraction() {
      // 地图控件
      var featureSelect = new window.ol.interaction.Select({
        multi: true,
        hitTolerance: 2
      });
      this.featureSelect = featureSelect;
      this.map.addInteraction(this.featureSelect);
    },

    // 加密账号
    authenticateUser(user, password) {
      var token = user + ':' + password;
      var hash = Base64.encode(token);
      return 'Basic ' + hash;
    },

    // 判断当前layer是否在图层中
    isLayerInArray(layername) {
      var layerList = this.map.getLayers().getArray();
      for (let i = 0; i < layerList.length; i++) {
        var url = layerList[i].values_.source.url_;
        if (url && url.indexOf('name:' + layername) >= 0) {
          return true;
        }
      }
      return false;
    },

    // 判断选中的设备
    checkSelectFeatures(selectArrays, loadLayersArray) {
      for (var index = 0; index < selectArrays.length; index++) {
        var feature = selectArrays[index];
        if (feature.id_.indexOf('Point') >= 0) {
          let i = loadLayersArray.indexOf(feature.values_.PointName);
          if (i > -1) {
              loadLayersArray.splice(i, 1);
          }
        } else if (feature.id_.indexOf('Line') >= 0) {
          let i = loadLayersArray.indexOf(feature.values_.Material);
          if (i > -1) {
            loadLayersArray.splice(i, 1);
          }
        }
      }
      return loadLayersArray;
    },
    // 选中所有的路线中管道和设备的feature
    selectAllFeatures(devDtos, pipDtos) {
      let layerArray = this.getMapShowGisLayers();
      if (layerArray.length > 0) {
        this.featureSelect.getFeatures().clear();
        for (let i = 0; i < layerArray.length; i++) {
          let layerN = layerArray[i];
          let featuresSe = layerN.getSource().getFeatures();
          if (featuresSe.length > 0) {
            if (layerN.getSource().getFeatures()[0].values_.geometry.ol_lm.change[0].bindTo.id_.indexOf('Point') > 0) {
              for (let index = 0; index < featuresSe.length; index++) {
                let element = featuresSe[index];
                if (this.queryMapnoInSets(element.values_.PointNumbe, 'point', devDtos)) {
                  this.featureSelect.getFeatures().push(element);
                }
              }
            } else {
              for (let index = 0; index < featuresSe.length; index++) {
                let element = featuresSe[index];
                if (this.queryMapnoInSets(element.values_.LineNumber, 'line', pipDtos)) {
                  this.featureSelect.getFeatures().push(element);
                }
              }
            }
          }
        }
      }
    },

    // 生成设备列表
    selectByAreaFunc() {
      var selectedPointsArray = new Array();
      var selectedLinesArray = new Array();
      var selectArrays = this.featureSelect.getFeatures().getArray();
      if (selectArrays.length > 0) {
        for (let index = 0; index < selectArrays.length; index++) {
          let element = selectArrays[index];
          if (element.id_.indexOf('Point') >= 0) {
            selectedPointsArray.push(element);
          } else if (element.id_.indexOf('Line') >= 0) {
            selectedLinesArray.push(element);
          }
        }
        this.pathObj.selectedPointsArray = selectedPointsArray;
        this.pathObj.selectedLinesArray = selectedLinesArray;
        this.pointLineFunc();
      } else {
        // top.sweet("", "未选中任何管道或者设备，无法生成列表！", "info");
        // alert("未选中任何管道或者设备，无法生成列表！");
      }
    },

    //设备点及管线、设备及管道数据
    pointLineFunc() {
      // pathObj
      let point = this.pathObj.selectedPointsArray; //设备点数组
      let line = this.pathObj.selectedLinesArray; //管线数组
      let pointNum = point.length; //设备点个数
      let longSun = 0; //管线总长
      let pointArray = []; //列表点数组
      let lineArray = []; //列表线数组

      for (let i = 0; i < line.length; i++) {
        let long = line[i].values_.length * 100000;
        longSun += long;
        let x =
        (line[i].values_.geometry.flatCoordinates[0] +
        line[i].values_.geometry.flatCoordinates[2]) / 2;
        let y =
        (line[i].values_.geometry.flatCoordinates[1] +
        line[i].values_.geometry.flatCoordinates[3]) / 2;
        let obj = {
          deviceType: 1,
          //设备编号
          deviceCode: line[i].values_.LineNumber,
          //点名称
          deviceName: line[i].values_.Material,
          //点坐标
          devicePoint: x + ',' + y,
          //地址
          address: line[i].values_.Location
        };
        lineArray.push(obj);
      }

      for (let i = 0; i < point.length; i++) {
        let obj = {
          deviceType: 0,
          //设备编号
          deviceCode: point[i].values_.PointNumbe,
          //线名称
          deviceName: point[i].values_.PointName,
          //点坐标
          devicePoint:
          point[i].values_.geometry.flatCoordinates[0] +
          ',' +
          point[i].values_.geometry.flatCoordinates[1],
          //地址
          address: point[i].values_.Location
        };
        pointArray.push(obj);
      }
      console.log(pointNum, longSun);
      // document.querySelector('#pointNum').text(pointNum);
      // document.querySelector('#lineLong').text(longSun.toFixed(2));
      this.pathObj.pointArray = pointArray;
      this.pathObj.lineArray = lineArray;

      // this.equipmentPointFunc(pathObj.pointArray);
      // this.lineFunc(pathObj.lineArray);
    },

    // 获取地图中所有的GIS图层
    getMapShowGisLayers() {
      var layerList = this.map.getLayers().getArray();
      var layerArray = new Array();
      for (var i = 0; i < layerList.length; i++) {
        if (layerList[i].values_.title) {
          layerArray.push(layerList[i]);
        }
      }
      return layerArray;
    },

    // 查询设备编号是否在数据集中
    queryMapnoInSets(mapno, featureType, data) {
      if (featureType == 'point') {
        for (let index = 0; index < data.length; index++) {
          let element = data[index];
          let layer = element.deviceCode;
          if (layer == mapno) {
            return true;
          }
        }
      } else {
        for (let index = 0; index < data.length; index++) {
          let element = data[index];
          let layer = element.deviceCode;
          if (layer == mapno) {
            return true;
          }
        }
      }
      return false;
    },

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
      this.overlay.setPosition(undefined);
      this.$refs.closer.blur();
      return false;
    },
    /*
      以下另个方法参数描述
      @param {String} str 传入设备信息  '设备编号, 设备名称'  'JL15324, 球墨铸铁'
    */
    // 展示点
    ShowPointFunc(str) {
      var strArr = str.split(';');
      this.getFeatureByMapNo(strArr[0], strArr[1], 'point');
    },

    // 展示线
    ShowLineFunc(str) {
      var strArr = str.split(';');
      this.getFeatureByMapNo(strArr[0], strArr[1], 'line');
    },

    /**
     * 通过设备号  管网材质类别   管线或者管点    查询要素,featureType为point则为点
     * @param {String} mapNo  设备编号
     * @param {String} material  设备图层
     * @param {String} featureType  是点还是线，是点就传point
     * @param {String} state  设备状态
     */
    getFeatureByMapNo(mapNo, material, featureType, state) {
      console.log(state);
      // 首先判断地图中是否有该图层
      let layerNow,
        _this = this;
      let layerList = _this.map.getLayers().getArray();
      for (let i = 0; i < layerList.length; i++) {
        let url = layerList[i].values_.title;
        if (url == material) {
          layerNow = layerList[i];
          break;
        }
      }
      if (layerNow) {
        let featuresArray = layerNow.getSource().getFeatures();
        for (let i = 0; i < featuresArray.length; i++) {
          if (featureType == 'point') {
            if (featuresArray[i].values_.PointNumbe == mapNo) {
              let coordinate = featuresArray[i].values_.geometry.flatCoordinates;
              _this.featureType = 'point';
              _this.currentFeature = featuresArray[i];
              _this.$nextTick(() => {
                _this.overlay.setPosition(coordinate);
              });
            }
          } else {
            if (featuresArray[i].values_.LineNumber == mapNo) {
              let coordinate = featuresArray[i].values_.geometry.flatCoordinates;
              _this.featureType = 'line';
              _this.currentFeature = featuresArray[i];
              var coordinatel = new Array();
              coordinatel.push((coordinate[0] + coordinate[2]) / 2);
              coordinatel.push((coordinate[1] + coordinate[3]) / 2);
              _this.$nextTick(() => {
                _this.overlay.setPosition(coordinatel);
              });
            }
          }
        }
      } else {
        // 没有该图层则添加该图层
        // if (featureType == "point") {
        //     layerNow = addPointLayerByName(material);
        // } else {
        //     layerNow = addLineLayerByName(material, "blue");
        // }
        // alert("系统已自动添加" + material + "图层," + "请再次点击查看!")
      }
    }
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
</style>

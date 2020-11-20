// 根据开发环境或者生产环境判断使用的地址  地址不定
// const baseURL = 'http://192.168.9.44:9090/'

let host = 'http://221.226.213.42:9090/';
// let host = 'http://192.168.10.214:8091/';

if (window.top.apiUrl) {
  // console.log('拿到窗口地址了');
  host = window.top.apiUrl;
}
const baseURL = process.env.NODE_ENV === 'development' ? '/api' : host;
// console.log(baseURL);

// const baseURLS = process.env.NODE_ENV == 'development' ? baseURL : baseURL;
// console.log(baseURLS);
const api = baseURL + '/api/services/Inspection/';

// 下载文件
const downloadApi = baseURL;

// 正式的时候用这个
const gsApi = baseURL + '/api/services/SNTGIS/';

// 测试用这个，因为测试环境里没有这个接口
// const gsApi = 'http://221.226.213.42:9090/api/services/SNTGIS/';
// const gsApi = 'http://192.168.9.44:9090/api/services/SNTGIS/';
// 获取人员（云平台）
const personApi = baseURL + '/api/services/app/';
// 管网管线获取地址
// const mapwms = 'http://118.122.84.146:8595/geoserver/OpenGIS/wms';
const mapwms = 'http://221.226.213.42:8595/geoserver/OpenGIS/wms';
// const mapwms = 'https://www.rsxgps.com:9091/geoserver/OpenGIS/wms';
const workSpace = 'http://www.OpenGIS.com/OpenGIS';

// 地图中心点坐标
// const mapCenter = [119.05, 31.57];
const mapCenter = [119.0319, 31.6655];
const mapMaxZoom = 22;

// 地图服务器地址
const geoserverUrl = 'https://www.rsxgps.com:9091';
// 获取具体区域内的管点 管线设备
// const geoserverUrlConstPoint = '/geoserver/OpenGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OpenGIS%3AGetPointByName_Ins&outputFormat=application%2Fjson&viewparams=name:';
// const geoserverUrlConstLine = '/geoserver/OpenGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=OpenGIS%3AGetLineByName_Ins&outputFormat=application%2Fjson&viewparams=name:';
export {
  api,
  mapwms,
  workSpace,
  gsApi,
  personApi,
  host,
  // geoserverUrlConstPoint,
  // geoserverUrlConstLine,
  geoserverUrl,
  downloadApi,
  mapCenter,
  mapMaxZoom,
  baseURL
};

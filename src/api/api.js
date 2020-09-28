const api = {
  LoadForTree: 'services/VideoSurveillance/Group/LoadForTree', //树形菜单
  Preview: 'services/VideoSurveillance/Camera/Preview',//运行摄像头
  GroupList: '/services/VideoSurveillance/Group/GroupList',//设备分组列表
  DetailsTree: '/services/VideoSurveillance/Group/DetailsTree', //设备分组列表(新)
  Insert: '/services/VideoSurveillance/Group/Insert',//添加设备组
  Update: '/services/VideoSurveillance/Group/Update',//编辑设备分组
  Delete: '/services/VideoSurveillance/Group/Delete',//删除设备分组
  DeleteGroups: '/services/VideoSurveillance/Group/DeleteGroups',//批量删除
  GetRoleTree:'/services/app/Role/GetRoleTree', //获取角色树
  JoinRoles: '/services/VideoSurveillance/Group/JoinRoles',//关联角色
  Get: '/services/VideoSurveillance/Group/Get',//获取明细
  DInsert: '/services/VideoSurveillance/Device/Insert',//新增设备
  DUpdate: '/services/VideoSurveillance/Device/Update', //编辑设备
  ProtocolList: '/services/VideoSurveillance/Protocol/ProtocolList',//获取协议列表
  dDelete: '/services/VideoSurveillance/Device/Delete', //删除设备
  DGet: '/services/VideoSurveillance/Device/Get',//设备明细(未使用)
  CameraList: '/services/VideoSurveillance/Camera/CameraList',//摄像头列表
  CameraTypeList: '/services/VideoSurveillance/CameraType/CameraTypeList',//摄像头分类列表
  CUpdate: '/services/VideoSurveillance/Camera/Update',//修改摄像头
  Enable: '/services/VideoSurveillance/Camera/Enable',//启用/禁用摄像头
  CarouselList: '/services/VideoSurveillance/Carousel/CarouselList',//轮播组列表
  CLoadForTree: '/services/VideoSurveillance/Carousel/LoadForTree',//分组轮播tree
  InsertAndJoin: '/services/VideoSurveillance/Carousel/InsertAndJoin',//添加轮播组(未使用)
  AllTree: '/services/VideoSurveillance/Device/AllTree',//树形-设备
};

export {api};

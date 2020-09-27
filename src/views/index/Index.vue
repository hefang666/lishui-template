<template>
  <div>
    <div class="flex-container">
      <div class="flex-item">
        <div class="title">考勤管理</div>
        <div class="item-box">
          <div class="item-col">
            <div class="col-icon" @click="getToCheckManage">
              <!-- <i class="el-icon-edit-outline"></i> -->
              <img src="../../assets/icon-attendance-record.png" width="116px">
            </div>
            <div class="sub-title">考勤记录</div>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToRecordImport">
              <img src="../../assets/icon-import.png" width="116px">
            </div>
            <div class="sub-title">记录导入</div>
          </div>
        </div>
      </div>
      <div class="flex-item">
        <div class="title">访客管理</div>
        <div class="item-box">
          <div class="item-col">
            <div class="col-icon" @click="getToVisitorRegister">
              <img src="../../assets/icon-visitor-regist.png" width="116px">
            </div>
            <div class="sub-title">访客登记</div>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToVisitorManage">
              <img src="../../assets/icon-visitor-manage.png" width="116px">
            </div>
            <div class="sub-title">访客管理</div>
          </div>
          <!-- <div class="item-col">
            <div class="col-icon" @click="getToVisitorPointManage">
              <i class="el-icon-s-management"></i>
            </div>
            <h3>访客点管理</h3>
          </div> -->
        </div>
      </div>
      <div class="flex-item">
        <div class="title">车辆管理</div>
        <div class="item-box">
          <div class="item-col">
            <div class="col-icon" @click="getToCarRegister">
              <img src="../../assets/icon-car-regist.png" width="116px">
            </div>
            <div class="sub-title">车辆登记</div>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToCarManage">
              <img src="../../assets/icon-car-manage.png" width="116px">
            </div>
            <div class="sub-title">车辆管理</div>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToCarGps">
              <img src="../../assets/icon-gps.png" width="116px">
            </div>
            <div class="sub-title">车辆定位</div>
          </div>
        </div>
      </div>
      <div class="flex-item">
        <div class="title">巡更记录管理</div>
        <div class="item-box">
          <div class="item-col">
            <div class="col-icon" @click="getToPatrolRecordManage">
              <img src="../../assets/icon-patrol-record.png" width="116px">
            </div>
            <div class="sub-title">巡更记录管理</div>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToPatrolRecordImport">
              <img src="../../assets/icon-import.png" width="116px">
            </div>
            <div class="sub-title">巡更记录导入</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 考勤管理
    getToCheckManage() {
      this.$router.push({ path: "/staffaccess/AccessRecords" });
    },
    getToRecordImport() {
      this.$router.push({ path: "/staffaccess/RecordImport" });
    },
    // 访客管理
    getToVisitorRegister() {
      this.$router.push({ path: "/visitor/VisitorRegister" });
    },
    getToVisitorManage() {
      this.$router.push({ path: "/visitor/VisitorManage" });
    },
    // getToVisitorPointManage() {
    //   this.$router.push({ path: "../visitor/VisitorPointManage" });
    // },
    // 车辆管理
    getToCarRegister() {
      this.$router.push({ path: "/car/CarRegister" });
    },
    getToCarManage() {
      this.$router.push({ path: "/car/CarManage" });
    },
    getToCarGps() {
      this.$router.push({ path: "/car/CarGps" });
    },
    // 巡更记录管理
    getToPatrolRecordManage() {
      this.$router.push({ path: "/patrolrecord/PatrolRecordManage" });
    },
    getToPatrolRecordImport() {
      this.$router.push({ path: "/patrolrecord/TourRecordImport" });
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.flex-container .flex-item {
  width: 750px;
  height: 240px;
  margin: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 2px 2px#ccc;
}
.flex-item .title{
  font-size: 24px;
  text-align: center;
  margin: 15px;
}
.flex-item .sub-title {
  font-size: 18px;
  text-align: center;
}
.item-box {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.item-col {
  width: 50%;
  text-align: center;
}
// .item-col {
//   border-right: 1px solid #ccc;
// }
.item-col:last-child {
  border: none;
}
.col-icon{
  border-right: 1px solid #ddd;
}
.col-icon:last-child{
  border: none;
}
.col-icon img {
  cursor: pointer;
}
</style>

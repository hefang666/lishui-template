<template>
  <div>
    <div class="flex-container">
      <div class="flex-item">
        <h2>考勤管理</h2>
        <div class="item-box">
          <div class="item-col">
            <div class="col-icon" @click="getToCheckManage">
              <i class="el-icon-edit-outline"></i>
            </div>
            <h3>考勤管理</h3>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToRecordImport">
              <i class="el-icon-download"></i>
            </div>
            <h3>考勤记录导入</h3>
          </div>
        </div>
      </div>
      <div class="flex-item">
        <h2>访客管理</h2>
        <div class="item-box">
          <div class="item-col">
            <div class="col-icon" @click="getToVisitorRegister">
              <i class="el-icon-edit-outline"></i>
            </div>
            <h3>访客登记</h3>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToVisitorManage">
              <i class="el-icon-s-management"></i>
            </div>
            <h3>访客管理</h3>
          </div>
        </div>
      </div>
      <div class="flex-item">
        <h2>车辆管理</h2>
        <div class="item-box">
          <div class="item-col">
            <div class="col-icon" @click="getToCarRegister">
              <i class="el-icon-edit-outline"></i>
            </div>
            <h3>车辆登记</h3>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToCarManage">
              <i class="el-icon-folder-add"></i>
            </div>
            <h3>车辆管理</h3>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToCarGps">
              <i class="el-icon-location-outline"></i>
            </div>
            <h3>车辆定位</h3>
          </div>
        </div>
      </div>
      <div class="flex-item">
        <h2>巡更记录管理</h2>
        <div class="item-box">
          <div class="item-col">
            <div class="col-icon" @click="getToPatrolRecordManage">
              <i class="el-icon-s-management"></i>
            </div>
            <h3>巡更记录管理</h3>
          </div>
          <div class="item-col">
            <div class="col-icon" @click="getToPatrolRecordImport">
              <i class="el-icon-download"></i>
            </div>
            <h3>巡更记录导入</h3>
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
.flex-item h2 {
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
.item-col {
  border-right: 1px solid #ccc;
}
.item-col:last-child {
  border: none;
}
.col-icon i {
  font-size: 58px;
}
</style>

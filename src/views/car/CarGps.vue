<template>
  <div class="container">
    <div class="snt-list-left-col">
      <div class="search-box">
        <el-input placeholder="请输入车牌号/车主" v-model="form" prefix-icon="el-icon-search"></el-input>
        <div class="total-box">
          <div class="car-total">车辆总数：100</div>
          <div class="online-otal">在线：10</div>
        </div>
        <!-- <c-tree></c-tree> -->
        <div class="list-box">
          <div class="snt-left-list">
            <div 
              :class="{active: currentIndex === index}" 
              v-for="(item, index) in listData" 
              :key="index" 
              @click="changeList(index)">
              <span>{{item.pointName}}</span>
              <div 
                class="car-list" 
                v-for="(item, index) in carListData" 
                :key="index">
                <span><i class="el-icon-truck" style="font-size:32px;margin-right:10px;"></i>{{item.number}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="snt-table-right-col">
      <Map ref="map" />
    </div>
  </div>
</template>

<script>
// import cTree from "@/components/tree/cTree";
import Map from './map/Map';

import { GetPointPower } from '@/api/visitor';
import { GetByOrgId } from '@/api/car'

export default {
  components: { Map},
  data() {
    return {
      form: '',
      // 访客登记点列表
      listData: [],
      currentIndex: 0,
      // 车辆列表
      carListData:[]
     
    };
  },
  mounted() {
    this.getLeftList(),
    this.getLeftCarList()
  },
  
  methods: {
    // 获取访客登记点列表
    getLeftList(){
      let _this = this
      GetPointPower().then(res => {
        console.log(res)
        if(res.success){
          _this.listData = res.result
        }
      })
    },
    changeList(index) {
      this.currentIndex = index;
    },
    // 获取车辆列表
    getLeftCarList() {
      let param = {
        orgId: this.orgId,
        carType: this.carType
      }
      GetByOrgId(param).then(res => {
        console.log(res)
        if(res.success){
          this.carListData = res.result
        }
      })
    }
  }
};
</script>
<style lang="scss">
@import '~@/styles/element-ui-new.scss';
</style>
<style lang="scss" scoped>
  .container{
  width:100%;
  display: flex;
  overflow: hidden;
  .search-box{
    margin: 10px;
  }
  .total-box{
    margin: 5px;
    display: flex;
    justify-content:space-around
  }
}
.snt-list-left-col {
  position: absolute;
  width: 190px;
  min-height:calc(100vh - 24px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
  .list-box div{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    &.active {
      background: #4b77be;
      color: #fff;
    }
    .car-list{
      border:none;
      color: #4b77be;
    }
  }
}
.snt-table-right-col {
  margin-left: 190px;
  overflow: hidden;
  flex: 1;
  min-height: calc(100vh - 24px);
}
</style>

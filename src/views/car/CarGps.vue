<template>
  <div class="container">
    
    <div class="m-tree-left-col">
      <div class="search-box">
        <el-input placeholder="请输入车牌号/车主" v-model="form" prefix-icon="el-icon-search"></el-input>
        <!-- <el-button class="search-button" type="primary">查询</el-button> -->
        <div class="total-box">
          <div class="car-total">车辆总数：100</div>
          <div class="online-otal">在线：10</div>
        </div>
        
      </div>
      <c-tree></c-tree>
    </div>
    <div class="m-grid-right-col"><Map ref="map" /></div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Map from './map/Map';

export default {
  components: { Map, cTree },
  data() {
    return {
      form: '',
     
    };
  },
  computed: {
    
  },
  
  methods: {
    
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
.m-tree-left-col {
  position: absolute;
  width: 190px;
  min-height:calc(100vh - 24px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
}
.m-grid-right-col {
  margin-left: 190px;
  overflow: hidden;
  flex: 1;
}
</style>

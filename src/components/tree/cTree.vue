<template>
  <div class="c-tree">
    <div class="title">访客点列表</div>
    <div class="list-box">
      <div 
        :class="{active: currentIndex === index}" 
        v-for="(item, index) in listData" 
        :key="index" 
        @click="changeList(index)">
        <span>{{item.pointName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { GetPointPower } from '@/api/visitor';
export default {
  data() {
    return {
      // 左侧列表
      listData: [],
      currentIndex: 0
     
    }
  },
  mounted() {
    this.getLeftList()
  },
  methods: {
    // 获取访客登记点列表
    getLeftList(){
      let _this = this
      GetPointPower().then(res => {
        console.log(res)
        if(res.success){
          _this.listData = res.result
          // _this.page.totalCount =  res.result.totalCount
          _this.loading = false
        }
      })
    },
    changeList(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style lang="scss">
  .title{
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #4b77be;
    margin-top: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
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
  }
</style>


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
      listData: [
        // {
        //   id: 1,
        //   name: '李四',
          
        // },
        // {
        //   id: 2,
        //   name: '张三',
          
        // }
      ],
      currentIndex: 0
     
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取访客登记点列表
    getList(){
      let _this = this
      GetPointPower().then(res => {
        console.log(res)
        if(res.success){
          setTimeout(() => {
          _this.listData = res.result
          // _this.page.totalCount =  res.result.totalCount
          _this.loading = false
        }, 300)
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
    font-size: 12px;
    color: #4b77be;
    margin-top: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .list-box div{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
    &.active {
      background: #4b77be;
      color: #fff;
    }
  }
</style>


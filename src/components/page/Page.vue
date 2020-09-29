<template>
  <div class="page_box">
    <component
      v-for="(item, index) in assembly"
      :key="index"
      :is="item"
      :page-data="pageData"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPageNum"
      :input-page="inputPage"
      :pages-num="pagesNum"
      :start-recording="startRecording"
      :end-recoeding="endRecoeding"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
    </component>
  </div>
</template>

<script>
import sizes from './PageSize.vue';
import pager from './Pagination.vue';
import jump from './PageJump.vue';
import detail from './PageDetail.vue';
import total from './PageTotal.vue';
export default {
  name: 'Page',
  components: {
    sizes,
    pager,
    jump,
    detail,
    total
  },
  props: {
    pageData: {
      type: Array,
      default: () => {
        return [30, 40, 50, 100];
      }
    },
    layout: {
      type: String,
      default: 'sizes,pager,jump,detail,total'
    },
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 每页数据条数
      pageSize: this.pageLength || this.pageData[0],
      // 当前页码
      currentPageNum: this.currentPage,
      // input输入的页码
      inputPage: 1,
      // 处理后的组件名称
      assembly: [],
      // 共有多少页
      // pagesNum: 1,
      // 从第几条开始显示
      startRecording: 1,
      // 显示到第几条
      endRecoeding: 30
    };
  },
  computed: {
    pagesNum() {
      return Math.ceil(this.$props.total / this.pageSize);
    }
  },
  methods: {
    // 获取每页多少条数据
    handleSizeChange(data) {
      this.pageSize = data;
      // this.getPagesNum();
      this.getShowRecoeding();
      this.$emit('changePageSize', data);
    },
    // 获取当前选择了第几页
    handleCurrentChange(data) {
      this.currentPageNum = data;
      this.getShowRecoeding();

      this.$emit('changeCurrentPage', data);
    },
    // 计算共有多少页
    // getPagesNum() {
    //   this.pagesNum = Math.ceil(this.$props.total / this.pageSize);
    // },
    // 计算当前显示的是多少条到多少条
    getShowRecoeding() {
      if(this.total == 0) {
        this.startRecording = 0;
        this.endRecoeding = 0;
      } else {
        if (this.currentPageNum == this.pagesNum) {
          this.startRecording = (this.currentPageNum - 1) * this.pageSize + 1;
          this.endRecoeding = this.$props.total;
        } else {
          this.startRecording = (this.currentPageNum - 1) * this.pageSize + 1;
          this.endRecoeding = this.currentPageNum * this.pageSize;
        }
      }
    }
  },
  mounted() {
    // 处理组件名称（讲传过来的字符串转化成数组）
    this.assembly = this.$props.layout.split(',');
    // this.getPagesNum();
    this.getShowRecoeding();
  }
};
</script>

<style scoped lang="scss">
.page_box {
  display: flex;

  .page-right {
    font-size: 14px;
  }
}
</style>

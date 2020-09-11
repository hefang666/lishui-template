<template>
  <tables
    :daylist="daylist"
    :loading="loading"
    types="2"
    :MaxResultCount="MaxResultCount"
    :total="total"
  ></tables>
</template>
<script>
import tables from './table';
export default {
  components: {
    tables
  },
  data() {
    return {
      daylist: [],
      // 当前页码
      PageIndex: 1,
      // 每页记录数
      MaxResultCount: 20,
      // 是否加载动画
      loading: true,
      // 总页数
      total: 0
    };
  },
  mounted() {
    this.InitializeDaily(this.PageIndex, this.MaxResultCount);
  },
  methods: {
    InitializeDaily(PageIndex, MaxResultCount, Filter, EndTime) {
      let data = {
        ReportType: 2,
        Filter,
        EndTime,
        PageIndex,
        MaxResultCount
      };
      this.$HTTPGET(this.api.GetDailyReportList, data).then(res => {
        if (res.success) {
          setTimeout(() => {
            this.loading = false;
          }, 500);
          // res.result.items.map(item => {
          //   item.reportDate = item.reportDate.replace('T', ' ');
          // });
          this.total = res.result.totalCount;
          this.daylist = res.result.items;
        } else {
          this.$message.error('加载失败');
        }
      });
    }
  }
};
</script>
<style scoped></style>

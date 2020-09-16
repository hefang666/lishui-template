<template>
  <div class="maintenanceGroup-box">
    <div class="header-box">
      <el-button-group>
        <el-button type="primary" plain>导出</el-button>
        <el-button type="primary" plain v-print="printObj">打印</el-button>
      </el-button-group>
    </div>
    <div class="maintenanceGroup-table-box" id="maintenanceGroupTable">
      <div class="table-title">溧水县自来水公司XXX年XXX月维护组报表</div>
      <div class="department-box">
        <span>部门：</span>
        <span>生产科</span>
      </div>
      <div class="table-content-box">
        <table class="maintenanceGroup" cellspacing="0" cellpadding="0">
          <tr class="header-tr">
            <td class="header-title">
              <div class="title-box">
                <div class="title-name">名称</div>
                <div class="title-num">数量</div>
                <div class="title-caliber">口径</div>
                <div class="first-border"></div>
                <div class="second-border"></div>
              </div>
            </td>
            <td>DN15</td>
            <td>DN20</td>
            <td>DN25</td>
            <td>DN32</td>
            <td>DN40</td>
            <td>DN50</td>
            <td>DN63</td>
            <td>DN90</td>
            <td>DN100</td>
            <td>DN150</td>
            <td>DN200</td>
            <td>DN300</td>
            <td>DN400</td>
            <td>DN500+</td>
            <td>消防井</td>
            <td>合计</td>
            <td>累计</td>
          </tr>
          <tr class="item-tr">
            <td>查漏（处）</td>
            <td v-for="(item, index) in 17" :key="index"></td>
          </tr>
          <tr class="item-tr">
            <td>查漏延伸服务（处）</td>
            <td v-for="(item, index) in 17" :key="index"></td>
          </tr>
          <tr class="item-tr item-other">
            <td>查漏处地点（处）</td>
            <td colspan="17">
              <div class="list-box">
                <table class="water-box" cellspacing="0" cellpadding="0">
                  <tr class="water-item" v-for="(item, index) in 5" :key="index">
                    <td>测试数据测试数据测试数据</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr class="bottom-tr">
            <td colspan="4">
              <span>负责人：</span>
              <span>张三</span>
            </td>
            <td colspan="5">
              <span>制表人：</span>
              <span>张三</span>
            </td>
            <td colspan="9">
              <span>制表日期：</span>
              <span>2019-04-05 12:00:00</span>
            </td>
          </tr>
        </table>
        <!-- <table class="bottom-box" cellspacing="0" cellpadding="0">
          
        </table> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenanceGroup',
  data() {
    return {
      printObj: {
        id: 'maintenanceGroupTable',
        extraCss: '@/styles/table.scss',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      }
    }
  },
  methods: {
    print() {
      console.log('点击了打印按钮');
      this.$print(this.$refs.table);
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/table.scss';

.maintenanceGroup-box {
  .header-box {
    text-align: right;
  }
}
</style>

<template>
  <div class="maintenanceTeam-box">
    <div class="header-box">
      <el-button-group>
        <el-button type="primary" plain>导出</el-button>
        <el-button type="primary" plain>打印</el-button>
      </el-button-group>
    </div>
    <div class="table-box">
      <div class="table-title">溧水县自来水公司XXX年XXX月维修组报表</div>
      <div class="department-box">
        <span>部门：</span>
        <span>生产科</span>
      </div>
      <div class="table-content-box">
        <table class="maintenanceTeam" cellspacing="0" cellpadding="0">
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
          <tr>
            <td>维修（米）</td>
            <td v-for="(item, index) in 17" :key="index"></td>
          </tr>
          <tr>
            <td>改管（米）</td>
            <td v-for="(item, index) in 17" :key="index"></td>
          </tr>
          <tr>
            <td>阀门（只）</td>
            <td v-for="(item, index) in 17" :key="index"></td>
          </tr>
          <tr>
            <td>消防栓（只）</td>
            <td v-for="(item, index) in 17" :key="index"></td>
          </tr>
          <tr>
            <td>维修管道处</td>
            <td v-for="(item, index) in 17" :key="index"></td>
          </tr>
          <tr>
            <td>维修延伸服务处</td>
            <td v-for="(item, index) in 17" :key="index"></td>
          </tr>
          <tr>
            <td>贫水区改造（户）地点</td>
            <td colspan="17">
              <div class="list-box">
                <table class="water-box" cellspacing="0" cellpadding="0">
                  <tr v-for="(item, index) in 5" :key="index">
                    <td>测试数据测试数据测试数据</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
        <table class="bottom-box" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <span>负责人：</span>
              <span>张三</span>
            </td>
            <td>
              <span>制表人：</span>
              <span>张三</span>
            </td>
            <td>
              <span>制表日期：</span>
              <span>2019-04-05 12:00:00</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenanceTeam',
  data() {
    return {};
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/table.scss';

.maintenanceTeam-box {
  .header-box {
    text-align: right;
  }

  .table-box {
    .table-title {
      text-align: center;
      font-size: 16px;
      margin: 15px 0;
    }

    .department-box {
      line-height: 30px;
    }
  }
}
</style>

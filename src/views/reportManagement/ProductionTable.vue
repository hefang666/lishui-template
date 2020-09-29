<template>
  <div class="productionTable-box">
    <div class="header-box">
      <el-button-group>
        <el-button type="primary" plain>导出</el-button>
        <el-button type="primary" plain>打印</el-button>
      </el-button-group>
    </div>
    <div class="table-box">
      <div class="table-title">溧水县自来水公司XXX年XXX月生产科公室报表</div>
      <div class="department-box">
        <span>部门：</span>
        <span>生产科</span>
      </div>
      <div class="table-content-box">
        <table class="table-header" cellspacing="0" cellpadding="0">
          <tr>
            <td style="width: 25%;">单位</td>
            <td style="width: 20%;">日期</td>
            <td style="width: 15%;">影响管径（DN）</td>
            <td style="width: 30%;">地点</td>
            <td style="width: 10%;">金额</td>
          </tr>
        </table>
        <table class="productiontable" cellspacing="0" cellpadding="0">
          <tr
            v-for="(item, index) in 20"
            :key="index"
            :class="{'has-bg': index % 2 == 0}"
          >
            <td style="width: 25%;">重庆市xxxxx有限公司</td>
            <td style="width: 20%;">2020-09-09</td>
            <td style="width: 15%;">25</td>
            <td style="width: 30%;">重庆市渝中区上清寺环球广场</td>
            <td style="width: 10%;">34</td>
          </tr>
          <tr>
            <td colspan="4">合计</td>
            <td>115</td>
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
  name: 'Productiontable'
};
</script>

<style scoped lang="scss">
@import '@/styles/table.scss';
.productionTable-box {
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

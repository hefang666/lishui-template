<template>
  <div class="inspectorTable-box">
    <div class="header-box">
      <el-button-group>
        <el-button type="primary" plain>导出</el-button>
        <el-button type="primary" plain>打印</el-button>
      </el-button-group>
    </div>
    <div class="table-box">
      <div class="table-title">溧水县自来水公司XXX年XXX月稽察办公室报表</div>
      <div class="department-box">
        <span>部门：</span>
        <span>稽察办</span>
      </div>
      <div class="table-content-box">
        <table class="inspectortable" cellspacing="0" cellpadding="0">
          <tr class="first-tr">
            <td class="first-tr-item">
              <div class="first-tr-item-left">
                <div class="left">工作安排</div>
                <div class="right">
                  <div>工作安排详细内容</div>
                </div>
              </div>
            </td>
            <td class="first-tr-item">
              <div class="first-tr-item-right">
                <table class="event-table" cellspacing="0" cellpadding="0">
                  <tr class="table-header">
                    <td>名称</td>
                    <td>本月累计</td>
                    <td>上月累计</td>
                    <td>合计</td>
                  </tr>
                  <tr class="has-bg">
                    <td>查处违章</td>
                    <td>14</td>
                    <td>15</td>
                    <td>29</td>
                  </tr>
                  <tr>
                    <td>已处理违章</td>
                    <td>12</td>
                    <td>11</td>
                    <td>23</td>
                  </tr>
                  <tr class="has-bg">
                    <td>处理中违章</td>
                    <td>11</td>
                    <td>12</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>催收费用总计</td>
                    <td>0</td>
                    <td>45</td>
                    <td>45</td>
                  </tr>
                  <tr class="has-bg">
                    <td>工程款</td>
                    <td>45</td>
                    <td>0</td>
                    <td>45</td>
                  </tr>
                  <tr>
                    <td>水费</td>
                    <td>45</td>
                    <td>45</td>
                    <td>90</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
        <table class="second-table" cellspacing="0" cellpadding="0">
          <tr>
            <td class="tr-title">维修明细</td>
            <td>
              <div class="table-box">
                <table class="event-table" cellspacing="0" cellpadding="0">
                  <tr class="table-header">
                    <td>日期</td>
                    <td>地点</td>
                    <td>违章单位</td>
                    <td>管径</td>
                    <td>原因</td>
                    <td>备注/金额/状态</td>
                  </tr>
                </table>
                <table class="table-body" cellspacing="0" cellpadding="0">
                  <tr
                    v-for="(item, index) in 20"
                    :key="index"
                    :class="{'has-bg': index%2 == 0}">
                    <td>5.3</td>
                    <td>观音桥</td>
                    <td>xxxxx公司</td>
                    <td>29</td>
                    <td>道路施工</td>
                    <td>34</td>
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
  name: 'Inspectortable'
}
</script>

<style scoped lang="scss">
@import '@/styles/table.scss';
.inspectorTable-box {
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
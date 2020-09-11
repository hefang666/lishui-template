<template>
  <div class="daymange">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          v-model="search"
          size="mini"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        ></el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button class="query" type="primary" size="mini" @click="handless"
          >查询</el-button
        >
      </el-col>
      <el-col :span="10" class="dayCol">
        <el-button plain size="mini" @click="handledaildele">删除</el-button>
        <el-button class="info" plain size="mini" @click="handleinfo(1)"
          >详情</el-button
        >
        <el-button type="primary" size="mini" @click="handlerefresh"
          >刷新</el-button
        >
      </el-col>
    </el-row>

    <el-table
      :data="daylist"
      v-loading="loading"
      height="450"
      size="mini"
      border
      ref="daymultipleTable"
      :header-cell-style="{background: '#4b77be', color: 'white'}"
      :default-sort="{prop: 'reportDateText'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column
        prop="name"
        label="标题"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="reportDateText"
        label="上报时间"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="reportType"
        label="上报类型"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleinfo(2, scope.row.id)"
            size="mini"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 60, 80]"
      :page-size="MaxResultCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 报告详情弹框 -->
    <el-dialog title="报告详情" :visible.sync="dailydialogVisible" width="60%">
      <div id="printTest" class="printTest">
        <div v-if="types == 1 && infolist" class="box1">
          <h2 style="text-align:center">{{ reportData.title }}</h2>
          <table
            cellspacing="0"
            cellpadding="0"
            style="border-collapse:collapse;"
          >
            <thead>
              <tr>
                <td
                  :colspan="dayrowspan"
                  style="text-align:left;padding-left:10px"
                >
                  时间:{{ reportData.sampleData }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in infolist" :key="index">
                <template v-for="(items, indexs) in item">
                  <td
                    :rowspan="items && items.rowSpan > 1 ? items.rowSpan : 1"
                    v-if="items"
                    :key="indexs"
                  >
                    {{ items._Value }}
                  </td>
                  <!-- <td v-else :key="indexs">{{items==null?'-':items._Value}}</td> -->
                </template>
                <!-- <template >
                  <td v-for="(items,indexs) in item" :key="indexs">{{items==null?'-':items._Value}}</td>
                </template>-->
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="types == 2 && motnth_Rows">
          <div class="box1">
            <h2 style="text-align:center">
              {{ motnth_ReportData.title }}
            </h2>
            <p style="width:52%;text-align:center">
              {{ motnth_ReportData.result }}
            </p>
            <table
              cellspacing="0"
              cellpadding="0"
              style="border-collapse:collapse;"
            >
              <tbody>
                <tr>
                  <td id="lineTd" class="first">
                    <div></div>
                    <span style="float:left;margin-top:20px;">项检项目</span>
                    <span style="float:right;">检测记录</span>
                  </td>
                  <template v-for="(item, index) in motnth_Rows[0]">
                    <td
                      style="text-align:center;vertical-align:middle;"
                      v-if="index != '检测项目'"
                      :key="index"
                    >
                      {{ item._Value }}
                    </td>
                  </template>
                </tr>
                <tr v-for="(item, index) in motnth_Rows.slice(1)" :key="index">
                  <td
                    style="text-align:center;vertical-align:middle;"
                    v-for="(items, indexs) in item"
                    :key="indexs"
                  >
                    {{ items._Value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="box2">
            <h2 style="text-align:center">
              {{ percentOfPass_ReportData.title }}
            </h2>
            <table
              cellspacing="0"
              cellpadding="0"
              style="border-collapse:collapse;"
            >
              <tbody>
                <tr>
                  <td id="lineTd" class="first">
                    <div class="fbox2"></div>
                    <span style="float:left;margin-top:20px;">项检项目</span>
                    <span style="float:right;">检测记录</span>
                  </td>
                  <template v-for="(item, index) in percentOfPass_Rows[0]">
                    <td
                      style="text-align:center;vertical-align:middle;"
                      v-if="index != '检测项目'"
                      :key="index"
                    >
                      {{ item._Value }}
                    </td>
                  </template>
                  <td style="text-align:center;vertical-align:middle;">
                    综合合格率
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in percentOfPass_Rows.slice(1)"
                  :key="index"
                >
                  <td
                    style="text-align:center;vertical-align:middle;"
                    v-for="(items, indexs) in item"
                    :key="indexs"
                  >
                    {{ items._Value }}
                  </td>
                  <td
                    v-if="index == 0"
                    :rowspan="dayrowspan"
                    style="text-align:center;vertical-align:middle;"
                  >
                    {{ percentOfPass_ReportData.result }}
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="width:90%">
              {{ motnth_ReportData.formation }}
            </p>
            <p style="width:90%">
              {{ motnth_ReportData.instruction }}
            </p>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="success" v-print="'#printTest'">打 印</el-button>
        <el-button @click="dailydialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    daylist: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: true
    },
    types: {
      type: String
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      //表格是否加载
      // loading: true,
      // 搜索
      search: '',
      //时间
      timeValue: '',
      //表格数据
      // daylist: [],
      // 当前页码
      PageIndex: 1,
      // 每页记录数
      MaxResultCount: 20,
      //选中页码
      currentPage: 1,
      // 日报详情弹框table
      infolist: [],
      // 日报详情弹框时间rowspan
      dayrowspan: 0,
      //reportData简介
      reportData: [],
      //月报详情第一个表格头部信息
      motnth_ReportData: [],
      //月报详情第一个表格
      motnth_Rows: [],
      //月报详情第二个表格头部信息
      percentOfPass_ReportData: [],
      //月报详情第二个表格
      percentOfPass_Rows: [],
      // 弹框是否显示
      dailydialogVisible: false,
      //选中个数
      choosearr: []
    };
  },
  methods: {
    //点击查询
    handless() {
      let newtimeValue = '';
      if (this.timeValue) {
        newtimeValue = this.$changeTime(this.timeValue[1]);
      }
      this.$parent.InitializeDaily(
        this.PageIndex,
        this.MaxResultCount,
        this.search,
        newtimeValue
      );
    },
    // 点击删除
    handledaildele() {
      if (this.choosearr.length == 0) {
        this.$message.error('至少选中一条数据');
        return;
      }

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let newarr = [];
          this.choosearr.map(item => {
            newarr.push(item.id);
          });
          let str = `ids=` + newarr.join(`&ids=`);
          // console.log(str);

          if (this.types == 1) {
            this.$HTTPDEL(this.api.DeleteDailyReport + '?' + str).then(res => {
              if (res.success) {
                this.$message.success('删除成功');
                this.$parent.InitializeDaily(
                  this.PageIndex,
                  this.MaxResultCount
                );
              }
            });
          } else {
            this.$HTTPDEL(this.api.DeleteMonthlyReport + '?' + str).then(
              res => {
                if (res.success) {
                  this.$message.success('删除成功');
                  this.$parent.InitializeDaily(
                    this.PageIndex,
                    this.MaxResultCount
                  );
                }
              }
            );
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 点击刷新
    handlerefresh() {
      this.$parent.InitializeDaily(this.PageIndex, this.MaxResultCount);
    },
    // 每页
    handleSizeChange(val) {
      this.MaxResultCount = val;
      this.$parent.InitializeDaily(this.PageIndex, this.MaxResultCount);
    },
    // 当前页面
    handleCurrentChange(val) {
      this.PageIndex = val;
      this.$parent.InitializeDaily(this.PageIndex, this.MaxResultCount);
    },
    //点击全选
    handleSelectionChange(e) {
      this.choosearr = e;
    },
    //点击详情
    handleinfo(type, id) {
      // type==1 头部详情
      // type==2 表单详情
      if (type == 1) {
        if (this.choosearr.length != 1) {
          this.$refs.daymultipleTable.clearSelection();
          return this.$message.error('一次只能操作一条数据');
        }
        let id = this.choosearr[0].id;
        this.handleinfodiao(id);
        this.dailydialogVisible = true;
      } else {
        this.handleinfodiao(id);
        this.dailydialogVisible = true;
      }
    },
    // 根据id获取详情
    handleinfodiao(id) {
      let data = {
        id
      };
      if (this.types == 1) {
        this.$HTTPGET(this.api.GetDailyReportDetail, data).then(res => {
          this.infolist = res.result.rows;
          res.result.reportData.sampleData = res.result.reportData.sampleData.replace(
            'T',
            ' '
          );
          this.reportData = res.result.reportData;
          this.dayrowspan = Object.keys(this.infolist[0]).length;
        });
      } else {
        this.$HTTPGET(this.api.GetMonthlyReportDetail, data).then(res => {
          console.log(res);
          this.motnth_ReportData = res.result.motnth_ReportData;
          this.motnth_Rows = res.result.motnth_Rows;
          this.percentOfPass_ReportData = res.result.percentOfPass_ReportData;
          this.percentOfPass_Rows = res.result.percentOfPass_Rows;
          this.dayrowspan = this.percentOfPass_Rows.length - 1;
        });
      }
    }
  }
};
</script>
<style scoped>
.daymange {
  padding: 20px;
}
.query {
  margin-left: 20px;
}
.dayCol {
  display: flex;
  justify-content: flex-end;
}
.el-table {
  margin-top: 15px;
  /* font-size: 12px; */
}
.info {
  margin-left: 0 !important;
}
.el-pagination {
  margin-top: 10px;
  /* text-align: right; */
}
/deep/ .el-dialog {
  width: 800px !important;
}
table {
  width: 200mm;
}
/* #lineTd {
  background: #fff
    url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=)
    no-repeat 100% center;
} */
td[class='first'] div {
  content: '';
  position: absolute;
  width: 1px;
  height: 156px;
  top: 1px;
  left: 0;
  background-color: black;
  display: block;
  transform: rotate(-76deg);
  transform-origin: top;
}
td[class='first'] .fbox2 {
  content: '';
  position: absolute;
  width: 1px;
  height: 254px;
  top: 1px;
  left: 0;
  background-color: black;
  display: block;
  transform: rotate(-82deg);
  transform-origin: top;
}
td {
  border: #000000 solid 1px;
  width: 120px;
  height: 40px;
  text-align: center;
  position: relative;
}
/deep/ .el-dialog__body {
  padding-top: 0 !important;
}
/* .printTest{
  display: flex;
  flex-direction: column;
  align-items: center;
} */
.box1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box2 {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

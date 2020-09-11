const api = {
  GetDailyReportList: '/DailyReportService/GetDailyReportList', //日简报列表
  InsertDailyReport: '/DailyReportService/InsertDailyReport', //新增日/月简报
  DeleteDailyReport: '/DailyReportService/DeleteDailyReport', //删除日简报
  GetDailyReportDetail: '/DailyReportService/GetDailyReportDetail', //获取日简报详情
  DeleteMonthlyReport: '/MonthlyReportService/DeleteMonthlyReport', //删除月简报
  GetMonthlyReportDetail: '/MonthlyReportService/GetMonthlyReportDetail' //获取月简报详情
};

export {api};

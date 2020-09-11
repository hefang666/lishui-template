var state = {
  eventList: [
    {
      id: 1,
      name: '巡检任务',
      type: '临时任务',
      typeStr: '任务类型文本',
      person: '张三',
      participants: '李四、王五',
      planTime: '2019-01-01 9:00',
      planEndTime: '2019-01-01 17:00',
      endTime: '2019-01-01 17:00',
      stopTime: '3小时20分',
      status: '待完成',
      statusStr: '任务状态文本',
      startTime: '',
      OverdueTime: '',
      SuspendTime: '',
      finishTime: ''
    }
  ],
  exceptionTypeData: [
    {
      value: 0,
      label: '全部'
    },
    {
      value: 1,
      label: '外观损坏'
    },
    {
      value: 2,
      label: '噪音异响'
    },
    {
      value: 3,
      label: '渗水漏水'
    },
    {
      value: 4,
      label: '杂物堵塞'
    },
    {
      value: 5,
      label: '设备损坏'
    },
    {
      value: 6,
      label: '其他异常'
    }
  ]
};

export default {
  namespaced: true,
  state
};

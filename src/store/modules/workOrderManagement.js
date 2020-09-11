var state = {
  orderList: [
    {
      id: 1,
      type: '临时任务',
      typeStr: '任务类型文本',
      person: '张三',
      creationTime: '2019-01-01 9:00',
      planCompleteTime: '2019-01-01 17:00',
      completeTime: '2019-01-01 17:00',
      status: '待完成',
      statusStr: '任务状态文本'
    }
  ],
  orderTypeData: [
    {
      value: 0,
      label: '全部'
    },
    {
      value: 1,
      label: '核查情况'
    },
    {
      value: 2,
      label: '故障排查'
    },
    {
      value: 3,
      label: '施工维修'
    }
  ]
};

export default {
  namespaced: true,
  state
};

var state = {
  taskList: [
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
  ]
};

export default {
  namespaced: true,
  state
};

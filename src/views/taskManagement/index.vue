<template>
  <div class="task_management_pages button-box">
    <div class="header-box">
      <div class="header-left">
        <el-button-group>
          <el-button
            type="primary"
            plain
            v-for="(item, index) in statusList"
            :key="index"
            :class="{'item-active': index == currentState}"
            @click="searchConditional(index)"
          >
            {{ item }}
          </el-button>
        </el-button-group>
        <el-button
          class="screen-button"
          type="primary"
          plain
          @click="showScreen"
        >
          {{ screen }}
        </el-button>
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain @click="addTask">新增</el-button>
          <el-button type="primary" plain @click="restart">重启</el-button>
          <el-button type="primary" plain @click="del">删除</el-button>
          <el-button type="primary" plain @click="suspend">暂停</el-button>

          <el-button type="primary" plain @click="close">关闭</el-button>
          <el-button type="primary" plain @click="complete">完成</el-button>
          <el-button type="primary" plain @click="modify">修改</el-button>
          <el-button type="primary" plain @click="See">查看</el-button>

          <el-button type="primary" plain @click="exportData">导出</el-button>
        </el-button-group>
      </div>
    </div>
    <div v-show="isScreen" class="screen-box select_box">
      <div class="item-box">
        <div class="item has-two">
          <div class="item-title">计划名称：</div>
          <div class="item-content">
            <el-input v-model="taskName"></el-input>
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="item has-two">
          <div class="item-title">
            <span class="tips">*</span>
            计划开始时间：
          </div>
          <div class="item-content">
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="开始时间"
            ></el-date-picker>
          </div>
        </div>
        <div class="item has-two">
          <div class="item-title">
            <span class="tips">*</span>
            计划结束时间：
          </div>
          <div class="item-content">
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="结束时间"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="button-group-box">
        <el-button type="primary" plain @click="search">搜索</el-button>
        <el-button type="primary" plain @click="clearSearch">清空</el-button>
      </div>
    </div>
    <div class="content-box">
      <div class="table-box">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="taskList"
          :stripe="true"
          tooltip-effect="dark"
          height="830"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="name"
            label="任务名称"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="typeStr"
            label="任务类别"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="person"
            label="负责人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="participants"
            label="参与人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="planStartTime"
            min-width="110"
            label="预计开始时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="planEndTime"
            min-width="110"
            label="预计完成时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="endTime"
            min-width="110"
            label="实际完成时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="stopTime"
            label="暂停时长"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="statusStr"
            label="任务状态"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="165">
            <template slot-scope="scope">
              <div class="operate-box">
                <el-button
                  type="text"
                  :class="[
                    'operate-button',
                    scope.row['status'] != 3 ? 'operate-button-active' : ''
                  ]"
                  :disabled="
                    scope.row['status'] != 3 ? disabledTrue : disabledFalse
                  "
                  @click="handleClose(scope.row)"
                  >关闭</el-button
                >
                <el-button
                  type="text"
                  :class="[
                    'operate-button',
                    scope.row['status'] == 2 || scope.row['status'] == 4
                      ? ''
                      : 'operate-button-active'
                  ]"
                  :disabled="
                    scope.row['status'] == 2 || scope.row['status'] == 4
                      ? disabledTrue
                      : disabledFalse
                  "
                  @click="handleComplete(scope.row)"
                  >完成</el-button
                >
                <el-button
                  type="text"
                  :class="[
                    'operate-button',
                    scope.row['status'] == 1 || scope.row['status'] == 3
                      ? ''
                      : 'operate-button-active'
                  ]"
                  :disabled="
                    scope.row['status'] == 1 || scope.row['status'] == 3
                      ? disabledFalse
                      : disabledTrue
                  "
                  @click="handleEdit(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleSee(scope.row)"
                  >查看</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <page
          :page-data="pageData"
          :total="listTotalCount"
          @changePageSize="changePageSize"
          @changeCurrentPage="changeCurrentPage"
        ></page>
      </div>
    </div>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      :icon="iconStr"
      @closeMessage="closeMessage"
    ></message>

    <!-- 操作提示弹窗 -->
    <operate
      :dialog-operate="dialogOperate"
      :operate-type="operateType"
      :message="messageT"
      @closeOperate="closeOperate"
      @determine="determine"
    ></operate>

    <!-- 新增任务弹框 -->
    <add-task
      :dialog-add="dialogAdd"
      @closeAdd="closeAdd"
      @getAddData="getAddData"
    ></add-task>

    <!-- 查看任务弹窗 -->
    <view-task :dialog-view="dialogView" @getViewData="getViewData"></view-task>
    <!-- 修改任务的弹窗 -->
    <edit-task
      :dialog-edit="dialogEdit"
      @closeEdit="closeEdit"
      @getEditData="getEditData"
    ></edit-task>
  </div>
</template>

<script>
import AddTask from './addTask/AddTask.vue';
import Page from '@/components/page/Page.vue';
import ViewTask from './viewTask/ViewTask.vue';
import EditTask from './editTask/EditTask.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import Operate from '@/components/operationTips/OperationTips.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: taskState, mapActions: taskActions} = createNamespacedHelpers(
  'taskManagement'
);
import {parseTime, exportExcel} from '@/utils/index';
export default {
  name: 'TaskManagement',
  components: {
    AddTask,
    Page,
    ViewTask,
    EditTask,
    Message,
    Operate
  },
  computed: {
    ...taskState([
      'taskList',
      'listTotalCount',
      'messageText',
      'pageData',
      'loading'
    ])
  },
  data() {
    return {
      // 显示内容（筛选/收起）
      screen: '筛选',

      disabledTrue: true,
      disabledFalse: false,

      // 是否显示筛选框
      isScreen: false,

      // table多选数组
      multipleSelection: [],

      // 当前分页
      currentPage: 1,

      // 当前页的页数
      pageSize: 1,

      // 传入store的page的信息
      // pageInfo: {
      //   currentPage: 1,
      //   maxResultCount: 30
      // },

      // 是否显示新增弹窗
      dialogAdd: false,

      // 是否显示查看弹窗
      dialogView: false,

      // 是否显示修改弹窗
      dialogEdit: false,

      // 当前选中的筛选类别名字（顶部左侧的input组 all）
      searchName: 'all',

      // 当前活动状态
      currentState: 0,

      // 按状态筛选的状态内容
      statusList: [
        '全部',
        '待接收',
        '进行中',
        '已暂停',
        '已超期',
        '已关闭',
        '已完成'
      ],

      // 筛选时输入框的输入的任务名称
      taskName: '',

      // 预计开始时间
      startTime: '',

      // 预计结束时间
      endTime: '',

      // 是否显示消息提示弹窗
      dialogMessage: false,

      // 是否显示操作提示弹窗
      dialogOperate: false,

      // 操作类型
      operateType: '',

      // 操作提示文字
      messageT: '请确认操作',

      // icon的class
      iconStr: 'el-icon-warning-outline'
    };
  },
  methods: {
    ...taskActions([
      'getTaskList',
      'searchTask',
      'GetTaskDetails',
      'deleteTask',
      'UpdateTaskStatus',
      'setMessage'
    ]),
    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },

    // 判断是否只选了一行（有些操作只能选择一行）并进行相关的提示
    onlyOne() {
      if (this.multipleSelection.length == 0) {
        this.setMessage('请选择要操作数据');
        this.iconStr = 'el-icon-warning-outline';
        this.dialogMessage = true;
        return false;
      } else if (this.multipleSelection.length > 1) {
        this.setMessage('只能选择一行数据');
        this.iconStr = 'el-icon-warning-outline';
        this.dialogMessage = true;
        return false;
      } else {
        return true;
      }
    },

    // 重启任务
    restart() {
      console.log(this.onlyOne());
      // 返回为真时进行下一步
      if (this.onlyOne()) {
        if (this.multipleSelection[0].status == 3) {
          // 状态为3可暂停，其他状态无法重启
          // 操作弹窗
          this.messageT = '请确认操作';
          this.operateType = 'restart';
          this.dialogOperate = true;
        } else {
          // 只能选择一行数据
          this.setMessage('该状态不能重启');
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        }
      }
    },

    // 删除任务
    del() {
      if (this.multipleSelection.length == 0) {
        this.setMessage('请选择要操作数据');
        this.iconStr = 'el-icon-warning-outline';
        this.dialogMessage = true;
      } else {
        // 判断选中的项里是否包含有不符合条件的列
        let flag = false;
        this.multipleSelection.forEach(item => {
          console.log('item :>> ', item);
          if (item.status == 3 || item.status == 5) {
            // 执行删除操作
            flag = true;
          } else {
            flag = false;
            this.setMessage('只允许删除已暂停和已关闭的任务');
            this.iconStr = 'el-icon-warning-outline';
            this.dialogMessage = true;
          }
        });
        // 选择的列中全部符合删除要求执行删除操作
        if (flag) {
          // 操作提示框
          this.messageT = '确定删除吗？';
          this.operateType = 'del';
          this.dialogOperate = true;
        }
      }
    },

    // 暂停任务
    suspend() {
      if (this.onlyOne()) {
        if (this.multipleSelection[0].status != 2) {
          this.setMessage('该状态不能暂停');
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        } else {
          // 操作弹窗
          this.messageT = '请确认操作';
          this.operateType = 'suspend';
          this.dialogOperate = true;
        }
      }
    },

    // 关闭任务
    close() {
      if (this.onlyOne()) {
        if (this.multipleSelection[0].statusList != 3) {
          // 关闭任务只能对已暂停状态的任务进行
          this.setMessage('该状态不能关闭');
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        } else {
          // 操作弹窗
          this.messageT = '请确认操作';
          this.operateType = 'close';
          this.dialogOperate = true;
        }
      }
    },

    // 操作栏里的关闭
    handleClose(row) {
      let param = {
        Id: row.id,
        operate: 4
      };
      this.UpdateTaskStatus(param);
    },

    // 完成任务
    complete() {
      if (this.onlyOne()) {
        if (
          this.multipleSelection[0].status == 2 ||
          this.multipleSelection[0].status == 4
        ) {
          // 操作弹窗
          this.messageT = '请确认操作';
          this.operateType = 'complete';
          this.dialogOperate = true;
        } else {
          this.setMessage('该状态不能完成');
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        }
      }
    },

    // 操作栏里的完成
    handleComplete(row) {
      let param = {
        Id: row.id,
        operate: 2
      };
      this.UpdateTaskStatus(param)
        .then(res => {
          if (res.success) {
            this.iconStr = 'el-icon-circle-check';
            this.dialogMessage = true;
          }
        })
        .catch(() => {
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        });
    },

    // 修改任务
    modify() {
      if (this.onlyOne()) {
        if (
          this.multipleSelection[0].status == 1 ||
          this.multipleSelection[0].status == 3
        ) {
          // 执行修改操作
          // 获取当前选中行的详细信息
          let param = {
            Id: this.multipleSelection[0].id
          };
          this.GetTaskDetails(param)
            .then(res => {
              if (res.success) {
                this.dialogEdit = true;
              }
            })
            .catch(() => {
              this.iconStr = 'el-icon-warning-outline';
              this.dialogMessage = true;
            });
        } else {
          this.setMessage('该状态不能修改');
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        }
      }
    },

    // 操作栏里的修改
    handleEdit(row) {
      let param = {
        Id: row.id
      };
      this.GetTaskDetails(param)
        .then(res => {
          if (res.success) {
            this.dialogEdit = true;
          }
        })
        .catch(() => {
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        });
    },

    // 查看任务
    See() {
      if (this.onlyOne()) {
        // 获取任务详情
        let param = {
          Id: this.multipleSelection[0].id
        };
        this.GetTaskDetails(param)
          .then(res => {
            if (res.success) {
              this.dialogView = true;
            }
          })
          .catch(() => {
            this.iconStr = 'el-icon-warning-outline';
            this.dialogMessage = true;
          });
      }
    },

    // 操作栏里的查看
    handleSee(row) {
      let param = {
        Id: row.id
      };
      this.GetTaskDetails(param)
        .then(res => {
          if (res.success) {
            this.dialogView = true;
          }
        })
        .catch(() => {
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        });
    },

    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },

    // 点击切换条件筛选div的显示状态
    showScreen() {
      this.isScreen = !this.isScreen;
      if (this.isScreen) {
        this.screen = '收起';
      } else {
        this.screen = '筛选';
      }
    },

    // 按状态筛选则并为input添加样式并筛选
    searchConditional(index) {
      this.currentState = index;
      this.$store.commit('taskManagement/update_taskStatus', index);
      this.getData();
    },

    // 筛选
    search() {
      if (this.startTime == '') {
        this.$message('请选择开始日期');
        return;
      } else if (this.endTime == '') {
        this.$message('请选择结束日期');
        return;
      } else {
        this.startTime = parseTime(this.startTime, '{y}-{m}-{d}');
        this.endTime = parseTime(this.endTime, '{y}-{m}-{d}');
        let data = {
          currentPage: this.currentPage,
          maxResultCount: this.pageSize,
          taskName: this.taskName,
          startTime: this.startTime,
          endTime: this.endTime
        };
        this.searchTask(data).catch(() => {
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        });
        this.clearSearch();
      }
    },

    // 清空搜索
    clearSearch() {
      this.isScreen = !this.isScreen;
      this.startTime = '';
      this.endTime = '';
      this.taskName = '';
      this.screen = '筛选';
    },

    // 打开新增弹窗
    addTask() {
      this.dialogAdd = true;
    },
    // 关闭新增弹窗
    closeAdd(data) {
      console.log(data);
      this.dialogAdd = data;
    },
    // 执行新增后的操作
    getAddData(data) {
      console.log(data);
      this.dialogAdd = data;
      // this.iconStr = 'el-icon-circle-check';
      // this.dialogMessage = true;
      this.getData();
    },
    // 关闭查看弹窗
    getViewData(data) {
      this.dialogView = data.dialogView;
    },
    // 关闭修改弹窗
    closeEdit(data) {
      this.dialogEdit = data;
    },
    // 修改后的操作
    getEditData(data) {
      this.dialogEdit = data;
      // this.iconStr = 'el-icon-circle-check';
      // this.dialogMessage = true;
    },
    // 获取从分页传过来的每页多少条数据
    changePageSize(num) {
      this.pageSize = num;
      this.getData();
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(cur) {
      this.currentPage = cur;
      this.getData();
    },

    // 关闭操作提示弹窗
    closeOperate(data) {
      this.dialogOperate = data;
    },

    // 操作弹窗点击了确定
    determine(data) {
      this.dialogOperate = data.flag;
      let param = {};
      if (data.type == 'restart') {
        // 重启
        param.id = this.multipleSelection[0].id;
        param.operate = 5;
        this.UpdateTaskStatus(param).then(res => {
          if (res.success) {
            this.getData();
          }
        }).catch(() => {
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        });
      } else if (data.type == 'del') {
        // 删除
        let newidarr = [];
        this.multipleSelection.map(item => {
          newidarr.push(item.id);
        });
        let param = {
          id: newidarr
        };
        this.deleteTask(param)
          .then(res => {
            if (res.success) {
              this.getData();
            }
          })
          .catch(() => {
            this.iconStr = 'el-icon-warning-outline';
            this.dialogMessage = true;
          });
      } else if (data.type == 'suspend') {
        // 暂停
        console.log(this.multipleSelection[0].id);
        param.id = this.multipleSelection[0].id;
        param.operate = 1;
        console.log(param);
        this.UpdateTaskStatus(param).then(res => {
          if (res.success) {
            this.getData();
          }
        }).catch(() => {
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        });
      } else if (data.type == 'close') {
        // 关闭
        param.id = this.multipleSelection[0].id;
        param.operate = 4;
        this.UpdateTaskStatus(param).then(res => {
          if (res.success) {
            this.getData();
          }
        }).catch(() => {
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        });
      } else if (data.type == 'complete') {
        // 完成
        param.id = this.multipleSelection[0].id;
        param.operate = 2;
        this.UpdateTaskStatus(param).then(res => {
          if (res.success) {
            this.getData();
          }
        }).catch(() => {
          this.iconStr = 'el-icon-warning-outline';
          this.dialogMessage = true;
        });
      }
    },
    // 获取数据
    getData() {
      console.log(this.currentPage);
      let param = {
        currentPage: this.currentPage,
        maxResultCount: this.pageSize,
        status: this.currentState
      };
      this.getTaskList(param).catch(() => {
        this.iconStr = 'el-icon-warning-outline';
        this.dialogMessage = true;
      });
    },

    // 导出
    exportData() {
      let HeaderData = [
        '任务名称',
        '任务类别',
        '负责人',
        '参与人',
        '预计开始时间',
        '预计完成时间',
        '实际完成时间',
        '暂停时长',
        '任务状态'
      ];
      let TextName = [
        'name',
        'typeStr',
        'person',
        'participants',
        'planStartTime',
        'planEndTime',
        'endTime',
        'suspendTimeStr',
        'statusStr'
      ];
      let tableData;
      let tableName = '任务列表';
      if (this.multipleSelection.length == 0) {
        tableData = this.taskList;
      } else {
        tableData = this.multipleSelection;
      }
      exportExcel(HeaderData, TextName, tableData, tableName);
    }
  },
  mounted() {
    console.log(this.currentPage);
    this.pageSize = this.pageData[0];
    this.getData();
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.task_management_pages {
  padding: 10px;

  .header-box {
    display: flex;
    justify-content: space-between;

    .header-left {
      display: flex;
      .screen-button {
        margin-left: 5px;
      }

      .search-box {
        margin-left: 20px;
        display: flex;

        .search-button {
          margin-left: 5px;
        }
      }
    }
  }

  .screen-box {
    padding: 0 20px;
    .item-box {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .has-two {
        width: 46%;
      }

      .item {
        display: flex;
        .item-title {
          width: 100px;
          text-align: right;
          line-height: 28px;
          font-size: 12px;
          margin-right: 5px;
          .tips {
            color: red;
          }
        }

        .item-content {
          width: 220px;
        }
      }
    }

    .button-group-box {
      text-align: right;
      margin-top: 10px;
    }
  }

  .content-box {
    margin-top: 10px;

    .page-box {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

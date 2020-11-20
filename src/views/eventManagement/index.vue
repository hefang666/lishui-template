<template>
  <div class="eventManagement-box button-box">
    <div class="header-box">
      <div class="header-left">
        <el-button-group>
          <el-button
            type="primary"
            plain
            v-for="(item,index) in statusList"
            :key="index"
            :class="{'item-active': index == currentIndex}"
            @click="searchConditional(index)"
          >
            {{item}}
          </el-button>
        </el-button-group>
        <el-button
          class="screen-button"
          type="primary"
          plain
          @click="showScreen"
        >{{screen}}</el-button>
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain @click="close">关闭</el-button>
          <el-button type="primary" plain @click="transfer">转工单</el-button>
          <el-button type="primary" plain @click="See">查看</el-button>
          <el-button type="primary" plain>导出</el-button>
        </el-button-group>
      </div>
    </div>
    <div v-show="isScreen" class="screen-box select_box">
      <div class="item-box">
        <div class="item has-two">
          <div class="item-title">报告人：</div>
          <div class="item-content">
            <el-button
              class="choose-active"
              type="primary"
              plain
              v-if="person != ''"
              v-model="person"
              >{{ person }}</el-button
            >
            <el-button
              type="primary"
              plain
              @click="choosePerson"
            >
              选择人员
            </el-button>
          </div>
        </div>
        <div class="item has-two">
          <div class="item-title">
            <span style="color: red;">*</span>
            异常类型：
          </div>
          <div class="item-content">
            <el-select
              v-model="exceptionType"
              placeholder="请选择异常类型"
              @change="selectType"
            >
              <el-option
                v-for="(item,index) in exceptionTypeData"
                :key="index"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="item has-two">
          <div class="item-title">提交时间：</div>
          <div class="item-content">
            <el-date-picker
              v-model="submissionTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="提交时间"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="button-group-box">
        <el-button type="primary" plain @click="search">搜索</el-button>
        <el-button type="primary" plain @click="clearData">清空</el-button>
      </div>
    </div>
    <div class="content-box">
      <div class="table-box">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="eventList"
          :stripe="true"
          border
          tooltip-effect="dark"
          height="830"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="typeStr"
            label="事件类型"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="creationName"
            label="报告人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="creationTime"
            label="事件提交时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="errorType"
            label="异常类型"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="predictWaterLoss"
            label="预估损失水量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="statusStr"
            label="事件状态"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="operate-box">
                <el-button
                  type="text"
                  :class="
                    [
                      'operate-button',
                      scope.row['status'] != 1 ?
                      'operate-button-active' :
                        ''
                    ]
                  "
                  :disabled="scope.row['status'] != 1 ? disabledTrue : disabledFalse"
                  @click="handleTran(scope.row)"
                >
                  转工单
                </el-button>
                <el-button
                  type="text"
                  :class="[
                    'operate-button',
                    scope.row['status'] == 1  
                    ? '' 
                    : 'operate-button-active']"
                  :disabled="
                    scope.row['status'] == 1
                    ? disabledFalse
                    : disabledTrue"
                  @click="handleClose(scope.row)"
                >
                  关闭
                </el-button>
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleSee(scope.row)"
                >
                  查看
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <page
          :page-data="eventPageData"
          :total="eventListTotal"
          @changePageSize="changePageSize"
          @changeCurrentPage="changeCurrentPage"
        ></page>
      </div>
    </div>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
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

    <!-- 选择人员 -->
    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="'single'"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <!-- 转工单 -->
    <transfer-order
      :dialog-transfer="dialogTransfer"
      @closeTransfer="closeTransfer"
      @checkedTransfer="checkedTransfer"
    ></transfer-order>

    <!-- 工单详情弹窗 -->
    <view-detail
      :dialog-view="dialogView"
      @closeView="closeView"></view-detail>

    <!-- 提示弹窗 -->
    <tips
    :dialog-tips="dialogTips"
    :msg="'请确认操作'"
    @closeTips="closeTips"></tips>
  </div>
</template>

<script>
import ChoosePeople from '@/views/public/ChoosePeople.vue';
import Page from '@/components/page/Page.vue';
import Tips from '@/components/tipsDialog/index.vue';
import TransferOrder from './TransferOrder.vue';
import ViewDetail from './ViewDetail.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import Operate from '@/components/operationTips/OperationTips.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: eventState, mapActions: eventActions} = createNamespacedHelpers('eventManagement');
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
import {parseTime, exportExcel} from '@/utils/index';
export default {
  name: 'EventManagement',
  components: {
    ChoosePeople,
    Page,
    TransferOrder,
    ViewDetail,
    Tips,
    Message,
    Operate
  },
  computed: {
    ...eventState([
      'exceptionTypeData',
      'eventList',
      'messageText',
      'eventListTotal',
      'loading',
      'eventPageData'
    ])
  },
  data() {
    return {
      // 当前选中状态下标
      currentIndex: 0,

      // 按状态筛选的状态内容
      statusList: ['全部', '待处理', '转工单', '已关闭'],

      disabledTrue:true,
      disabledFalse: false,

      // 显示内容（筛选/收起）
      screen: '筛选',

      // 是否显示筛选框
      isScreen: false,

      // 是否显示选择人员弹窗
      dialogCharge: false,

      // 筛选数据
      // 选择人员
      person: '',
      // 人员信息
      personInfo: {},
      // 异常类型
      exceptionType: 1,
      // 提交时间
      submissionTime: '',

      // table多选后的数据
      multipleSelection: [],

      // 是否显示转工单弹窗
      dialogTransfer: false,

      // 是否显示工单详情
      dialogView: false,

      // 是否显示提示窗
      dialogTips: false,

      // 是否显示提示消息弹窗
      dialogMessage: false,

      // 是否显示操作提示弹窗
      dialogOperate: false,

      // 操作类型
      operateType: '',

      // 操作提示文字
      messageT: '请确认操作',

      // 当前页数
      currentPage: 1,

      // 每页条数
      pageSize: 30,

      // 表格里点击关闭的id
      closeId:'',
      
      // 是否是在表格点击的关闭
      isRow: false
    }
  },
  methods: {
    ...eventActions([
      'GetEventList',
      'GetEventDetails',
      'UpdateEvent',
      'setMessage'
    ]),
    ...xunjianActions([
      
      'getOrganizationData',
      'getRoleData'
    ]),
    // 按状态筛选则并为input添加样式
    searchConditional(index) {
      this.currentIndex = index;
      let param = {
        pageIndex: 1,
        maxResultCount: 30
      };
      if (this.currentIndex != 0) {
        param.status = this.currentIndex;
      }
      this.GetEventList(param);
    },

    // 点击切换条件筛选div的显示状态
    showScreen() {
      this.isScreen = !this.isScreen;
      if (this.isScreen) {
        this.screen = '收起';
      } else {
        this.screen = "筛选";
      }
    },

    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },

    // 搜索
    search() {
      // console.log(this.exceptionType);
      // console.log(this.exceptionType == '');

      if (this.exceptionType == '') {
        this.setMessage('异常类型不能为空');
        this.dialogMessage = true;
        return;
      }

      let time = parseTime(this.submissionTime, '{y}-{m}-{d}');
      let param = {
        errorType: this.exceptionType,
        creationName: this.personInfo.trueName,
        creationTime: time,
        pageIndex: this.currentPage,
        maxResultCount: this.pageSize,
      };
      // console.log(param);
      this.GetEventList(param);
      this.clearData();
    },
    // 点击搜索后，搜索框内容置为原样
    clearData() {
      this.exceptionType = 1;
      this.personInfo = {};
      this.person = '';
      this.submissionTime = '';
      this.isScreen = !this.isScreen;
      this.screen = '筛选';
    },

    // 判断是否只选了一行（有些操作只能选择一行）并进行相关的提示
    onlyOne() {
      if (this.multipleSelection.length == 0) {
        this.setMessage('请选择要操作数据');
        this.dialogMessage = true;
        return false;
      } else if (this.multipleSelection.length > 1) {
        this.setMessage('只能选择一行数据');
        this.dialogMessage = true;
        return false
      } else {
        return true;
      }
    },

    // 关闭
    close() {
      this.isRow = false;
      if (this.onlyOne()) {
        if (this.multipleSelection[0].status != 1) {
          // 关闭任务只能对已暂停状态的任务进行
          this.setMessage('该状态不能关闭');
          this.dialogMessage = true;
        } else {
          // 操作弹窗
          this.messageT = '确认要关闭事件类型的事件？';
          this.operateType = 'close';
          this.dialogOperate = true;
        }
      }
    },

    // 表格里的关闭
    handleClose(row) {
      this.isRow = true;
      this.closeId = row.Id;
      this.messageT = '确认要关闭事件类型的事件？';
      this.operateType = 'close';
      this.dialogOperate = true;
    },

    // 转工单
    transfer() {
      if (this.onlyOne()) {
        if (this.multipleSelection[0].status != 1) {
          this.setMessage('该状态无法转工单');
          this.dialogMessage = true;
        } else {
          let param = {
            Id: this.multipleSelection[0].id
          };
          this.GetEventDetails(param).then(res => {
            if (res.success) {
              this.dialogTransfer = true;
            }
          }).catch(() => {
            this.dialogMessage = true;
          });
        }
      }
    },

    // 表格里的转工单
    handleTran(row) {
      let param = {
        Id: row.id
      };
      this.GetEventDetails(param).then(res => {
        if (res.success) {
          this.dialogTransfer = true;
        }
      }).catch(() => {
        this.dialogMessage = true;
      });
    },

    // 查看
    See() {
      if (this.onlyOne()) {
        let param = {
          Id: this.multipleSelection[0].id
        };
        this.GetEventDetails(param).then(res => {
          if (res.success) {
            this.dialogView = true;
          }
        }).catch(() => {
          this.dialogMessage = true;
        });
      }
    },

    // 表格里的查看
    handleSee(row) {
      let param = {
        Id: row.id
      };
      this.GetEventDetails(param).then(res => {
        if (res.success) {
          this.dialogView = true;
        }
      }).catch(() => {
        this.dialogMessage = true;
      });
    },

    // 点击选择负责人按钮
    choosePerson() {
      this.getOrganizationData();
      this.getRoleData();
      this.dialogCharge = true;
    },

    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      // console.log(data);
      this.dialogCharge = data.dialogCharge;
    },

    // 选择负责人弹窗选择了负责人并点击了确定按钮
    checkedPerson(data) {
      // console.log(data);
      this.person = data.personinfo[0].trueName;
      this.personInfo = data.personinfo;
      this.dialogCharge = data.dialogCharge;
    },

    // 异常类型选择
    selectType(val) {
      this.exceptionType = val;
    },

    // 关闭操作提示弹窗
    closeOperate(data) {
      this.dialogOperate = data;
    },

    // 关闭转工单弹窗
    closeTransfer(data) {
      this.dialogTransfer = data.dialogTransfer;
    },

    // 确定转工单
    checkedTransfer(data) {
      // console.log(data);
      // console.log('data++++ :>> ', data);
      this.dialogTransfer = data;
      this.getData();
    },

    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },

    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      this.pageSize = data;
      this.getData();
    },

    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      this.currentPage = data;
      this.getData();
    },

    // 关闭工单详情
    closeView(data) {
      this.dialogView = data;
    },

    // 关闭提示窗
    closeTips(data) {
      this.dialogTips = data;
    },

    // 操作弹窗点击了确定
    determine(data) {
      this.dialogOperate = data.flag;
      if (data.type == 'close') {
        let id;
        if (this.isRow) {
          id = this.closeId;
        } else {
          id = this.multipleSelection[0].id;
        }
        // 关闭
        let param = {
          Id: id,
          status: 3
        };
        this.UpdateEvent(param).then(res => {
          if (res.success) {
            this.dialogMessage = true;
          }
        }).catch(() => {
          this.dialogMessage = true;
        });
      }
    },

    getData() {
      let param;
      if (this.currentIndex == 0) {
        param = {
          pageIndex: this.currentPage,
          maxResultCount: this.pageSize,
        }
      } else {
        param = {
          pageIndex: this.currentPage,
          maxResultCount: this.pageSize,
          status: this.currentIndex,
        }
      }
      this.GetEventList(param).catch(() => {
        this.dialogMessage = true;
      });
    },

    // 导出
    exportData() {
      let HeaderData = [
        '事件类型',
        '报告人',
        '事件提交时间',
        '异常类型',
        '预估损失水量',
        '事件状态'
      ];
      let TextName = [
        'typeStr',
        'person',
        'creationTime',
        'errorType',
        'predictWaterLoss',
        'statusStr'
      ]
      let tableData;
      let tableName = '事件列表';
      if (this.multipleSelection.length == 0) {
        tableData = this.eventList;
      } else {
        tableData = this.multipleSelection;
      }
      exportExcel(HeaderData, TextName, tableData, tableName);
    }
  },
  mounted() {
    this.pageSize = this.eventPageData[0];
    this.getData();
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.eventManagement-box {
  padding: 10px;
  .header-box {
    display: flex;
    justify-content: space-between;

    .header-left {
      display: flex;
      .screen-button {
        margin-left: 5px;
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
        }

        .item-content {
          width: 220px;
          .choose-active {
            color: #ffffff;
            background: #4b77be;
            border: none;
            cursor: auto;
          }
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

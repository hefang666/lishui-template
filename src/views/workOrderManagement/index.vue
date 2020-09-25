<template>
  <div class="workOrder-box button-box">
    <div class="header-box">
      <div class="header-left">
        <el-button-group>
          <el-button
            type="primary"
            plain
            v-for="(item, index) in statusList"
            :key="index"
            :class="{'item-active': index == currentIndex}"
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
          >{{ screen }}
        </el-button>
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain @click="addOrder">新增</el-button>
          <el-button type="primary" plain @click="close">关闭</el-button>
          <el-button type="primary" plain @click="modify">修改</el-button>
          <el-button type="primary" plain @click="See">查看</el-button>
          <el-button type="primary" plain @click="del">删除</el-button>
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
            <el-button type="primary" plain @click="choosePerson"
              >选择人员</el-button
            >
          </div>
        </div>
        <div class="item has-two">
          <div class="item-title">
            <span style="color: red;">*</span>
            工单类型：
          </div>
          <div class="item-content">
            <el-select
              v-model="orderType"
              placeholder="请选择工单类型"
              @change="selectType"
            >
              <el-option
                v-for="(item, index) in orderTypeData"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="item has-two">
          <div class="item-title">工单提交时间：</div>
          <div class="item_content">
            <el-date-picker
              v-model="submissionStartTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="提交开始时间"
            ></el-date-picker>
            <el-date-picker
              v-model="submissionEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="提交结束时间"
            ></el-date-picker>
          </div>
        </div>
        <div class="item has-two">
          <div class="item-title">工单完成时间：</div>
          <div class="item_content">
            <el-date-picker
              v-model="completionStartTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="完成开始时间"
            ></el-date-picker>
            <el-date-picker
              v-model="completionEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="完成结束时间"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="button-group-box">
        <el-button type="primary" plain @click="search">搜索</el-button>
        <el-button type="primary" plain>清空</el-button>
      </div>
    </div>
    <div class="content-box">
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="orderList"
          :stripe="true"
          tooltip-effect="dark"
          height="830"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="type"
            label="工单类型"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="person"
            label="负责人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="creationTime"
            min-width="110"
            label="工单提交时间"
            format="yyyy-MM-dd HH:mm"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="completeTime"
            min-width="110"
            label="完成时间"
            format="yyyy-MM-dd HH:mm"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="completeTime"
            min-width="110"
            label="预计完成时间"
            format="yyyy-MM-dd HH:mm"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="statusStr"
            label="工单状态"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operate-box">
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleClose(scope.$index, scope.row)"
                  >关闭</el-button
                >
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  class="operate-button"
                  @click="handleSee(scope.$index, scope.row)"
                  >查看</el-button
                >
              </div>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="page-box">
        <page
          :page-data="[30, 40, 50, 100]"
          :total="orderListTotal"
          @changePageSize="changePageSize"
          @changeCurrentPage="changeCurrentPage"
        ></page>
      </div>
    </div>
    <!-- 选择人员 -->
    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="'single'"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <!-- 新增 -->
    <add-order :dialog-add="dialogAdd" @closeAdd="closeAdd"></add-order>

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

    <!-- 修改 -->
    <edit-order :dialog-edit="dialogEdit"
      @closeEdit="closeEdit"
    ></edit-order>

    <!-- 查看 -->
    <order-detail
      :dialog-view="dialogView"
      @closeView="closeView">
    </order-detail>
  </div>
</template>

<script>
import ChoosePeople from '@/views/public/ChoosePeople.vue';
import Page from '@/components/page/Page.vue';
import AddOrder from './Add.vue';
import EditOrder from './EditOrder.vue';
import OrderDetail from './OrderDetail.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import Operate from '@/components/operationTips/OperationTips.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState: orderState, mapActions: orderActions} = createNamespacedHelpers('workOrderManagement');
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
import {parseTime} from '@/utils/index';
export default {
  name: 'workOrder',
  components: {
    ChoosePeople,
    Page,
    AddOrder,
    EditOrder,
    OrderDetail,
    Message,
    Operate
  },
  data() {
    return {
      // 当前选中状态下标
      currentIndex: 0,
      // 按状态筛选的状态内容
      statusList: ['全部', '待接收', '进行中', '已关闭', '已完成'],

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
      personInfo: '',
      // 异常类型
      orderType: 0,
      // 提交开始时间
      submissionStartTime: '',

      // 提交结束时间
      submissionEndTime: '',

      // 完成开始时间
      completionStartTime: '',

      // 完成结束时间
      completionEndTime: '',

      // 是否显示修改
      dialogEdit: false,

      // 是否显示查看
      dialogView: false,

      // 是否显示新增
      dialogAdd: false,

      // 当前是第几页
      currentPage: 1,

      // 当前每页多少条数据
      pagesize: 30,

      // 是否显示消息提示弹窗
      dialogMessage: false,

      // 提示消息
      messageText: '',

      // 是否显示操作提示弹窗
      dialogOperate: false,

      // 操作类型
      operateType: '',

      // 操作提示文字
      messageT: '请确认操作',
      
      // 多选后的数组
      multipleSelection: []
    };
  },
  computed: {
    ...orderState(['orderTypeData', 'orderList', 'orderListTotal'])
  },
  methods: {
    ...orderActions(['GetWorkOrderList', 'GetWorkOrderDetails', 'DeleteWorkOrder']),
    ...xunjianActions(['getOrganizationData', 'getRoleData']),
    // // 按状态筛选则并为input添加样式
    searchConditional(index) {
      this.currentIndex = index;
      let param = {
        pageIndex: 1,
        MaxResultCount:30,
        status: this.currentIndex
      };
      this.GetWorkOrderList(param);
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
    // 新增工单
    addOrder() {
      this.dialogAdd = true;
    },

    // 判断是否只选了一行（有些操作只能选择一行）并进行相关的提示
    onlyOne() {
      if (this.multipleSelection.length == 0) {
        console.log('请选择要操作数据');
        this.messageText = '请选择要操作数据';
        this.dialogMessage = true;
        return false;
      } else if (this.multipleSelection.length > 1) {
        this.messageText = '只能选择一行数据';
        this.dialogMessage = true;
        console.log('只能选择一行数据');
        return false
      } else {
        return true;
      }
    },

    // 关闭工单
    close() {
      if (this.onlyOne()) {
        if (this.multipleSelection[0].status == 1 || this.multipleSelection[0].status == 2) {
          // 操作弹窗
          this.messageT = '请确认操作';
          this.operateType = 'close';
          this.dialogOperate = true;
        } else {
          // 关闭任务只能对已暂停状态的任务进行
          this.messageText = '该状态不能关闭';
          this.dialogMessage = true;
        }
      }
    },

    // 修改工单
    modify() {
      if (this.onlyOne()) {
        if (this.multipleSelection[0].status == 1) {
          // 执行修改操作
          // 获取当前选中行的详细信息
          let param = {
            Id: this.multipleSelection[0].id
          };
          this.GetWorkOrderDetails(param);
          this.dialogEdit = true;
        } else {
          this.messageText = '该状态不能修改';
          this.dialogMessage = true;
        }
      }
    },

    // 查看工单
    See() {
      if (this.onlyOne()) {
        // 获取任务详情
        let param = {
          Id: this.multipleSelection[0].id
        };
        this.GetWorkOrderDetails(param);
        this.dialogView = true;
      }
    },

    // 删除任务
    del() {
      if (this.multipleSelection.length == 0) {
        this.messageText = '请选择要操作数据';
        this.dialogMessage = true;
      } else {
        // 判断选中的项里是否包含有不符合条件的列
        let flag = false;
        this.multipleSelection.forEach(item => {
          if (item.status == 3) {
            // 执行删除操作
            flag = true;
          } else {
            flag = false;
            this.messageText = '只允许删除已暂停和已关闭的任务';
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

    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },

     // 关闭操作提示弹窗
     closeOperate(data) {
      this.dialogOperate = data;
    },

    // 操作弹窗点击了确定
    determine(data) {
      console.log(data);
      this.dialogOperate = data.flag;
      let param;
      if (data.type == 'del') {
        // 删除
        this.multipleSelection.forEach(item => {
          param = {
            id: item.id
          };
          console.log(param);
          this.DeleteWorkOrder(param);
          // this.deleteTask(param);
        });
      }
    },

    // 点击选择负责人按钮
    choosePerson() {
      this.dialogCharge = true;
      this.getOrganizationData();
      this.getRoleData();
    },

    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      console.log(data);
      this.dialogCharge = data.dialogCharge;
    },

    // 选择负责人弹窗选择了负责人并点击了确定按钮
    checkedPerson(data) {
      this.dialogCharge = data.dialogCharge;
      this.person = data.personinfo[0].trueName;
      this.personInfo = data.personinfo;
    },

    // 异常类型选择
    selectType(val) {
      this.orderType = val;
    },

    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },

    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      this.pagesize = data;
      this.getData();
    },

    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      this.currentPage = data;
      this.getData();
    },

    // 关闭修改
    closeEdit(data) {
      console.log(data);
      this.dialogEdit = data.dialogEdit;
    },

    // 关闭工单详情
    closeView(data) {
      this.dialogView = data;
    },

    // 关闭新增
    closeAdd(data) {
      this.dialogAdd = data.dialogAdd;
    },

    // 获取数据（基础请求，包含状态，分页，页数）
    getData() {
      let param = {
        status: this.currentIndex,
        pageIndex: this.currentPage,
        MaxResultCount: this.pagesize
      }
      this.GetWorkOrderList(param);
    },

    // 搜索
    search() {
      console.log(this.submissionEndTime);
      let subStartTime = '',
        subEndTime = '',
        comStartTime = '',
        comEndTime = '';
      // 工单提交时间
      if (
        (this.submissionStartTime != '' && this.submissionEndTime != '')
        ||
        (this.submissionStartTime == '' && this.submissionEndTime == '')
      ) {
        if(this.submissionStartTime != '') {
          subStartTime = parseTime(
            this.submissionStartTime,
            '{y}-{m}-{d} {h}:{i}'
          );
          subEndTime = parseTime(
            this.submissionEndTime,
            '{y}-{m}-{d} {h}:{i}'
          );
        }
      } else {
        console.log('不满足条件');
        if (this.submissionStartTime == '') {
          alert('请选择工单提交的开始时间');
        } else if (this.submissionEndTime == '') {
          alert('请选择工单提交的结束时间');
        }
        return
      }
      // 工单完成时间
      if (
        (this.completionStartTime != '' && this.completionEndTime != '')
        ||
        (this.completionStartTime == '' && this.completionEndTime == '')
      ) {
        if(this.completionStartTime != '') {
          comStartTime = parseTime(
            this.completionStartTime,
            '{y}-{m}-{d} {h}:{i}'
          );
          comEndTime = parseTime(
            this.completionEndTime,
            '{y}-{m}-{d} {h}:{i}'
          );
        }
      } else {
        if (this.completionStartTime == '') {
          alert('请选择工单完成的开始时间');
        } else if (this.completionEndTime == '') {
          alert('请选择工单完成的结束时间');
        }
        return
      }

      let param = {
        pageIndex: this.currentPage,
        MaxResultCount: this.pagesize,
        person: this.person,
        beginCreationTime: subStartTime,
        endCreationTime: subEndTime,
        beginCompleteTime: comStartTime,
        endCompleteTime: comEndTime,
        type: this.orderType
      }
      this.GetWorkOrderList(param);
      this.isScreen = !this.isScreen;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.workOrder-box {
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
        }
        .item_content {
          display: flex;
          /deep/ .el-date-editor {
            width: 160px;
          }
          /deep/ .el-date-editor:first-child {
            margin-right: 15px;
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

    .table-box {
      border: 1px solid #ddd;
      box-sizing: border-box;
    }

    .page-box {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

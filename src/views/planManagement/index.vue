<template>
  <div class="task_management_pages button-box">
    <!-- <page-top ref='top'></page-top> -->
    <div class="header-box">
      <div class="header-left">
        <div class="left-button">
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
        </div>
        <div class="left-search">
          <snt-search :placeholder="'请输入任务名称'" />
        </div>
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain @click="openAdd">新增</el-button>
          <el-button type="primary" plain @click="restart">重启</el-button>
          <el-button type="primary" plain @click="del">删除</el-button>
          <el-button type="primary" plain @click="suspend">暂停</el-button>

          <el-button type="primary" plain>导出</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="content-box">
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="planList"
          :stripe="true"
          tooltip-effect="dark"
          height="830"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="name"
            label="计划名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cycle"
            label="巡检周期"
          ></el-table-column>
          <el-table-column
            prop="participant"
            label="负责人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="person"
            label="参与人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="endTime"
            label="预计到期时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="statuStr"
            label="计划状态"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <div class="operate-box">
                <el-button
                  type="text"
                  class="operate-button"
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
      <page
        :page-data="[30, 40, 50, 100]"
        :total="400"
      ></page>
    </div>
    <!-- 新增任务弹框 -->
    <add-plan
      :dialog-add="dialogAdd"
      @getAddData="getAddData"
    ></add-plan>

    <!-- 任务详情弹窗 -->
    <view-plan
      :dialog-view="dialogView"
      @closeView="closeView"
    ></view-plan>

    <!-- 修改任务弹窗 -->
    <edit-plan
      :dialog-edit="dialogEdit"
      @closeEdit="closeEdit"
    ></edit-plan>

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
  </div>
</template>

<script>
import Search from '@/components/search';
import Page from '@/components/page/Page.vue';
import AddPlan from './addPlan/index.vue';
import ViewPlan from './viewPlan/ViewPlan.vue';
import EditPlan from './editPlan/index.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import Operate from '@/components/operationTips/OperationTips.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('planManagement');
export default {
  components: {
    'snt-search': Search,
    Page,
    AddPlan,
    ViewPlan,
    EditPlan,
    Message,
    Operate
  },
  data() {
    return {
      // 按状态筛选的状态内容
      statusList: [
        '全部',
        '进行中',
        '暂停',
        '已到期'
      ],

      // 当前活动状态
      currentState: 0,

      // table多选后的数据
      multipleSelection: [],

      // 当前分页
      currentPage: 1,

      // 当前每页数量
      pageSize: 30,

      // 是否打开新增弹窗
      dialogAdd: false,

      // 是否打开详情弹窗
      dialogView: false,

      // 是否打开修改弹窗
      dialogEdit: true,

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

      // 计划详情
      details: ''
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(['planList', 'planDetails'])
  },
  methods: {
    ...mapActions([
      'getPlanList',
      'getMounthDate',
      'getPlanDetails',
      'changeEdit',
      'UpdatePlanStatuById',
      'deletePlan'
    ]),
    // 按状态筛选则并为input添加样式
    searchConditional(index) {
      this.currentState = index;
      this.$store.commit('taskManagement/update_taskStatus', index);
      this.getTaskList(this.pageInfo);
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
        return false;
      } else {
        return true;
      }
    },
    // 获取列表数据
    getData() {
      let param = {
        status: this.currentState,
        pageIndex: this.currentPage,
        maxResultCount: this.pageSize
      };
      console.log(param);
      this.getPlanList(param);
    },
    // 获取从新增页面返回来的值
    getAddData(data) {
      this.dialogAdd = data;
    },
    // 打开新增弹窗
    openAdd() {
      this.getMounthDate();
      this.dialogAdd = true;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(row) {
      if (row.status == 2) {
        let param = {
          Id: row.id
        };
        this.getPlanDetails(param);
        this.changeEdit(this.planDetails);
      } else {
        this.messageText = '该状态不能修改';
        this.dialogMessage = true;
      }
    },
    handleSee(row) {
      console.log(row);
      let param = {
        Id: row.id
      };
      this.getPlanDetails(param);
      // this.dialogView = true;
    },

    //关闭查看弹窗
    closeView(data) {
      this.dialogView = data;
    },

    // 关闭修改弹窗
    closeEdit(data) {
      console.log(data);
      this.dialogEdit = data;
    },

    // 关闭消息提示弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },

    // 关闭操作提示弹窗
    closeOperate(data) {
      this.dialogOperate = data;
    },

    // 重启计划
    restart() {
      // 返回为真时进行下一步
      if (this.onlyOne()) {
        if (this.multipleSelection[0].status == 2) {
          // 状态为3可暂停，其他状态无法重启
          // 操作弹窗
          this.messageT = '请确认操作';
          this.operateType = 'restart';
          this.dialogOperate = true;
        } else {
          this.messageText = '该状态不能重启';
          this.dialogMessage = true;
        }
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
          if (item.status == 2) {
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

    // 暂停任务
    suspend() {
      if (this.onlyOne()) {
        if (this.multipleSelection[0].status != 1) {
          this.messageText = '该状态不能暂停';
          this.dialogMessage = true;
        } else {
          // 操作弹窗
          this.messageT = '请确认操作';
          this.operateType = 'suspend';
          this.dialogOperate = true;
        }
      }
    },
    // 操作弹窗点击了确定
    determine(data) {
      this.dialogOperate = data.flag;
      let param = {};
      if (data.type == 'restart') {
        // 重启
        param.id = this.multipleSelection[0].id;
        param.status = 1;
        this.UpdatePlanStatuById(param);
      } else if (data.type == 'del') {
        // 删除
        this.multipleSelection.forEach(item => {
          let param = {
            id: item.id
          };
          this.deletePlan(param);
        });
      } else if (data.type == 'suspend') {
        // 暂停
        param.id = this.multipleSelection[0].id;
        param.status = 2;
        this.UpdatePlanStatuById(param);
      }
    }
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
      .left-button {}
      .left-search {
        .search-box {
          margin-left: 20px;
          display: flex;

          .search-button {
            margin-left: 5px;
          }
        }
      }
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
    }
  }
}
</style>

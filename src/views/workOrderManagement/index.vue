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
          <el-button type="primary" plain>新增</el-button>
          <el-button type="primary" plain>删除</el-button>
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
          <div class="item-title">工单类型：</div>
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
          <div class="item-content">
            <el-date-picker
              v-model="submissionTime"
              type="datetime"
              placeholder="提交时间"
            ></el-date-picker>
          </div>
        </div>
        <div class="item has-two">
          <div class="item-title">工单完成时间：</div>
          <div class="item-content">
            <el-date-picker
              v-model="completionTime"
              type="datetime"
              placeholder="完成时间"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="button-group-box">
        <el-button type="primary" plain>搜索</el-button>
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
            min-width="120"
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
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="completeTime"
            min-width="110"
            label="工单完成时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="status"
            label="工单状态"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="180">
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
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <page
          :page-data="[30, 40, 50, 100]"
          :total="400"
          @changePageSize="changePageSize"
          @changeCurrentPage="changeCurrentPage"
        ></page>
      </div>
    </div>
    <!-- 选择人员 -->
    <choose-people
      :dialog-charge="dialogCharge"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <!-- 新增 -->
    <add-order :dialog-add="dialogAdd" @closeAdd="closeAdd"></add-order>

    <!-- 修改 -->
    <edit-order :dialog-edit="dialogEdit"
      @closeEdit="closeEdit"></edit-order>
    <!-- 提示弹窗 -->
    <tips
      :dialog-tips="dialogTips"
      :msg="'请确认操作'"
      @closeTips="closeTips"></tips>

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
import Tips from '@/components/tipsDialog/index.vue';
import AddOrder from './Add.vue';
import EditOrder from './EditOrder.vue';
import OrderDetail from './OrderDetail.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('workOrderManagement');
export default {
  name: 'workOrder',
  components: {
    ChoosePeople,
    Page,
    Tips,
    AddOrder,
    EditOrder,
    OrderDetail
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
      // 异常类型
      orderType: 0,
      // 提交时间
      submissionTime: '',
      // 完成时间
      completionTime: '',

      // 是否显示提示窗
      dialogTips: false,

      // 是否显示修改
      dialogEdit: false,

      // 是否显示查看
      dialogView: false,

      // 是否显示新增
      dialogAdd: true
    };
  },
  computed: {
    ...mapState(['orderTypeData', 'orderList'])
  },
  methods: {
    // 按状态筛选则并为input添加样式
    searchConditional(index) {
      this.currentIndex = index;
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
    // 点击选择负责人按钮
    choosePerson() {
      this.dialogCharge = true;
    },
    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      console.log(data);
      this.dialogCharge = data.dialogCharge;
    },
    // 选择负责人弹窗选择了负责人并点击了确定按钮
    checkedPerson(data) {
      console.log(data);
      this.dialogCharge = data.dialogCharge;
      this.addForm.inCharge = data.name;
    },
    // 异常类型选择
    selectType() {
      console.log(this.orderType);
    },

    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },

    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      this.currentPage = data;
    },

    // 关闭任务
    handleClose(index, row) {
      this.dialogTips = true;
      console.log(index, row);
    },

    // 转工单
    handleEdit(index, row) {
      this.dialogEdit = true;
      console.log(index, row);
    },

    // 查看任务
    handleSee(index, row) {
      this.dialogView = true;
      console.log(index, row);
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

    // 关闭提示窗
    closeTips(data) {
      this.dialogTips = data;
    },

    // 关闭新增
    closeAdd(data) {
      this.dialogAdd = data.dialogAdd;
    }
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

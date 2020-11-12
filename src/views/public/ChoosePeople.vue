<template>
  <div
    class="choosePeople-box dialog-box button-box"
    @click.stop="closeShowBox"
  >
    <el-dialog
      title="选择人员"
      :visible="dialogCharge"
      :before-close="closeChoosePeople"
    >
      <div class="content-box">
        <div class="content_box">
          <div class="content-left">
            <div class="select_box">
              <el-select
                v-model="typeSelectValue"
                placeholder="请选择"
                @change="getType"
              >
                <el-option
                  v-for="item in selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="select-content-box">
              <!-- 按组织选择 -->
              <div v-if="typeSelectValue == 1" class="organization-box">
                <layer-tree
                  :treedata="organizationData"
                  :labelname="'orgName'"
                  :childrenname="'roleItems'"
                  @nodeClick="nodeClick"
                >
                </layer-tree>
              </div>
              <!-- 按角色选择 -->
              <div v-if="typeSelectValue == 2" class="role-box">
                <layer-tree
                  :treedata="roleData"
                  :labelname="'roleName'"
                  :childrenname="'roleItems'"
                  @nodeClick="getRoleNode"
                >
                </layer-tree>
              </div>
              <!-- 按人员选择 -->
              <div v-if="typeSelectValue == 3" class="people-box">
                <div class="peoele-title">按人员排序</div>
                <ul>
                  <li
                    class="item-li"
                    v-for="(item, index) in pinData"
                    :key="index"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="content-right-top">
              <!-- <div class="search-box">
                <el-input
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  v-model="searchWords"
                ></el-input>
                <el-button
                  class="search-button"
                  type="primary"
                  @click.stop="searchPeople"
                >
                  查询
                </el-button>
              </div> -->
              <div class="selected-person-box">
                <div class="selected-button">
                  <el-button type="primary" @click.stop="changeShowBox">
                    已选人员
                    <i
                      :class="
                        showSelectBox == true
                          ? 'el-icon-arrow-up'
                          : 'el-icon-arrow-down'
                      "
                    ></i>
                  </el-button>
                </div>
                <div v-show="showSelectBox" class="selected-person">
                  <ul v-if="selectedData.length != 0">
                    <li
                      class="selected-item"
                      v-for="(item, index) in selectedData"
                      :key="index"
                    >
                      {{ item.nickName }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="table-box">
              <el-table
                v-if="selectType == 'single'"
                v-loading="loading"
                :data="personList"
                :stripe="true"
                tooltip-effect="dark"
                height="400"
                style="width: 100%"
                :highlight-current-row="true"
                @row-click="clickRow"
              >
                <el-table-column
                  prop="loginAccount"
                  label="账号"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="nickName"
                  label="姓名"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="orgName"
                  label="部门"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="mobile"
                  label="联系方式"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
              <el-table
                v-if="selectType == 'multiple'"
                v-loading="loading"
                ref="multipleTable"
                :data="personList"
                :stripe="true"
                tooltip-effect="dark"
                height="400"
                style="width: 100%"
                :highlight-current-row="true"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column
                  prop="loginAccount"
                  label="账号"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="nickName"
                  label="姓名"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="orgName"
                  label="部门"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="mobile"
                  label="联系方式"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
            <div v-if="personList.length != 0" class="page-box">
              <page
                :page-data="personPageData"
                :total="persontotalCount"
                @changePageSize="changePageSize"
                @changeCurrentPage="changeCurrentPage"
              ></page>
              <!-- <page
                :page-data="[30, 40, 50, 100]"
                :total="400"
                layout="detail,total"
                @changePageSize="changePageSize"
                @changeCurrentPage="changeCurrentPage"
              ></page> -->
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="closeChoosePeople">取 消</el-button>
        <el-button type="primary" @click.stop="determine">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      @closeMessage="closeMessage"
    ></message>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import LayerTree from '@/components/tree/LayerTree.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('xunjianPublic');
export default {
  name: 'ChoosePeople',
  // props: ['dialogCharge', 'selectType'],
  props:{
    dialogCharge:{
      type:Boolean
    },
    selectType:{
      type:String,
      default:'single'
    }
  },
  components: {
    Page,
    LayerTree,
    Message
  },
  data() {
    return {
      searchWords: '',
      personInfo: '',
      // 选择值
      typeSelectValue: 1,
      // 选择type数据
      selectData: [
        {
          value: 1,
          label: '按组织选择'
        },
        {
          value: 2,
          label: '按角色选择'
        },
        {
          value: 3,
          label: '按人员选择'
        }
      ],
      // 返回的人员总数据有多少条
      // total: 100,
      // 已经选中的人员
      selectedData: [],
      // 多选后的数据
      multipleSelection: [],
      // 组织数据
      orgData: [],
      // 组织默认显示的项与孩子节点的名称
      defaultOrgProps: {
        children: 'items',
        label: 'orgName'
      },
      // 是否显示已选人员div
      showSelectBox: false,
      currentPage: 1,
      pageSize: 30,
      // 当前dialog是否显示了
      dialogShow: false,
      typeId: 0,

      // 是否显示提示消息弹窗
      dialogMessage: false
    };
  },
  mounted() {
    this.pageSize = this.personPageData[0];
  },
  computed: {
    ...mapState([
      'personList',
      'organizationData',
      'pinData',
      'roleData',
      'persontotalCount',
      'loading',
      'personPageData',
      'messageText'
    ])
  },
  methods: {
    ...mapActions(['getPeopleList', 'getOrganizationData', 'setMessage']),
    closeChoosePeople() {
      let data = {
        dialogCharge: false
      };
      this.$emit('closeChoosePeople', data);
    },
    // 选中的行
    clickRow(val) {
      // this.personInfo = val;
      this.selectedData = [];
      this.selectedData.push(val);
    },
    // 多选
    // 多选选择后拿到的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectedData = this.multipleSelection;
    },
    // 点击确定
    determine() {
      console.log(this.selectedData);
      if (this.selectedData.length == 0) {
        if (this.selectType == 'single') {
          this.setMessage('请选择负责人！');
        } else {
          this.setMessage('请选择参与人！');
        }
        
        this.dialogMessage = true;
        // alert('请选择负责人！');
        return;
      } else {
        let data = {
          type: this.selectType,
          personinfo: this.selectedData,
          dialogCharge: false
        };

        this.$emit('checkedPerson', data);
        this.clearPerson();
      }
    },
    // 清除选中的数据
    clearPerson(){
      this.selectedData = [];
    },
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 是否显示已选人员
    changeShowBox() {
      this.showSelectBox = !this.showSelectBox;
    },
    // 点击其他位置关闭已选人员
    closeShowBox() {
      this.showSelectBox = false;
    },
    // 选择搜索类型
    getType(val) {
      this.typeSelectValue = val;
    },
    // 点击树形节点(组织)并查询人员
    nodeClick(data) {
      console.log(data.nodeData);
      this.typeId = data.nodeData.id;
      let param = {
        SelectType: this.typeSelectValue,
        TypeId: data.nodeData.id,
        PageIndex: this.currentPage,
        MaxResultCount: this.pageSize,
        IsContainSublevel: false
      };
      this.getPeopleList(param);
    },
    // 点击树形节点（角色）并查询人员
    getRoleNode(data) {
      if (data.nodeData.disabled) {
        this.typeId = 0;
        return;
      }
      this.typeId = data.nodeData.id;
      let param = {
        SelectType: this.typeSelectValue,
        TypeId: data.nodeData.roleId,
        PageIndex: this.currentPage,
        MaxResultCount: this.pageSize,
        IsContainSublevel: false
      };
      this.getPeopleList(param);
    },
    // 点击搜索
    searchPeople() {
      if (this.searchWords == '') {
        alert('请输入选择关键字');
        return;
      }
      
      let param = {
        SelectType: this.typeSelectValue,
        TypeId: this.typeId,
        PageIndex: this.currentPage,
        MaxResultCount: this.pageSize,
        IsContainSublevel: false
      };
      this.getPeopleList(param);
    },
    // 关闭提示消息弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/public.scss';
.choosePeople-box {
  /deep/ & > .el-dialog {
    width: 900px !important;
  }
  .content-box {
    .content_box {
      display: flex;
      justify-content: space-between;

      .content-left {
        width: 228px;
        margin-right: 14px;

        .select-content-box {
          border: 1px solid #e5e5e5;
          border-radius: 5px;
          height: 410px;
          overflow: hidden;
          margin-top: 10px;

          .organization-box,
          .role-box {
            width: 100%;
            height: 100%;
          }

          .people-box {
            width: 100%;
            height: 100%;
            .peoele-title {
              line-height: 35px;
              padding-left: 10px;
              color: #999999;
            }

            .item-li {
              line-height: 22px;
              padding-left: 20px;
              cursor: pointer;
            }
            .item-li:hover {
              color: #4b77be;
            }
          }
        }
      }

      .content-right {
        flex: 1;

        .content-right-top {
          /* display: flex;
          justify-content: space-between; */
          text-align: right;

          .selected-person-box {
            position: relative;

            .selected-person {
              position: absolute;
              top: 33px;
              right: 0;
              width: 200px;
              height: 420px;
              background: #ffffff;
              border: 1px solid #e5e5e5;
              border-radius: 5px;
              box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.1);
              z-index: 22;

              ul {
                list-style: none;

                .selected-item {
                  line-height: 20px;
                  padding: 5px 10px;
                }
              }
            }
          }
        }
      }
    }
    .search-box {
      display: flex;

      .el-input {
        width: 200px;
      }

      .search-button {
        margin-left: 5px;
      }
    }

    .table-box {
      margin: 10px 0;
      border: 1px solid #ddd;
      border-bottom: none;
      box-sizing: border-box;

      .el-table--striped
        .el-table__body
        tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
        td {
        background-color: #f5f5f5;
      }
    }

    .page-box {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

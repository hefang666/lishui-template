<template>
  <div class="realtimepreview">
    <div class="left">
      <div class="monitoringTit">分组轮播</div>
      <!-- 添加 -->
      <i
        class="el-icon-circle-plus-outline icons"
        @click="handleswiperadd(1)"
      ></i>
      <!-- 修改 -->
      <i class="el-icon-edit-outline icons"></i>
      <!-- 删除 -->
      <i class="el-icon-delete icons"></i>
      <el-input
        size="mini"
        placeholder="搜索..."
        suffix-icon="el-icon-search"
        class="monitoringInput"
        v-model="filterText"
      ></el-input>
      <el-tree
        :data="data"
        :props="defaultProps"
        default-expand-all
        :render-content="renderContent"
        :filter-node-method="filterNode"
        @node-click="handlenodeclick"
      ></el-tree>
    </div>
    <div class="right">
      <div class="iconwap">
        <i class="el-icon-monitor"></i>
      </div>
      <div class="iconwap">
        <i class="el-icon-menu"></i>
      </div>
      <div class="iconwap">
        <i class="el-icon-s-grid"></i>
      </div>
    </div>

    <!-- 点击添加弹框 -->
    <div class="addTask-box dialog-box button-box">
      <el-dialog
        title="轮播分组"
        :visible.sync="swiperAdddialogVisible"
        width="60%"
        @close="swiperclose"
      >
        <div class="form-box">
          <el-form
            :model="addruleForm"
            :rules="addrules"
            ref="addruleFormref"
            label-width="100px"
            :inline="true"
          >
            <el-form-item label="分组名称" prop="carouselName">
              <el-input v-model="addruleForm.carouselName"></el-input>
            </el-form-item>
            <el-form-item label="轮播间隔" prop="spacing">
              <div class="swiperdiv">
                <el-input
                  type="number"
                  v-model="addruleForm.spacing"
                ></el-input>
                <span>秒</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="swiperoperation">
          <span>选择轮播监控点：</span>
          <div class="operation">
            <el-button-group>
              <el-button type="primary" plain size="mini" @click="swiperadd"
                >添加</el-button
              >
              <el-button type="primary" plain size="mini" @click="updown(1)"
                >上移</el-button
              >
              <el-button type="primary" plain size="mini" @click="updown(2)"
                >下移</el-button
              >
              <el-button type="primary" plain size="mini">删除</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="content-box">
          <div class="table-box">
            <el-table
              :data="operationtable"
              border
              @selection-change="handleswiper"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column
                prop="channelName"
                label="监控点名称"
              ></el-table-column>
              <el-table-column
                prop="deviceName"
                label="所属区域"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click.stop="sortUp(scope.$index)"
                    >上移</el-button
                  >
                  <el-button type="text" @click.stop="sortDown(scope.$index)"
                    >下移</el-button
                  >
                  <el-button type="text" @click="operationdele">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="swiperAdddialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="operationtablesubmit"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>

    <!-- 添加轮播监测点 -->
    <div class="addTask-box dialog-box button-box">
      <el-dialog
        title="添加轮播监测点"
        :visible.sync="addswiperdialog"
        width="50%"
        @close="swiperaddclose"
      >
        <div class="addall">
          <div class="addleft">
            <div class="addtop">①、请选择监控点所在区域</div>
            <div class="addleftcent">
              <div class="search-box leftcenter">
                <el-input
                  v-model="leftsearch"
                  placeholder="搜索区域名称"
                  prefix-icon="el-icon-search"
                ></el-input>
                <el-button type="primary" size="mini">查 询</el-button>
              </div>
              <el-tree
                :data="leftTree"
                :props="leftTreeprops"
                default-expand-all
                @node-click="handlecicknode"
              ></el-tree>
            </div>
          </div>
          <div class="addright">
            <div class="addtop">②、请选择需要添加的轮播分组的监控点</div>
            <div class="addleftcents">
              <div class="search-box leftcenter">
                <el-input
                  v-model="leftsearch"
                  placeholder="搜索监控点名称"
                  prefix-icon="el-icon-search"
                ></el-input>
                <el-button type="primary" size="mini">查 询</el-button>
              </div>
              <div class="checktop">
                <el-checkbox
                  class="checkboxels"
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                  v-if="node.length != 0"
                  >监控点名称</el-checkbox
                >
                <div style="margin: 10px 0;"></div>
                <el-checkbox-group
                  v-model="checkednode"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="(item, index) in node"
                    :label="item"
                    :key="index"
                    ><i class="el-icon-edit icons"></i
                    >{{ item.channelName }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addswiperdialog = false">取 消</el-button>
          <el-button type="primary" @click="swipersubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  data() {
    return {
      //树形结构
      data: [],
      // 过滤树形字段
      filterText: '',
      // 树形结构关系
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      //   添加弹框是否显示
      swiperAdddialogVisible: false,
      //  添加轮播监测点是否显示
      addswiperdialog: false,
      // 添加轮播监测点左侧查询
      leftsearch: '',
      // 选中树形字节点
      treenode: {},
      //   添加弹框表单
      addruleForm: {
        carouselName: '',
        spacing: ''
      },
      //   添加弹框验证
      addrules: {
        carouselName: [
          {required: true, message: '请输入分组名称', trigger: 'blur'},
          {max: 30, message: '最大长度30字', trigger: 'blur'}
        ],
        spacing: [
          {required: true, message: '请输入数字轮播间隔', trigger: 'blur'},
          {max: 3, message: '最大轮播间隔999秒', trigger: 'blur'}
        ]
      },
      // 添加/修改
      typeAE: 0,
      // 轮播分组弹框全选
      newshandleswiperarr: [],
      // 添加弹框table
      operationtable: [],
      leftTree: [
        {
          label: '一级1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        }
      ],
      leftTreeprops: {
        children: 'children',
        label: 'name'
      },

      isIndeterminate: false,
      // 是否全选
      checkAll: false,
      // 选中的子节点
      checkednode: [],
      // 初始化循环
      node: []
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.handleinto();
  },
  methods: {
    // 初始化树形结构
    handleinto() {
      this.$HTTPPOST(this.api.CLoadForTree).then(res => {
        this.data = res.result;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 点击树形结构子节点
    handlenodeclick(val) {
      if (val.children == null || val.children.length == 0) {
        let newnode = Object.assign({}, val);
        this.treenode = newnode;
        console.log('val :>> ', val);
        let data = {
          carouselName: val.name,
          userId: val.id.split('-').pop()
        };
        this.$HTTPPOST(this.api.CarouselList, data).then(res => {
          console.log('res :>> ', res);
        });
      }
    },
    // 轮播分组点击添加
    swiperadd() {
      // 初始化添加轮播监测点tree
      this.$HTTPPOST(this.api.AllTree).then(res => {
        console.log('res :>> ', res);
        this.leftTree = res.result;
      });
      this.addswiperdialog = true;
    },
    // 点击添加按钮（初始页面）
    handleswiperadd(type) {
      this.typeAE = type;
      console.log('type :>> ', type);
      this.swiperAdddialogVisible = true;
    },
    // 轮播分组弹框全选(table)
    handleswiper(val) {
      console.log('val :>> ', val);
      this.newshandleswiperarr = val;
    },
    updown(type) {
      let {newshandleswiperarr, operationtable} = this;
      if (newshandleswiperarr.length == 1) {
        let theindex = 0
        operationtable.map((item, index) => {
          if (newshandleswiperarr[0].id == item.id) {
            return theindex = index
          }
        });
        if(type == 1){
          this.sortUp(theindex)
        }else{
          this.sortDown(theindex)
        }
      } else {
        this.$message.error('一次只能处理一条数据');
      }
    },
    // 轮播分组弹框确认
    operationtablesubmit() {
      this.$refs.addruleFormref.validate(val => {
        if (val) {
          this.operationtable.map((item,index) => {
            item.sort = index
          })
          console.log('this. :>> ', this.operationtable);
          // this.$HTTPPOST(this.api.InsertAndJoin);
        }
      });
    },
    // 上移按钮(table)
    sortUp(index) {
      if (index === 0) {
        this.$message({
          message: '已经是列表中第一个素材！',
          type: 'warning'
        });
      } else {
        let temp = this.operationtable[index - 1];
        Vue.set(this.operationtable, index - 1, this.operationtable[index]);
        Vue.set(this.operationtable, index, temp);
      }
    },
    // 下移按钮(table)
    sortDown(index) {
      console.log('index++ :>> ', this.operationtable);
      if (index === this.operationtable.length - 1) {
        this.$message({
          message: '已经是列表中最后一个素材！',
          type: 'warning'
        });
      } else {
        let i = this.operationtable[index + 1];
        Vue.set(this.operationtable, index + 1, this.operationtable[index]);
        Vue.set(this.operationtable, index, i);
      }
    },
    // 点击全选
    handleCheckAllChange(val) {
      this.checkednode = val ? this.node : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let newnode = [...value];
      this.checkednode = newnode;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.node.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.node.length;
    },
    // 点击添加轮播监测点左侧tree
    handlecicknode(val) {
      if (val.children == null || val.children.length == 0) {
        let id = val.id.split('-').pop();
        this.$HTTPPOST(this.api.CameraList + '?' + `DeviceId=${id}`).then(
          res => {
            this.node = res.result;
          }
        );
      }
    },
    // 点击添加轮播监测点确认
    swipersubmit() {
      this.operationtable = [...this.operationtable, ...this.checkednode];
      this.addswiperdialog = false;
    },
    // 轮播分组弹框删除(table)
    operationdele() {},
    // 轮播分组弹框关闭
    swiperclose() {
      this.operationtable = [];
      this.$refs.addruleFormref.resetFields();
    },
    // 关闭添加轮播监测点弹框
    swiperaddclose() {
      this.node = []
      this.checkAll = false
      this.isIndeterminate = false
    },
    // 树形添加图标
    renderContent(h, {node, data}) {
      if (!data.children) {
        return (
          <span class="custom-tree-node">
            <i class="el-icon-s-custom"></i>
            <span>{node.label}</span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.realtimepreview {
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  overflow: hidden;
}
.search-box {
  display: inline-block;
  vertical-align: middle;
  .el-input {
    width: 250px;
    font-size: 12px;
    margin-right: 10px;
  }
  .search-button {
    margin-left: 5px;
  }
  .el-input__inner {
    height: 28px;
    line-height: 28px;
    border: 1px solid #4b77be;
  }
  .el-input__icon {
    line-height: 28px;
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #c0c4cc;
    outline: 0;
  }
  .el-input--mini .el-input__inner {
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
  }
  .search-button {
    height: 28px;
    line-height: 28px;
    padding: 0 20px;
    vertical-align: top;
    background: #4b77be;
    border-color: #4b77be;
    &:hover,
    &:focus {
      opacity: 0.9;
    }
  }
}
.left {
  position: absolute;
  width: 190px;
  padding: 10px;
  min-height: calc(100vh - 24px);
  overflow: hidden;
  transition: width 0.28s;
  border-right: 1px solid #e6e6e6;
  /* background-color: #00569F;
  color: #fff; */
}
.right {
  margin-left: 190px;
  overflow: hidden;
  flex: 1;
  padding: 10px;
}
.videoDiv {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.videoDiv_n4 .videobox {
  width: 45%;
}
.videoDiv_n1 .videobox {
  width: 90%;
}
.monitoringTit {
  font-weight: bold;
  margin-bottom: 10px;
}
.monitoringInput {
  margin: 10px 0;
}
.videobox {
  width: 30%;
  border: 1px solid blue;
  margin-bottom: 5px;
}
.iconwap {
  display: inline-block;
  font-size: 22px;
  margin-right: 5px;
}
.icons {
  font-size: 20px;
  margin: 0 10px;
}
.swiperdiv {
  display: flex;
  justify-content: space-between;
}
.swiperdiv span {
  display: inline-block;
  margin-left: 5px;
}
.swiperoperation {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
}
.content-box {
  padding: 10px 16px 16px 16px;
}
.table-box {
  border: 1px solid #ddd;
  box-sizing: border-box;
}
.form-box {
  margin-top: 10px;
}
.addall {
  display: flex;
}
.addleft {
  width: 40%;
}
.addright {
  width: 60%;
}
.addtop {
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: rgba(242, 222, 222, 1);
}
.addleftcents {
  width: 100%;
  height: 640px;
  padding-left: 16px;
  border-left: 1px solid #d5d5d5;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.addleftcent {
  width: 100%;
  height: 200px;
  padding-left: 16px;
  margin-top: 10px;
}
.leftcenter {
  display: flex;
}
/deep/ .el-checkbox {
  display: block;
}
.checktop {
  width: 57%;
  margin-top: 10px;
}
.el-checkbox__label {
  padding-left: 40px;
}
.el-checkbox {
  margin-bottom: 10px;
}
.icons {
  margin-right: 10px;
}
// .checkboxels{
//   background: #4b77be;
//   color: white;
// }
</style>

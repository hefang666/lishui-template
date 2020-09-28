<template>
  <div class="DirectoryManagement button-box">
    <div class="header-box">
      <!-- header-left -->
      <div class="">
        <div class="search-box">
          <el-input
            v-model="searchtit"
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
          ></el-input>
          <el-button type="primary" size="mini" @click="serchcha"
            >查询</el-button
          >
        </div>
      </div>

      <div class="header-right">
        <el-button-group>
          <el-button type="primary" plain @click="handleModify(0)"
            >新增</el-button
          >
          <el-button
            type="primary"
            plain
            :disabled="allchecknum.length == 1 ? false : true"
            @click="handleModify(1)"
            >修改</el-button
          >
          <el-button
            type="primary"
            plain
            :disabled="allchenckdel.length >= 1 ? false : true"
            @click="handleDele"
            >删除</el-button
          >
          <el-button
            type="primary"
            plain
            :disabled="allchecknum.length == 1 ? false : true"
            @click="handleModify(2)"
            >详情</el-button
          >
          <el-button
            type="primary"
            plain
            :disabled="allchecknum.length == 1 ? false : true"
            @click="handleassociated('')"
            >关联角色</el-button
          >
        </el-button-group>
      </div>
    </div>

    <!-- 表格 -->
    <!-- <el-table
      :data="managementList"
      row-key="id"
      default-expand-all
      :header-cell-style="{background: '#4b77be', color: 'white'}"
      :tree-props="{children: 'children'}"
      ref="managementRef"
      @selection-change="handlemangeChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="编码"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="creationTime"
        label="编码创建时间"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-button type="text" @click="handlecoding">编码设备</el-button>
          <el-button type="text" @click="handleassociated">关联角色</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <vxe-table
      resizable
      show-overflow
      keep-source
      ref="xTree"
      row-id="id"
      height="830"
      style="width: 100%"
      :tree-config="treeConfig"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="managementList"
      @checkbox-all="handlecheckall"
      @checkbox-change="handlemangeChange"
    >
      <vxe-table-column
        type="checkbox"
        width="60"
        align="center"
      ></vxe-table-column>
      <vxe-table-column field="name" title="名称" tree-node></vxe-table-column>
      <vxe-table-column field="code" title="编码"></vxe-table-column>
      <vxe-table-column
        field="creationTime"
        title="编码创建时间"
      ></vxe-table-column>
      <vxe-table-column title="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handlecoding(scope.row)"
            >编码设备</el-button
          >
          <el-button type="text" @click="handleassociated(scope.row)"
            >关联角色</el-button
          >
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 新增/修改/详情目录 -->
    <div class="addTask-box dialog-box button-box">
      <el-dialog
        :title="UorDtit[UorD]"
        :visible.sync="updatedirectory"
        @close="handledialogclose"
        width="50%"
      >
        <div class="content-box form-box">
          <el-form
            :model="directoryruleForm"
            :rules="directoryrules"
            ref="directoryruleFormref"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="上 级:" prop="parentId">
              <el-select
                v-model="mineStatusValue"
                ref="myselect"
                placeholder="请选择活动区域"
                :disabled="UorD == 0 || UorD == 1 ? false : true"
              >
                <!-- <el-option
              :label="items.name"
              :value="items.id"
              v-for="(items, index) in managementList"
              :key="index"
            ></el-option> -->
                <el-option
                  :value="directoryruleForm.parentId"
                  style="height:auto;background:white"
                >
                  <el-tree
                    :data="managementList"
                    default-expand-all
                    :props="managementprops"
                    @node-click="handleclick"
                  >
                  </el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名 称:" prop="name">
              <el-input
                v-model="directoryruleForm.name"
                class="detailinput"
                :disabled="UorD == 0 || UorD == 1 ? false : true"
              ></el-input>
            </el-form-item>
            <el-form-item label="备 注:" prop="code">
              <el-input
                type="textarea"
                v-model="directoryruleForm.code"
                :disabled="UorD == 0 || UorD == 1 ? false : true"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-checkbox v-model="addcheckbox" v-if="UorD == 0 || UorD == 1"
            >保存并关闭窗口</el-checkbox
          >
          <el-button
            type="primary"
            v-if="UorD == 0 || UorD == 1"
            @click="handleinsetsubmit"
            >保 存</el-button
          >
          <el-button @click="updatedirectory = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 关联角色 -->

    <div class="addTask-box dialog-box button-box">
      <el-dialog
        title="关联角色"
        :visible.sync="associateddialog"
        width="40%"
        @close="handleassoclose"
      >
        <div class="content-box">
          <div>账号信息：{{ roletit }}</div>
          <div class="permissions">
            请选择权限:
            <div style="display:block" class="thebutton">
              <el-button round>角色选择</el-button>
            </div>
          </div>

          <div class="theTree">
            <el-tree
              :data="data"
              node-key="id"
              :default-checked-keys="defaultKey"
              :props="defaultProps1"
              default-expand-all
              show-checkbox
              ref="treeref"
              :render-content="associatedrender"
            ></el-tree>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="associateddialog = false">取 消</el-button>
          <el-button type="primary" @click="handleascosubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <ssdialog
      :CodingdialogVisible="CodingdialogVisible"
      :codingList="codingList"
      :rows="rows"
      @clearDialog="clearDialog"
    ></ssdialog>
  </div>
</template>
<script>
import ssdialog from './componts/Dialog';
export default {
  components: {
    ssdialog
  },
  data() {
    return {
      //搜索名称
      searchtit: '',
      UorDtit: ['新增', '修改', '详情'],
      // 项目管理修改详情切换 0是新增 1是修改 2是详情
      UorD: 0,
      //编码弹窗是否显示
      CodingdialogVisible: false,
      //修改目录是否显示
      updatedirectory: false,
      //关联角色是否显示
      associateddialog: false,
      //全中数组
      allchecknum: [],
      //选中删除数组
      allchenckdel: [],
      //详情选择个数
      detailsnum: 0,
      // 保存并关闭
      addcheckbox: false,
      // vxetable配置
      treeConfig: {
        children: 'children',
        expandAll: true,
        reserve: true
      },
      // table
      managementList: [],
      managementprops: {
        children: 'children',
        label: 'name'
      },
      // 将初始化上级赋值给mineStatusValue
      mineStatusValue: '',
      // 初始上级值
      infomineStatusValue: '',
      //点击当前节点
      nownode: {},
      //修改目录表单
      directoryruleForm: {
        id: '',
        parentId: '',
        name: '',
        code: ''
      },
      directoryrules: {
        parentId: [{required: true, message: '请选择上级', trigger: 'change'}],
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {max: 20, message: '长度在20个字符', trigger: 'blur'}
        ]
      },
      // 编码设备信息列表
      codingList: [],
      // 点击编码设备row信息
      rows: {},
      // 关联角色名称
      roletit: '',
      // 关联角色id
      roleid: '',
      //关联角色树
      data: [],
      //关联角色config
      defaultProps1: {
        children: 'roleItems',
        label: 'orgName'
      },
      //默认选中节点id
      defaultKey: []
    };
  },
  mounted() {
    this.handleinfo();
    this.roletree();
  },
  methods: {
    // 查询
    serchcha() {
      this.$HTTPPOST(
        this.api.DetailsTree + '?' + `name=${this.searchtit}`
      ).then(res => {
        // console.log('res :>> ', res);
        this.ischildren(res.result);
        this.managementList = res.result;
      });
    },
    // 初始化table
    handleinfo(name) {
      let data = {
        name
      };
      this.$HTTPPOST(this.api.DetailsTree, data).then(res => {
        this.ischildren(res.result);
        this.managementList = res.result;
      });
    },
    //递归时间
    ischildren(array) {
      for (let i in array) {
        var data = array[i];
        data.creationTime = data.creationTime.replace('T', ' ');
        if (data.children.length > 0) {
          data.children.map(item => {
            item.creationTime = item.creationTime.replace('T', ' ');
          });
          this.ischildren(data.children);
        } else {
          data.creationTime = data.creationTime.replace('T', ' ');
        }
      }
    },
    // 初始化角色关联
    roletree() {
      this.$HTTPGET(this.api.GetRoleTree).then(res => {
        res.result.map(item => {
          if (item.roleItems) {
            item.roleItems.map(items => {
              items.orgName = items.roleName;
              items.id = items.roleId;
            });
          }
        });
        this.data = res.result;
      });
    },
    //全选
    handlecheckall(val) {
      this.allchenckdel = val.records;
    },
    //   目录管理单选
    handlemangeChange(val) {
      this.nownode = val.row;
      let vals = this.$refs.xTree.getCheckboxRecords();
      this.allchenckdel = vals;
      let newsvals = [];
      vals.map(item => {
        if (item.children.length == 0) {
          return newsvals.push(item);
        }
      });
      if (vals.length > 0) {
        this.infomineStatusValue = vals[vals.length - 1].parentName;
        this.directoryruleForm.parentId = vals[vals.length - 1].parentId;
      }
      this.allchecknum = newsvals;
    },
    // 目录管理修改
    handleModify(type) {
      this.UorD = type;
      if (type == 1 || type == 2) {
        this.mineStatusValue = this.infomineStatusValue;
        this.directoryruleForm.id = this.allchecknum[0].id;
        this.directoryruleForm.name = this.allchecknum[0].name;
        this.directoryruleForm.code = this.allchecknum[0].code;
      } else {
        this.mineStatusValue = '';
        this.directoryruleForm.name = '';
        this.directoryruleForm.code = '';
      }
      this.updatedirectory = true;
    },
    // 点击关联角色书形子node
    handleclick(val) {
      this.mineStatusValue = val.name;
      this.directoryruleForm.parentId = val.id;
      console.log('val :>> ', this.directoryruleForm);
      this.$refs.myselect.handleClose();
    },
    // 点击新增保存
    handleinsetsubmit() {
      this.$refs.directoryruleForm.validate(val => {
        if (val) {
          if (this.UorD == 0) {
            this.$HTTPPOST(this.api.Insert, this.directoryruleForm).then(
              res => {
                if (res.success) {
                  this.updatedirectory = false;
                  this.handleinfo();
                }
              }
            );
          } else if (this.UorD == 1) {
            this.$HTTPPUT(this.api.Update, this.directoryruleForm).then(res => {
              if (res.success) {
                this.updatedirectory = false;
                this.handleinfo();
              }
            });
          }
        }
      });
    },
    // 批量删除
    handleDele() {
      let delArray = [];
      this.allchenckdel.map(item => {
        delArray.push(item.id);
      });

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$HTTPPOST(this.api.DeleteGroups, delArray).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.handleinfo();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 新增/修改/详情关闭弹框
    handledialogclose() {
      // this.mineStatusValue = '';
      // this.$refs.xTree.clearCheckboxRow()
      this.$refs['directoryruleFormref'].resetFields();
    },
    // 点击关联角色
    handleassociated(row) {
      if (row != '') {
        this.roletit = row.name;
        this.roleid = row.id;
      } else {
        this.roleid = this.nownode.id;
        this.roletit = this.nownode.name;
      }
      this.associateddialog = true;
    },
    // 点击设备编码
    handlecoding(row) {
      this.rows = row;
      let data = {
        id: row.id
      };
      this.$HTTPGET(this.api.Get, data).then(res => {
        // console.log('res :>> ', res);
        // let ress = JSON.stringify(res)
        this.codingList = res.result.devices;
      });
      this.CodingdialogVisible = true;
    },
    // 树形结构添加图标
    associatedrender(h, {node, data}) {
      if (!data.children) {
        return (
          <span class="custom-tree-node">
            <i class="el-icon-user-solid"></i>
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
    },
    handleassoclose() {},
    // 关联角色确定
    handleascosubmit() {
      let id = this.roleid;
      let roles = [
        ...this.$refs.treeref.getHalfCheckedKeys(),
        ...this.$refs.treeref.getCheckedKeys()
      ];
      let data = {
        id,
        roles
      };
      this.$HTTPPOST(this.api.JoinRoles, data).then(res => {
        if (res.success) {
          this.associateddialog = false;
        }
      });
    },
    clearDialog() {
      this.CodingdialogVisible = false;
    }
  }
};
</script>
<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
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
.DirectoryManagement {
  padding: 10px;
}
.el-table {
  margin-top: 15px;
  /* font-size: 12px; */
}
.el-checkbox {
  float: left;
}
.codingheader {
  display: flex;
  justify-content: flex-end;
}
.addDiv {
  display: flex;
  justify-content: space-between;
}
.detailheader {
  width: 33%;
  margin-bottom: 5px;
  display: inline-block;
}
.detailinput {
  width: 40%;
}
.detailinfovideo {
  width: 100%;
  margin-top: 5px;
}
.permissions {
  margin-top: 10px;
}
/deep/ .vxe-table {
  margin-top: 10px;
}
.header-box {
  display: flex;
  justify-content: space-between;

  .header-left {
    display: flex;

    .search-box {
      margin-left: 20px;
      display: flex;

      .search-button {
        margin-left: 5px;
      }
    }
  }
}
/deep/ .vxe-table .vxe-header--column:not(.col--ellipsis) {
  padding: 5px 0;
  background-color: #4b77be;
  color: white;
  font-size: 12px;
}
/deep/ .vxe-table .vxe-body--column.col--ellipsis,
.vxe-table.vxe-editable .vxe-body--column {
  height: 23px;
  padding: 5px 0;
}
/deep/ .el-select-dropdown__item.hover {
  background-color: white;
}
.content-box {
  padding: 10px 16px 16px 16px;
}
.table-box {
  border: 1px solid #ddd;
  box-sizing: border-box;
}
.page-box {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.thebutton {
  margin: 10px 0;
}
.theTree {
  width: 70%;
  padding: 10px;
  border: 1px solid #4b77be;
  border-radius: 8px;
  margin-top: 10px;
}
/deep/ .el-textarea__inner{
  border: 1px solid #4b77be;
}
</style>

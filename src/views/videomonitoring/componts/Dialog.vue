<template name="ssdialog">
  <div>
    <!-- 编码弹框 -->
    <div class="addTask-box dialog-box button-box">
      <el-dialog
        title="编码设备信息"
        :visible.sync="CodingdialogVisible"
        :before-close="clearDialog"
        width="60%"
      >
        <!-- 顶部按钮 -->
        <div class="codingheader">
          <el-button-group>
            <el-button type="primary" plain @click="handleheaderAdd"
              >添加</el-button
            >
            <el-button
              type="primary"
              plain
              @click="handleupdate('', 1)"
              :disabled="encodingnum.length == 1 ? false : true"
              >修改</el-button
            >
            <el-button
              type="primary"
              plain
              @click="handleDele('')"
              :disabled="encodingnum.length == 1 ? false : true"
              >删除</el-button
            >
            <el-button
              type="primary"
              plain
              @click="handledetails('')"
              :disabled="encodingnum.length == 1 ? false : true"
              >详情</el-button
            >
          </el-button-group>
        </div>
        <!-- 编码table -->
        <div class="content-box">
          <div class="table-box">
            <el-table
              :data="codingList"
              ref="codingRef"
              :stripe="true"
              tooltip-effect="dark"
              height="430"
              style="width: 100%"
              @selection-change="codingChange"
            >
              <el-table-column
                type="selection"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="deviceName"
                label="设备名称"
                align="center"
              ></el-table-column>
              <!-- <el-table-column
                prop="address"
                label="所属区域"
                align="center"
              ></el-table-column> -->
              <el-table-column
                prop="protocol"
                label="接入协议"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="ip"
                label="IP地址及端口号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="sequenceNumber"
                label="设备序列号"
                align="center"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleupdate(scope.row, 1)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="handleDele(scope.row)"
                    >删除</el-button
                  >
                  <el-button type="text" @click="handledetails(scope.row)"
                    >详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="clearDialog">取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 点击添加/修改 -->
    <div class="addTask-box dialog-box button-box">
      <el-dialog
        title="新增编码设备"
        :visible.sync="devicedialogVisible"
        @close="addEditbox"
        width="40%"
      >
        <div class="content-box form-box">
          <el-form
            :model="deviceruleForm"
            :rules="devicerules"
            inline
            ref="contentForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div class="select_box">
              <el-form-item label="接入协议:" prop="protocol">
                <el-select
                  v-model="deviceruleForm.protocol"
                  placeholder="请选协议类型"
                >
                  <el-option
                    :label="item.text"
                    :value="item.value"
                    v-for="(item, index) in newprotocol"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <el-form-item label="设备名称" prop="deviceName">
              <el-input v-model="deviceruleForm.deviceName"></el-input>
            </el-form-item>
            <el-form-item label="IP地址:" prop="ip">
              <el-input v-model="deviceruleForm.ip"></el-input>
            </el-form-item>
            <el-form-item label="序号:" prop="sequenceNumber">
              <el-input v-model="deviceruleForm.sequenceNumber"></el-input>
            </el-form-item>
            <el-form-item label="端口号:" prop="port">
              <el-input v-model="deviceruleForm.port"></el-input>
            </el-form-item>
            <el-form-item label="设备账号:" prop="account">
              <el-input v-model="deviceruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="登陆密码:" prop="password">
              <el-input v-model="deviceruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="备注:" class="textitem">
              <el-input
                type="textarea"
                :rows="3"
                v-model="deviceruleForm.description"
                placeholder="请输入备注......"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-checkbox v-model="addcheckbox">保存并关闭窗口</el-checkbox>
          <el-button type="primary">在线检测</el-button>
          <el-button type="primary" @click="handleSubmit">保 存</el-button>
          <el-button @click="devicedialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 详情 -->
    <div class="addTask-box dialog-box button-box">
      <el-dialog title="详情" :visible.sync="detailsdialogVisible" width="60%">
        <div class="content-box">
          <div v-if="detailslistH" class="detailtop">
            <div class="detailheader">
              设备名称：{{ detailslistH.deviceName }}
            </div>
            <div class="detailheader">
              接入协议：{{ detailslistH.protocol }}
            </div>
            <div class="detailheader">
              IP地址及端口号：{{ detailslistH.ip }}
            </div>
            <div class="detailheader">设备账号：{{ detailslistH.account }}</div>
            <div class="detailheader">
              设备序列号：{{ detailslistH.sequenceNumber }}
            </div>
          </div>
          <div class="table-box">
            <el-table
              :data="detailslistTable"
              ref="detailRef"
              :stripe="true"
              tooltip-effect="dark"
              height="430"
              style="width: 100%"
              @selection-change="handledetailChange"
            >
              <el-table-column
                type="selection"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="channelName"
                label="监控点名称"
                align="center"
              ></el-table-column>
              <!-- <el-table-column
                prop="address"
                label="所属区域"
                align="center"
              ></el-table-column> -->
              <el-table-column
                prop="channelNum"
                label="通道号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="ipaddress"
                label="IP地址及端口号"
                align="center"
              ></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="minn"
                    @click="detaileditor(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="minn"
                    @click="detaildisable(scope.row)"
                    >禁用</el-button
                  >
                  <el-button
                    type="text"
                    size="minn"
                    @click="handlepreview(scope.row)"
                    >预览</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-box">
            <Page :page-data="[30, 40, 50, 100]" :total="100"></Page>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailsdialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 编辑设备 -->
    <div class="addTask-box dialog-box button-box">
      <el-dialog
        title="编辑设备"
        :visible.sync="editordialogVisible"
        @close="editoclose"
        width="30%"
      >
        <div class="content-box editbox form-box">
          <el-form
            :model="detailruleForm"
            :rules="detailrules"
            ref="detailruleFormref"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="名 称:" prop="channelName">
              <el-col :span="8">
                <el-input
                  v-model="detailruleForm.channelName"
                  class="detailinput"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="监控点类型:" prop="cameraType">
              <el-select
                v-model="detailruleForm.cameraType"
                placeholder="请选择监控点类型"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in newtypelist"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="连接协议:" prop="networkProtocol">
              <el-select
                v-model="detailruleForm.networkProtocol"
                placeholder="请选择连接协议"
              >
                <el-option
                  :label="item.text"
                  :value="item.value"
                  v-for="(item, index) in newprotocol"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="备注:">
              <el-input
                type="textarea"
                :rows="3"
                v-model="detailruleForm.note"
              ></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="经 度:" prop="longitude">
              <el-col :span="8">
                <el-input
                  v-model="detailruleForm.longitude"
                  class="detailinput"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="纬 度:" prop="latitude">
              <el-col :span="8">
                <el-input
                  v-model="detailruleForm.latitude"
                  class="detailinput"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="海 拔:" prop="altitude">
              <el-col :span="8">
                <el-input
                  v-model="detailruleForm.altitude"
                  class="detailinput"
                ></el-input>
              </el-col>
            </el-form-item> -->
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handledetailsubmit"
            >确 定</el-button
          >
          <el-button @click="editordialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 详情-预览 -->
    <div class="addTask-box dialog-box button-box">
      <el-dialog
        title="详情-预览"
        :visible.sync="detailinfodialogVisible"
        width="60%"
      >
        <div class="content-box">
          <div v-if="detailslistTable">
            <div class="detailheader">
              监控点名称:{{ detailslistH.channelName }}
            </div>
            <div class="detailheader">通道号:{{ detailslistH.channelNum }}</div>
            <div class="detailheader">
              IP地址及端口号:{{ detailslistH.ipaddress }}
            </div>
          </div>
        </div>
        <div class="videoDiv">
          <hkvideo></hkvideo>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailinfodialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="detailinfodialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
import hkvideo from './../../haikangvideo/hkvideo.vue';
export default {
  props: {
    CodingdialogVisible: {
      type: Boolean,
      default: false
    },
    codingList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rows: {
      type: Object
    }
  },
  components: {
    Page,
    hkvideo
  },
  data() {
    return {
      //编辑设备是否显示
      editordialogVisible: false,
      //详情-预览是否显示
      detailinfodialogVisible: false,
      //详情窗口是否显示
      detailsdialogVisible: false,
      // 编码设备/保存并关闭窗口
      addcheckbox: false,
      //编码设备弹窗是否显示
      devicedialogVisible: false,
      //编码设备信息选择个数
      encodingnum: [],
      // 编辑设备/表单
      detailruleForm: {},
      //   详情table
      detailslistTable: [],
      // 详情id对象
      infoidobg: {},
      // 区分添加与修改 0添加 1修改
      addEittype: 0,
      //编码设备表单
      deviceruleForm: {
        deviceName: '',
        protocol: '',
        ip: '',
        port: '8080',
        account: 'admin',
        password: '',
        sequenceNumber: '',
        ChannelCount: '0',
        description: ''
      },
      // 编码设备表单(接入协议)
      newprotocol: [],
      // 编码设备表单(监控点类型)
      newtypelist: [],
      //编码设备表单规则
      devicerules: {
        deviceName: [
          {required: true, message: '请输入设备名称', trigger: 'blur'}
        ],
        protocol: [
          {required: true, message: '请选择接入协议', trigger: 'change'}
        ],
        ip: [{required: true, message: '请输入IP地址', trigger: 'blur'}],
        port: [{required: true, message: '请输入端口号', trigger: 'blur'}],
        account: [{required: true, message: '请输入设备账号', trigger: 'blur'}],
        password: [
          {required: true, message: '请输入登陆密码', trigger: 'blur'},
          {max: 30, message: '30个字符以内', trigger: 'blur'}
        ],
        sequenceNumber: [
          {required: true, message: '请输入序号', trigger: 'blur'}
        ]
      },
      // 编辑设备/表单规则
      detailrules: {
        channelName: [{required: true, message: '请输入名称', trigger: 'blur'}],
        cameraType: [
          {required: true, message: '请输入监控点类型', trigger: 'change'}
        ]
        // longitude: [{required: true, message: '请输入经度', trigger: 'blur'}],
        // latitude: [{required: true, message: '请输入纬度', trigger: 'blur'}],
        // altitude: [{required: true, message: '请输入海拔', trigger: 'blur'}]
      },
      //   详情头部
      detailslistH: {}
    };
  },
  created() {
    window.queryheight(500, 1);
  },
  mounted() {
    this.InitializePro();
    this.typelist();
  },
  methods: {
    // 编码设备表单(初始化接入协议)
    InitializePro() {
      this.$HTTPPOST(this.api.ProtocolList).then(res => {
        this.newprotocol = res.result;
      });
    },
    // 摄像头分类列表（初始化）
    typelist() {
      this.$HTTPPOST(this.api.CameraTypeList).then(res => {
        this.newtypelist = res.result;
      });
    },
    clearDialog() {
      this.$emit('clearDialog');
    },
    // 编辑设备提交
    handledetailsubmit() {
      this.$refs.detailruleFormref.validate(val => {
        console.log(val);
        // console.log('this.detailruleForm :>> ', this.detailruleForm);
        this.$HTTPPUT(this.api.CUpdate, this.detailruleForm).then(res => {
          console.log('res :>> ', res);
          if (res.success) {
            this.handledetails(this.infoidobg);
            this.editordialogVisible = false;
          }
        });
      });
    },
    //点击详情预览
    handlepreview(row) {
      this.detailslistH = row;
      console.log('detailslistH :>> ', this.detailslistH);
      // window.clickLogin('1.207.61.91', 5581, 'admin', 'sntsoft998');
      // window.PlayAll();
      this.detailinfodialogVisible = true;
    },
    //点击详情删除
    detaildisable(row) {
      let data = {
        id: row.id
      };
      this.$confirm('此操作将禁用此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$HTTPPOST(this.api.Enable, data).then(res => {
            console.log('res :>> ', res);
            if (res.success) {
              this.$message({
                type: 'success',
                message: '禁用成功!'
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    //点击详情编辑
    detaileditor(row) {
      let newdetaileditor = Object.assign({}, row);
      this.detailruleForm = newdetaileditor;
      console.log('detailruleForm :>> ', this.detailruleForm);
      this.editordialogVisible = true;
    },
    // 关闭编辑设备弹窗(重置表单)
    editoclose() {
      this.$refs['detailruleFormref'].resetFields();
    },
    // 详情全选
    handledetailChange(e) {
      this.detailsnum = e.length;
    },
    //编码设备提交
    handleSubmit() {
      this.$refs.contentForm.validate(val => {
        if (val) {
          if (this.addEittype == 0) {
            // 提交添加
            this.deviceruleForm.GroupId = this.$props.rows.id;
            this.$HTTPPOST(this.api.DInsert, this.deviceruleForm).then(res => {
              if (res.success) {
                this.devicedialogVisible = false;
                this.$parent.handlecoding(this.$props.rows);
              }
            });
          } else {
            this.$HTTPPUT(this.api.DUpdate, this.deviceruleForm).then(res => {
              console.log('res :>> ', res);
              if (res.success) {
                this.devicedialogVisible = false;
                this.$parent.handlecoding(this.$props.rows);
              }
            });
          }
        }
      });
    },
    // 编码设备信息/详情
    handledetails(row) {
      console.log('row :>> ', row);
      let id = 0;
      let rowes = {};
      let newobg = Object.assign({}, row);
      this.infoidobg = newobg;
      if (row) {
        rowes = row;
        id = row.id;
        this.detailslistH = row;
      } else {
        rowes = this.encodingnum[0];
        id = this.encodingnum[0].id;
        this.detailslistH = this.encodingnum[0];
      }
      this.$HTTPPOST(this.api.CameraList + '?' + `DeviceId=${id}`).then(res => {
        console.log('res :>> ', res);
        res.result.map(item => {
          item.ipaddress = `${rowes.ip} ${rowes.port}`;
        });
        this.detailslistTable = res.result;
      });
      this.detailsdialogVisible = true;
    },
    // 编码设备信息/删除
    handleDele(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let data = {};
          if (row != '') {
            data.id = row.id;
          } else {
            console.log('没有 :>> ', '没有');
            data.id = this.encodingnum[0].id;
          }
          this.$HTTPDEL(this.api.dDelete, data).then(res => {
            console.log('res :>> ', res);
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$parent.handlecoding(this.$props.rows);
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
    // 编码设备信息/更新
    handleupdate(row, type) {
      this.addEittype = type;
      if (row != '') {
        let newrows = Object.assign({}, row);
        this.deviceruleForm = newrows;
      } else {
        console.log('row :>> ', row);
        let newrows = Object.assign({}, this.encodingnum[0]);
        this.deviceruleForm = newrows;
      }
      this.devicedialogVisible = true;
    },
    // 顶部按钮/添加
    handleheaderAdd() {
      this.devicedialogVisible = true;
    },
    // 编码table中的全选
    codingChange(e) {
      this.encodingnum = e;
    },
    // 点击添加/修改(弹出关闭)
    addEditbox() {
      // this.deviceruleForm.description = ''
      // this.deviceruleForm = {
      //   deviceName: '',
      //   protocol: '',
      //   ip: '',
      //   port: '8080',
      //   account: 'admin',
      //   password: '',
      //   sequenceNumber: '',
      //   ChannelCount: '0',
      //   description: ''
      // };
      this.$refs['contentForm'].resetFields();
    }
  }
};
</script>
<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.videoDiv {
  width: 100%;
}
.detailheader {
  display: inline-block;
  width: 30%;
  margin-bottom: 10px;
}
.codingheader {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
}
.el-checkbox {
  float: left;
}
.codingheader {
  margin-top: 10px;
}
.content-box {
  padding: 10px 16px 16px 16px;
}
.button-box[data-v-b92c3d8c] .el-button {
  padding: 0 9px;
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
.button-box[data-v-b92c3d8c] .el-button-group .el-button {
  line-height: 18px;
}
/deep/ .el-table td {
  height: 23px;
  padding: 5px 0;
}
.textitem {
  width: 100%;
  /deep/ .el-form-item__content {
    width: calc(100% - 100px);
  }
}
.editbox {
  /deep/ .el-form-item__content {
    // width: 30%;
  }
  /deep/ .el-input__inner {
    border-color: #4b77be;
  }
}
/deep/ .el-textarea__inner{
  border: 1px solid #4b77be;
}
</style>

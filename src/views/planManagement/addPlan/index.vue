<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog
      title="新增任务"
      :visible.sync="dialogAdd"
      :close-on-click-modal="false"
      :before-close="closeAdd"
    >
      <div class="content-box form-box">
        <div class="content_box">
          <div>
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>任务名称：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-input
                      v-model="planName"
                      autocomplete="off"
                    ></el-input>
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>负责人：</span>
                </div>
                <div class="content">
                  <el-button
                    class="choose-active"
                    type="primary"
                    plain
                    v-if="inCharge != ''"
                    v-model="inCharge"
                  >
                    {{ inCharge }}
                  </el-button>
                  <el-button type="primary" plain @click="choosePerson"
                    >选择人员</el-button
                  >
                </div>
              </div>
            </div>
            <div class="list-item has-two-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>巡检片区：</span>
                </div>
                <div class="content">
                  <div class="list-item-content-box">
                    <el-button
                      class="choose-active"
                      type="primary"
                      plain
                      v-if="areaInfo.name != ''"
                      v-model="areaInfo.name"
                    >
                      {{ areaInfo.name }}
                    </el-button>
                    <el-button
                      type="primary"
                      plain
                      @click="chooseArea"
                    >
                      选择片区
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>参与人：</span>
                </div>
                <div class="content">
                  <el-button
                    class="choose-active"
                    type="primary"
                    plain
                    v-for="(item, index) in participants"
                    :key="index"
                  >
                    {{ item.trueName }}
                  </el-button>
                  <el-button
                    type="primary"
                    plain
                    @click="choosePar"
                  >
                    选择人员
                  </el-button>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>计划周期：</span>
                </div>
                <div class="conten">
                  <div class="tabs-box">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                      <el-tab-pane label="每周" name="weekly">
                        <div class="tabs-content">
                          <div class="title-box">
                            <span>每周:</span>
                            <span class="tips">*</span>
                          </div>
                          <div class="select-box">
                            <el-select
                              v-model="selectWeek"
                              placeholder="请选择"
                              @change="getSelectWeek"
                            >
                              <el-option
                                v-for="(item, index) in weeklyData"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="每月" name="monthly">
                        <div class="tabs-content">
                          <div class="title-box">
                            <span>每月:</span>
                            <span class="tips">*</span>
                          </div>
                          <div class="select-box">
                            <el-select
                              v-model="selectMonth"
                              placeholder="请选择"
                              @change="getSelectMonth"
                            >
                              <el-option
                                v-for="(item, index) in monthlyData"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="自定义" name="custom">
                        <div class="custom-box">
                          <div
                            v-for="(item, index) in customNum"
                            :key="index"
                            class="item-box"
                          >
                            <div class="title-box">第{{ item }}次：</div>
                            <div class="item-content-box">
                              <div class="time-box">
                                <el-date-picker
                                  v-model="customDate[index].beginTime"
                                  type="datetime"
                                  format="yyyy-MM-dd HH:mm"
                                  :picker-options="pickerOptions"
                                  placeholder="开始时间"
                                ></el-date-picker>
                              </div>
                              <div class="text-box">至</div>
                              <div class="time-box">
                                <el-date-picker
                                  v-model="customDate[index].endTime"
                                  type="datetime"
                                  format="yyyy-MM-dd HH:mm"
                                  :picker-options="pickerOptions"
                                  placeholder="结束时间"
                                ></el-date-picker>
                              </div>
                              <div class="icon-box">
                                <span
                                  :class="[
                                    'iconfont',
                                    'icon',
                                    index == (customNum - 1)
                                      ? 'icon-jia'
                                      : 'icon-jian'
                                  ]"
                                  :data-op="
                                    index == (customNum - 1) ? 'jia' : 'jian'
                                  "
                                  :data-index="index"
                                  @click="operate"
                                ></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="activeName == 'weekly' || activeName == 'monthly'"
              class="list-item"
            >
              <div class="items-box">
                <div class="title">
                  <span class="tips">*</span>
                  <span>计划时效：</span>
                </div>
                <div class="content">
                  <el-date-picker
                    v-model="timeLimit"
                    type="date"
                    format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    placeholder="请选择日期"
                  ></el-date-picker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      @closeMessage="closeMessage"
    ></message>

    <!-- 选择负责人 -->
    <choose-people
      :dialog-charge="dialogCharge"
      :select-type="'single'"
      @closeChoosePeople="closeChoosePeople"
      @checkedPerson="checkedPerson"
    ></choose-people>

    <!-- 选择负责人 -->
    <choose-people
      :dialog-charge="dialogPar"
      :select-type="'multiple'"
      @closeChoosePeople="closePar"
      @checkedPerson="checkedPar"
    ></choose-people>

    <!-- 选择片区 -->
    <choose-area
      :dialog-area="dialogArea"
      :type="'view'"
      @closeChooseArea="closeChooseArea"
      @checkedArea="checkedArea"
    ></choose-area>
  </div>
</template>

<script>
import '@/fonts/iconfont.css';
import ChoosePeople from '@/views/public/ChoosePeople.vue';
import ChooseArea from '@/views/public/ChooseArea.vue';
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {
  mapState: planState,
  mapActions: planActions
} = createNamespacedHelpers('planManagement');
const {mapActions: xunjianActions} = createNamespacedHelpers('xunjianPublic');
import {judgeTime, parseTime, mGetDate} from '@/utils/index';
export default {
  name: 'AddPlan',
  props: ['dialogAdd'],
  components: {
    ChoosePeople,
    ChooseArea,
    Message
  },
  computed: {
    ...planState(['weeklyData', 'monthlyData', 'messageText'])
  },
  data() {
    return {
      // 负责人弹窗状态
      dialogCharge: false,

      // 巡检片区弹窗状态
      dialogArea: false,

      // 是否显示提示消息弹窗
      dialogMessage: false,

      // 计划名称
      planName: '',

      // 负责人
      inCharge: '',

      // 负责人信息
      inChargeInfo: {},

      // 是否显示参与人弹窗
      dialogPar: false,

      // 参与人
      participants: [],

      // 片区信息
      areaInfo: {
        name: ''
      },

      // tab当前显示在哪个上面
      activeName: 'weekly',

      // 每周下拉框选择的数据
      selectWeek: '',

      // 每月下拉框选择的数据
      selectMonth: '',

      // 自定义当前有几次任务
      customNum: 1,

      // 自定义时间集合
      customDate: [
        {
          beginTime: '',
          endTime: ''
        }
      ],

      // 计划时效
      timeLimit: '',

       // 日期限制
       pickerOptions: {
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
          return time.getTime() <= Date.now();    //禁用今天以及以前的日期
        }
      }
    };
  },
  methods: {
    ...xunjianActions(['getOrganizationData', 'getRoleData', 'getAreaLists']),
    ...planActions(['addPlan', 'setMessage']),
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      let data = false;
      this.$emit('closeAdd', data);
    },

    // 点击选择负责人按钮
    choosePerson() {
      this.getOrganizationData();
      this.getRoleData();
      this.dialogCharge = true;
    },

    // 点击选择参与人
    choosePar() {
      this.getOrganizationData();
      this.getRoleData();
      this.dialogPar = true;
    },

    // 关闭选择负责人弹窗
    closeChoosePeople(data) {
      this.dialogCharge = data.dialogCharge;
    },

    // 选择负责人弹窗选择了负责人并点击了确定按钮
    checkedPerson(data) {
      console.log(data);
      this.dialogCharge = data.dialogCharge;
      this.inCharge = data.personinfo[0].trueName;
      this.inChargeInfo = data.personinfo[0];
      console.log(this.inChargeInfo);
    },

    // 关闭选择参与人弹窗
    closePar(data) {
      console.log(data);
      this.dialogPar = data.dialogCharge;
    },

    // 关闭消息提示弹窗
    closeMessage(data) {
      this.dialogMessage = data;
    },

    // 选择了参与人并点击了确定
    checkedPar(data) {
      console.log(data);
      this.dialogPar = data.dialogCharge;
      this.participants = data.personinfo;
      console.log(this.participants);
    },

    // 点击选择片区按钮
    chooseArea() {
      let param = {
        pageIndex: 1,
        maxResultCount: 30
      }
      this.getAreaLists(param);
      this.dialogArea = true;
    },

    // 关闭选择片区弹窗
    closeChooseArea(data) {
      this.dialogArea = data.dialogArea;
    },

    // 选择片区弹窗选择了片区并点击了确定按钮
    checkedArea(data) {
      console.log(data);
      this.dialogArea = data.dialogArea;
      this.areaInfo = data.areaInfo;
      // this.addForm.inCharge = data.name;
    },

    // 每周选择
    getSelectWeek(val) {
      this.selectWeek = val;
    },

    //每月选择
    getSelectMonth(val) {
      this.selectMonth = val;
    },

    // tab切换
    handleClick() {},

    // 点击自定义每行后面的操作
    operate() {
      var ev = ev || window.event,
        target = ev.target || ev.srcElement,
        opStr = target.getAttribute('data-op'),
        opIndex = target.getAttribute('data-index');
      // console.log(opIndex);
      if (opStr == 'jia') {
        if (this.customNum < 12) {
          this.customDate.push({
            beginTime: '',
            endTime: ''
          });
          this.customNum++;
        } else {
          this.setMessage('最多只能添加12条数据');
          this.dialogMessage = true;
          // console.log('最多只能添加12条数据');
        }
      } else if (opStr == 'jian') {
        this.customDate.splice(opIndex, 1);
        this.customNum--;
      }
    },

    // 清除所填信息
    clearData() {
      this.activeName = 'weekly';
      this.planName = '';
      this.inCharge = '';
      this.inChargeInfo = {};
      this.areaInfo = {
        name: ''
      };
      this.participants = [];
      this.selectWeek = '';
      this.selectMonth = '';
      this.customNum = 1,
      this.customDate = [
        {
          beginTime: '',
          endTime: ''
        }
      ];
      this.timeLimit = '';
    },

    // 点击确定
    determine() {
      let dayStr = '';
      let user = [],
        timeList = [],
        cycle;
      if (this.inCharge == '') {
        this.setMessage('请选择负责人');
        this.dialogMessage = true;
        return;
      }

      if (this.participants.length == 0) {
        this.setMessage('请选择参与人');
        this.dialogMessage = true;
        return;
      } else {
        this.participants.forEach(item => {
          user.push({
            userId: item.id,
            userName: item.trueName
          });
        });
      }

      if (this.planName == '') {
        this.setMessage('请输入计划名称');
        this.dialogMessage = true;
        return;
      }

      if (this.activeName == 'weekly') {
        cycle = 1;
        if (this.selectWeek == '') {
          this.setMessage('请选择每周时间');
          this.dialogMessage = true;
          return;
        } else {
          if (this.timeLimit == '') {
            this.setMessage('请选择计划时效');
            this.dialogMessage = true;
            return;
          }
        }
      } else if (this.activeName == 'monthly') {
        cycle = 2;
        if (this.selectMonth == '') {
          this.setMessage('请选择每月时间');
          this.dialogMessage = true;
          return;
        } else {
          if (this.timeLimit == '') {
            this.setMessage('请选择计划时效');
            this.dialogMessage = true;
            return;
          }
        }
      } else if (this.activeName == 'custom') {
        cycle = 3;
        this.customDate.forEach(item => {
          if (item.beginTime == '' || item.endTime == '') {
            this.setMessage('请选择自定义时间');
            this.dialogMessage = true;
            return;
          } else {
            item.beginTime = parseTime(item.beginTime, '{y}-{m}-{d} {h}:{i}');
            item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
          }
        });
      }

      // 判断所选时间是否符合要求
      //当前日期
      let startTime = new Date();
      let start = parseTime(startTime, '{y}-{m}-{d}');

      // 计划时效日期
      let limitTime = parseTime(this.timeLimit, '{y}-{m}-{d}');
      if (this.activeName == 'weekly') {
        // 计划时效超过当前日期一周以上
        let interval = 7 * 24;
        if (judgeTime(start, limitTime, interval)) {
          dayStr = this.selectWeek;
        } else {
          this.setMessage('时效日期必须超过当前日期一周');
          this.dialogMessage = true;
          return;
        }
      } else if (this.activeName == 'monthly') {
        // 计划时效必须大于等于一个月
        let day = mGetDate();
        let interval = day * 24;
        if (judgeTime(start, limitTime, interval)) {
          dayStr = this.selectMonth;
        } else {
          this.setMessage('时效日期必须超过当前日期一个月');
          this.dialogMessage = true;
          return;
        };
      } else if (this.activeName == 'custom') {
        // 每次时间均需要大于当前时间，每次结束时间需大于开始时间，后一次开始时间需大于前一次结束时间
        for (let i = 0; i < this.customDate.length; i++) {
          // 只需要判断第一次的时间是否大于当前时间，后面的日期就大于当前时间了
          if (i == 0) {
            let myDate = new Date();
            myDate = parseTime(myDate, '{y}-{m}-{d} {h}:{i}');
            if (judgeTime(myDate, this.customDate[i].beginTime)) {
              console.log('符合条件');
              if (
                judgeTime(
                  this.customDate[i].beginTime,
                  this.customDate[i].endTime,
                  24
                )
              ) {
                console.log('符合');
              } else {
                this.setMessage('第' + (i + 1) + '次结束时间未大于开始时间24小时');
                this.dialogMessage = true;
                return;
              }
            } else {
              this.setMessage('第' + (i + 1) + '次的开始时间未大于当前时间');
              this.dialogMessage = true;
              return;
            }
          } else {
            // 第二次及以后的自定义时间
            // 判断开始时间是否大于前一次的结束时间
            if (
              judgeTime(
                this.customDate[i - 1].endTime,
                this.customDate[i].beginTime
              )
            ) {
              console.log('符合');
              // 判断结束时间是否大于开始时间
              if (
                judgeTime(
                  this.customDate[i].beginTime,
                  this.customDate[i].endTime,
                  24
                )
              ) {
                console.log('符合');
              } else {
                this.setMessage('第' + (i + 1) + '次的开始时间未大于当前时间');
                this.dialogMessage = true;
                return;
              }
            } else {
              this.setMessage('第' + (i + 1) + '次的开始时间未大于第' + i + '次的结束时间');
              this.dialogMessage = true;
              return;
            }
          }
        }
        let length = this.customDate.length - 1;
        limitTime = parseTime(this.customDate[length].endTime, '{y}-{m}-{d}');
        timeList = this.customDate;
      }

      let param = {
        name: this.planName,
        cycle: cycle,
        personId: this.inChargeInfo.id,
        person: this.inCharge,
        areaId: this.areaInfo.id,
        status: 1,
        endTime: limitTime,
        day: dayStr,
        dateTimeLists: timeList,
        user: user
      };
      console.log(param);
      this.addPlan(param).then(res => {
        console.log(res);
        if (res.success) {
          let data = false;
          this.$emit('getAddData', data);
          this.clearData();
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
  .content-box {
    .list-item {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .items-box {
        flex: 1;
        display: flex;
        .title {
          width: 120px;
          text-align: right;
          line-height: 28px;
          .tips {
            color: red;
          }
        }
        .content {
          line-height: 28px;
        }
        .conten {
          width: 76%;
          .tabs-content {
            padding-top: 10px;
            display: flex;
            .title-box {
              margin-right: 15px;
              .tips {
                color: red;
              }
            }
            .select-box {
              width: 150px;
            }
          }
          .custom-box {
            padding-top: 10px;
            .item-box {
              display: flex;
              margin-top: 10px;
              .title-box {
                width: 80px;
              }
              .item-content-box {
                flex: 1;
                display: flex;
                .time-box {
                  width: 180px;
                  /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
                    width: 100%;
                  }
                }
                .text-box {
                  line-height: 28px;
                  margin: 0 20px;
                }
                .icon-box {
                  width: 28px;
                  height: 28px;
                  margin-left: 20px;
                  .icon {
                    font-size: 20px;
                    line-height: 28px;
                    color: #4b77be;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
    .has-two-item {
      .items-box {
        width: 46%;
      }
      .choose-active {
        color: #ffffff;
        background: #4b77be;
        border: none;
        cursor: auto;
        margin-bottom: 10px;
      }

      .list-item-content-box {
        width: 220px;
      }
    }
  }
}
</style>

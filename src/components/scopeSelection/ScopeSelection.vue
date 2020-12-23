<template>
  <div class="scope-selection-box">
    <div class="input-box" @click.stop="openSearchData">
      <el-input :placeholder="placeholderStr" v-model="showStr"></el-input>
    </div>
    <div
      v-show="dialogSearch"
      class="content-box"
    >
    
    <!-- :style="'top:' + (divTop + 40 - 500) + 'px'" -->
      <div class="container-box">
        <div class="items-box" v-if="showData.length != 0">
          <div
            v-for="(item, index) in showData"
            :key="index"
            :class="['items',item.checked ? 'items-active' : '', item.middleCheck ? 'items-middle' : '']"
            :style="'width:' + Math.floor(100 / colsNum) + '%'"
            @click.stop="checkData(item, index)"
            @mouseenter="moveEnter(item, index)"
          >{{ item.name }}</div>
        </div>
        <div class="footer">
          <span class="cancel-box" @click.stop="cancel">清空</span>
          <span
            :class="['determine-box', isDisabled ? 'button-disabled' : '']"
            @click.stop="determine"
          >确定</span>
        </div>
        <!-- 三角形 -->
        <div class="before-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {setDataAttr} from '@/utils/index';
export default {
  props: {
    datas: {
      type: Array,
      default: function() {
        return [
          {
            value: 1,
            name: '星期一',
            checked: false,
            middleCheck: false
          },
          {
            value: 2,
            name: '星期二',
            checked: false,
            middleCheck: false
          },
          {
            value: 3,
            name: '星期三',
            checked: false,
            middleCheck: false
          },
          {
            value: 4,
            name: '星期四',
            checked: false,
            middleCheck: false
          },
          {
            value: 5,
            name: '星期五',
            checked: false,
            middleCheck: false
          },
          {
            value: 6,
            name: '星期六',
            checked: false,
            middleCheck: false
          },
          {
            value: 7,
            name: '星期日',
            checked: false,
            middleCheck: false
          }
        ]
      }
    },
    colsNum: {
      type: Number,
      default: 4
    },
    placeholderStr: {
      type: String,
      default: '请选择周期'
    }
  },
  data() {
    return {
      // 经过处理后的二维数组
      showData: [],

      // 显示的数组
      newData: [],

      // 第一次点击后
      firstCheck: '',

      // 第一次点击的下标
      firstIndex: -1,

      // 第二次点击后
      secondCheck: '',

      // 第二次点击的下标
      secondIndex: -1,

      // 当前点击次数
      clickIndex: 0,

      // 是否显示选择框
      dialogSearch: false,

      // 确定按钮是否可以点击
      isDisabled: true,

      // 输入框显示的文字
      showStr: '',

      // 返回的数组
      returnData: {
        firstCheck: '',
        secondCheck: ''
      },

      // 父级窗口巨浏览器顶部的距离
      divTop: 0,
      divLeft:0
    }
  },
  // watch: {
  //   'dialogSearch': function(data) {
  //     console.log('dialogSearch: ' + data);
  //   }
  // },
  methods: {
    // 打开选择范围组件
    openSearchData() {
      this.dialogSearch = true;
      this.showData = this.datas;
      // this.divTop = document.getElementsByClassName('select-box')[0].offsetTop;
      // this.initData();
    },
    // 数据转换
    initData() {
      // var transData = setDataAttr(this.datas);
      // this.showData = processingData(transData, this.colsNum);
      this.showData = setDataAttr(this.datas);
    },
    //点击日期
    checkData(data, index) {
      this.clickIndex++;
      // console.log(this.clickIndex);
      if(this.clickIndex >= 3) {
        this.clickIndex = 1;
        this.showData = setDataAttr(this.showData);
        this.clearCheck();
      }

      if (this.clickIndex == 1) {
        // 第一次点击
        this.firstCheck = data;
        this.isDisabled = true;
        this.showStr = data.name + '  至  ';
        this.returnData.firstCheck = data.value;
        this.firstIndex = index;
      } else {
        // 第二次点击
        this.secondCheck = data;
        this.isDisabled = false;
        this.secondIndex = index;
        this.compareValue(this.firstCheck, this.secondCheck);
        this.reSetMiddle();
        this.changeMiddle(this.firstIndex, index);
      }
      this.$forceUpdate();
      this.showData[index].checked = true;

    },
    // 清空选择
    clearCheck() {
      this.firstCheck = '';
      this.secondCheck = '';
      this.showStr = '';
      // this.returnData.firstCheck = '';
      // this.returnData.secondCheck = '';
    },
    //比较两次点击事件的结果，谁更大一些
    compareValue(first, second) {
      if (first.value < second.value) {
        // 第一个的值大于第二个的值，不变；
        this.returnData.firstCheck = first.value;
        this.returnData.secondCheck = second.value;
        
        // 处理显示的数据
        this.showStr = first.name + '  至  ' + second.name;
      } else {
        this.returnData.firstCheck = second.value;
        this.returnData.secondCheck = first.value;
        
        // 处理显示的数据
        this.showStr = second.name + '  至  ' + first.name;
      }
    },
    // 鼠标移入
    moveEnter(data, index) {
      // 不等于1，代表还没有点击或者已经点击了第二次，不需要做移入的改变
      // console.log(this.clickIndex);
      if (this.clickIndex != 1) {
        return false
      }
      var end = index + 1;
      // console.log(end);
      // 改变middle的值的时候，需要先清空上一次的值
      this.$forceUpdate();
      this.reSetMiddle();
      this.changeMiddle(this.firstIndex, end);
      
      // console.log(index);
    },
    // 重置需要展示的middle的值
    reSetMiddle() {
      if (this.showData.length != 0) {
        this.showData.forEach(item => {
          item.middleCheck = false;
        })
      }
    },
    //改变middle的值（需要展示的）
    changeMiddle(start, end) {
      // console.log('start: ' + start + '; end: ' + end);
      if (this.showData.length != 0) {
        this.showData.forEach((item, index) => {
          if (index > start && index < end) {
            item.middleCheck = true;
          }
        })
      }
    },
    // 点击清空
    cancel() {
      this.clearCheck();
      // this.reSetMiddle();
      setDataAttr(this.showData);
      this.clickIndex = 0;
      this.dialogSearch = false;
      this.returnData.firstCheck = '';
      this.returnData.secondCheck = '';
      this.$emit('clearInfo', this.returnData);
    },
    // 点击确定
    determine() {
      // 将值传递出去
      // console.log(this.isDisabled);
      if (this.isDisabled) {
        return false
      }
      this.dialogSearch = false;
      // console.log(this.returnData);
      this.$emit('chooseInfo', this.returnData);
    },
    // 关闭弹出div
    closeBox() {
      if (this.dialogSearch == false) {
        return false
      }

      if (this.isDisabled) {
        // 未选完，执行点击清空操作
        this.cancel();
      } else {
        this.dialogSearch = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.scope-selection-box {
  width: 100%;
  height: 100%;
  position: relative;
  /* color: #606266;
  border: 1px solid #dfe4ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #FFFFFF;
  border-radius: 4px;
  line-height: 30px;
  margin: 5px 0;
  position: fixed;
  left: 100px;
  top: 100px;
  width: 330px;
  padding: 12px; */

  .input-box {
    width: 100%;
    height: 100%;

    /deep/ .el-input {
      font-size: 12px;
    }
    /deep/ .el-input__inner {
      height: 28px;
      line-height: 28px;
      border: 1px solid #4b77be;
    }
    /deep/ .el-input__icon {
      line-height: 28px;
    }
    /deep/ .el-input.is-active .el-input__inner,
    /deep/ .el-input__inner:focus {
      border-color: #C0C4CC;
      outline: 0
    }
    /deep/ .el-input--mini .el-input__inner{
      height: 25px;
      line-height: 25px;
      padding: 0 10px;
    }
  }

  .content-box {
    width: 100%;
    color: #606266;
    border: 1px solid #dfe4ed;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #FFFFFF;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    /* position: fixed; */
    width: 330px;
    padding: 12px;
    position: absolute;
    left: 0;
    top: 35px;
    z-index: 100;
    .container-box {
      position: relative;
      .items-box {
        display: flex;
        flex-wrap: wrap;

        .items {
          /* width: 25%; */
          height: 26px;
          line-height: 26px; 
          text-align: center;
          /* padding: 5px 0; */
          cursor: pointer;
          margin-bottom: 5px;
        }

        .items:hover {
          color: #409eff;
        }

        .items-active {
          background: #1890FF;
          color: #ffffff;
          border-radius: 2px;
          border-radius: 2px;
        }

        .items-active:hover {
          color: #ffffff;
        }

        .items-middle {
          background: #E6F7FF;
          /* border-radius: 2px;
          border-radius: 2px; */
        }
      }
      .footer {
        margin-top: 5px;
        border-top: 1px solid #e6ebf5;
        text-align: right;
        padding-top: 10px;

        .determine-box {
          background-color: #4b77be;
          border-color: #4b77be;
          font-size: 12px;
          height: 28px;
          line-height: 28px;
          padding: 0 12px;
          color: #FFFFFF;
          box-sizing: border-box;
          border-radius: 4px;
          display: inline-block;
          cursor: pointer;
        }

        .determine-box:hover {
          background-color: #395f9d;
          border-color: #395f9d;
        }

        .button-disabled {
          background-color: #fff;
          border-color: #ebeef5;
          color: #c0c4cc;
          border: 1px solid #ebeef5;
        }

        .button-disabled:hover {
          cursor: not-allowed;
          border-radius: 3px;
          background-color: #fff;
          border: 1px solid #ebeef5;
          color: #c0c4cc;
        }

        .cancel-box {
          border: 1px solid #DCDFE6;
          border-color: #DCDFE6;
          font-size: 12px;
          height: 28px;
          line-height: 28px;
          padding: 0 12px;
          box-sizing: border-box;
          border-radius: 4px;
          display: inline-block;
          cursor: pointer;
          color: #606266;
          margin-right: 10px;
        }
        .cancel-box:hover {
          color: #4b77be;
          border-color: #c9d6ec;
          background-color: #edf1f9;
        }
      }
      .before-box {
        width: 10px;
        height: 10px;
        background: #ffffff;
        position: absolute;
        top: -18px;
        left: 10%;
        border-top: 1px solid #dfe4ed;
        border-left: 1px solid #dfe4ed;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
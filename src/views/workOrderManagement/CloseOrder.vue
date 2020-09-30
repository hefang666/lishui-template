<template>
  <div class="closeOrder-box">
    <div class="dialog-box dialog_box button-box">
      <el-dialog
        title="关闭工单"
        :visible.sync="dialogClose"
        :before-close="closeOrder"
      >
        <div class="content-box form-box">
          <div class="content_box">
            <div class="left">
              <span class="tips">*</span>
              <span>关闭原因：</span>
            </div>
            <div class="right">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="reason">
              </el-input>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeOrder">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 提示消息弹窗 -->
    <message
      :dialog-message="dialogMessage"
      :message="messageText"
      @closeMessage="closeMessage"
    ></message>
  </div>
</template>

<script>
import Message from '@/components/promptMessage/PromptMessage.vue';
import {createNamespacedHelpers} from 'vuex';
const {
  mapState: orderState,
  mapActions: orderActions
} = createNamespacedHelpers('workOrderManagement');
export default {
  name: 'CloseOrder',
  props: ['dialogClose', 'orderId'],
  components: {
    Message
  },
  data() {
    return {
      // 原因
      reason: '',
      dialogMessage: false
    }
  },
  computed: {
    ...orderState(['messageText'])
  },
  methods: {
    ...orderActions(['setMessage', 'closeOrder']),
    closeOrder() {
      let data = false;
      this.$emit('closeOrder', data);
    },
    determine() {
      console.log('点击了确定');
      if (this.reason == '') {
        this.setMessage('原因不能为空！');
        this.dialogMessage = true;
        return;
      }

      let param = {
        Id: this.orderId,
        closeReason: this.reason
      }
      this.closeOrder(param).catch(() => {
        this.dialogMessage = true;
      });

      let data = false;
      this.$emit('closeOrder', data);
    },
    closeMessage(data) {
      this.dialogMessage = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.closeOrder-box {
  .content-box {
    .content_box {
      padding: 15px 20px;
      display: flex;
      .left {
        width: 120px;
        text-align: right;
        .tips {
          color:red;
        }
      }
      .right {
        flex: 1;
        font-size: 14px;
        padding-right: 20px;
      }
    }
  }
}
</style>

<template>
  <div class="viewRoute-box dialog-box button-box">
    <el-dialog title="查看路线" :visible.sync="dialogRoute">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeRoute">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="map-box"></div>
        <div class="content-right-box">
          <div class="right-box">
            <choose-equip ref="equipData"></choose-equip>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRoute">取 消</el-button>
        <el-button v-if="type == 'optional'" type="primary" @click="determine"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ChooseEquip from '@/views/public/ChooseEquipment.vue';
export default {
  name: 'AddTask',
  props: {
    dialogRoute: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'optional'
    }
  },
  components: {
    ChooseEquip
  },
  data() {
    return {};
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeRoute() {
      let data = {
        dialogRoute: false,
        data: []
      };
      this.$emit('getRouteData', data);
    },

    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    },
    // 点击确定
    determine() {
      if (this.$refs.equipData.checkedInfo == '') {
        alert('请选择设备');
      } else {
        let data = {
          dialogRoute: false,
          data: this.$refs.equipData.checkedInfo
        };
        this.$emit('getRouteData', data);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.viewRoute-box {
  .content-box {
    height: 480px;
    .map-box {
      width: 100%;
      height: 100%;
      background: rosybrown;
    }
    .content-right-box {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 460px;
      width: 315px;
      background: #ffffff;
      overflow: hidden;
      border-radius: 5px;
      .right-box {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>

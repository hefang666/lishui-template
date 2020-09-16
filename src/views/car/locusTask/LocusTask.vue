<template>
   <div class="addTask-box dialog-box button-box">
      <!--轨迹弹窗-->
      <div class="addTask-box dialog-box button-box">
        <el-dialog title="轨迹" :close-on-click-modal="false" :visible.sync="visible" :dialog-locus="dialogLocus">
            <div class="content-box form-box">
              <div class="cancel-box" @click="closeLocus">
                <i class="el-dialog__close el-icon el-icon-close"></i>
              </div>
              <div class="content_box">
                <Map ref="map" />
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeLocus">取消</el-button>
            </div>
            
        </el-dialog>
      </div>
    </div>
</template>

<script>
import Map from '../map/Map';
export default {
    components: { Map},
    props: {
        dialogLocus: {
            type: Boolean,
            default: false
        }
    },
    data (){
        return {
            visible: this.dialogLocus,
        }
    },
    watch: {
        dialogLocus() {
            this.visible = this.dialogLocus;
        }
    },
    methods:{
        // 点击取消或者右上角的×关闭轨迹弹窗
        closeLocus() {
            this.$emit("update:dialogLocus", false);
        },
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.addTask-box {
  .content-box {
    .list-item {
      display: flex;
      justify-content: space-between;
      .has-two-item {
        width: 46%;
        .list-item-content-box {
          width: 220px;
        }
      }
    }
  }
}
</style>
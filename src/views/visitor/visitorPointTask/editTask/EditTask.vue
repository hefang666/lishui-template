<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="修改访客登记点" :visible.sync="visible" :dialog-edit="dialogEdit">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeEdit">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :model="editForm" :rules="rules" ref="editFormRef">
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="访客点名称："
                label-width="120px"
                prop="pointName"
                >
                <div class="list-item-content-box">
                  <el-input
                    type="taskName"
                    v-model="editForm.pointName"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
              
            </div>
            
            <el-form-item label="备注：" label-width="120px"
              ><el-input
                type="textarea"
                :rows="3"
                v-model="editForm.remark"
                autocomplete="off"
              ></el-input
            ></el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEdit">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import { UpdateVisitPoint } from '@/api/visitor'

export default {
  name: 'EditTask',
//   props: ['dialogEdit'],
  props: {
    dialogEdit: {
      type: Boolean,
      default: false
    },
    editData: Object
  },
  data() {
    return {
      editForm: {
        id:0,
        code:'',
        pointName: '',
        remark: '',
        orgIds:[],
      },
      rules:{
        pointName: [
          { required: true, message: "请输入访客点名称", trigger: "blur" }
        ],
      },
      visible: this.dialogEdit,
      
    };
  },
  watch: {
    // 监听编辑的对象
    editData(obj){
      this.editForm = obj
    },
    // 监听编辑弹窗
    dialogEdit() {
      this.visible = this.dialogEdit;
    }
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeEdit() {
      this.$refs.editFormRef.resetFields() 
      this.$emit("update:dialogEdit", false);
    },
    // 修改信息并提交
    editSubmit() {
      this.$refs.editFormRef.validate(async valid => {
        // 如果valid的值为true，说明校验成功，反之则校验失败
        if (!valid) return
        UpdateVisitPoint(this.editForm).then(res => {
          console.log(res)
          if(res.success){
              // this.dialogAdd = false
              this.$emit("update:dialogEdit", false);
              this.$message.success('修改成功！')
              this.$parent.getList()
          }
        })
      })
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

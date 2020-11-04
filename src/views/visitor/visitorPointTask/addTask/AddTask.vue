<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="新增访客登记点" :close-on-click-modal="false" :visible.sync="visible" :dialog-add="dialogAdd" @close="dialogClose">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeAdd">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
            <div class="list-item">
              <el-form-item
                class="has-two-item"
                label="访客地点："
                label-width="120px"
                prop="pointName"
                >
                <div class="list-item-content-box">
                  <el-input
                    type="text"
                    v-model="addForm.pointName"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
            </div>
            <el-form-item 
            class="has-two-item"
            label="备注：" 
            label-width="120px"
            >
            <div class="list-item-content-box">
              <el-input
                type="textarea"
                :rows="3"
                maxlength="200"
                v-model="addForm.remark"
                show-word-limit
                autocomplete="off"
              ></el-input>
            </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { InsertVisitPoint } from '@/api/visitor'

export default {
  name: 'AddTask',
//   props:['dialogAdd'],
  props: {
    dialogAdd: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      addForm: {
        id: 0,
        code: '',
        pointName: '',
        remark: '',
        orgIds: [],
        roleIds: []
      },
      addFormRules:{
        pointName: [
          { required: true, message: "请输入访客点名称", trigger: "blur" }
        ],
      },
      visible: this.dialogAdd,
    };
  },
  watch: {
    dialogAdd() {
      this.visible = this.dialogAdd
    }
  },
  methods: {
    // 清空表单
    dialogClose(){
      this.addForm =  {
        pointName: '',
        remark: '',
      }
    },
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      this.$refs.addFormRef.resetFields() // 监听对话框关闭事件
      this.$emit("update:dialogAdd", false);
    },
    // 新增信息并提交
    addSubmit() {
      this.$refs.addFormRef.validate(async valid => {
        // 如果valid的值为true，说明校验成功，反之则校验失败
        if (!valid) return
        InsertVisitPoint(this.addForm).then(res => {
          // console.log(res)
          if(res.success){
              // this.dialogAdd = false
              this.$emit("update:dialogAdd", false);
              this.$message.success('添加成功！')
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

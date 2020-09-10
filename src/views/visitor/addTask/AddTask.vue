<template>
  <div class="addTask-box dialog-box button-box">
    <el-dialog title="新增访客登记点" :visible.sync="visible" :dialog-add="dialogAdd">
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeAdd">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <el-form :model="addForm" :rules="rules">
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
                    v-model="addForm.pointName"
                    autocomplete="off"
                  ></el-input>
                </div>
              </el-form-item>
              
            </div>
            
            <el-form-item label="备注：" label-width="120px"
              ><el-input
                type="textarea"
                :rows="3"
                v-model="addForm.remark"
                autocomplete="off"
              ></el-input
            ></el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
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
        id:'',
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
      visible: this.dialogAdd,
    };
  },
  watch: {
    dialogAdd() {
        this.visible = this.dialogAdd;
    }
  },
  methods: {
    // 点击取消或者右上角的×关闭新增弹窗
    closeAdd() {
      this.$emit("update:dialogAdd", false);
    },
    // 确定保存
    onSubmit() {
      let data = {
        id: this.id,
        code: this.addForm.code,
        pointName: this.addForm.pointName,
        remark: this.addForm.remark,
        orgIds:this.addForm.orgIds[0]
      }
      InsertVisitPoint(data).then(res => {
        console.log(res)
        if(res.success){
            // this.dialogAdd = false
            this.$emit("update:dialogAdd", false);
            this.$message.success('创建成功！')
            this.$parent.getList()
        }
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

        .choose-active {
          color: #ffffff;
          background: #4b77be;
          border: none;
          padding: 7px 6px;
          cursor: auto;
        }

        .list-item-content-box {
          width: 220px;
        }
      }
    }
  }
}
</style>

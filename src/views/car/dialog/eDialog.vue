<template>
  <div>
    <el-dialog
      title="修改车辆信息"
      :visible.sync="visible"
      :close-on-click-modal="false"
      style="width:75%;margin:0 auto;"
      :dialogVisibleFlag="dialogVisibleFlag"
      @close="handleDialogClose"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="100px"
        :rules="editFormRules"
        :inline="true"
      >
        <el-form-item label="车牌号码：" prop="carNumber">
          <el-input v-model="editForm.carNumber" />
        </el-form-item>
        <div>
          <el-form-item label="车主姓名：" prop="name">
            <el-input v-model="editForm.name" />
          </el-form-item>
          <el-form-item label="联系电话：" prop="tel">
            <el-input v-model="editForm.tel" />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="车辆颜色：" prop="color">
            <el-input v-model="editForm.color" />
          </el-form-item>
          <el-form-item label="车辆分类：" prop="carType">
            <el-select v-model="editForm.carType" placeholder="请选择车辆类型">
              <el-option label="标准民用车" value="0"></el-option>
              <el-option label="工程车辆" value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="备注：" prop="remarks">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editForm.remarks"
            maxlength="200"
            show-word-limit
            style="width:530px;"
          ></el-input>
        </el-form-item>
        <div>
          <el-form-item label="登记时间：" prop="registerDate">
            <el-date-picker
              v-model="editForm.registerDate"
              type="datetime"
              placeholder="请选择登记时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="IMEI：" prop="imei">
            <el-input v-model="editForm.imei"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "eDialog",
  components: {},
  props: {
    dialogVisibleFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.dialogVisibleFlag,
      editForm: {
        carNumber: "",
        name: "",
        tel: "",
        color: "",
        carType: "",
        remarks: "",
        registerDate: "",
        imei: ""
      },
      editFormRules: {
        carNumber: [
          { required: true, message: "请填写车牌号码", trigger: "blur" }
        ],
        name: [{ required: true, message: "请填写车主姓名", trigger: "blur" }],
        tel: [{ required: true, message: "请填写电话号码", trigger: "blur" }]
      }
    };
  },

  methods: {
    handleDialogClose() {
      this.$emit("update:dialogVisibleFlag", false);
    },
    // 保存
    onSubmit() {
      let _self = this;
      this.$emit("update:dialogVisibleFlag", false);
      _self.$message.success("保存成功！");
    }
  },
  watch: {
    dialogVisibleFlag() {
      this.visible = this.dialogVisibleFlag;
    }
  }
};
</script>

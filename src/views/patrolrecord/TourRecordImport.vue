<template>
  <div class="container">
    <div class="snt-list-left-col">
      <c-tree :treeData="treeData"></c-tree>
    </div>
     <div class="snt-table-right-col">
        <div class="upload-box">
         <el-form
          ref="ruleForm"
          inline
          :model="form"
          :rules="rules"
          label-width="110px"
        >
          <div class="list-item">
            <el-form-item 
              class="has-two-item" 
              label="选择文件：" 
              label-width="120px" 
              prop="visitorName"
            >
            <div class="list-item-content-box">
              <el-input 
              type="text" 
              v-model="form.url"
              ></el-input>
            </div>
            </el-form-item>
          </div>
          
        </el-form>
        
        </div>
        <div class="footer-btn">
          <el-button type="primary">提交</el-button>
        </div>
        
     </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import { GetOrgagencyTree } from '@/api/role';
export default {
  components: { 
    cTree, 
  },
  data (){
    return {
      // 组织机构树
      treeData: [],
      form:{
        url:''
      },
      rules:{},
    }
  },
  mounted() {
    this.getTreeData()
  },
  methods: {
    // 加载组织机构树
    getTreeData() {
      GetOrgagencyTree().then(res => {
        // console.log(res)
        if(res.success) {
          this.treeData = res.result
         
        }else {
          return false
        }
        
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';
.container{
  width:100%;
  display: flex;
  overflow: hidden;
}
.snt-list-left-col {
  position: absolute;
  width: 190px;
  height: 100%;
  min-height:calc(100vh - 10px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
}
.snt-table-right-col {
  margin-left: 190px;
  overflow: hidden;
  padding:30px;
  flex: 1;
  .upload-box{
    width: 950px;
    height: 500px;
    padding: 20px;
    margin-right: 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
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
  .footer-btn {
    width:950px;
    margin-top: 20px;
    text-align: center;
  }
  /deep/.el-button--primary{
    background-color: #4b77be;
    border-color: #4b77be;
  }
}
</style>


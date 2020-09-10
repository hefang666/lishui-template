<template>
  <div class="container">
    <div class="snt-list-left-col">
      <c-tree></c-tree>
    </div>
    <div class="snt-table-right-col">
      <div class="task_management_pages button-box">
        <div class="header-box">
          <div class="header-left">
            <div class="search-box">
              <el-input
                placeholder="请输入访客点名称"
                prefix-icon="el-icon-search"
                v-model="search"
              ></el-input>
              <el-button class="search-button" type="primary"  @click="getList">查询</el-button>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
              <el-button type="primary" plain @click="handleAdd">新增</el-button>
              <el-button type="primary" plain @click="handleDel">删除</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="content-box">
          <div class="table-box">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :stripe="true"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="pointName"
                label="访客点名称"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="operate-box">
                    <el-button
                      type="text"
                      class="operate-button"
                      @click="handleEdit(scope.$index, scope.row)"
                      >修改</el-button
                    >
                    <!-- <el-button
                      type="text"
                      class="operate-button"
                      @click="handleSee(scope.$index, scope.row)"
                      >删除</el-button
                    > -->
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <page
            :page-data="[30, 40, 50, 100]"
            :total="totalCount"
            @changePageSize="changePageSize"
            @changeCurrentPage="changeCurrentPage"
          ></page>
        </div>
        <!-- 新增弹窗 -->
        <add-task :dialogAdd.sync="dialogAdd"></add-task>
        <!-- 修改弹窗 -->
        <edit-task :editvalue="editvalue" :dialogEdit.sync="dialogEdit"></edit-task>
      </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
import AddTask from './addTask/AddTask';
import EditTask from './editTask/EditTask';
import { GetPagePointList } from '@/api/visitor';

export default {
  components: { 
    cTree, 
    Page, 
    AddTask, 
    EditTask
  },
  data() {
    return {
      search:'',
      multipleSelection: [],
      tableData:[],
      loading: false,
      // 分页参数
      pageIndex: 1,
      maxResultCount: 10,
      totalCount:0,
      
      // 是否显示新增弹窗
      dialogAdd: false,
      // 是否显示修改弹窗
      dialogEdit: false,
      editvalue:{}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      let _this=this
      _this.loading = true
      let data = {
        pointName:_this.PointName,
        pageIndex:_this.pageIndex,
        maxResultCount:_this.maxResultCount,
      }
      GetPagePointList(data).then(res => {
        console.log(res)
        if(res.success){
          setTimeout(() => {
          _this.tableData = res.result.items
          _this.totalCount =  res.result.totalCount
          _this.loading = false
        }, 300)
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 打开新增弹窗
    handleAdd() {
      this.dialogAdd = true;
    },
    
    // 删除
    handleDel(){

    },
   
    // 修改
    handleEdit(index, row){
      console.log(index, row);
      // this.$refs.editTask.dialogEdit = true
      this.dialogEdit = true
      this.editvalue = Object.assign({}, this.row, {
        id:row.id,
        code:row.code,
        pointName:row.pointName
      })
     
    },
    // 获取从分页传过来的每页多少条数据
		changePageSize(val) {
      console.log(val);
      this.PageIndex = val
      // this.getList()
		},
		// 获取从分页传过来的当前页数
		changeCurrentPage(val) {
      this.maxResultCount = val
      console.log(val);
      // this.getList()
		}
  }

}
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
  min-height:calc(100vh - 24px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
}
.snt-table-right-col {
  margin-left: 190px;
  overflow: hidden;
  // padding:30px;
  flex: 1;
  .task_management_pages {
    padding: 10px;
    .header-box {
      display: flex;
      justify-content: space-between;
      .header-left {
        display: flex;
        .search-box {
          // margin-left: 20px;
          display: flex;
          .search-button {
            margin-left: 5px;
          }
        }
      }
    }
    .content-box {
      margin-top: 10px;
      .table-box {
        border: 1px solid #ddd;
        box-sizing: border-box;
      }
      .page-box {
        margin-top: 10px;
      }
    }
  }
}
</style>


<template>
  <div class="container">
    <div class="snt-list-left-col">
      <c-tree :treeData="treeData"></c-tree>
    </div>
    <div class="snt-table-right-col">
      <div class="task_management_pages button-box">
        <div class="header-box">
          <div class="header-left">
            <div class="search-box">
              <el-input
                placeholder="请输入姓名"
                prefix-icon="el-icon-search"
                v-model="search"
              ></el-input>
              <el-button class="search-button" type="primary"  @click="getList">查询</el-button>
            </div>
          </div>
          <div class="header-right">
            <el-button-group>
              <el-button type="primary" plain>新增</el-button>
              <el-button type="primary" plain>修改</el-button>
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
                prop="UserName"
                label="姓名"
                show-overflow-tooltip
              ></el-table-column>
               <el-table-column
                prop="estimatedStartTime"
                min-width="110"
                label="考勤时间"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column label="操作" min-width="200">
                <template slot-scope="scope">
                  <div class="operate-box">
                    <el-button
                      type="text"
                      class="operate-button"
                      @click="handleEdit(scope.$index, scope.row)"
                      >查看</el-button
                    >
                   
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <page
            :page-data="[30, 40, 50, 100]"
            :total="10"
            @changePageSize="changePageSize"
            @changeCurrentPage="changeCurrentPage"
          ></page>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
import { GetOrgagencyTree } from '@/api/role';

export default {
  components: { 
    cTree, 
    Page, 
  },
  data() {
    return {
      search:'',
      multipleSelection: [],
      // 组织机构树
      treeData: [],
      // 表格数据
      tableData:[],
      loading: false,
      // 分页参数
      page: {
        pageIndex: 1,
        maxResultCount: 10,
        totalCount:0
      },
      
    }
  },
  mounted() {
    this.getList(),
    this.getTreeData()
  },
  methods: {
    // 加载组织机构树
    getTreeData() {
      GetOrgagencyTree().then(res => {
        // console.log(res)
        if(res.success) {
          this.treeData = res.result
          let id = res.result[0].id
          this.form.orgId = id
          this.getList()
        }else {
          return false
        }
        
      })
    },
    // 获取列表
    getList() {
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    
    // 获取从分页传过来的每页多少条数据
		changePageSize(data) {
			console.log(data);
		},
		// 获取从分页传过来的当前页数
		changeCurrentPage(data) {
			console.log(data);
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


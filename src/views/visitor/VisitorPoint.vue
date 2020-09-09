<template>
  <div class="container">
    <div class="m-tree-left-col">
      <c-tree></c-tree>
    </div>
    <div class="m-grid-right-col">
        <div class="task_management_pages button-box">
          <div class="header-box">
            <div class="header-left">
                <div class="search-box">
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search"></el-input>
                    <el-button class="search-button" type="primary" @click="getList">查询</el-button>
                </div>
            </div>
            <div class="header-right">
              <el-button-group>
                <el-button type="primary" plain @click="handleAdd">新增</el-button>
                <el-button type="primary" plain>删除</el-button>
              </el-button-group>
            </div>
        </div>
        <div class="content-box">
			    <div class="table-box">
            <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="tableData"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            >
             <el-table-column type="selection" width="50"></el-table-column>
              <!-- <el-table-column type="index" label="序号" width="80" /> -->
              <el-table-column prop="pointName" label="登记点名称" min-width="120" show-overflow-tooltip />
              <el-table-column prop="Remark" label="备注" min-width="120" show-overflow-tooltip />
              <el-table-column prop="operate" label="操作" min-width="120">
                  <template slot-scope="scope">
                      <el-button
                      type="text"
                      class="operate-button"
                      @click="handleEdit(scope.$index, scope.row)"
                      >修改</el-button
                      >
                      
                  </template>
              </el-table-column>
            </el-table>
          </div>
          <page :pageData="[30, 40, 50, 100]" :total="400" @changePageSize="changePageSize" @changeCurrentPage="changeCurrentPage"></page>
        </div>
        
      </div>
        
    </div>
  </div>
</template>

<script>
import cTree from "@/components/tree/cTree";
import Page from '@/components/page/Page';
import { GetPagePointList } from '@/api/visitor';

export default {
  components: { cTree, Page },
  data() {
    return {
      search:'',
      tableData:[],
      loading: false,
      // 分页参数
      page: {
        PageIndex: 1,
        MaxResultCount: 10,
        totalCount:0
      },
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
        PointName:_this.PointName,
        PageIndex:_this.page.PageIndex,
        MaxResultCount:_this.page.MaxResultCount,
      }
      GetPagePointList(data).then(res => {
        console.log(res)
        if(res.success){
          setTimeout(() => {
          _this.tableData = res.result.items
          _this.page.totalCount =  res.result.totalCount
          _this.loading = false
        }, 300)
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    // 新增
    handleAdd(){

    },
    // 修改
    handleEdit(index, row){
      console.log(index, row);
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
@import '../../styles/element-ui-new.scss';
@import '../../styles/input-public.scss';
.container{
  width:100%;
  display: flex;
  overflow: hidden;
}
.m-tree-left-col {
  position: absolute;
  width: 190px;
  min-height:calc(100vh - 24px);
  overflow: hidden;
  transition:width 0.28s;
  border-right: 1px solid #ccc;
}
.m-grid-right-col {
  margin-left: 190px;
  overflow: hidden;
  padding:30px;
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
        .operate-button {
          width: 35px;
          text-align: center;
          display: inline-block;
          color: #4b77be;
        }
      }
      .page-box {
        margin-top: 10px;
      }
    }
  }
}
</style>


<template>
  <div class="choosePeople-box dialog-box button-box">
    <el-dialog title="选择人员" :visible.sync="dialogCharge">
      <div class="content-box">
        <div class="cancel-box" @click="closeChoosePeople">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="content_box">
          <div class="search-box">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchWords"
            ></el-input>
            <el-button class="search-button" type="primary">查询</el-button>
          </div>
          <div class="table-box">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :stripe="true"
              tooltip-effect="dark"
              height="400"
              style="width: 100%"
              :highlight-current-row="true"
              @row-click="clickRow"
            >
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="tel" label="联系方式"></el-table-column>
            </el-table>
          </div>
          <page
            :page-data="[30, 40, 50, 100]"
            :total="400"
            @changePageSize="changePageSize"
            @changeCurrentPage="changeCurrentPage"
          ></page>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChoosePeople">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from '@/components/page/Page.vue';
export default {
  name: 'ChoosePeople',
  props: ['dialogCharge'],
  components: {
    Page
  },
  data() {
    return {
      searchWords: '',
      tableData: [
        {
          name: '测试人员1',
          tel: '12345678910'
        },
        {
          name: '测试人员2',
          tel: ''
        },
        {
          name: '测试人员3',
          tel: ''
        },
        {
          name: '测试人员4',
          tel: ''
        },
        {
          name: '测试人员5',
          tel: ''
        },
        {
          name: '测试人员6',
          tel: ''
        },
        {
          name: '测试人员7',
          tel: ''
        },
        {
          name: '测试人员8',
          tel: ''
        },
        {
          name: '测试人员9',
          tel: ''
        },
        {
          name: '测试人员10',
          tel: ''
        },
        {
          name: '测试人员11',
          tel: ''
        },
        {
          name: '测试人员12',
          tel: ''
        },
        {
          name: '测试人员13',
          tel: ''
        },
        {
          name: '测试人员14',
          tel: ''
        },
        {
          name: '测试人员15',
          tel: ''
        }
      ],
      checkedName: ''
    };
  },
  methods: {
    closeChoosePeople() {
      let data = {
        dialogCharge: false
      };
      this.$emit('closeChoosePeople', data);
    },
    // 选中的行
    clickRow(val) {
      console.log(val);
      this.checkedName = val.name;
    },
    // 点击确定
    determine() {
      if (this.checkedName == '') {
        alert('请选择负责人！');
        return;
      } else {
        let data = {
          name: this.checkedName,
          dialogCharge: false
        };

        this.$emit('checkedPerson', data);
      }
    },
    // 获取从分页传过来的每页多少条数据
    changePageSize(data) {
      console.log(data);
    },
    // 获取从分页传过来的当前页数
    changeCurrentPage(data) {
      console.log(data);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import '@/styles/public.scss';
.content-box {
  .search-box {
    display: flex;

    .el-input {
      width: 200px;
    }

    .search-button {
      margin-left: 5px;
    }
  }

  .table-box {
    margin: 10px 0;
    border: 1px solid #ddd;
    box-sizing: border-box;

    .el-table--striped
      .el-table__body
      tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
      td {
      background-color: #f5f5f5;
    }
  }
}
</style>

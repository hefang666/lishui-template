<template>
  <div class="index-content">
    <Map ref="map" />
    <div class="index-member">
      <div class="search-box">
        <el-input placeholder="请输入人员名称" @keyup.enter.native="searchMember" v-model="searchWords"></el-input>
        <el-button class="search-button" @click="searchMember" type="primary">查询</el-button>
      </div>
      <div class="border index-member-box">
        <div class="index-menber-title">人员列表</div>
        <el-menu class="index-member-list">
          <el-menu-item
            :class="{active: currentIndex === index}"
            v-for="(item, index) in memberList"
            :key="index"
            @click="changeMember(index)"
          >
            <img class="mr-5" :src="item.isOnline ? memberActive : memberGray" />
            <span class="title">
              <span class="mr-5">{{ item.userName }}</span>
              <span>{{ item.mobile }}</span>
            </span>
          </el-menu-item>
        </el-menu>
        <div class="index-pagination-box">
          <Page
            layout="sizes,total,jump"
            :total="pageTotal"
            :pager-count="5"
            :pageData="[5,10,15]"
            :pageLength="pageCount"
            :currentPage="pageNum"
            @handleSizeChange="changePageSize"
            @handleCurrentChange="changePageNum"
          >
          </Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from './Map';
import Page from "@/components/page/Page";
import memberActive from '@/assets/icon-member-active.png';
import memberGray from '@/assets/icon-member-gray.png';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('home');
export default {
  name: 'Home',
  data() {
    return {
      searchWords: '',
      currentIndex: -1,
      memberGray,
      memberActive
    };
  },
  computed: {
    ...mapState(['memberList', 'pageNum', 'pageCount', 'pageTotal'])
  },
  components: {
    Map,
    Page
  },
  mounted() {
    console.log(this.pageCount)
    this.getMemberList();
  },
  methods: {
    ...mapActions(['getMemberList', 'changeSearchName', 'changePageCount', 'changePageNum']),
    changeMember(index) {
      this.currentIndex = index;
      this.$refs.map.focusOnCurrentMember(index);
    },

    // 输入框回车或点击搜索处理事件
    searchMember() {
      this.changeSearchName(this.searchWords);
      this.getMemberList();
    },

    // 改变每页显示的数量
    changePageSize(num) {
      this.changePageCount(num);
    },

    // 改变显示的页数
    changePageNum(page) {
      this.changePageNum(page)
    }
  }
};
</script>
<style lang="scss">
@import '~@/styles/element-ui-new.scss';
</style>
<style lang="scss">
.index-content {
  position: absolute;
  /* top: 34px; */
  top: 0;
  bottom: 0;
  width: 100%;
}
.index-member {
  position: absolute;
  top: 10px;
  z-index: 999;
  width: 300px;
  bottom: 10px;
  margin-left: 10px;
  .search-box {
    position: relative;
    .search-button {
      position: absolute;
      right: 0;
      height: 100%;
      line-height: 1px;
    }
  }
  .index-member-list {
    position: absolute;
    top: 40px;
    bottom: 45px;
    width: 100%;
  }
  .index-member-box {
    position: absolute;
    top: 38px;
    bottom: 0;
    background: #fff;
    width: 100%;
  }
  .index-menber-title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #4b77be;
    border-bottom: 1px solid #ddd;
  }
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    &.active {
      background: #4b77be;
      color: #fff;
      [class^='el-icon'] {
        color: #fff;
      }
    }
    .title {
      vertical-align: middle;
      span {
        display: inline-block;
        width: 84px;
        overflow: hidden;
        vertical-align: middle;
      }
    }
  }
  .index-pagination-box {
    height: 45px;
    background: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    padding-left: 10px;
    border-top: 1px solid #ddd;
    .jump-button {
      padding: 0 5px;
      span {
        line-height: 26px;
      }
    }
    .jump-input {
      width: 40px;
      .el-input__inner {
        width: 38px;
      }
    }
    .pageTotal-box {
      margin: 0 5px;
    }
  }
  .index-pagination {
    /deep/ .el-pagination__jump {
      margin-left: 0;
    }
    /deep/ .el-pagination__sizes {
      margin: 0;
    }
    /deep/ .el-input__suffix {
      display: none;
    }
    /deep/ .el-select {
      height: 22px;
      .el-input {
        width: 60px;
        font-size: 12px;
        .el-input__inner {
          padding-right: 0;
          border-radius: 14px;
          padding-left: 0;
          text-align: center;
        }
      }
      .el-input--mini {
        .el-input__inner {
          height: 20px;
          line-height: 20px;
        }
      }
    }
    /deep/ .el-pagination__editor.el-input {
      width: 38px;
    }

    /deep/ .el-pagination__total {
      margin-right: 2px;
    }
  }
}
</style>

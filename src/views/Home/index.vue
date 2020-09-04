<template>
  <div class="index-content">
    <Map ref="map" />
    <div class="index-member">
      <div class="search-box">
        <el-input placeholder="请输入人员名称" v-model="searchWords"></el-input>
        <el-button class="search-button" type="primary">查询</el-button>
      </div>
      <div class="border">
        <div class="index-menber-title">人员列表</div>
        <el-menu>
          <el-menu-item
            :class="{active: currentIndex === index}"
            v-for="(item, index) in memberList"
            :key="index"
            @click="changeMember(index)"
          >
            <i class="el-icon-setting"></i>
            <span class="title">
              <span>{{ item.name }}</span>
              {{ item.phone }}
            </span>
          </el-menu-item>
        </el-menu>
        <div class="index-pagination-box">
          <el-pagination
            class="index-pagination"
            small
            popper-class="index-popper"
            layout="total, sizes, prev, jumper, next, ->"
            :total="5"
          >
            <el-button>跳转</el-button>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from './Map';
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapActions} = createNamespacedHelpers('home');
export default {
  name: 'Home',
  data() {
    return {
      searchWords: '',
      currentIndex: 0
    };
  },
  computed: {
    ...mapState(['memberList'])
  },
  components: {
    Map
  },
  methods: {
    ...mapActions(['changeMenberList']),
    changeMember(index) {
      this.currentIndex = index;
      this.$refs.map.focusOnCurrentMember(index);
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
  top: 34px;
  bottom: 0;
  width: 100%;
}
.index-member {
  position: absolute;
  top: 10px;
  z-index: 999;
  width: 300px;
  margin-left: 50px;
  background: #fff;
  .search-box {
    position: relative;
    .search-button {
      position: absolute;
      right: 0;
      height: 100%;
      line-height: 1px;
    }
  }
  .index-menber-title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #4b77be;
    margin-top: 10px;
    border-top: 1px solid #ddd;
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
      span {
        display: inline-block;
        width: 52px;
      }
    }
  }
  .index-pagination-box {
    height: 25px;
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

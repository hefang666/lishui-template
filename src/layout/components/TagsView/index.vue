<template>
  <div id="tags-view-container" class="tags-view-container">
    <span class="tag-icon" @click="tagScrollDis('left')">
      <i class="el-icon-arrow-left"></i>
    </span>
    <div class="tags-view-box">
      <scroll-pane
        ref="scrollPane"
        class="tags-view-wrapper"
        @scroll="handleScroll"
      >
        <router-link
          v-for="tag in visitedViews"
          :key="tag.path"
          ref="tag"
          class="tags-view-item"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent.native="openMenu(tag,$event)"
        >
          {{tag.title}}
          <span 
            v-if="!isAffix(tag)"
            @click.prevent.stop="closeSelectedTag(tag)"
            class="el-icon-close"
          >
        </span>
        </router-link>
      </scroll-pane>
    </div>
    <div class="tabs-icon-right">
      <span class="tag-icon" @click="tagScrollDis('right')">
        <i class="el-icon-arrow-right"></i>
      </span>
      <el-popover placement="bottom-end" trigger="click" popper-class="tags-popover">
        <ul class="contextmenu">
          <li @click="closeAllTags(selectedTag)">关闭全部</li>
          <li @click="closeOthersTags">关闭其他</li>
        </ul>
        <span class="tag-icon" slot="reference">
          <i class="el-icon-more"></i>
        </span>
      </el-popover>
      <span @click="handleFullScreen" class="tag-icon"><i class="snt-icon-quanping"></i></span>
    </div>

  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import path from "path";
import {
  routes
} from "@/router";
export default {
  components: {
    ScrollPane
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      routes,
      fullscreen: false
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    }
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    tagScrollDis(position) {
      this.$refs.scrollPane.tagScrollDis(position);
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: {
              ...route.meta
            }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes);
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    },
    addTags() {
      const {
        name
      } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
        this.selectedTag = this.$route;
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("tagsView/updateVisitedView", this.$route);
            }
            break;
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const {
          fullPath
        } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch("tagsView/delView", view).then(({
        visitedViews
      }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view);
        }
      })
    },
    closeOthersTags() {
      this.$store.dispatch("tagsView/delOthersViews", this.selectedTag).then(() => {
        this.moveToCurrentTag();
      })
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({
        visitedViews
      }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "home") {
          // to reload home page
          this.$router.replace({
            path: "/redirect" + view.fullPath
          });
        } else {
          this.$router.push("/");
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
    },
    handleFullScreen () {
      let element = document.querySelector('.main-content')
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 24px;
  width: 100%;
  background: #eaeaea;

  /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04); */
  .tags-view-box {
    position: absolute;
    top: 0;
    left: 24px;
    right: 72px;
    height: 24px;
  }

  .tabs-icon-right {
    float: right;
  }

  .tag-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #4b77be;
    font-weight: bold;
    border-right: 1px solid #DDD;
    outline: none;
    cursor: pointer;
    [el-icon] {
      font-weight: bold;
    }

    &.text-white {
      color: transparent;
    }
  }

  .tabs-icon-right {
    .tag-icon {
      border-right: none;
      border-left: 1px solid #ddd;
    }
  }

  .tags-view-wrapper {
    height: 100%;

    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      color: #495060;
      padding: 0 8px;
      font-size: 12px;

      &.active {
        background-color: #fff;
        color: #4b77be;

        .el-icon-close {
          border-color: #4b77be;
        }
      }
    }
  }
}
</style>

<style lang="scss">
body {
  /deep/ .tags-popover {
    padding: 0;
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      list-style-type: none;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      padding: 0;
      width: 173px;
      li {
        margin: 0;
        cursor: pointer;
        height: 34px;
        line-height: 34px;
        padding-left: 12px;
        &:hover {
          background: #e4f0ff;
          color: #666;
        }
      }
    }
  }
}
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 12px;
      height: 12px;
      vertical-align: -1px;
      border-radius: 50%;
      text-align: center;
      border: 1px solid #666;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      color: #666;
      margin-left: 3px;

      &:before {
        transform: scale(.75);
        display: inline-block;
        vertical-align: 0px;
        margin-left: -1px;
        color: #222;
        font-weight: 400;
      }
    }
  }
}
</style>

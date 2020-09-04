<template>
  <div
    class="app-wrapper"
    :class="{hideSidebar: sideBarStatus, showBar: sideBarStatus === 2}"
  >
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <tags-view />
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './components/Sidebar';
import TagsView from './components/TagsView';
export default {
  components: {
    sidebar,
    TagsView
  },
  computed: {
    sideBarStatus() {
      return this.$store.state.sideBar.sideBarStatus;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.main-content {
  &:-webkit-full-screen {
    background-color: #fff !important;
  }
  &:-moz-full-screen {
    background-color: #fff !important;
  }
  &:-ms-fullscreen {
    background-color: #fff !important;
  }
  &:fullscreen {
    background-color: #fff !important;
  }
}
</style>

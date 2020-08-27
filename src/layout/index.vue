<template>
<div class="app-wrapper">
    <sidebar class="sidebar-container" />
    
    <div class="main-container">
        <div class="fixed-header">
            <tags-view  />
        </div>
        <router-view />
    </div>
</div>
</template>

<script>
// import {sidebar, TagsView} from "./components";
import sidebar from './components/Sidebar';
import TagsView from './components/TagsView';
export default {
    components: {
        sidebar,
        TagsView
    }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>

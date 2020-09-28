<template>
  <div class="pageTotal-box">
    <span>共 {{ total }} 条</span>
  </div>
</template>

<script>
export default {
  name: 'PageTotal',
  props: ['total']
};
</script>

<style scoped lang="scss">
.pageTotal-box {
  span {
    font-size: 12px;
    line-height: 28px;
  }
}
</style>

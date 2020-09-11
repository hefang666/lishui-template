<template>
  <div class="pageDetail-box">
    <span>当前显示第 {{ startRecording }} 到 {{ endRecoeding }} 条记录；</span>
  </div>
</template>

<script>
export default {
  name: 'PageDetail',
  props: ['startRecording', 'endRecoeding']
};
</script>

<style scoped lang="scss">
.pageDetail-box {
  span {
    line-height: 28px;
    font-size: 12px;
  }
}
</style>

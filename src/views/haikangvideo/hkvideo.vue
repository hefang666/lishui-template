<template>
  <div class="video-player">
    <div class="left">
      <div id="divPlugin" class="plugin"></div>
    </div>
    <div class="lefts" v-show="false">
      <table cellpadding="0" cellspacing="3" border="0">
        <tr>
          <td class="tt">已登录设备</td>
          <td>
            <select id="ip" class="sel" onchange="getChannelInfo();"></select>
          </td>
          <td>
            窗口分割数
          </td>
          <td>
            <select class="sel2" onchange="changeWndNum(this.value);">
              <option value="1">1x1</option>
              <option value="2" selected>2x2</option>
              <option value="3">3x3</option>
              <option value="4">4x4</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <input
              type="button"
              class="btn2"
              value="全部预览"
              onclick="PlayAll()"
            />
            <input
              type="button"
              class="btn2"
              value="全部停止"
              onclick="PlayCloseAll()"
            />
            <input
              type="button"
              class="btn"
              value="全屏"
              onclick="clickFullScreen();"
            />
          </td>
        </tr>
        <tr>
          <td class="tt">通道列表</td>
          <td>
            <select id="channels" class="sel"></select>
          </td>
          <td class="tt">码流类型</td>
          <td>
            <select id="streamtype" class="sel">
              <option value="1">主码流</option>
              <option value="2">子码流</option>
              <option value="3">第三码流</option>
              <option value="4">转码码流</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <input
              type="button"
              class="btn2"
              value="开始预览"
              onclick="clickStartRealPlay();"
            />
            <input
              type="button"
              class="btn2"
              value="停止预览"
              onclick="clickStopRealPlay();"
            />
          </td>
        </tr>
      </table>

      <!-- <fieldset class="operate">
            <legend>操作信息</legend>
            <div id="opinfo" class="opinfo"></div>
        </fieldset> -->
      <!-- <fieldset class="operate">
            <legend>下载插件</legend>
            <div id="down">

                <a href="javascript:void(0);" id="oDownLoad" onclick="oDownLoad('codebase/WebComponentsKit.exe', 'oDownLoad')">下载</a> 
            </div>
        </fieldset> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.plugin{
  // width: 100%;
  // height: 100%;
}
</style>
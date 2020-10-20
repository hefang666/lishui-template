<template>
  <div class="equipment-Information-box dialog-box button-box">
    <el-dialog
      title="设备点巡检任务详情"
      :visible.sync="dialogEqui"
      :close-on-click-modal="false"
      :before-close="closeEqui"
    >
      <div class="content-box form-box">
        <div class="cancel-box" @click="closeEqui">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="equip-box">
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备名称：</div>
              <div class="item-content">
                <span>阀门</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备编号：</div>
              <div class="item-content">
                <span>2019010120190101</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">设备点坐标：</div>
              <div class="item-content">
                <span>116.557771,39.972465</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备点巡检时间：</div>
              <div class="item-content">
                <span>2019-01-01 9:00</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items has-two-item">
              <div class="item-title">巡检状态：</div>
              <div class="item-content">
                <span>已巡检</span>
              </div>
            </div>
            <div class="list-items has-two-item">
              <div class="item-title">设备点状态：</div>
              <div class="item-content">
                <span>正常</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">地址：</div>
              <div class="item-content">
                <span>重庆市渝中区上清寺正街111号1单元101</span>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">巡检内容：</div>
              <div class="item-content">
                <div class="content-text">
                  Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                  Aenean euismod bibendum laoreet.
                  Proin gravida dolor sit amet
                  lacus accumsan et viverra justo commodo.
                  Proin sodales pulvinar sic tempor.
                  Sociis natoque penatibus et
                  magnis dis parturient montes,
                  nascetur ridiculus mus. Nam fermentum,
                  nulla luctus pharetra vulputate,
                  felis tellus mollis orci,
                  sed rhoncus pronin sapien nunc accuan eget.
                </div>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="list-items">
              <div class="item-title">附件：</div>
              <div class="item-content">
                <div class="enclosure-box">
                  <div class="enclosure-item">
                    <div class="enclosure-title">附件名字</div>
                    <div class="enclosure-download">下载</div>
                    <div class="enclosure-preview">预览</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEqui">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EquipmentInformation',
  props: ['dialogEqui'],
  data() {
    return {};
  },
  methods: {
    closeEqui() {
      let data = {
        dialogEqui: false,
        data: []
      };
      this.$emit('getEquiData', data);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/element-ui-new.scss';
@import '@/styles/public.scss';

.equip-box {
  .list-item {
    display: flex;
    justify-content: space-between;
    min-height: 40px;
    line-height: 40px;

    .list-items {
      display: flex;
      flex: 1;

      .item-title,
      .item-content span {
        font-size: 12px;
      }

      .item-title {
        width: 100px;
        text-align: right;
        margin-right: 5px;
      }

      .item-content {
        flex: 1;
        span {
          color: #999999;
        }

        .content-text {
          line-height: 20px;
          margin-top: 10px;
        }

        .view-button {
          margin-left: 10px;
        }
        /deep/ .el-button {
          color: #4b77be;
          border-color: #4b77be;
        }
        /deep/ .el-button:hover {
          background: #4b77be;
          color: #ffffff;
        }

        .enclosure-box {
          .enclosure-item {
            display: flex;

            .enclosure-title,
            .enclosure-download,
            .enclosure-preview {
              padding: 0 10px;
            }
          }
        }
      }
    }
    .has-two-item {
      width: 46%;
    }
  }
}
</style>

<template>
  <div class="system-container">
    <p class="title">设备型号</p>
    <div class="equipment-list clearfix">
      <div class="item">
        <p class="top">
          控制柜型号
        </p>
        <div class="content">
          <i class="iconfont i-a">&#xe602;</i>
        </div>
      </div>
      <div class="item">
        <p class="top">
          电表型号
        </p>
        <div class="content">
          <i class="iconfont i-b">&#xe629;</i>
        </div>
      </div>
      <div class="item">
        <p class="top">
          开关及检测型号
        </p>
        <div class="content">
          <i class="iconfont i-c">&#xe619;</i>
        </div>
      </div>
      <div class="item">
        <p class="top">
          防盗型号
        </p>
        <div class="content">
          <i class="iconfont i-d">&#xe623;</i>
        </div>
      </div>
    </div>
    <div class="equipment-list clearfix" style="margin-top:40px">
      <div class="item">
        <p class="top">
          光照计型号
        </p>
        <div class="content">
          <i class="iconfont i-e">&#xe60f;</i>
        </div>
      </div>
      <div class="item">
        <p class="top">
          终端型号
        </p>
        <div class="content">
          <i class="iconfont i-f">&#xe634;</i>
        </div>
      </div>
      <div class="item">
        <p class="top">
          设备型号
        </p>
        <div class="content">
          <i class="iconfont i-g">&#xe63a;</i>
        </div>
      </div>
    </div>
    <p class="title">设备型号</p>
    <div class="equipment-list clearfix">
      <div class="item">
        <p class="top">
          灯杆型号
        </p>
        <div class="content">
          <i class="iconfont i-h">&#xe7aa;</i>
        </div>
      </div>
      <div class="item"  @click="linkModule('/lighttype')">
        <p class="top">
          灯具型号
        </p>
        <div class="content">
          <i class="iconfont i-i">&#xe62b;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentTypeIndex',
  data () {
    return {
    }
  },
  methods: {
    linkModule: function (url) {
      console.log(url)
      if (url) this.$router.push('/roadlighting/equipmenttype' + url)
    }
  },
  created () {
  },
  destroyed () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.system-container{
  padding: 0 60px 110px 60px;
  .title{
    padding: 30px 0;
    font-size:18px;
  }
  .equipment-list{
    width:100%;
    .item{
      width: 200px;
      float: left;
      margin-right: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.06);
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.06);
      &:last-child{
        margin-right: 0;
      }
      p{
        background-color: #5789fa;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
      }
      .content{
        text-align: center;
        line-height: 160px;
        i{
          font-size:40px
        }
      }
      .i-a{
        color: #ff947d;
      }
      .i-b{
        color: #6b46da;
      }
      .i-c{
        color: #1db4b1;
      }
      .i-d{
        color: #fec568;
      }
      .i-e{
        color: #ff6f8d;
      }
      .i-f{
        color: #39dcba;
      }
      .i-g{
        color: #00c5ff;
      }
      .i-h{
        color: #00c5ff;
      }
      .i-i{
        color: #ff5372;
      }
    }
  }
}
</style>

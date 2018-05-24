<template>
  <div class="system-container">
    <div class="debug-list clearfix">
      <div class="item">
        <p class="top">
          电表
        </p>
        <div class="content">
          <i class="iconfont i-a">&#xe629;</i>
        </div>
      </div>
      <div class="item">
        <p class="top">
          数字量输入
        </p>
        <div class="content">
          <i class="iconfont i-b">&#xe63a;</i>
        </div>
      </div>
      <div class="item">
        <p class="top">
          光照计
        </p>
        <div class="content">
          <i class="iconfont i-c">&#xe60f;</i>
        </div>
      </div>
      <div class="item">
        <p class="top">
          终端
        </p>
        <div class="content">
          <i class="iconfont i-d">&#xe634;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DebuggingIndex',
  data () {
    return {
    }
  },
  methods: {
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
  padding:110px 60px;
  .debug-list{
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
        color: #6b46da;
      }
      .i-b{
        color: #00c5ff;
      }
      .i-c{
        color: #ff5475;
      }
      .i-d{
        color: #39dcba;
      }
    }
  }
}
</style>

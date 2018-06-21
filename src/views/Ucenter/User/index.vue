<template>
  <div class="user-index">
    <div class="userhome-top">
      <div class="title">
        用户中心
      </div>
      <div class="text">欢迎进入用户中心，您可以在系统用户内建立多个机构和用户账号，并分配权限，也可以在机构下建立子机构或部门岗位，每个机构具有独立的项目管理权限，子机构管理的项目将隶属于父机构。</div>
    </div>
    <div class="bar-list clearfix">
      <div @click="linkModule('/organization')" class="item">
        <p class="p1"><i class="iconfont">&#xe610;</i></p>
        <p class="p2">机构管理</p>
      </div>
      <div @click="linkModule('/department')" class="item">
        <p class="p1"><i class="iconfont">&#xe63c;</i></p>
        <p class="p2">部门岗位</p>
      </div>
      <div @click="linkModule('/userlist')" class="item">
        <p class="p1"><i class="iconfont">&#xe67c;</i></p>
        <p class="p2">用户列表</p>
      </div>
      <div @click="linkModule('/onlineuser')" class="item">
        <p class="p1"><i class="iconfont">&#xe69d;</i></p>
        <p class="p2">在线用户</p>
      </div>
      <div class="item">
        <p class="p1"><i class="iconfont">&#xe643;</i></p>
        <p class="p2">项目归属</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    linkModule: function (url) {
      if (url) {
        url = '/ucenter/user' + url
        this.$router.push(url)
      }
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
  .user-index{
    padding: 40px;
    min-height:100%;
    background: #fff;
  }
  .userhome-top{
    .title{
      font-size:20px;
    }
    .text{
      margin-top: 20px;
      font-size:14px
    }
  }
  .bar-list{
    width: 100%;
    margin-top: 30px;
    margin-left:-15px;
    .item{
      cursor: pointer;
      padding:60px 0;
      float: left;
      width: 195px;
      margin-bottom: 15px;
      margin-left:15px;
      background: #5789FA;
      height: 220px;
      color:#fff;
      text-align: center;
      i{
        font-size:50px;
      }
      .p2{
        margin-top: 10px;
        font-size:20px
      }
    }
  }
</style>

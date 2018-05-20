<template>
  <div class="container">
    <!-- header -->
    <div class="index-header clearfix">
      <a class="menu-link">
        <i class="iconfont">&#xe655;</i>
      </a>
      <div class="user-info f-r">
        <img src="@/assets/index/header.png">
        <span>Admin</span>
      </div>
    </div>
    <!-- main-wrap -->
    <div class="index-module">
      <div class="clearfix">
        <div class="grid-content gird-1">
          <div class="gird-wrap">
            <div class="trans-middle">
              <p class="p1"><i class="iconfont">&#xe7b9;</i></p>
              <p>GIS地理信息系统</p>
            </div>
          </div>
        </div>
        <div class="grid-content gird-2">
          <div class="gird-wrap">
            <div class="trans-middle">
              <p class="p1"><i class="iconfont">&#xe613;</i></p>
              <p>资产管理系统</p>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix">
        <div class="grid-content gird-9 clearfix">
          <div class="grid-content gird-3">
            <div class="gird-wrap">
              <div class="trans-middle f-mid">
                <p class="p1"><i class="iconfont">&#xe615;</i></p>
                <p>事件报警</p>
              </div>
            </div>
          </div>
          <div class="grid-content gird-4">
            <div class="gird-wrap">
              <div class="trans-middle f-mid">
                <p class="p1"><i class="iconfont">&#xe664;</i></p>
                <p>工单管理</p>
              </div>
            </div>
          </div>
          <div class="grid-content gird-5">
            <div class="gird-wrap" @click="linkModule('/projectadmin')" data-url="">
              <div class="trans-middle f-mid">
                <p class="p1"><i class="iconfont">&#xe63b;</i></p>
                <p>项目管理</p>
              </div>
            </div>
          </div>
          <div class="grid-content gird-6">
            <div class="gird-wrap">
              <div class="trans-middle f-mid">
                <p class="p1"><i class="iconfont">&#xe603;</i></p>
                <p>用户中心</p>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-content gird-7">
          <div class="gird-wrap">
            <div class="trans-middle">
              <p class="p1"><i class="iconfont">&#xe691;</i></p>
              <p>道路照明系统</p>
            </div>
          </div>
        </div>
        <div class="grid-content gird-8">
          <div class="gird-wrap">
            <div class="trans-middle">
              <p class="p1"><i class="iconfont">&#xe6f5;</i></p>
              <p>能耗分析</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  methods: {
    linkModule: function (url) {
      console.log(url)
      if (url) this.$router.push(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
  min-width: 1000px;
  margin: 0 auto;
  background: url('../../assets/index/index_bg.jpg') fixed center top;
  background-size:cover;
  position: relative;
  overflow: hidden;
}

.index-header{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 0;
  .menu-link{
    color: #ffffff;
    .iconfont{
      font-size:24px;
    }
  }
  .user-info{
    cursor: pointer;
    img{
      width: 50px;
      height: 50px;
      line-height: 50px;
      margin-right:10px;
      vertical-align: middle;
    }
    span{
      font-size:14px;
      color: #fff;
    }
  }
}
.index-module{
  width: 120vh;
  margin: 10vh auto;
}
.grid-content{
  float: left;
  padding: 5px;
  position: relative;
  text-align:center;
  color:#fff;
  font-size: 18px;
  transition: all .4s ease;
  box-sizing: border-box;
  cursor: pointer;
  .gird-wrap{
    height: 100%;
    width: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    box-sizing:border-box;
    transition: opacity, .2s ease;
    .iconfont{
      display: inline-block;
      font-size: 60px;
    }
    &:hover{
      .trans-middle{
        transform: translate(-50%,-50%) scale(1.08);
      }
    }
  }
  .trans-middle{
    position: absolute;
    top:50%;
    left:50%;
    width:100%;
    text-align:center;
    transform:translate(-50%,-50%);
    transition: all .4s ease;
    p{
      padding-top: 10px;
    }
    &.f-mid{
      .iconfont{
        font-size: 48px;
      }
      p{
        padding-top: 5px;
      }
    }
  }
  &.gird{
    &-1{
      height: 40vh;
      width: 80vh;
      .gird-wrap{
        background-image: url('../../assets/index/index_m_1.png');
      }
    }
    &-2{
      height: 40vh;
      width: 40vh;
      .gird-wrap{
        background-image: url('../../assets/index/index_m_2.png');
      }
    }
    &-3{
      height: 20vh;
      width: 20vh;
      .gird-wrap{
        background-image: url('../../assets/index/index_m_3.png');
      }
    }
    &-4{
      height: 20vh;
      width: 20vh;
      animation: flip 6s linear infinite;
      .gird-wrap{
        background-image: url('../../assets/index/index_m_4.png');
      }
    }
    &-5{
      height: 20vh;
      width: 20vh;
      animation: flip 6s linear 4s infinite;
      .gird-wrap{
        background-image: url('../../assets/index/index_m_5.png');
      }
    }
    &-6{
      height: 20vh;
      width: 20vh;
      .gird-wrap{
        background-image: url('../../assets/index/index_m_6.png');
      }
    }
    &-7{
      height: 40vh;
      width: 40vh;
      .gird-wrap{
        background-image: url('../../assets/index/index_m_7.png');
      }
    }
    &-8{
      height: 40vh;
      width: 40vh;
      .gird-wrap{
        background-image: url('../../assets/index/index_m_8.png');
      }
    }
    &-9{
      padding: 0;
      height: 40vh;
      width: 40vh;
    }
  }
}

@keyframes flip {
    0% {
        transform: rotateX(0deg);
    }
    15% {
        transform: rotateX(360deg);
    }
    100% {
        transform: rotateX(360deg);
    }
}
@keyframes fade {
    0% {
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    50% {
        opacity: 1;
    }
    60% {
        opacity: 0;
    }
}
</style>

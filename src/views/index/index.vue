<template>
  <div class="system-home">
    <div class="home-absolute">
      <div class="home-top clearfix">
        <a class="meau-icon">
          <i class="iconfont">&#xe655;</i>
        </a>
        <div class="user-info f-r">
          <img src="@/assets/index/header.png">
          <div class="text-info">
            <p>某某某</p>
            <p>高级管理员</p>
          </div>
        </div>
      </div>
      <div class="home-center">
        <el-row :gutter="20" class="mode-block">
          <el-col :span="12">
            <div class="grid-content model-a">
              <div class="trans-middle">
                <p class="p1"><i class="iconfont">&#xe7b9;</i></p>
                <p>GIS地理信息系统</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content model-b">
              <div class="trans-middle">
                <p class="p1"><i class="iconfont">&#xe691;</i></p>
                <p>道路照明系统</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content model-c">
              <div class="trans-middle">
                <p class="p1"><i class="iconfont">&#xe613;</i></p>
                <p>资产管理系统</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mode-block">
          <el-col :span="7">
            <div class="grid-content model-d">
              <div class="trans-middle">
                <p class="p1"><i class="iconfont f-mid">&#xe6f5;</i></p>
                <p>能耗分析</p>
              </div>
            </div>
            <div class="grid-content model-d1">
              <div class="trans-middle">
                <p class="p1"><i class="iconfont f-mid">&#xe603;</i></p>
                <p>用户中心</p>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content model-e">
              <div class="trans-middle">
                <p class="p1"><i class="iconfont">&#xe615;</i></p>
                <p>事件报警</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="grid-content model-f">
              <div class="trans-middle">
                <p class="p1"><i class="iconfont">&#xe664;</i></p>
                <p>工单管理</p>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <router-link to="/project">
              <div class="grid-content model-g">
               <div class="trans-middle">
                <p class="p1"><i class="iconfont">&#xe63b;</i></p>
                <p>项目管理</p>
              </div>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      WindowHeight: 600,
      blockHeight: 250,
      blockHeight2: 115
    }
  },
  computed: {},
  created () {
    this.WindowHeight = window.innerHeight
    this.blockHeight = (this.WindowHeight - 113 - 70 - 20) / 2
    this.blockHeight2 = (this.blockHeight - 20) / 2
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.system-home{
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
  }
  .grid-content {
    min-height: 36px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
#app{
  width: 100%;
  height: 100%;
  min-width: 1200px;
}
.home-absolute{
  width:1200px;
  margin:0 auto;
}

.home-top{
  padding:30px;
  .meau-icon{
    color: #ffffff;
    i{
      font-size:24px;
    }
  }
  .user-info{
    img{
      width: 50px;
      height: 50px;
      margin-right:10px;
    }
    .text-info{
      float: right;
      font-size:14px;
      color: #fff;
      line-height: 25px;
      p{
        margin: 0;
      }
    }
  }
}
.system-home{
  width: 100%;
  min-height: 100%;
  min-width: 1080px;
  margin: 0 auto;
  background: url('../../assets/index/bg.png') fixed center top;
  background-size:cover;
  position: relative;
}
.home-center{
  padding:20px 130px 50px 130px;
  .mode-block{
    height: 250px;
    .el-col{
      height: 250px;
    }
    .grid-content{
      position: relative;
      text-align:center;
      color:#fff;
      background-size:cover;
      font-size: 18px;
      p{
        margin: 10px 0;
      }
      .trans-middle{
        position: absolute;
        top:50%;
        left:50%;
        width:100%;
        text-align:center;
        transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        p{
          margin-top: 10px;
          margin:0;
        }
      }
    }
    .model-a{
      height: 100%;
      background-image: url('../../assets/index/1.png');
    }
    .model-b{
      height: 100%;
      background-image: url('../../assets/index/2.png');
    }
    .model-c{
      height: 100%;
      background-image: url('../../assets/index/3.png');
    }
    .model-d{
      height: 115px;
      margin-bottom: 20px;
      background-image: url('../../assets/index/4.png');
    }
    .model-d1{
      height: 115px;
      background-image: url('../../assets/index/5.png');
    }
    .model-e{
      height: 100%;
      background-image: url('../../assets/index/6.png');
    }
    .model-f{
      height: 100%;
      background-image: url('../../assets/index/7.png');
    }
    .model-g{
      height: 100%;
      background-image: url('../../assets/index/8.png');
    }
    .p1{
      padding-bottom: 5px;
    }
    .iconfont{
      font-size: 60px;
      &.f-mid{
        font-size: 48px;
      }
    }
  }
  .grid-content{
    cursor: pointer;
  }
}
</style>

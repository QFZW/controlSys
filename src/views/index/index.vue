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
                <img src="@/assets/index/1.png">
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content model-b">
                <img src="@/assets/index/2.png">
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content model-c">
                <img src="@/assets/index/3.png">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mode-block">
          <el-col :span="7">
            <div class="grid-content model-d">
                <img src="@/assets/index/4.png">
            </div>
            <div class="grid-content model-d1">
                <img src="@/assets/index/5.png">
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content model-e">
                <img src="@/assets/index/6.png">
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="grid-content model-f">
                <img src="@/assets/index/7.png">
            </div>
          </el-col>
          <el-col :span="6">
            <router-link to="/project">
              <div class="grid-content model-g">
                  <img src="@/assets/index/8.png">
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
  position: absolute;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
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
  height: 100%;
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
      // height: 250px;
    }
    .grid-content{
      text-align:center;
      color:#fff;
      font-size:0;
      position: relative;
      p{
        margin: 10px 0;
      }
      img{
        width:100%;
        height: 100%;
      }
    }
    .model-a{
      height: 100%;
      background: #d2c184;
    }
    .model-b{
      height: 100%;
      background: #4bc26f;
    }
    .model-c{
      height: 100%;
      background: #33bba8;
    }
    .model-d{
      height: 115px;
      margin-bottom: 20px;
      background: #d58a3d;
    }
    .model-d1{
      height: 115px;
      background: #399eda;
    }
    .model-e{
      height: 100%;
      background: #85578d;
    }
    .model-f{
      height: 100%;
      background: #4b48c6;
    }
    .model-g{
      height: 100%;
      background: #59a1d1;
    }
  }
}
</style>

<template>
  <div class="system-home" v-bind:style="{height:WindowHeight+'px'}">
    <div class="home-top clearfix">
      <a class="meau-icon">
        <i class="iconfont">&#xe655;</i>
      </a>
      <div class="user-info f-r">
        <img src="./resource/header.png">
        <div class="text-info">
          <p>某某某</p>
          <p>高级管理员</p>
        </div>
      </div>
    </div>
    <div class="home-center">
      <el-row :gutter="20" class="mode-block" v-bind:style="{height:blockHeight+'px'}">
        <el-col :span="12">
          <div class="grid-content model-a" v-bind:style="{height:blockHeight+'px'}">
            <div class="trans-middle">
              <img src="./resource/icon1.png">
              <p>GIS地理信息系统</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content model-b" v-bind:style="{height:blockHeight+'px'}">
            <div class="trans-middle">
              <img src="./resource/icon2.png">
              <p>道路照明系统</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content model-c" v-bind:style="{height:blockHeight+'px'}">
            <div class="trans-middle">
              <img src="./resource/icon3.png">
              <p>资产管理系统</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mode-block" v-bind:style="{height:blockHeight+'px'}">
        <el-col :span="7">
          <div class="grid-content model-d" v-bind:style="{height:blockHeight2+'px'}">
            <div class="trans-middle">
              <img src="./resource/icon4.png">
              <p>能耗分析</p>
            </div>
          </div>
          <div class="grid-content model-d1" v-bind:style="{height:blockHeight2+'px'}">
            <div class="trans-middle">
              <img src="./resource/icon5.png">
              <p>用户中心</p>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content model-e" v-bind:style="{height:blockHeight+'px'}">
            <div class="trans-middle">
              <img src="./resource/icon6.png">
              <p>事件报警</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-bind:style="{height:blockHeight+'px'}">
          <div class="grid-content model-f">
            <div class="trans-middle">
              <img src="./resource/icon7.png">
              <p>工单管理</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-bind:style="{height:blockHeight+'px'}">
          <div class="grid-content model-g">
            <div class="trans-middle">
              <img src="./resource/icon8.png">
              <p>项目管理</p>
            </div>
          </div>
        </el-col>
      </el-row>
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
      padding-right:10px;
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
  background-image: url('./resource/bg.png');
  background-size:cover
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
      font-size:20px;
      font-weight:bold;
      position: relative;
      p{
        margin: 10px 0;
      }
    }
    .trans-middle{
      position: absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      -ms-transform:translate(-50%,-50%);
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

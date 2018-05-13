<template>
    <div class="project-container">
      <div class="module-item module-item1">
        <p class="title">
          全球项目概况
        </p>
        <div class="item-list">
          <span class="item">
            <span>中国</span>
            <span class="sub-num">1</span>
          </span>
          <span class="item">
            <span>中国</span>
            <span class="sub-num">1</span>
          </span>
        </div>
        <div class="children-module">
          <p class="title">
            全球
          </p>
          <div class="item-list">
            <span class="item">
              <span>中国</span>
              <span class="sub-num">1</span>
            </span>
            <span class="item">
              <span>中国</span>
              <span class="sub-num">1</span>
            </span>
            <span class="item">
              <span>中国</span>
              <span class="sub-num">1</span>
            </span>
          </div>
        </div>
      </div>
      <div class="module-item module-item2">
        <p class="title">
          全球统计数据
        </p>
        <div class="item-list">
          <span class="item">
            <i class="iconfont">&#xe638;</i>
            <span>项目</span>
            <span class="sub-num">1</span>
          </span>
          <span class="item">
            <i class="iconfont">&#xe602;</i>
            <span>控制柜</span>
            <span class="sub-num">1</span>
          </span>
          <span class="item">
            <i class="iconfont">&#xe62b;</i>
            <span>灯具</span>
            <span class="sub-num">1</span>
          </span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  methods: {
  },
  created () {
  },
  destroyed () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .project-container{
    padding: 32px;
    .module-item{
      &>.title{
        position: relative;
        padding-left: 20px;
        font-size:18px;
        color: #333333;
        font-weight: bold;
        &:before{
          position: absolute;
          content: '';
          height: 23px;
          width: 4px;
          background: #5789fa;
          left: 0;
          top:0;
        }
      }
      &>.item-list{
        margin-top: 20px;
      }
    }
    .module-item1{
      &>.item-list{
        font-size:0;
        color:#090909;
        .item{
          display: inline-block;
          min-width: 250px;
          padding: 0 50px;
          margin-right: 20px;
          margin-bottom: 20px;
          height: 90px;
          line-height: 90px;
          border:1px solid #e4e7ed;
          text-align: center;
          font-size:16px;
          background: #ffffff;
          position: relative;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          // border-radius:5px;
          box-shadow: 0 0 5px 1px rgba(0, 0, 0, .06);
          .sub-num{
            position: absolute;
            font-size:14px;
            bottom:10px;
            right:10px;
            line-height: normal;
          }
        }
      }

      .children-module{
        &>.title{
          font-size:16px;
          color: #030303;
          position: relative;
        }
        &>.item-list{
          margin-top: 20px;
          color:#090909;
          font-size:0;
          .item{
            display: inline-block;
            margin-right: 8px;
            margin-bottom: 8px;
            min-width: 112px;
            padding: 0 30px;
            height: 48px;
            line-height: 48px;
            border:1px solid #e4e7ed;
            text-align: center;
            font-size:16px;
            background: #ffffff;
            position: relative;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, .06);
            .sub-num{
              position: absolute;
              font-size:12px;
              bottom:5px;
              right:5px;
              line-height: normal;
            }
          }
        }
      }
    }
    .module-item2{
      margin-top: 32px;
      &>.item-list{
        font-size:0;
        color:#fff;
        .item{
          display: inline-block;
          min-width: 240px;
          padding: 0 50px;
          margin-right: 20px;
          margin-bottom: 20px;
          height: 90px;
          line-height: 90px;
          text-align: center;
          font-size:16px;
          color: #666666;
          background: #ebf1f5;
          position: relative;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          // border-radius:5px;
          box-shadow: 0 0 5px 1px rgba(0, 0, 0, .06);
          .sub-num{
            position: absolute;
            font-size:14px;
            bottom:10px;
            right:10px;
            line-height: normal;
          }
          .iconfont{
            font-size: 28px;
            color: #616e80;
            position: relative;
            top: 4px;
          }
        }
      }
    }
  }
</style>

<template>
    <div class="app-wrapper">
      <div class="module-main-container">
        <div class="project-container">
          <div class="module-item module-item1">
            <p class="title">
              全球项目概况
            </p>
            <div class="item-list">
              <span class="item">
                中国
                <span>1</span>
              </span>
              <span class="item">
                中国
                <span>1</span>
              </span>
            </div>
            <div class="children-module">
              <p class="title">
                全球
              </p>
              <div class="item-list">
                <span class="item">
                  中国
                  <span>1</span>
                </span>
                <span class="item">
                  中国
                  <span>1</span>
                </span>
                <span class="item">
                  中国
                  <span>1</span>
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
                中国
                <span>1</span>
              </span>
              <span class="item">
                中国
                <span>1</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login',
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
  .app-wrapper{
    width:100%;
    height: 100%;
  }
  .module-main-container{
    padding:40px;
    background: #ffffff;
  }
  .project-container{
    .module-item{
      &>.title{
        font-size:20px;
        color: #030303;
        position: relative;
        padding-left: 20px;
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
          min-width: 240px;
          padding: 0 50px;
          margin-right: 20px;
          margin-bottom: 20px;
          height: 90px;
          line-height: 90px;
          border:1px solid #e4e7ed;
          text-align: center;
          font-size:16px;
          background: #f8f9fd;
          position: relative;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          border-radius:5px;
          span{
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
            font-size:14px;
            background: #f8f9fd;
            position: relative;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius:2px;
            span{
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
          background: #262d47;
          position: relative;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          border-radius:5px;
          span{
            position: absolute;
            font-size:14px;
            bottom:10px;
            right:10px;
            line-height: normal;
          }
        }
      }
    }
  }
</style>

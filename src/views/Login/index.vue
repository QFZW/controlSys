<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">新时空单灯管理系统</h3>
      </div>
      <div class="login-center-block">
        <el-form-item>
          <span class="svg-container svg-container_login">
            <i class="iconfont">&#xe601;</i>
          </span>
          <el-input name="username" type="text" prop="userName" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <span class="svg-container svg-container_login">
            <i class="iconfont">&#xe64e;</i>
          </span>
          <el-input name="password" :type="passwordType"  prop="passWord"  @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" />
        </el-form-item>
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <el-button type="primary" class="sub-button" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { getNamePassword, setNamePassword } from '@/utils/auth.js'
export default {
  name: 'login',
  data () {
    var checkUserName = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error('用户名不得为空'))
      } else {
        callback()
      }
    }
    var checkPassWord = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error('密码不得为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      passwordType: 'password',
      loginRules: {
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        passWord: [
          { validator: checkPassWord, trigger: 'blur' }
        ]
      },
      loading: false,
      showDialog: false,
      checked: false
    }
  },
  methods: {
    handleLogin () {
      let that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          that.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch((err) => {
            console.log(err)
            this.loading = false
          })
          // this.$HTTP.post('/login', this.loginForm).then(function (res) {
          //   that.loading = false
          //   if (that.checked) {
          //     setNamePassword(JSON.stringify(that.loginForm))
          //   }
          // }).catch(function (err) {
          //   console.log(err)
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    // let _obj = JSON.parse(getNamePassword())
    // if (_obj) {
    //   this.loginForm = _obj
    // }
  },
  destroyed () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: #ffffff;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #666;
      height: 47px;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    color: #454545;
  }
  .el-checkbox{
    color: #ffffff;
    font-size: 14px;
    margin-bottom: 20px
  }
  .el-checkbox__inner{
    width: 16px;
    height: 16px;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #ffffff
  }
  .sub-button{
    width: 100%;
    margin-bottom: 30px;
    font-size: 16px;
    background: #5789fa;
    border-color: #5789fa;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$blue:#5789fa;
$dark_gray:#889aa4;
$light_gray:#eee;
div{
  box-sizing:border-box;
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background:url('../../assets/index/bg.png') top center;
  background-size:cover;
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 520px;
    padding: 35px 35px 15px 35px;
    transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $blue;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      i{
        font-size: 20px;
      }
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 40px;
      font-weight: bold;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .login-center-block{
    width:450px;
    padding:40px 60px;
    margin:0 auto;
    background:rgba(255,255,255,0.2);
    border-radius:10px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

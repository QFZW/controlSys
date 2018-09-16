<template>
  <div class="container">
    <!-- header -->
    <div class="index-header clearfix">
      <a class="menu-link">
        <i class="iconfont">&#xe655;</i>
      </a>
      <div class="user-area f-r">
        <div v-if="isLogin == true" class="user-info dis-inline">
          <img src="@/assets/index/header.png">
          <span>{{username}}</span>
          <span> | </span>
          <span class="logout" @click="handleLoginOut()">退出</span>
        </div>
        <div v-else class="login-register dis-inline">
          <span @click="handleRegister()" class="logout">注册</span>
          <span> | </span>
          <span class="logout" @click="handleLogin()">{{loginOperation}}</span>
        </div>
      </div>
      <!-- 登录对话窗 -->
      <el-dialog title="用户登录" :visible.sync="loginFormVisible">
        <el-form :model="form" status-icon :rules="myRules" ref="loginForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username" class="inp-width">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密 码" :label-width="formLabelWidth" prop="password" class="inp-width">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="loginFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleloginSend()">登 录</el-button>
        </div>
      </el-dialog>
      <!-- 注册对话窗 -->
      <el-dialog title="新用户注册" status-icon :visible.sync="registerFormVisible">
        <el-form :model="registerFormData" :rules="myRegisterRules" ref="registerForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username" class="inp-width">
            <el-input v-model="registerFormData.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密 码" :label-width="formLabelWidth" prop="password" class="inp-width">
            <el-input type="password" v-model="registerFormData.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmpassword" class="inp-width">
            <el-input type="password" v-model="registerFormData.confirmpassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="registerFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRegister()">注 册</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- main-wrap -->
    <div class="index-module">
      <div class="clearfix">
        <div class="grid-content gird-1">
          <div class="gird-wrap" @click="linkModule('/gisservice')">
            <div class="trans-middle">
              <p class="p1"><i class="iconfont">&#xe7b9;</i></p>
              <p>GIS地理信息系统</p>
            </div>
          </div>
        </div>
        <div class="grid-content gird-2">
          <div class="gird-wrap" @click="linkModule('/assetadmin')">
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
            <div class="gird-wrap" @click="linkModule('/eventwarning')">
              <div class="trans-middle f-mid">
                <p class="p1"><i class="iconfont">&#xe615;</i></p>
                <p>事件报警</p>
              </div>
            </div>
          </div>
          <div class="grid-content gird-4">
            <div class="gird-wrap" @click="linkModule('/workorder')">
              <div class="trans-middle f-mid">
                <p class="p1"><i class="iconfont">&#xe664;</i></p>
                <p>工单管理</p>
              </div>
            </div>
          </div>
          <div class="grid-content gird-5">
            <div class="gird-wrap" @click="linkModule('/projectadmin')">
              <div class="trans-middle f-mid">
                <p class="p1"><i class="iconfont">&#xe63b;</i></p>
                <p>项目管理</p>
              </div>
            </div>
          </div>
          <div class="grid-content gird-6">
            <div class="gird-wrap" @click="linkModule('/ucenter')">
              <div class="trans-middle f-mid">
                <p class="p1"><i class="iconfont">&#xe603;</i></p>
                <p>用户中心</p>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-content gird-7">
          <div class="gird-wrap" @click="linkModule('/roadlighting')">
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
import { login, register, logout } from '@/api/login'
export default {
  name: 'index',
  data: function () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        if (value.length > 20 || value.length < 3) {
          callback(new Error('用户长度在3-20字符'));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerFormData.confirmpassword !== '') {
          this.$refs.registerForm.validateField('confirmpassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerFormData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isLogin: false,
      loginOperation: "登录",
      loginFormVisible: false,
      registerFormVisible: false,
      username: '',
      form: {
        username: '',
        password: ''
      },
      registerFormData: {
        username: '',
        password: '',
        confirmpassword: ''
      },
      myRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ]
      },
      myRegisterRules: {  
        username: [
            { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmpassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    linkModule: function (url) {
      console.log(url)
      if (url) this.$router.push(url)
    },
    handleloginSend () {
      console.log("登录发送请求")
      this.$refs["loginForm"].validate((valid)=>{
        if(valid){
          login(this.form.username, this.form.password).then((res)=>{
            console.log(res, '登录返回信息')
            if(res.data){ // 成功
              // 重新写入session,并且记录时间
              window.localStorage.setItem("username", this.form.username);
              window.localStorage.setItem("password", this.form.password);
              const loginDate = new Date();
              window.localStorage.setItem("loginDate", loginDate);
              this.loginFormVisible = false
              this.isLogin = true
              this.username = this.form.username
           } else { // 登录失败
              this.$message({
                showClose: true,
                message: res
              });
              // console.log(err);
           }
          })
        } else {
          return false;
        }
      })
    },
    // 退出 
    handleLoginOut () {
      this.isLogin = false
      console.log(this.isLogin)
      console.log("登出")
      // 清除token
      logout(this.form.username, this.form.password).then((res)=>{
          console.log(res, '登录返回信息')
          if(res.data){ // 成功
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("password");
            window.localStorage.removeItem("loginDate");
          } else { // 登chu失败
            this.$message({
              showClose: true,
              message: res
            });
            // console.log(err);
          }
        })
    },
    // 注册
    handleRegister () {
      console.log("注册")
      this.registerFormVisible = true
      register(this.registerFormData.username, this.registerFormData.password).then(res=>{
        if(res.data){ // 注册成功
          this.$message({
            showClose: true,
            message: "恭喜您注册成功!"
          });
        }else { // 注册失败
          this.$message({
            showClose: true,
            message: res
          });
        }
      })
    },
    // 登录
    handleLogin () {
      console.log("登录")
      this.loginFormVisible = true
    }
  },
  created () {
    // 检查是否有登录信息
    if(window.localStorage.getItem("username") && window.localStorage.getItem("password")) {
      console.log("create2222222222222222222")
      this.isLogin = true
      this.username = window.localStorage.getItem("password")
      this.form.username = window.localStorage.getItem("username")
      this.form.password = window.localStorage.getItem("password")
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
.dis-inline {
  display: inline-block;
}
.inp-width {
  width: 300px;
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
  .user-info, .login-register{
    cursor: pointer;
    height: 50px;
    line-height: 50px;
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
    span.logout:hover {
      color:blue;
      text-decoration: underline;
      cursor: pointer;
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

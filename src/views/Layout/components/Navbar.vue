<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="hover">
      <div class="avatar-wrapper clearfix">
        <img class="user-avatar" :src='"@/assets/index/header.png"'>
        <div class="user-name">{{username}}</div>
        <i class="el-icon-arrow-down"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 76px;
  line-height: 76px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 84px;
    height: 76px;
    float: left;
    padding: 0 10px 0 32px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    display: inline-block;
    position: absolute;
    top: 17px;
    height: 42px;
    right: 52px;
    .avatar-wrapper {
      cursor: pointer;
      padding-right: 10px;
      position: relative;
      .user-avatar {
        float: left;
        width: 42px;
        height: 42px;
        border-radius: 10px;
      }
      .user-name{
        float: left;
        margin: 0 10px;
        width: 42px;
        height: 42px;
        line-height: 42px;
        font-size: 14px;
      }
      .el-icon-arrow-down {
        position: absolute;
        right: 0px;
        top: 14px;
        font-size: 16px;
      }
    }
  }
}
</style>

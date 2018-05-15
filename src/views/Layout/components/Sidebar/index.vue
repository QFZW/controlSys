<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#ffffff"
      active-text-color="#ffffff"
    >
      <router-link to="/">
        <div class="app-name"><span>单灯控制系统</span></div>
      </router-link>
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.app-name{
  height: 76px;
  line-height: 76px;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  border-bottom: solid 1px #2d3647;
}
.el-menu--collapse{
  .app-name{
    span{
      display: none;
    }
  }
}
</style>

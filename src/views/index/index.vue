<template>
  <el-card class="box-card">
    <div v-for="item in username" :key="item.number" class="text item">
        {{ 'Address' + item.address + ' -- Email'+ item.email }}
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      username: []
    }
  },
  computed: {},
  created () {
    this.getSys()
  },
  methods: {
    getSys () {
      this.HTTP.get('/mock/5aeeba99ee70f3596f06e54a/example/mock')
        .then(res => {
          let projects = res.data.data.projects
          this.username = projects
        }).catch(() => {})
    }
  }
}
</script>
<style lang="scss">
.index-test {
  color: red;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>

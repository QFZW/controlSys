<template>
  <div class="container">
    <div class="item" @click="linkModule('general')">
      <img src="@/assets/asset/index1.png">
    </div>
    <div class="item" @click="linkModule('manage')">
      <img src="@/assets/asset/index2.png">
    </div>
    <div class="item" @click="linkModule('linkman')">
      <img src="@/assets/asset/index3.png">
    </div>
    <div class="item">
      <img src="@/assets/asset/index4.png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'AssetAdminIndex',
  methods: {
    linkModule: function (url) {
      console.log(url)
      if (url) this.$router.push(url)
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    padding: 110px 100px;
    display: flex;
    .item{
      width: 25%;
      padding: 0 10px;
      img{
        width: 100%
      }
    }
  }
</style>

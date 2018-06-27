<template>
  <div class="container">
    
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

</style>

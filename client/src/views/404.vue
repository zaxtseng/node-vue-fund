<template>
  <div class="notfound">
    <img src="../assets/404.gif" alt />
  </div>
</template>

<script>
export default {
  name: "index",
  components: {}
};
</script>

<style scoped>
.notfound {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.notfound img {
  width: 40%;
  height: 60%;
}
</style>

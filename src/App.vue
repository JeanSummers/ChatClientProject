<template>
<div>
  <div class="full-width center-content">
    <h1>Hello Vue.js!</h1>
  </div>
  <div class="full-width center-content">
    <h1>{{ date }}</h1>
  </div>
</div>
</template>

<script>
export default {
  data: () => ({
    date: Date(),
    timer: null
  }),
  created: function() {
    this.timer = setInterval(() => (this.date = Date()), 1000);
  },
  destroyed: function() {
    clearInterval(this.timer);
  }
};
</script>


<style scoped>
.full-width {
  width: 100%;
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
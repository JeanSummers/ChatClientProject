<template>
    <span>{{ date }}</span>
</template>

<script>
export default {
  data: () => ({
    date: null,
    timer: null
  }),
  created: function() {
    this.updateDate();
    this.timer = setInterval(() => this.updateDate(), 1000);
  },
  destroyed: function() {
    clearInterval(this.timer);
  },
  methods: {
    updateDate: function() {
      this.date = new Date().toLocaleString();
    }
  }
};
</script>

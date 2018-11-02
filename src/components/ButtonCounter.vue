<template>
    <button v-on:click="count++">Счётчик кликов — {{ count }}</button>
</template>

<script>
export default {
  data: function() {
    return {
      count: 0
    };
  }
};
</script>

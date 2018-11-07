<template>
<div class="center-content">
    <timer/>
</div>
</template>

<script>
import TimerComponent from "../components/TimerComponent.vue";
import "../css/common.css";

export default {
  components: {
    timer: TimerComponent
  }
};
</script>
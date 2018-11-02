<template>
<div class="center-content">
  <div>
    <header-component title="Hello Vue.js!">And some other tech</header-component>
  </div>
  <div><button-counter/></div>
  <div><button-counter/></div>
  <div>
    <h1><timer/></h1>
  </div>
</div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import ButtonCounter from "./components/ButtonCounter.vue";
import TimerComponent from "./components/TimerComponent.vue";

export default {
  components: {
    "header-component": HeaderComponent,
    "button-counter": ButtonCounter,
    timer: TimerComponent
  }
};
</script>


<style scoped>
.center-content > div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
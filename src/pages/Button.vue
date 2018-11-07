<template>
<div class="center-content">
    <button-counter/>
</div>
</template>

<script>
import ButtonComponent from "../components/ButtonCounter.vue";
import "../css/common.css";

export default {
  components: {
    "button-counter": ButtonComponent
  }
};
</script>
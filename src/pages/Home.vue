<template>
    <header-component class="center-content" title="Hello Vue.js!">
        And some other tech
    </header-component>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import "../css/common.css";

export default {
  components: {
    "header-component": HeaderComponent
  }
};
</script>

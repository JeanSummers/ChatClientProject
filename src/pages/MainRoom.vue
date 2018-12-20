<template>
    <div>
        <h1>Общий чат</h1>
        <chat/>
    </div>
</template>

<script>
import Chat from "../components/Chat.vue";
export default {
  components: {
    chat: Chat
  }
};
</script>

<template>
    <div>
        <h1>Приватный чат №{{ $route.params.id }}</h1>
        <chat></chat>
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

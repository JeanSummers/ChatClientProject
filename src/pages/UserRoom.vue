<template>
    <div>
        <h1>Чат с пользователем "{{ $route.params.id }}"</h1>
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

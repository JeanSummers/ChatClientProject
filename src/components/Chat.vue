<template>
<div>
   <div>
       <p v-for="message in messages" :key="message">{{message}}</p>
   </div>
   <input type="text" v-model="input" @keypress="keyHandle">
</div>
</template>


<script>
export default {
  data: () => ({
    messages: ["Напиши что-нибудь"],
    input: ""
  }),
  methods: {
    keyHandle: function(event) {
      if (event.keyCode == 13) this.send();
    },
    send: function() {
      this.messages.push(this.input);
      this.input = "";
    }
  }
};
</script>

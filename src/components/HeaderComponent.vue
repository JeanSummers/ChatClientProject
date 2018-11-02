<template>
    <div>
        <h1>{{ title }}</h1>
        <p><slot/></p>
    </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

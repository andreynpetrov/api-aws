<template>
  <div class="page">
    <h1>{{ page.title }}</h1>
    <div>{{ page.content }}</div>
  </div>
</template>

<script>
export default {
  name: "Page",
  props: {
    page: Object
  }
};
</script>
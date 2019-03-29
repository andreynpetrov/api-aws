<template>
  <div class="PageItem">
    <p>Index: "{{ index }}" Title: "{{ page.title }}"</p>
  </div>
</template>

<script>
export default {
  name: "PageItem",
  props: {
    index: Number,
    page: Object
  }
};
</script>
<template>
  <div class="PageItem">
    <v-btn flat small :to="{ name: 'page', params: { slug: page.slug } }">{{ page.title }}</v-btn>
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

<template>
  <div class="PageItem">
    <b-link :to="{ name: 'page', params: { slug: page.slug } }">{{ page.title }}</b-link>
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
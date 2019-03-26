<template>
  <div class="page">
    <h1>{{ page.title }}</h1>
    <div v-html="htmlContent"></div>
  </div>
</template>

<script>
import * as marked from "marked";

export default {
  name: "Page",
  props: {
    page: Object
  },
  computed: {
    htmlContent: function() {
      if (this.page.content) {
        return marked(this.page.content, { sanitize: true });
      } else {
        return "Loaded...";
      }
    }
  }
};
</script>

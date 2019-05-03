<template>
  <div class="pageview">
    <Page :page="page" v-if="page.loading == undefined" />
  </div>
</template>

<script>
import Page from "@/components/Page.vue";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "PageView",
  components: {
    Page
  },
  computed: {
    ...mapState({
      page: state => state.pages.page
    })
  },
  methods: {
    ...mapActions({
      getPage: "pages/getPage"
    })
  },
  created: function() {
    this.getPage(this.$route.params.slug);
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      this.getPage(this.$route.params.slug);
    }
  }
};
</script>
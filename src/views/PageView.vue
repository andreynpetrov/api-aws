<template>
  <div class="pageview">
    <Page :page="page" />
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
  mounted: function() {
    this.getPage(this.$route.params.slug);
  }
};
</script>

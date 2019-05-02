<template>
  <div class="SearchView">
    <v-btn fab bottom right color="pink" dark fixed @click="createPage">
      <v-icon>add</v-icon>
    </v-btn>

    <div v-if="pageSearchResults.loading">Loading</div>
    <PageItem
      v-else
      v-for="(item, index) in pageSearchResults"
      v-bind:index="index"
      v-bind:page="item"
    ></PageItem>
  </div>
</template>

<script>
import PageItem from "@/components/PageItem.vue";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "SearchView",
  components: {
    PageItem
  },
  computed: {
    ...mapState({
      pageSearchResults: state => state.pages.pageSearchResults
    })
  },
  methods: {
    ...mapActions({
      getPageSearchResults: "pages/getPageSearchResults"
    }),
    createPage: function() {
      this.$router.push({ name: "createPage" });
    }
  },
  mounted: function() {
    const body = { field: "content", query: this.$route.params.query };
    this.getPageSearchResults(body);
  }
};
</script>

<template>
  <div class="PageView">
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="createPage"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <div v-if="pageList.loading">Loading</div>
    <PageItem
      v-else
      v-for="(item, index) in pageList.Pages"
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
  name: "PageView",
  components: {
    PageItem
  },
  computed: {
    ...mapState({
      pageList: state => state.pages.pageList
    })
  },
  methods: {
    ...mapActions({
      getPageList: "pages/getPageList"
    }),
    createPage: function() {
      this.$router.push({ name: "createPage" });
    }
  },
  mounted: function() {
    this.getPageList();
  }
};
</script>

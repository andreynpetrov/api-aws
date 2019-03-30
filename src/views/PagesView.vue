<template>
  <div class="PageView">
    <b-button v-on:click="createPage" variant="outline-primary" size="sm">New</b-button>
    <div v-if="pageList.loading">Loading</div>
    <PageItem v-else v-for="(item, index) in pageList.Pages" 
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
      this.$router.push({ name: 'createPage' })
    }
  },
  mounted: function() {
    this.getPageList();
  }
};
</script>

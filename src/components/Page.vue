<template>
  <div class="page">
    <b-form @submit="submitEdit" @reset="cancelEdit" v-if="edit">
      <b-form-group 
      id="input-group-1" 
      label="Title" 
      label-for="title">
        <b-form-input
          id="title"
          v-model="localPage.title"
          required
          placeholder="Enter page title"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Content"
        label-for="content"
        description="Wiki page content in Markdown markup."
      >
        <b-form-textarea
          v-model="localPage.content"
          id="content"
          required
          placeholder="Enter page content"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="outline-primary" size="sm">Submit</b-button>
      <b-button type="reset" variant="outline-secondary" size="sm">Cancel</b-button>
    </b-form>
    <div v-else>
      <h1>{{ page.title }}</h1>
      <div v-html="htmlContent"></div>
      <b-button v-on:click="enableEdit" variant="outline-primary" size="sm">Edit</b-button>
    </div>
  </div>
</template>

<script>
import * as marked from "marked";
import { mapActions } from "vuex";

export default {
  name: "Page",
  props: {
    page: Object
  },
  data: function() {
    return {
      edit: false,
      localPage: this.page
    };
  },
  watch: {
    page: function () {
      this.localPage = this.page
    }
  },
  methods: {
    enableEdit: function(event) {
      this.edit = true;
    },
    cancelEdit: function(event) {
      this.edit = false;
    },
    submitEdit: function(event) {
      event.preventDefault()
      this.createPage(this.localPage)
      this.edit = false;
    },
    ...mapActions({
      createPage: "pages/createPage"
    })
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

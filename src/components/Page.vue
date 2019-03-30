<template>
  <div class="page">
    <b-form @submit="submitEdit" @reset="cancelEdit" v-if="edit">
      <b-form-group 
      id="input-group-1" 
      label="Title" 
      label-for="title">
        <b-form-input
          id="title"
          v-model.lazy="form.title"
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
          v-model.lazy="form.content"
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
      <b-button v-b-modal.modal-1 variant="outline-danger" size="sm">Delete</b-button>

      <!-- Modal Component -->
      <b-modal id="modal-1" v-on:ok="submitDelete">
      <p class="my-4">Delete page?</p>
      </b-modal>
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
      form: {
        slug: this.page.slug,
        title: this.page.title,
        content: this.page.content
      }
    };
  },
  methods: {
    enableEdit: function(event) {
      this.edit = true;
    },
    cancelEdit: function(event) {
      this.edit = false;
      this.form.title = this.page.title;
      this.form.content = this.page.content;
    },
    submitEdit: function(event) {
      event.preventDefault()
      this.createPage(this.form)
      this.edit = false;
    },
    submitDelete: function(event) {
      console.log("sumbitDelete");
      this.deletePage(this.page.slug);
      this.$router.push({ name: 'pages' })
    },
    ...mapActions({
      createPage: "pages/createPage",
      deletePage: "pages/deletePage"
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

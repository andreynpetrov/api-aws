<template>
  <div class="page">
    <v-form ref="form" v-model="valid" lazy-validation v-if="edit">
      <v-text-field v-model="form.title" label="Title" required></v-text-field>

      <v-textarea
        v-model="form.content"
        label="Content"
        placeholder="Enter page content in mardown markup."
        auto-grow
        full-width
        single-line
        required
      ></v-textarea>

      <v-btn color="success" @click="submitEdit">Submit</v-btn>

      <v-btn color="error" @click="cancelEdit">Cancel</v-btn>
    </v-form>
    <div v-else>
      <h1>{{ page.title }}</h1>
      <Dynamic v-bind:template="htmlContent"></Dynamic>
      <v-btn v-on:click="enableEdit">Edit</v-btn>
      <v-btn v-on:click="submitDelete">Delete</v-btn>
      <v-btn :to="{ name: 'home'}">Home</v-btn>
    </div>
  </div>
</template>

<script>
import * as marked from "marked";
import { mapActions } from "vuex";
import Dynamic from "@/components/Dynamic.vue";

var renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
  return `<router-link to="${href}">${text}</router-link>`;
};

export default {
  name: "Page",
  components: {
    Dynamic
  },
  props: {
    page: Object
  },
  data: function() {
    return {
      valid: true,
      edit: false,
      test: "<p>my test</p>", 
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
      event.preventDefault();
      this.createPage(this.form);
      this.edit = false;
    },
    submitDelete: function(event) {
      console.log("sumbitDelete");
      this.deletePage(this.page.slug);
      this.$router.push({ name: "pages" });
    },
    ...mapActions({
      createPage: "pages/createPage",
      deletePage: "pages/deletePage"
    })
  },
  computed: {
    htmlContent: function() {
      if (this.page.content) {
        return "<div>" + marked(this.page.content, {
          sanitize: true,
          renderer: renderer
        }) + "</div>";
      } else {
        return "Loaded...";
      }
    }
  }
};
</script>

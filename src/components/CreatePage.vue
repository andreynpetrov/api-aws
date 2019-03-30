<template>
  <div class="page">
    <b-form @submit="submitEdit" @reset="cancelEdit">
      <b-form-group
      id="input-group-1" 
      label="Slug" 
      label-for="slug">
        <b-form-input
          id="slug"
          v-model.lazy="form.slug"
          required
          placeholder="Enter page slug"
        ></b-form-input>
      </b-form-group>

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
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CreatePage",
  data: function() {
    return {
      form: {},
    };
  },
  methods: {
    cancelEdit: function(event) {
      event.preventDefault()
      this.$router.go(-1)
    },
    submitEdit: function(event) {
      event.preventDefault()
      this.createPage(this.form)
      this.$router.push({ name: 'page', params: { slug: this.form.slug }})
    },
    ...mapActions({
      createPage: "pages/createPage"
    })
  }
};
</script>

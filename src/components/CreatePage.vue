<template>
  <div class="page">
    <v-form ref="form" v-model="form.valid" lazy-validation>
      <v-text-field v-model="form.slug" label="Slug" required></v-text-field>
      <v-text-field v-model="form.title" label="Title" required></v-text-field>
      <v-textarea v-model="form.content" label="Content" auto-grow required></v-textarea>
      <v-btn color="success" @click="submitForm">Submit</v-btn>
      <v-btn color="warning" @click="cancelForm">Cancel</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CreatePage",
  data: function() {
    return {
      form: {}
    };
  },
  methods: {
    cancelForm: function(event) {
      event.preventDefault();
      this.$router.go(-1);
    },
    submitForm: function(event) {
      event.preventDefault();
      this.createPage(this.form);
      this.$router.push({ name: "page", params: { slug: this.form.slug } });
    },
    ...mapActions({
      createPage: "pages/createPage"
    })
  }
};
</script>

<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'home' }">Wiki</b-navbar-brand>
      <b-navbar-toggle target="nav_collapse" />
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'pages' }">Pages</b-nav-item>          
          <b-nav-item
            v-if="this.signedIn"
            :to="{ name: 'auth' }"
            @click="signOut"
            >SignOut</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import { components } from "aws-amplify-vue";
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import { mapState } from "vuex";

export default {
  name: "app",
  async beforeCreate() {
    try {
      // eslint-disable-next-line
      const user = await Auth.currentAuthenticatedUser();
      this.signedIn = true;
    } catch (err) {
      this.signedIn = false;
    }
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    });
  },
  data() {
    return {
      signedIn: false,
      logger: {}
    };
  },
  components: {
    ...components
  },
  async mounted() {
    this.logger = new this.$Amplify.Logger(this.$options.name);
  },
  computed: {
    ...mapState({ user: "account/user" })
  },
  methods: {
    // eslint-disable-next-line
    signOut: function(event) {
      Auth.signOut()
        .then(() => {
          this.logger.info("signout success");
          return AmplifyEventBus.$emit("authState", "signedOut");
        })
        .catch(e => this.setError(e));
    },
    setError: function(e) {
      this.error = this.$Amplify.I18n.get(e.message || e);
      this.logger.error(this.error);
    }
  }
};
</script>

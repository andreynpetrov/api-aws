<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/pages">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Pages</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user" v-on:click="signOut">
          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-3" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Wiki</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon>
        <v-icon>search</v-icon>
        </v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
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
      logger: {},
      drawer: null
    };
  },
  props: {
    source: String
  },
  components: {
    ...components
  },
  async mounted() {
    this.logger = new this.$Amplify.Logger(this.$options.name);
  },
  computed: {
    ...mapState('account', { 
            user: state => state.user, 
      })
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
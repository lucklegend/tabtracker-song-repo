<template>
  <v-app-bar
    color="cyan"
    dense
    dark
    fixed
  >
    <v-toolbar-title>
      <router-link
        class="home"
        tag="span"
        :to="{name: 'songs'}"
      >
        TabTracker
      </router-link></v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        text
        dark
        :to="{name: 'songs'}"
      >Browser</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        text
        dark
        v-if="!$store.state.isUserLoggedIn"
        :to="{name: 'login'}"
      >
        Login
      </v-btn>
      <v-btn
        text
        dark
        v-if="!$store.state.isUserLoggedIn"
        :to="{name: 'register'}"
      >
        Sign Up
      </v-btn>
      <v-btn
        text
        dark
        v-if="$store.state.isUserLoggedIn"
        @click="logout"
      >
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'songs' })
    }
  }
}
</script>

<style scoped>
.home{
  cursor: pointer;
}
.home:hover{
  color:orange;
}
</style>

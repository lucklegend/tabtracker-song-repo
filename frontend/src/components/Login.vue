<template>
  <v-layout mt-16>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-form
          name="tab-tracker-form"
          autocomplete="off"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  label="Email"
                  placeholder="Email"
                  v-model="email"
                  hide-details="auto"
                />
                <br>
                <v-text-field
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  label="Password"
                  v-model="password"
                  placeholder="Password"
                  counter
                  @click:append="showPass = !showPass"
                />
                <br>
                <v-alert
                  dense
                  text
                  v-if="error"
                  type="error"
                  v-html="error"
                />
                <v-btn
                  color="cyan"
                  elevation="2"
                  dark
                  @click="login"
                >
                Login
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </Panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Login',
  data () {
    return {
      showPass: false,
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: red;
  font-weight: bold;
}

</style>

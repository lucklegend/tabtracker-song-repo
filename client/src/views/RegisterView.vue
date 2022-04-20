<template>
  <main>
    <h1>Register</h1>
    <div>
      <input
        type="email"
        name="email"
        v-model="email"
        placeholder="Type your Email"
      />
    </div>
    <div>
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="Type your Password"
      />
    </div>
    <div class="error" v-html="error"></div>
    <button @click="register">Register</button>
  </main>
</template>
<style>
.error{
  color: red;
  font-weight: bold;
}
</style>
<script>
  import AuthenticationService from "@/services/AuthenticationService"
  export default {
    data () {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async register() {
        try{
          await AuthenticationService.register({
            email: this.email,
            password: this.password
          })
        }catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
</script>
<template>
  <section class="container">
    <div>
      <app-logo/>
<form v-if="!$auth.user" @submit.prevent="login">
      <p class="error" v-if="formError">{{ formError }}</p>
      <p><i>To login, use <b>test@test.com</b> as username and <b>test123</b> as password.</i></p>
      <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
      <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
      <button type="submit">Login</button>
    </form>
    <div v-else>
      Hello {{ $auth.user}}!
      <pre>I am the secret content, I am shown only when the user is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="$auth.logout()">Logout</button>
    </div>
    <p><nuxt-link to="/">return to home</nuxt-link></p>
  </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  auth: false,
  components: {
    AppLogo
  },
    data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login() {
      try {
        this.$toast.show('Logging in...', { duration: 500})
        await this.$auth.loginWith('local', {
  data: {
    identifier: this.formUsername,
    password: this.formPassword
  }
  
})
this.$toast.success('Successfully authenticated', {duration: 2000})
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

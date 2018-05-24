<template>
  <section class="container">
    <div>
      <app-logo/>
<form v-if="!$auth.user" @submit.prevent="register">
      <p class="error" v-if="formError">{{ formError }}</p>
      <p>Please register</p>
      <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
      <p>Email: <input type="text" v-model="formEmail" name="email" /></p>
      <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
      <button type="submit">Register</button>
    </form>

    <p><nuxt-link to="/">return to home</nuxt-link></p>
  </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import axios from 'axios'
import toast from '@nuxtjs/toast'

export default {
  auth: false,
  components: {
    AppLogo
  },
    data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: '',
      formEmail:''
    }
  },
  methods: {
async register(data) {
  try {
   await axios.post('http://localhost:1337/auth/local/register', {
    username: this.formUsername,
    password: this.formPassword,
    email: this.formEmail
  }).then(response => {
    console.log(response);
    this.$auth.setToken('local', response.data.jwt);
  })
  this.$toast.success('Success! You have been registered.', {duration: 2000});
  await this.$auth.loginWith('local', {
  data: {
    identifier: this.formUsername,
    password: this.formPassword
  }
  
})

  
  } catch(e){
    console.log(e);
     this.$toast.error(`Hmmm... Something isn't right. Did you already register?`, {duration: 2000});
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

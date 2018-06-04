<template>
  <section class="container">
    <div>
      <app-logo/>
<form @submit.prevent="register">
      <p class="error" v-if="formError">{{ formError }}</p>
      <p>Edit your Account Info</p>
      <p>Username: <input v-validate="{ required: true, min: 6 }" type="text" v-model="formUsername" name="username" /></p>
      <p>Email: <input v-validate="'required|email'" type="text" v-model="formEmail" name="email" /></p>
      <!-- If it has an email error, display the first message associated with it. -->
        <span v-show="errors.has('email')"><b-badge variant="danger">{{ errors.first('email') }}</b-badge></span>

      <!-- Personal info -->

        <p>First Name: <input v-validate="'required'" type="text" v-model="formFirstName" name="firstName" /></p>
        <!-- FirstName error display -->
        <span v-show="errors.has('firstName')"><b-badge variant="danger">{{ errors.first('firstName') }}</b-badge></span>

        <p>Last Name: <input v-validate="'required'" type="text" v-model="formLastName" name="lastName" /></p>
        <!-- LastName error display -->
        <span v-show="errors.has('lastName')"><b-badge variant="danger">{{ errors.first('lastName') }}</b-badge></span>

      <!-- /Personal info -->
      <p><b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..." name="file" accept="image/*"></b-form-file></p>

      <!-- <p>Password: <input v-validate="{ required: true, min: 6 }" type="password" v-model="formPassword" name="password" /></p>
      <span v-show="errors.has('password')"><b-badge variant="danger">{{ errors.first('password') }}</b-badge></span><br/>
      
      <p>Confirm Password: <input v-validate="{ required: true, min: 6, confirmed:'password' }" type="password" name="confirmPassword" /></p>
      <span v-show="errors.has('confirmPassword')"><b-badge variant="danger">{{ errors.first('confirmPassword') }}</b-badge></span><br/> -->

      <button :disabled="errors.any()" type="submit">Edit Info</button>
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
      this.fetchSomething()
    return {
      formError: null,
      formUsername: this.$auth.user.username,
      formPassword: '',
      formEmail: this.$auth.user.email,
      formFirstName: this.$auth.user.firstName,
      formLastName: this.$auth.user.lastName,
      file: null
    }
  },
  methods: {

async register(data) {
  
  try {
   await this.$axios.$put('http://localhost:1337/user/' + this.$auth.user._id, {
    // username: this.formUsername,
    // password: this.formPassword,
    // email: this.formEmail,
    firstName: this.formFirstName,
    lastName: this.formLastName
  }).then(response => {
    console.log(response);
    // this.$auth.setToken('local', response.data.jwt);
  })

  await this.$axios.$post('/upload?refId=' + this.$auth.user._id + '&ref=user&source=users-permissions&field=avatar', {
    files: this.file

  }).then(response => {
    console.log(response);
    // this.$auth.setToken('local', response.data.jwt);
  })
  this.$toast.success('Success! You have updated your account info.', {duration: 2000});
  await this.$auth.fetchUser()
//   await this.$auth.loginWith('local', {
//   data: {
//     identifier: this.formUsername,
//     password: this.formPassword
//   }
  
// })

  
  } catch(e){
    console.log(e);
     this.$toast.error(`Hmmm... Something isn't right.?`, {duration: 2000});
  }
  },
  async fetchSomething() {
    const userInfo = await this.$axios.$get('/user/me', {

    }).then(response => {
    console.log(response);
    // this.$auth.setToken('local', response.data.jwt);
  })
    this.userInfo = userInfo
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

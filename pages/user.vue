<template>
  <section class="container">
    <div>
      <app-logo/>
      <!-- <h1 class="title">
        user page
      </h1> -->
      <h2 class="subtitle">
        Hello {{$auth.user.username}}!
      </h2>
      <p>Your name is: {{$auth.user.firstName}} {{$auth.user.lastName}}</p>

      <p>Your account role is: {{$auth.user.role.type}}</p>

      <p>Your email is: {{$auth.user.email}}</p>

      <p>Your ID is: {{$auth.user._id}}</p>

      <template v-if="$auth.user.subscriber === true">
        <p>Thanks for subscribing!</p>
        </template>

<template v-if="$auth.user.avatar === null">
     <b-img rounded="circle" blank width="75" height="75" blank-color="#777" alt="img" class="m-1" />
  </template>
<template v-else>
<b-img :src="'http://localhost:1337' + $auth.user.avatar.url" rounded="circle" width="100" height="100" alt="img" class="m-1" />
</template>

      <div class="links">
        <nuxt-link to="/" class="button--green">Home</nuxt-link>
        <nuxt-link to="/user-edit" class="button--green">Edit Profile</nuxt-link>
        <button class="button--green" @click="$auth.logout()">Logout</button>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
async asyncData (ctx) {
    let { data } = await ctx.app.$axios.get('/user' )
    return { 
      username: data.username,
      avatar: data.avatar }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  components: {
    AppLogo
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

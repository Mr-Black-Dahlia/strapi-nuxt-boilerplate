<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        logintest
      </h1>
      <h2 class="subtitle">
        A test nuxt-auth project for strapi
      </h2>
      <div class="links">
        <a
          href="#"
          target=""
          class="button--grey">Documentation</a>
        <nuxt-link to="/about" class="button--green">About</nuxt-link>
        <template v-if="$auth.$state.loggedIn">
          
          <button class="button--green" @click="$auth.logout()">Logout</button>
        </template>
        <template v-if="$auth.$state.loggedIn === false">
        <nuxt-link to="/login" class="button--green">Login</nuxt-link>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  auth: false,
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

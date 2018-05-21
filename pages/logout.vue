<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
       logging out
      </h1>
      <h2 class="subtitle">
        loggin the user out
      </h2>
    </div>
  </section>
</template>
<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  data() {
  this.$auth.logout();
  }
}
</script>
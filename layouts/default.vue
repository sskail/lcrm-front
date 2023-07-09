<template>
  <div :class="{ 'app-wrapper': showNavbar }">
    <navbar v-if="showNavbar" />

    <main :class="{ container: true, 'main-wrapper': showNavbar }">
      <router-view />
    </main>

    <AppFooter v-if="showNavbar" />
  </div>
</template>


<script>
import AppFooter from "~/components/common/app-footer/app-footer.vue";
import Navbar from "~/components/common/navbar/navbar.vue";

export default {

  components: {Navbar, AppFooter},
  data() {
    return {}
  },
  head() {
    return {


    }
  },
  computed: {
    showNavbar() {
      return this.$auth.loggedIn;
      // return this.$auth;
    },
  },


}
</script>

<style lang="scss">
main {
  height: 100%;
}

.app-wrapper {
  margin-top: 110px;
}
</style>

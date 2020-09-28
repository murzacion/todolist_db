<template>
  <v-app>
    <Header />
    <v-main>
      <router-link to="/"></router-link>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
#app {
  background: linear-gradient(to right, #67b26f, #4ca2cd);
}
</style>

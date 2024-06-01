<template>
  <div>

    <AppNavbar2 />
    <AppHero />

  </div>
</template>

<script>
  // import AppNavbar from "./components/AppNavbar.vue"
  import AppNavbar2 from "./components/AppNavbar2.vue"
  import AppHero from "./components/AppHero.vue"

  export default {
    name: 'App',
    components: {
      // AppNavbar,
      AppNavbar2,
      AppHero
    }
  }
</script>

<style>


  :root {
    --orange: hsl(8, 96%, 56%);
    --description: hsl(245, 5%, 46%);
    --graybg: hsl(0, 0%, 91%);
    --banner: hsl(0, 0%, 18%);
    --reviewbg: hsl(0, 0%, 97%);
  }

  .description {
    color: var(--description);
  }

  .container {
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  #app {
    font-family: "Outfit", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .container-fluid {
    background-color: black;
  }

  .row {
    background-color: red;
  }

  .row div {
    background-color: white;
    color: black
  }
</style>

<template>
  <div>
    <Nav />
    <router-view />
  </div>
</template>

<script setup>
  import Nav from './components/Nav.vue';
  import Home from './components/Home.vue';
</script>


<style>


  /* @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  } */



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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .row {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: black;
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

  .row div {
    background-color: white;
    color: black
  }
</style>

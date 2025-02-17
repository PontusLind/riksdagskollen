<script setup>
import { RouterView } from 'vue-router';
import SoundProvider from "./providers/SoundProvider.vue";
</script>

<template>
<nav>
  <ul>
    <li>
      <RouterLink to="/">Hem</RouterLink>
    </li>
    <li>
      <RouterLink to="/Member">Members</RouterLink>
    </li>
    <li>
      <RouterLink to="/about">About</RouterLink>
    </li>
  </ul>
</nav>
  <SoundProvider>
    <RouterView />
  </SoundProvider>
</template>

<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 10px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin: auto;
}
a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

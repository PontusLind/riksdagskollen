<template>
    <div>
      <h1>Welcome to Riksdagskollen</h1>
      <p>Your source for information about the Swedish Parliament.</p>
      <nav>
        <ul>
          <li>
            <RouterLink to="/Member">Members</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </template>

  <script setup>
  import { RouterLink } from 'vue-router';
  </script>

  <style scoped>
  nav ul {
    list-style-type: none;
    padding: 0;
  }

  nav li {
    display: inline;
    margin: 0 10px;
  }

  a {
    color: #3498db;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
  </style>

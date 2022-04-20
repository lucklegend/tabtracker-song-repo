<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

.wrapper{
  padding:0px 10px;
}
main{
  padding:0px 10px;
}
header {
  line-height: 1.5;
  
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  margin: 2px 4px
}
</style>

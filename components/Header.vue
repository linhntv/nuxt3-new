<template>
  <nav class="header">
    <nuxt-link to="/" class="header-button">Home</nuxt-link>
    <nuxt-link to="/Management" class="header-button">Management</nuxt-link>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  padding: 40px;
  display: flex;
  gap: 18px;
  &-button {
    text-decoration: none;
    color: rgb(48, 46, 46);
    font-size: 18px;
    font-weight: 500;
  }
  &-button:hover {
    cursor: pointer;
    color: #ccc;
  }
}
</style>

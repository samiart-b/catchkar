<!-- src/views/HomeView.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <Tools />
    <SuccessStories />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import SuccessStories from '../components/SuccessStories.vue';
import Tools from '../components/Tools.vue';
</script>

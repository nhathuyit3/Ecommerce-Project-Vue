<script setup>
import Navbar from './components/layout/Navbar.vue';
</script>

<template>
  <div id="app-wrapper">
    <Navbar />
    <main class="app-main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main-content {
  flex-grow: 1; /* Đảm bảo nội dung chính chiếm hết không gian còn lại */
  padding: 1rem 0; /* Có thể điều chỉnh padding tổng thể cho các trang */
}
</style>

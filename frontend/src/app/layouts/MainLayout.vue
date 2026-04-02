<script setup>
</script>

<template>
  <div class="main-layout">
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  background: #e8eaf6;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>

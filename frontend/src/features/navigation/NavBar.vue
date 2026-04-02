<script setup>
import NavMenu from './NavMenu.vue';
import SortMenu from './SortMenu.vue';

const searchInput = defineModel('searchInput');

const emit = defineEmits(['sort-newest', 'sort-oldest']);
</script>

<template>
  <nav class="navbar">
    <NavMenu />

    <div class="navbar__search-wrapper">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Поиск привычек..."
        class="navbar__search"
      />
    </div>

    <SortMenu
      @sort-newest="emit('sort-newest')"
      @sort-oldest="emit('sort-oldest')"
    />
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar__search-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}

.navbar__search {
  width: 100%;
  max-width: 500px;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #fff;
  background: linear-gradient(to bottom, #818cf8, #4f46e5);
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
  outline: none;
}

.navbar__search::placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8125rem;
}
</style>

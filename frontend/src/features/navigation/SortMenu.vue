<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const emit = defineEmits(['sort-newest', 'sort-oldest']);
</script>

<template>
  <Menu as="div" class="sort-menu">
    <MenuButton class="sort-menu__trigger">
      Сортировка
      <ChevronDownIcon class="sort-menu__icon" aria-hidden="true" />
    </MenuButton>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="sort-menu__dropdown">
        <MenuItem v-slot="{ active }">
          <button
            :class="['sort-menu__item', { 'sort-menu__item--active': active }]"
            @click="emit('sort-newest')"
          >
            Сначала новые
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            :class="['sort-menu__item', { 'sort-menu__item--active': active }]"
            @click="emit('sort-oldest')"
          >
            Сначала старые
          </button>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<style scoped>
.sort-menu {
  position: relative;
  display: inline-block;
}

.sort-menu__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(to bottom, #818cf8, #4f46e5);
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
  transition: all 0.15s ease;
}

.sort-menu__trigger:active {
  transform: scale(0.95);
}

.sort-menu__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #fff;
}

.sort-menu__dropdown {
  position: absolute;
  right: 0;
  z-index: 50;
  margin-top: 0.5rem;
  min-width: 10rem;
  border-radius: 0.5rem;
  background: #6366f1;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.sort-menu__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.1s ease;
}

.sort-menu__item--active {
  background: rgba(255, 255, 255, 0.2);
}
</style>

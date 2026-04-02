<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { TASK_STATUS } from '@/shared/utils/constants';

const props = defineProps({
  progress: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['mark-completed', 'mark-in-progress', 'delete']);

const route = useRoute();

const canMarkCompleted = computed(
  () =>
    props.progress !== TASK_STATUS.COMPLETED &&
    route.path !== '/tasks/completed',
);

const canMarkInProgress = computed(
  () =>
    props.progress !== TASK_STATUS.IN_PROGRESS &&
    props.progress !== TASK_STATUS.COMPLETED &&
    route.path !== '/tasks/in-progress',
);
</script>

<template>
  <Menu as="div" class="task-actions">
    <MenuButton class="task-actions__trigger">
      Действия
      <ChevronDownIcon class="task-actions__icon" aria-hidden="true" />
    </MenuButton>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="task-actions__dropdown">
        <MenuItem v-if="canMarkCompleted" v-slot="{ active }">
          <button
            :class="['task-actions__item', { 'task-actions__item--active': active }]"
            @click="emit('mark-completed')"
          >
            В выполненные
          </button>
        </MenuItem>

        <MenuItem v-if="canMarkInProgress" v-slot="{ active }">
          <button
            :class="['task-actions__item', { 'task-actions__item--active': active }]"
            @click="emit('mark-in-progress')"
          >
            В процессе
          </button>
        </MenuItem>

        <MenuItem v-slot="{ active }">
          <button
            :class="['task-actions__item task-actions__item--danger', { 'task-actions__item--active': active }]"
            @click="emit('delete')"
          >
            Удалить
          </button>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<style scoped>
.task-actions {
  position: relative;
  display: inline-block;
}

.task-actions__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.625rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(to bottom, #818cf8, #4f46e5);
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
  transition: all 0.15s ease;
}

.task-actions__trigger:active {
  transform: scale(0.95);
}

.task-actions__icon {
  width: 1rem;
  height: 1rem;
  color: #fff;
}

.task-actions__dropdown {
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

.task-actions__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.1s ease;
}

.task-actions__item--active {
  background: rgba(255, 255, 255, 0.2);
}

.task-actions__item--danger {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
</style>

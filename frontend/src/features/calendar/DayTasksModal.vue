<script setup>
import { computed } from 'vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import TaskStatusBadge from '@/features/tasks/TaskStatusBadge.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  currentDate: { type: Date, required: true },
  selectedDay: { type: Number, default: null },
  tasks: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:modelValue']);

const formattedDate = computed(() => {
  if (!props.selectedDay) return '';
  const month = props.currentDate.getMonth() + 1;
  const year = props.currentDate.getFullYear();
  return `${props.selectedDay}.${month}.${year}`;
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click.self="emit('update:modelValue', false)"
      >
        <div class="modal-card">
          <h3 class="modal-title">Задачи за {{ formattedDate }}</h3>

          <ul v-if="tasks.length > 0" class="day-tasks-list">
            <li v-for="task in tasks" :key="task.id" class="day-tasks-item">
              <span class="day-tasks-name">{{ task.habit }}</span>
              <TaskStatusBadge :status="task.progress" />
            </li>
          </ul>
          <p v-else class="day-tasks-empty">Пустой день</p>

          <BaseButton
            label="Закрыть"
            variant="primary"
            size="sm"
            @click="emit('update:modelValue', false)"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.modal-card {
  background: #fff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 500px;
  max-height: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-title {
  font-size: 1.125rem;
  font-style: italic;
  margin: 0 0 1rem;
  color: #1f2937;
}

.day-tasks-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  max-height: 250px;
  overflow-y: auto;
}

.day-tasks-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.day-tasks-item:last-child {
  border-bottom: none;
}

.day-tasks-name {
  font-size: 0.9375rem;
  color: #374151;
}

.day-tasks-empty {
  font-style: italic;
  color: #9ca3af;
  margin: 0 0 1rem;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>

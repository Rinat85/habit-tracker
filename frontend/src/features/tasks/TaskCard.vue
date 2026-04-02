<script setup>
import TaskStatusBadge from './TaskStatusBadge.vue';
import TaskActions from './TaskActions.vue';
import { formatDateRu } from '@/shared/utils/formatters';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['mark-completed', 'mark-in-progress', 'delete']);
</script>

<template>
  <li class="task-card">
    <div class="task-card__header">
      <h3 class="task-card__category">{{ task.category }}</h3>
      <span class="task-card__date">
        {{ formatDateRu(task.dateCreatedTask) }}
      </span>
    </div>

    <div class="task-card__body">
      <h4 class="task-card__title">{{ task.habit }}</h4>
      <p class="task-card__meta">{{ task.frequency }}</p>
      <p class="task-card__meta">{{ task.time }}</p>
    </div>

    <div class="task-card__footer">
      <TaskStatusBadge :status="task.progress" />
      <TaskActions
        :progress="task.progress"
        @mark-completed="emit('mark-completed', task.id)"
        @mark-in-progress="emit('mark-in-progress', task.id)"
        @delete="emit('delete', task.id)"
      />
    </div>
  </li>
</template>

<style scoped>
.task-card {
  width: 280px;
  padding: 1.25rem;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.task-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.task-card__category {
  font-size: 1rem;
  font-style: italic;
  color: #1f2937;
  margin: 0;
}

.task-card__date {
  font-size: 0.75rem;
  color: #9ca3af;
  white-space: nowrap;
}

.task-card__body {
  flex: 1;
  padding: 0.25rem 0;
}

.task-card__title {
  font-size: 1.05rem;
  color: #111827;
  margin: 0 0 0.25rem;
}

.task-card__meta {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin: 0;
  padding-left: 0.5rem;
}

.task-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
</style>

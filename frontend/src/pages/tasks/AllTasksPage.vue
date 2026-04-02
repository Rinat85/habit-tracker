<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useTasksStore } from '@/app/store/useTasksStore';
import { useTaskSearch } from '@/features/tasks/composables/useTaskSearch';
import { useTaskActions } from '@/features/tasks/composables/useTaskActions';
import TaskCard from '@/features/tasks/TaskCard.vue';
import ConfirmModal from '@/shared/ui/ConfirmModal.vue';
import NavBar from '@/features/navigation/NavBar.vue';

const authStore = useAuthStore();
const tasksStore = useTasksStore();
const { searchInput } = useTaskSearch();
const { deleteDialog, handleMarkCompleted, handleMarkInProgress, handleDelete, confirmDelete } = useTaskActions();

onMounted(async () => {
  await authStore.loadUser();
  await tasksStore.fetchTasks();
});
</script>

<template>
  <div class="tasks-page">
    <NavBar
      v-model:search-input="searchInput"
      @sort-newest="tasksStore.setSortOrder('newest')"
      @sort-oldest="tasksStore.setSortOrder('oldest')"
    />

    <div class="tasks-page__content">
      <ul class="tasks-grid">
        <TaskCard
          v-for="task in tasksStore.sortedTasks"
          :key="task.id"
          :task="task"
          @mark-completed="handleMarkCompleted"
          @mark-in-progress="handleMarkInProgress"
          @delete="handleDelete"
        />
      </ul>

      <p v-if="tasksStore.sortedTasks.length === 0" class="tasks-page__empty">
        Нет привычек для отображения
      </p>
    </div>

    <ConfirmModal
      v-if="deleteDialog.isVisible.value"
      :message="deleteDialog.message.value"
      @confirm="confirmDelete"
      @cancel="deleteDialog.hide"
    />
  </div>
</template>

<style scoped>
.tasks-page__content {
  padding: 2rem 1rem;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tasks-page__empty {
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  padding: 3rem 0;
  font-size: 1.05rem;
}
</style>

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { tasksApi } from '@/shared/api/tasksApi';
import { TASK_STATUS } from '@/shared/utils/constants';
import { sortByNewest, sortByOldest } from '@/shared/utils/formatters';
import { useAuthStore } from './useAuthStore';

export const useTasksStore = defineStore('tasks', () => {
  const authStore = useAuthStore();

  const tasks = ref([]);
  const searchQuery = ref('');
  const sortOrder = ref('newest'); // 'newest' | 'oldest'

  // --- Computed: фильтрация по статусу ---
  const completedTasks = computed(() =>
    sortedTasks.value.filter((t) => t.progress === TASK_STATUS.COMPLETED),
  );

  const inProgressTasks = computed(() =>
    sortedTasks.value.filter((t) => t.progress === TASK_STATUS.IN_PROGRESS),
  );

  const uncompletedTasks = computed(() =>
    sortedTasks.value.filter((t) => t.progress === TASK_STATUS.NOT_COMPLETED),
  );

  const sortedTasks = computed(() => {
    const sorted = [...tasks.value];
    return sortOrder.value === 'newest' ? sorted.sort(sortByNewest) : sorted.sort(sortByOldest);
  });

  // --- Actions ---
  const fetchTasks = async () => {
    if (!authStore.userId) return;

    try {
      tasks.value = await tasksApi.getByUserId(authStore.userId);
    } catch (error) {
      console.error('Не удалось загрузить задачи', error);
    }
  };

  const searchTasks = async (query) => {
    if (!authStore.userId) return;
    searchQuery.value = query;

    if (!query) {
      await fetchTasks();
      return;
    }

    try {
      tasks.value = await tasksApi.search(authStore.userId, query);
    } catch (error) {
      console.error('Не удалось найти данные', error);
    }
  };

  const createTask = async ({ habit, time, category, frequency }) => {
    if (!authStore.userId) return;

    const newTask = await tasksApi.create({
      habit,
      time,
      category,
      frequency,
      progress: TASK_STATUS.NOT_COMPLETED,
      dateCreatedTask: new Date(),
      userId: authStore.userId,
    });

    tasks.value.push(newTask);

    await authStore.updateCounters({
      allTasksCurrent: (authStore.user?.allTasksCurrent ?? 0) + 1,
    });
  };

  const markAsCompleted = async (taskId) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (!task) return;

    const wasInProgress = task.progress === TASK_STATUS.IN_PROGRESS;

    await tasksApi.updateProgress(taskId, TASK_STATUS.COMPLETED);
    task.progress = TASK_STATUS.COMPLETED;

    const counters = {
      completedTasksCurrent: (authStore.user?.completedTasksCurrent ?? 0) + 1,
    };

    if (wasInProgress) {
      counters.inProgressTasksCurrent = Math.max(
        (authStore.user?.inProgressTasksCurrent ?? 0) - 1,
        0,
      );
    }

    await authStore.updateCounters(counters);
  };

  const markAsInProgress = async (taskId) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (!task) return;

    await tasksApi.updateProgress(taskId, TASK_STATUS.IN_PROGRESS);
    task.progress = TASK_STATUS.IN_PROGRESS;

    await authStore.updateCounters({
      inProgressTasksCurrent: (authStore.user?.inProgressTasksCurrent ?? 0) + 1,
    });
  };

  const deleteTask = async (taskId) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (!task) return;

    await tasksApi.delete(taskId);
    tasks.value = tasks.value.filter((t) => t.id !== taskId);

    const counters = {};
    if (task.progress === TASK_STATUS.IN_PROGRESS) {
      counters.inProgressTasksCurrent = Math.max(
        (authStore.user?.inProgressTasksCurrent ?? 0) - 1,
        0,
      );
    }

    if (Object.keys(counters).length > 0) {
      await authStore.updateCounters(counters);
    }
  };

  const setSortOrder = (order) => {
    sortOrder.value = order;
  };

  return {
    tasks,
    searchQuery,
    sortOrder,
    sortedTasks,
    completedTasks,
    inProgressTasks,
    uncompletedTasks,
    fetchTasks,
    searchTasks,
    createTask,
    markAsCompleted,
    markAsInProgress,
    deleteTask,
    setSortOrder,
  };
});

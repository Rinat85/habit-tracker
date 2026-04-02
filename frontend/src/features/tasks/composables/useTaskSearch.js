import { ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useTasksStore } from '@/app/store/useTasksStore';

/**
 * Composable для поиска задач с debounce
 * Используется в: AllTasksPage, FilteredTasksPage
 */
export function useTaskSearch() {
  const tasksStore = useTasksStore();
  const searchInput = ref('');

  const debouncedSearch = useDebounceFn((query) => {
    tasksStore.searchTasks(query);
  }, 500);

  watch(searchInput, (val) => {
    if (val) {
      debouncedSearch(val);
    } else {
      tasksStore.fetchTasks();
    }
  });

  return { searchInput };
}

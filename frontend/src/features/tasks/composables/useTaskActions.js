import { useTasksStore } from '@/app/store/useTasksStore';
import { useConfirmDialog } from '@/shared/composables/useConfirmDialog';

/**
 * Composable для действий с задачами: mark completed, mark in-progress, delete
 * Используется в: AllTasksPage, FilteredTasksPage
 */
export function useTaskActions() {
  const tasksStore = useTasksStore();
  const deleteDialog = useConfirmDialog();

  const handleMarkCompleted = async (taskId) => {
    try {
      await tasksStore.markAsCompleted(taskId);
    } catch (error) {
      console.error('Ошибка', error);
    }
  };

  const handleMarkInProgress = async (taskId) => {
    try {
      await tasksStore.markAsInProgress(taskId);
    } catch (error) {
      console.error('Ошибка', error);
    }
  };

  const handleDelete = (taskId) => {
    deleteDialog.show('Хотите удалить привычку?', taskId);
  };

  const confirmDelete = async () => {
    try {
      await tasksStore.deleteTask(deleteDialog.targetId.value);
    } catch (error) {
      console.error('Не удалось удалить', error);
    }
    deleteDialog.hide();
  };

  return {
    deleteDialog,
    handleMarkCompleted,
    handleMarkInProgress,
    handleDelete,
    confirmDelete,
  };
}

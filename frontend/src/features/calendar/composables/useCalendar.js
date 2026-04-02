import { ref, computed } from 'vue';
import { MONTH_NAMES } from '@/shared/utils/constants';
import { isSameDay } from '@/shared/utils/formatters';
import { useTasksStore } from '@/app/store/useTasksStore';

/**
 * Composable для навигации по календарю и выбора дня
 * Используется в: CalendarPage
 */
export function useCalendar() {
  const tasksStore = useTasksStore();

  const currentDate = ref(new Date());
  const selectedDay = ref(null);
  const dayModalVisible = ref(false);

  const currentMonth = computed(() => currentDate.value.getMonth());
  const currentYear = computed(() => currentDate.value.getFullYear());
  const monthName = computed(() => MONTH_NAMES[currentMonth.value]);

  const prevMonth = () => {
    currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
  };

  const nextMonth = () => {
    currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
  };

  const selectDay = (day) => {
    if (!day) return;
    selectedDay.value = day;
    dayModalVisible.value = true;
  };

  const tasksOfSelectedDay = computed(() => {
    if (!selectedDay.value) return [];
    return tasksStore.tasks.filter((t) =>
      isSameDay(t.dateCreatedTask, selectedDay.value, currentMonth.value, currentYear.value),
    );
  });

  return {
    currentDate,
    selectedDay,
    dayModalVisible,
    currentMonth,
    currentYear,
    monthName,
    prevMonth,
    nextMonth,
    selectDay,
    tasksOfSelectedDay,
  };
}

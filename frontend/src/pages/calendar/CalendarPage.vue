<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useTasksStore } from '@/app/store/useTasksStore';
import { MONTH_NAMES } from '@/shared/utils/constants';
import { isSameDay } from '@/shared/utils/formatters';
import CalendarGrid from '@/features/calendar/CalendarGrid.vue';
import DayTasksModal from '@/features/calendar/DayTasksModal.vue';
import NavMenu from '@/features/navigation/NavMenu.vue';

const authStore = useAuthStore();
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

onMounted(async () => {
  await authStore.loadUser();
  await tasksStore.fetchTasks();
});
</script>

<template>
  <div class="calendar-page">
    <div class="calendar-page__nav">
      <NavMenu />
    </div>

    <CalendarGrid
      :tasks="tasksStore.tasks"
      :current-date="currentDate"
      :month-name="monthName"
      @prev-month="prevMonth"
      @next-month="nextMonth"
      @select-day="selectDay"
    />

    <DayTasksModal
      v-model="dayModalVisible"
      :current-date="currentDate"
      :selected-day="selectedDay"
      :tasks="tasksOfSelectedDay"
    />
  </div>
</template>

<style scoped>
.calendar-page__nav {
  padding: 0.5rem 1rem;
}
</style>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useTasksStore } from '@/app/store/useTasksStore';
import { useCalendar } from '@/features/calendar/composables/useCalendar';
import CalendarGrid from '@/features/calendar/CalendarGrid.vue';
import DayTasksModal from '@/features/calendar/DayTasksModal.vue';
import NavMenu from '@/features/navigation/NavMenu.vue';

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const {
  currentDate,
  selectedDay,
  dayModalVisible,
  monthName,
  prevMonth,
  nextMonth,
  selectDay,
  tasksOfSelectedDay,
} = useCalendar();

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

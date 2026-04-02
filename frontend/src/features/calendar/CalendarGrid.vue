<script setup>
import { computed } from 'vue';
import { isSameDay } from '@/shared/utils/formatters';
import { TASK_STATUS } from '@/shared/utils/constants';

const props = defineProps({
  tasks: { type: Array, default: () => [] },
  currentDate: { type: Date, default: () => new Date() },
  monthName: { type: String, required: true },
});

const emit = defineEmits(['prev-month', 'next-month', 'select-day']);

const currentMonth = computed(() => props.currentDate.getMonth());
const currentYear = computed(() => props.currentDate.getFullYear());

const daysInMonth = computed(() =>
  new Date(currentYear.value, currentMonth.value + 1, 0).getDate(),
);

const firstDayOfMonth = computed(() => {
  const day = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return day === 0 ? 6 : day - 1;
});

const calendarDays = computed(() => {
  const days = Array.from({ length: daysInMonth.value }, (_, i) => i + 1);
  const empty = Array.from({ length: firstDayOfMonth.value }, () => null);
  return [...empty, ...days];
});

const hasStatus = (day, status) =>
  props.tasks.some(
    (t) =>
      isSameDay(t.dateCreatedTask, day, currentMonth.value, currentYear.value) &&
      t.progress === status,
  );

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar">
      <div class="calendar__nav">
        <button class="calendar__nav-btn" @click="emit('prev-month')">‹</button>
        <h2 class="calendar__title">{{ monthName }} {{ currentYear }}</h2>
        <button class="calendar__nav-btn" @click="emit('next-month')">›</button>
      </div>

      <div class="calendar__weekdays">
        <div v-for="wd in weekdays" :key="wd" class="calendar__weekday">{{ wd }}</div>
      </div>

      <div class="calendar__grid">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="['calendar__cell', { 'calendar__cell--empty': !day }]"
          @click="day && emit('select-day', day)"
        >
          <span v-if="day" class="calendar__day-number">{{ day }}</span>
          <div v-if="day" class="calendar__indicators">
            <span
              v-if="hasStatus(day, TASK_STATUS.COMPLETED)"
              class="calendar__dot calendar__dot--completed"
            />
            <span
              v-if="hasStatus(day, TASK_STATUS.IN_PROGRESS)"
              class="calendar__dot calendar__dot--in-progress"
            />
            <span
              v-if="hasStatus(day, TASK_STATUS.NOT_COMPLETED)"
              class="calendar__dot calendar__dot--not-completed"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.calendar {
  width: 600px;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 2rem 2rem;
}

.calendar__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.calendar__nav-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: none;
  background: none;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #4f46e5;
  transition: background 0.15s ease;
}

.calendar__nav-btn:hover {
  background: #eef2ff;
}

.calendar__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5rem;
}

.calendar__weekday {
  font-size: 0.8125rem;
  color: #9ca3af;
  padding: 0.25rem 0;
}

.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.calendar__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s ease;
  min-height: 3rem;
}

.calendar__cell:not(.calendar__cell--empty):hover {
  background: #eef2ff;
}

.calendar__cell--empty {
  cursor: default;
}

.calendar__day-number {
  font-size: 0.875rem;
  color: #374151;
}

.calendar__indicators {
  display: flex;
  gap: 0.2rem;
  margin-top: 0.25rem;
}

.calendar__dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
}

.calendar__dot--completed { background: #22c55e; }
.calendar__dot--in-progress { background: #a855f7; }
.calendar__dot--not-completed { background: #f43f5e; }
</style>

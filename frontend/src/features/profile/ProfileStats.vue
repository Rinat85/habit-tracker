<script setup>
const props = defineProps({
  user: { type: Object, default: null },
});

const stats = [
  { key: 'allTasksCurrent', label: 'Всего привычек' },
  { key: 'inProgressTasksCurrent', label: 'В процессе' },
  { key: 'completedTasksCurrent', label: 'Выполнено' },
];
</script>

<template>
  <section class="profile-stats">
    <div
      v-for="stat in stats"
      :key="stat.key"
      class="profile-stats__card"
    >
      <span class="profile-stats__label">{{ stat.label }}</span>
      <span class="profile-stats__value">{{ user?.[stat.key] ?? 0 }}</span>
    </div>
  </section>
</template>

<style scoped>
.profile-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 0;
  flex-wrap: wrap;
}

.profile-stats__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 2rem;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
  min-width: 140px;
}

.profile-stats__label {
  font-size: 0.875rem;
  color: #6b7280;
}

.profile-stats__value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}
</style>

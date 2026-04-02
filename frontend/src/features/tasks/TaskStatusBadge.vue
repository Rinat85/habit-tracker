<script setup>
import { TASK_STATUS } from '@/shared/utils/constants';

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span
    :class="[
      'status-badge',
      {
        'status-badge--completed': status === TASK_STATUS.COMPLETED,
        'status-badge--in-progress': status === TASK_STATUS.IN_PROGRESS,
        'status-badge--not-completed': status === TASK_STATUS.NOT_COMPLETED,
      },
    ]"
  >
    {{ status }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  font-style: italic;
  color: #fff;
}

.status-badge--completed {
  background: #22c55e;
}

.status-badge--in-progress {
  background: #a855f7;
}

.status-badge--not-completed {
  background: #f43f5e;
}
</style>

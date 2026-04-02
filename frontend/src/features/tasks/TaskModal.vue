<script setup>
import { ref, watch } from 'vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { FREQUENCY_OPTIONS } from '@/shared/utils/constants';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'create']);

const habit = ref('');
const time = ref('');
const category = ref('');
const frequency = ref('');

const errors = ref({
  habit: '',
  time: '',
  category: '',
  frequency: '',
});

const validate = () => {
  errors.value.habit = !habit.value ? 'Поле привычки обязательно' : '';
  errors.value.time = !time.value ? 'Поле времени обязательно' : '';
  errors.value.category = !category.value ? 'Поле категории обязательно' : '';
  errors.value.frequency = !frequency.value ? 'Поле частоты обязательно' : '';

  return !Object.values(errors.value).some(Boolean);
};

const resetForm = () => {
  habit.value = '';
  time.value = '';
  category.value = '';
  frequency.value = '';
  errors.value = { habit: '', time: '', category: '', frequency: '' };
};

const handleCreate = () => {
  if (!validate()) return;

  emit('create', {
    habit: habit.value,
    time: time.value,
    category: category.value,
    frequency: frequency.value,
  });

  resetForm();
  emit('update:modelValue', false);
};

const handleClose = () => {
  resetForm();
  emit('update:modelValue', false);
};

// Clear individual errors on input
watch(habit, (v) => v && (errors.value.habit = ''));
watch(time, (v) => v && (errors.value.time = ''));
watch(category, (v) => v && (errors.value.category = ''));
watch(frequency, (v) => v && (errors.value.frequency = ''));
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay" @click.self="handleClose">
        <div class="modal-card">
          <h2 class="modal-title">Добавить новую привычку</h2>

          <div class="form-fields">
            <div class="form-group">
              <input
                v-model="habit"
                type="text"
                placeholder="Название привычки"
                class="form-input"
              />
              <span v-if="errors.habit" class="form-error">{{ errors.habit }}</span>
            </div>

            <div class="form-group">
              <input
                v-model="time"
                type="text"
                placeholder="Время на выполнение (мин)"
                class="form-input"
              />
              <span v-if="errors.time" class="form-error">{{ errors.time }}</span>
            </div>

            <div class="form-group">
              <select v-model="frequency" class="form-input form-select">
                <option disabled value="">Выберите частоту</option>
                <option v-for="opt in FREQUENCY_OPTIONS" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>
              <span v-if="errors.frequency" class="form-error">{{ errors.frequency }}</span>
            </div>

            <div class="form-group">
              <input
                v-model="category"
                type="text"
                placeholder="Категория (например, здоровье, учёба)"
                class="form-input"
              />
              <span v-if="errors.category" class="form-error">{{ errors.category }}</span>
            </div>
          </div>

          <div class="modal-actions">
            <BaseButton label="Отмена" variant="danger" size="md" @click="handleClose" />
            <BaseButton label="Сохранить" variant="primary" size="md" @click="handleCreate" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.modal-card {
  background: #fff;
  border-radius: 0.75rem;
  width: 450px;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.25rem;
  color: #1f2937;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: #e5e7eb;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  outline: none;
  box-sizing: border-box;
  transition: background 0.15s ease;
}

.form-input:focus {
  background: #d1d5db;
}

.form-select {
  color: #6b7280;
  cursor: pointer;
}

.form-error {
  font-size: 0.8125rem;
  color: #ef4444;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>

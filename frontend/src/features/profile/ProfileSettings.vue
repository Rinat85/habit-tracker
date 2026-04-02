<script setup>
import { ref, watch } from 'vue';
import BaseButton from '@/shared/ui/BaseButton.vue';

const props = defineProps({
  currentUserName: { type: String, default: '' },
});

const emit = defineEmits(['change-name']);

const newName = ref('');
const error = ref('');

const handleSubmit = () => {
  if (!newName.value.trim()) {
    error.value = 'Имя пользователя обязательно';
    return;
  }

  emit('change-name', newName.value.trim());
  newName.value = '';
  error.value = '';
};

watch(newName, (v) => {
  if (v) error.value = '';
});
</script>

<template>
  <section class="profile-settings">
    <div class="profile-settings__inner">
      <div class="profile-settings__info">
        <span class="profile-settings__label">Текущее имя пользователя:</span>
        <span class="profile-settings__current-name">{{ currentUserName }}</span>
      </div>

      <div class="profile-settings__form">
        <input
          v-model="newName"
          type="text"
          placeholder="Новое имя пользователя"
          class="profile-settings__input"
        />
        <span v-if="error" class="profile-settings__error">{{ error }}</span>
      </div>

      <div class="profile-settings__actions">
        <BaseButton label="Применить" variant="primary" size="md" @click="handleSubmit" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-settings {
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
}

.profile-settings__inner {
  width: 100%;
  max-width: 700px;
}

.profile-settings__info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.profile-settings__label {
  font-size: 1.25rem;
  color: #1f2937;
}

.profile-settings__current-name {
  font-size: 1.125rem;
  color: #374151;
  padding-left: 0.5rem;
}

.profile-settings__form {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.profile-settings__input {
  width: 100%;
  padding: 1rem 1.25rem;
  background: #fff;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
  outline: none;
  box-sizing: border-box;
}

.profile-settings__input:focus {
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.15);
}

.profile-settings__error {
  font-size: 0.8125rem;
  color: #ef4444;
}

.profile-settings__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>

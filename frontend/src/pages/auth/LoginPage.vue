<script setup>
import { ref, watch } from 'vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { useAuthStore } from '@/app/store/useAuthStore';

const authStore = useAuthStore();

const userName = ref('');
const password = ref('');
const showPassword = ref(false);

const errors = ref({ userName: '', password: '' });

const handleLogin = async () => {
  errors.value.userName = !userName.value ? 'Имя пользователя обязательно' : '';
  errors.value.password = !password.value ? 'Пароль обязателен' : '';

  if (Object.values(errors.value).some(Boolean)) return;

  try {
    await authStore.login({
      userName: userName.value.toLowerCase(),
      password: password.value,
    });
  } catch (error) {
    if (error.message.includes('Имя')) {
      errors.value.userName = error.message;
    } else if (error.message.includes('пароль')) {
      errors.value.password = error.message;
    } else {
      console.error('Ошибка входа', error);
    }
  }
};

watch(userName, (v) => v && (errors.value.userName = ''));
watch(password, (v) => v && (errors.value.password = ''));
</script>

<template>
  <div class="auth-form">
    <h1 class="auth-form__title">Вход</h1>

    <div class="auth-form__fields">
      <div class="form-group">
        <input
          v-model="userName"
          type="text"
          placeholder="Имя"
          class="form-input"
          @input="userName = userName.toLowerCase()"
        />
        <span v-if="errors.userName" class="form-error">{{ errors.userName }}</span>
      </div>

      <div class="form-group">
        <div class="form-input-wrapper">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Пароль"
            class="form-input"
          />
          <button
            type="button"
            class="form-toggle-password"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
        <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
      </div>
    </div>

    <div class="auth-form__actions">
      <BaseButton label="Войти" variant="primary" size="lg" @click="handleLogin" />
    </div>

    <p class="auth-form__link">
      Нет аккаунта?
      <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</template>

<style scoped>
.auth-form {
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.auth-form__title {
  font-size: 1.75rem;
  color: #1f2937;
  margin: 0 0 2rem;
}

.auth-form__fields {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1rem;
  background: #e5e7eb;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.9375rem;
  outline: none;
  box-sizing: border-box;
  transition: background 0.15s ease;
}

.form-input:focus {
  background: #d1d5db;
}

.form-toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  line-height: 1;
}

.form-error {
  font-size: 0.8125rem;
  color: #ef4444;
}

.auth-form__actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.auth-form__link {
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.auth-form__link a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.auth-form__link a:hover {
  text-decoration: underline;
}
</style>

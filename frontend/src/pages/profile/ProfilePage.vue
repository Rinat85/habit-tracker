<script setup>
import { ref, onMounted } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useTasksStore } from '@/app/store/useTasksStore';
import { useConfirmDialog } from '@/shared/composables/useConfirmDialog';
import ProfileStats from '@/features/profile/ProfileStats.vue';
import ProfileSettings from '@/features/profile/ProfileSettings.vue';
import TaskModal from '@/features/tasks/TaskModal.vue';
import ConfirmModal from '@/shared/ui/ConfirmModal.vue';

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const taskModalVisible = ref(false);

const exitDialog = useConfirmDialog();
const deleteDialog = useConfirmDialog();

const handleCreateTask = async (taskData) => {
  try {
    await tasksStore.createTask(taskData);
  } catch (error) {
    console.error('Не удалось создать привычку', error);
  }
};

const handleChangeName = async (newName) => {
  try {
    await authStore.changeUserName(newName);
  } catch (error) {
    console.error('Ошибка изменения имени', error);
  }
};

const handleExitConfirm = () => {
  authStore.logout();
  exitDialog.hide();
};

const handleDeleteConfirm = async () => {
  try {
    await authStore.deleteAccount();
  } catch (error) {
    console.error('Ошибка удаления аккаунта', error);
  }
  deleteDialog.hide();
};

onMounted(async () => {
  await authStore.loadUser();
});
</script>

<template>
  <div class="profile-page">
    <div class="profile-page__header">
      <router-link to="/tasks" class="profile-page__back-btn">
        ← Вернуться
      </router-link>

      <Menu as="div" class="profile-actions">
        <MenuButton class="profile-actions__trigger">
          Опции
          <ChevronDownIcon class="profile-actions__icon" aria-hidden="true" />
        </MenuButton>

        <Transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems class="profile-actions__dropdown">
            <MenuItem v-slot="{ active }">
              <button
                :class="['profile-actions__item', { 'profile-actions__item--active': active }]"
                @click="taskModalVisible = true"
              >
                Создать привычку
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="['profile-actions__item', { 'profile-actions__item--active': active }]"
                @click="exitDialog.show('Хотите выйти из аккаунта?')"
              >
                Выйти из аккаунта
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="['profile-actions__item profile-actions__item--danger', { 'profile-actions__item--active': active }]"
                @click="deleteDialog.show('Хотите удалить аккаунт?')"
              >
                Удалить аккаунт
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>

    <ProfileStats :user="authStore.user" />
    <ProfileSettings
      :current-user-name="authStore.user?.userName || ''"
      @change-name="handleChangeName"
    />

    <TaskModal v-model="taskModalVisible" @create="handleCreateTask" />

    <ConfirmModal
      v-if="exitDialog.isVisible.value"
      :message="exitDialog.message.value"
      @confirm="handleExitConfirm"
      @cancel="exitDialog.hide"
    />

    <ConfirmModal
      v-if="deleteDialog.isVisible.value"
      :message="deleteDialog.message.value"
      confirm-variant="danger"
      @confirm="handleDeleteConfirm"
      @cancel="deleteDialog.hide"
    />
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.profile-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.profile-page__back-btn {
  padding: 0.625rem 1.25rem;
  color: #fff;
  background: linear-gradient(to bottom, #818cf8, #4f46e5);
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
  transition: all 0.15s ease;
}

.profile-page__back-btn:active {
  transform: scale(0.95);
}

.profile-actions {
  position: relative;
  display: inline-block;
}

.profile-actions__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(to bottom, #818cf8, #4f46e5);
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
  transition: all 0.15s ease;
}

.profile-actions__trigger:active {
  transform: scale(0.95);
}

.profile-actions__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #fff;
}

.profile-actions__dropdown {
  position: absolute;
  right: 0;
  z-index: 50;
  margin-top: 0.5rem;
  min-width: 12rem;
  border-radius: 0.5rem;
  background: #6366f1;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-actions__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.1s ease;
}

.profile-actions__item--active {
  background: rgba(255, 255, 255, 0.2);
}

.profile-actions__item--danger {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
</style>

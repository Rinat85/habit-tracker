import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import bcrypt from 'bcryptjs';
import { usersApi } from '@/shared/api/usersApi';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const user = ref(null);
  const userId = ref(localStorage.getItem('userId'));

  const isAuth = computed(() => !!userId.value);

  const loadUser = async () => {
    if (!userId.value) return;

    try {
      user.value = await usersApi.getById(userId.value);
    } catch (error) {
      console.error('Не удалось загрузить пользователя', error);
    }
  };

  const register = async ({ userName, eMail, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await usersApi.create({
      userName,
      eMail,
      password: hashedPassword,
      allTasksCurrent: 0,
      inProgressTasksCurrent: 0,
      completedTasksCurrent: 0,
      dateCreation: new Date(),
    });

    userId.value = newUser.id;
    user.value = newUser;
    localStorage.setItem('userId', newUser.id);

    router.push('/profile');
  };

  const login = async ({ userName, password }) => {
    const users = await usersApi.getAll();
    const foundUser = users.find((u) => u.userName === userName);

    if (!foundUser) {
      throw new Error('Неверное Имя пользователя');
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      throw new Error('Неверный пароль');
    }

    userId.value = foundUser.id;
    user.value = foundUser;
    localStorage.setItem('userId', foundUser.id);

    router.push('/profile');
  };

  const logout = () => {
    userId.value = null;
    user.value = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const deleteAccount = async () => {
    if (!userId.value) return;

    await usersApi.delete(userId.value);
    logout();
  };

  const changeUserName = async (newUserName) => {
    if (!userId.value) return;

    user.value = await usersApi.update(userId.value, {
      userName: newUserName,
      dateChangedUserName: new Date(),
    });
  };

  const updateCounters = async (counters) => {
    if (!userId.value) return;

    user.value = await usersApi.update(userId.value, counters);
  };

  return {
    user,
    userId,
    isAuth,
    loadUser,
    register,
    login,
    logout,
    deleteAccount,
    changeUserName,
    updateCounters,
  };
});

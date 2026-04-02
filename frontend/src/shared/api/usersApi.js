import { ENDPOINTS } from './config';

export const usersApi = {
  async getById(userId) {
    const res = await fetch(`${ENDPOINTS.users}/${userId}`);

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  },

  async getAll() {
    const res = await fetch(ENDPOINTS.users);

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  },

  async create(userData) {
    const res = await fetch(ENDPOINTS.users, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  },

  async update(userId, data) {
    const res = await fetch(`${ENDPOINTS.users}/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  },

  async delete(userId) {
    const res = await fetch(`${ENDPOINTS.users}/${userId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res;
  },
};

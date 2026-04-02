import { ENDPOINTS } from './config';

export const tasksApi = {
  async getByUserId(userId) {
    const res = await fetch(`${ENDPOINTS.tasks}?userId=${userId}`);

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  },

  async search(userId, query) {
    const res = await fetch(`${ENDPOINTS.tasks}?userId=${userId}&habit=${query}`);

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  },

  async create(taskData) {
    const res = await fetch(ENDPOINTS.tasks, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  },

  async updateProgress(taskId, progress) {
    const res = await fetch(`${ENDPOINTS.tasks}/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress }),
    });

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res.json();
  },

  async delete(taskId) {
    const res = await fetch(`${ENDPOINTS.tasks}/${taskId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    return res;
  },
};

import { v4 as uuidv4 } from 'uuid';
import { getDb, saveDb } from './db.service.js';

export const usersService = {
  getAll() {
    return getDb().users;
  },

  getById(id) {
    return getDb().users.find((u) => u.id === id) || null;
  },

  async create(userData) {
    const newUser = {
      id: uuidv4().slice(0, 4),
      ...userData,
    };

    getDb().users.push(newUser);
    await saveDb();
    return newUser;
  },

  async update(id, data) {
    const db = getDb();
    const index = db.users.findIndex((u) => u.id === id);

    if (index === -1) return null;

    db.users[index] = { ...db.users[index], ...data };
    await saveDb();
    return db.users[index];
  },

  async delete(id) {
    const db = getDb();
    const index = db.users.findIndex((u) => u.id === id);

    if (index === -1) return false;

    db.users.splice(index, 1);

    // Удаляем задачи пользователя
    db.tasks = db.tasks.filter((t) => t.userId !== id);

    await saveDb();
    return true;
  },
};

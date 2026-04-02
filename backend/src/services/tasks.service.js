import { v4 as uuidv4 } from 'uuid';
import { getDb, saveDb } from './db.service.js';

export const tasksService = {
  getByUserId(userId) {
    return getDb().tasks.filter((t) => t.userId === userId);
  },

  search(userId, query) {
    return getDb().tasks.filter(
      (t) => t.userId === userId && t.habit.toLowerCase().includes(query.toLowerCase()),
    );
  },

  getById(id) {
    return getDb().tasks.find((t) => t.id === id) || null;
  },

  async create(taskData) {
    const newTask = {
      id: uuidv4().slice(0, 4),
      ...taskData,
    };

    getDb().tasks.push(newTask);
    await saveDb();
    return newTask;
  },

  async update(id, data) {
    const db = getDb();
    const index = db.tasks.findIndex((t) => t.id === id);

    if (index === -1) return null;

    db.tasks[index] = { ...db.tasks[index], ...data };
    await saveDb();
    return db.tasks[index];
  },

  async delete(id) {
    const db = getDb();
    const index = db.tasks.findIndex((t) => t.id === id);

    if (index === -1) return false;

    db.tasks.splice(index, 1);
    await saveDb();
    return true;
  },
};

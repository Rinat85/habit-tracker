import { tasksService } from '../services/tasks.service.js';

export const tasksController = {
  // GET /api/tasks?userId=...&habit=...
  async getByUser(req, res) {
    try {
      const { userId, habit } = req.query;

      if (!userId) {
        return res.status(400).json({ error: 'Параметр userId обязателен' });
      }

      let tasks;
      if (habit) {
        tasks = tasksService.search(userId, habit);
      } else {
        tasks = tasksService.getByUserId(userId);
      }

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось получить задачи' });
    }
  },

  // POST /api/tasks
  async create(req, res) {
    try {
      const newTask = await tasksService.create(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось создать задачу' });
    }
  },

  // PATCH /api/tasks/:id
  async update(req, res) {
    try {
      const updated = await tasksService.update(req.params.id, req.body);

      if (!updated) {
        return res.status(404).json({ error: 'Задача не найдена' });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось обновить задачу' });
    }
  },

  // DELETE /api/tasks/:id
  async delete(req, res) {
    try {
      const deleted = await tasksService.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: 'Задача не найдена' });
      }

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Не удалось удалить задачу' });
    }
  },
};

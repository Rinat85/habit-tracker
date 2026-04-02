import { usersService } from '../services/users.service.js';

export const usersController = {
  // GET /api/users
  async getAll(req, res) {
    try {
      const users = usersService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось получить пользователей' });
    }
  },

  // GET /api/users/:id
  async getById(req, res) {
    try {
      const user = usersService.getById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось получить пользователя' });
    }
  },

  // POST /api/users
  async create(req, res) {
    try {
      const newUser = await usersService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось создать пользователя' });
    }
  },

  // PATCH /api/users/:id
  async update(req, res) {
    try {
      const updated = await usersService.update(req.params.id, req.body);

      if (!updated) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось обновить пользователя' });
    }
  },

  // DELETE /api/users/:id
  async delete(req, res) {
    try {
      const deleted = await usersService.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Не удалось удалить пользователя' });
    }
  },
};

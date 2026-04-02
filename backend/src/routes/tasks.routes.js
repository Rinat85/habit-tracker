import { Router } from 'express';
import { tasksController } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', tasksController.getByUser);
router.post('/', tasksController.create);
router.patch('/:id', tasksController.update);
router.delete('/:id', tasksController.delete);

export default router;

import app from './app.js';
import config from './config/index.js';
import { loadDb } from './services/db.service.js';

const start = async () => {
  try {
    await loadDb();
    console.log('✓ База данных загружена');

    app.listen(config.port, () => {
      console.log(`✓ Сервер запущен на http://localhost:${config.port}`);
      console.log(`  API: http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error('✗ Ошибка запуска сервера:', error);
    process.exit(1);
  }
};

start();

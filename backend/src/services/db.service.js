import { readFile, writeFile } from 'node:fs/promises';
import config from '../config/index.js';

let db = null;

/**
 * Загрузить данные из файла
 */
export const loadDb = async () => {
  const raw = await readFile(config.dbPath, 'utf-8');
  db = JSON.parse(raw);
  return db;
};

/**
 * Сохранить данные в файл
 */
export const saveDb = async () => {
  await writeFile(config.dbPath, JSON.stringify(db, null, 2), 'utf-8');
};

/**
 * Получить текущее состояние базы
 */
export const getDb = () => {
  if (!db) throw new Error('Database not loaded. Call loadDb() first.');
  return db;
};

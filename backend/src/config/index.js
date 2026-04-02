import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  port: process.env.PORT || 3000,
  dbPath: join(__dirname, '..', 'data', 'db.json'),
};

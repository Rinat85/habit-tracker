/**
 * Форматирует дату в русскоязычный формат
 */
export const formatDateRu = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Сортировка по дате: новые сначала
 */
export const sortByNewest = (a, b) => {
  return new Date(b.dateCreatedTask) - new Date(a.dateCreatedTask);
};

/**
 * Сортировка по дате: старые сначала
 */
export const sortByOldest = (a, b) => {
  return new Date(a.dateCreatedTask) - new Date(b.dateCreatedTask);
};

/**
 * Проверяет, совпадает ли дата с определённым днём/месяцем/годом
 */
export const isSameDay = (dateString, day, month, year) => {
  const d = new Date(dateString);
  return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
};

/**
 * Проверка валидности email
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

# 📋 Habit Tracker

Приложение для создания и отслеживания полезных привычек. Создавай цели, отмечай прогресс, анализируй статистику через календарь.

---

## Технологии

| Часть | Стек |
|-------|------|
| **Frontend** | Vue 3, Vite, Pinia, Vue Router, Headless UI, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **База данных** | JSON-файл (file-based) |

---

## Структура проекта

```
Habit-Tracker/
├── frontend/                   # Vue 3 + Vite
│   └── src/
│       ├── app/                # Layouts, Router, Store, Стили
│       ├── features/           # Бизнес-компоненты
│       │   ├── tasks/          # UI, composables для задач
│       │   ├── calendar/       # UI, composables для календаря
│       │   ├── navigation/     # NavBar, NavMenu
│       │   └── profile/        # ProfileStats, ProfileSettings
│       ├── pages/              # Страницы (auth, home, tasks, calendar, profile)
│       └── shared/             # API-слой, UI-компоненты, утилиты
│           └── composables/    # Общие composables (напр. useConfirmDialog)
│
├── backend/                    # Express.js API
│   └── src/
│       ├── controllers/        # Обработчики запросов
│       ├── services/           # Бизнес-логика + работа с БД
│       ├── routes/             # Маршруты API
│       ├── middleware/         # Обработка ошибок
│       └── data/               # db.json (файловая БД)
│
└── package.json                # Корневые скрипты запуска
```

---

## Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone git@github.com:Rinat85/habit-tracker.git
cd habit-tracker
```

### 2. Установить зависимости

```bash
npm run install:all
```

### 3. Запустить проект

```bash
npm run dev
```

Оба сервера запустятся параллельно:
- 🔵 **Backend** → `http://localhost:3000/api`
- 🟢 **Frontend** → `http://localhost:5173`

---

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск backend + frontend одновременно |
| `npm run dev:backend` | Только backend (Express, порт 3000) |
| `npm run dev:frontend` | Только frontend (Vite, порт 5173) |
| `npm run build` | Production-сборка frontend |
| `npm run install:all` | Установка зависимостей для frontend и backend |

---

## API Endpoints

Все маршруты доступны по адресу `http://localhost:3000/api`

### Пользователи

| Метод | URL | Описание |
|-------|-----|----------|
| `GET` | `/api/users` | Список всех пользователей |
| `GET` | `/api/users/:id` | Получить пользователя по ID |
| `POST` | `/api/users` | Регистрация нового пользователя |
| `PATCH` | `/api/users/:id` | Обновить данные пользователя |
| `DELETE` | `/api/users/:id` | Удалить пользователя (+ каскадно все его задачи) |

### Задачи (привычки)

| Метод | URL | Описание |
|-------|-----|----------|
| `GET` | `/api/tasks?userId=X` | Задачи пользователя |
| `GET` | `/api/tasks?userId=X&habit=query` | Поиск по названию (case-insensitive) |
| `POST` | `/api/tasks` | Создать задачу |
| `PATCH` | `/api/tasks/:id` | Обновить задачу (например, статус) |
| `DELETE` | `/api/tasks/:id` | Удалить задачу |

### Прочее

| Метод | URL | Описание |
|-------|-----|----------|
| `GET` | `/health` | Healthcheck сервера |

---

## Функциональность

- 🔐 **Авторизация** — регистрация и вход с хешированием паролей (bcrypt)
- ✅ **Управление привычками** — создание, удаление, смена статуса
- 📊 **Статусы задач** — Выполнено / В процессе / Не выполнено
- 🔍 **Поиск и сортировка** — поиск по названию, сортировка по дате
- 📅 **Календарь** — визуализация привычек по дням с цветовыми индикаторами
- 👤 **Профиль** — статистика, смена имени, удаление аккаунта

<script setup>
</script>

<template>
  <div class="home-page">
    <section class="hero">
      <h1 class="hero__title">Контролируй привычки — управляй жизнью</h1>
      <p class="hero__subtitle">
        Создавай полезные привычки, отслеживай прогресс и становись лучше каждый день.
      </p>
      <div class="hero__actions">
        <router-link to="/login" class="hero__btn hero__btn--primary">Войти</router-link>
        <router-link to="/register" class="hero__btn hero__btn--primary">Зарегистрироваться</router-link>
      </div>
    </section>

    <section class="features">
      <h2 class="features__title">Что ты можешь делать</h2>
      <div class="features__grid">
        <div class="feature-card">
          <h3 class="feature-card__title">Создавай привычки</h3>
          <p class="feature-card__text">Добавляй цели и задачи на каждый день</p>
        </div>
        <div class="feature-card">
          <h3 class="feature-card__title">Отслеживай прогресс</h3>
          <p class="feature-card__text">Смотри свою статистику и рост</p>
        </div>
        <div class="feature-card">
          <h3 class="feature-card__title">Будь мотивирован</h3>
          <p class="feature-card__text">Не теряй фокус и иди к цели</p>
        </div>
      </div>
      <p class="features__quote">
        «Маленькие шаги каждый день приводят к большим результатам»
      </p>
    </section>

    <footer class="home-footer">
      © 2026 Habit Tracker. Все права защищены.
    </footer>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
  background: #fff;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.5rem;
  max-width: 700px;
}

.hero__subtitle {
  font-size: 1.05rem;
  color: #6b7280;
  max-width: 540px;
  margin: 0 0 2.5rem;
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.hero__btn {
  padding: 1rem 2.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: all 0.15s ease;
}

.hero__btn:active {
  transform: scale(0.95);
}

.hero__btn--primary {
  color: #fff;
  background: linear-gradient(to bottom, #818cf8, #4f46e5);
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
}

.hero__btn--primary:hover {
  box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.5);
}

.features {
  padding: 4rem 1.5rem;
  background: #e5e7eb;
  text-align: center;
}

.features__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 2.5rem;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto 3rem;
}

.feature-card {
  padding: 1.5rem;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
}

.feature-card__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem;
}

.feature-card__text {
  font-size: 0.9375rem;
  color: #6b7280;
  margin: 0;
}

.features__quote {
  font-size: 1.25rem;
  font-style: italic;
  color: #4b5563;
  max-width: 600px;
  margin: 0 auto;
}

.home-footer {
  padding: 1.5rem;
  background: #6b7280;
  text-align: center;
  color: #d1d5db;
  font-size: 0.8125rem;
}
</style>

<script setup>
import BaseButton from './BaseButton.vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Да',
  },
  cancelText: {
    type: String,
    default: 'Нет',
  },
  confirmVariant: {
    type: String,
    default: 'primary',
  },
});

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <section
        class="modal-overlay"
        @click.self="emit('cancel')"
      >
        <div class="modal-card">
          <h2 class="modal-title">{{ message }}</h2>

          <div class="modal-actions">
            <BaseButton
              :label="cancelText"
              variant="danger"
              size="md"
              @click="emit('cancel')"
            />
            <BaseButton
              :label="confirmText"
              :variant="confirmVariant"
              size="md"
              @click="emit('confirm')"
            />
          </div>
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.modal-card {
  background: #fff;
  border-radius: 1rem;
  width: 400px;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-title {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>

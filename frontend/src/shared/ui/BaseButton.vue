<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'danger', 'secondary'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
});
</script>

<template>
  <button
    :class="['base-btn', `base-btn--${variant}`, `base-btn--${size}`]"
    v-bind="$attrs"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.base-btn:active {
  transform: scale(0.95);
}

/* Variants */
.base-btn--primary {
  color: #fff;
  background: linear-gradient(to bottom, #818cf8, #4f46e5);
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
}

.base-btn--primary:hover {
  background: linear-gradient(to bottom, #6366f1, #4338ca);
}

.base-btn--danger {
  color: #fff;
  background: linear-gradient(to bottom, #fb7185, #e11d48);
  box-shadow: 0 10px 15px -3px rgba(244, 63, 94, 0.4);
}

.base-btn--danger:hover {
  background: linear-gradient(to bottom, #f43f5e, #be123c);
}

.base-btn--secondary {
  color: #374151;
  background: #f3f4f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.base-btn--secondary:hover {
  background: #e5e7eb;
}

/* Sizes */
.base-btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
}

.base-btn--md {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
}

.base-btn--lg {
  padding: 1rem 2.5rem;
  font-size: 1rem;
}
</style>

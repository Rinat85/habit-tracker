import { ref } from 'vue';

/**
 * Composable для управления confirmation-диалогами
 * Заменяет дублированную логику show/hide модалов в каждом компоненте
 */
export function useConfirmDialog() {
  const isVisible = ref(false);
  const message = ref('');
  const targetId = ref(null);
  const onConfirmCallback = ref(null);

  const show = (msg, id = null) => {
    message.value = msg;
    targetId.value = id;
    isVisible.value = true;
  };

  const hide = () => {
    isVisible.value = false;
    message.value = '';
    targetId.value = null;
    onConfirmCallback.value = null;
  };

  const confirm = async (callback) => {
    if (callback) {
      await callback(targetId.value);
    }
    hide();
  };

  return {
    isVisible,
    message,
    targetId,
    show,
    hide,
    confirm,
  };
}

import toast from 'react-hot-toast';

export const showToast = {
  success: (message) => {
    toast.success(message, {
      icon: '✅',
    });
  },
  error: (message) => {
    toast.error(message, {
      icon: '❌',
    });
  },
  loading: (message) => {
    toast.loading(message, {
      icon: '⏳',
    });
  },
  custom: (message, type = 'default') => {
    toast(message, {
      icon: type === 'warning' ? '⚠️' : 'ℹ️',
    });
  },
  promise: async (promise, messages = {}) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Error occurred.',
    });
  },
  dismiss: () => {
    toast.dismiss();
  }
}; 
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          duration: 3000,
          style: {
            background: '#10B981',
            color: 'white',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#EF4444',
            color: 'white',
          },
        },
        loading: {
          duration: 5000,
          style: {
            background: '#6366F1',
            color: 'white',
          },
        },
        custom: {
          duration: 3000,
          style: {
            background: '#6B7280',
            color: 'white',
          },
        },
      }}
    />
  );
}; 
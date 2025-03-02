import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const setupMocks = () => {
  // Only run MSW in development
  if (process.env.NODE_ENV === 'development') {
    // Initialize MSW
    worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js'
      },
      onUnhandledRequest: 'bypass'
    }).catch(console.error)
  }
} 
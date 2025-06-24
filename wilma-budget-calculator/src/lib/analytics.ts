// Analytics & Error Tracking Utilities

/**
 * Safely access environment variables 
 * Works with both Vite's import.meta.env and process.env for TypeScript compatibility
 */
const getEnv = (key: string): string | undefined => {
  // @ts-ignore - Access Vite environment variables at runtime
  return typeof import.meta !== 'undefined' ? import.meta.env[key] : undefined;
};

/**
 * Initialize analytics tracking
 * This is a placeholder that would normally integrate with a real analytics provider
 */
export const initializeAnalytics = () => {
  const analyticsId = getEnv('VITE_ANALYTICS_ID');
  const googleMeasurementId = getEnv('VITE_GOOGLE_MEASUREMENT_ID');

  if (!analyticsId && !googleMeasurementId) {
    console.warn('Analytics ID not found in environment variables');
    return;
  }

  // Mock analytics initialization
  console.log('Analytics initialized with ID:', analyticsId || googleMeasurementId);

  // In a real implementation, this would initialize Google Analytics, Mixpanel, etc.
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  
  if (googleMeasurementId) {
    gtag('js', new Date());
    gtag('config', googleMeasurementId);
    console.log('Google Analytics initialized');
  }

  // Return methods for tracking events
  return {
    trackEvent: (category: string, action: string, label?: string, value?: number) => {
      console.log('Event tracked:', { category, action, label, value });
      // In a real implementation, this would call the analytics provider's tracking method
    },
    trackPageView: (path: string) => {
      console.log('Page view tracked:', path);
      // In a real implementation, this would track a page view
    }
  };
};

/**
 * Initialize error tracking
 * This is a placeholder that would normally integrate with a service like Sentry
 */
export const initializeErrorTracking = () => {
  const sentryDsn = getEnv('VITE_SENTRY_DSN');
  
  if (!sentryDsn) {
    console.warn('Sentry DSN not found in environment variables');
    return;
  }

  // Mock error tracking initialization
  console.log('Error tracking initialized with DSN:', sentryDsn);
  
  // In a real implementation, this would initialize Sentry
  window.addEventListener('error', (event) => {
    console.error('Captured error:', event.error);
    // In a real implementation, this would send the error to Sentry
  });

  // Return methods for manual error tracking
  return {
    captureException: (error: Error, context?: Record<string, any>) => {
      console.error('Exception captured:', error, context);
      // In a real implementation, this would send the error to Sentry
    },
    captureMessage: (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
      // Handle different log levels
      if (level === 'info') {
        console.info('Message captured:', message);
      } else if (level === 'warning') {
        console.warn('Message captured:', message);
      } else if (level === 'error') {
        console.error('Message captured:', message);
      }
      // In a real implementation, this would send the message to Sentry
    }
  };
};

// Add type definitions for window
declare global {
  interface Window {
    dataLayer: any[];
    SENTRY_DSN?: string;
    ANALYTICS_ID?: string;
  }
}

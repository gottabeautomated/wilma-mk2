import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
// React Query Client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});
// Analytics Event Tracking
const trackEvent = (eventName, parameters) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }
};
// Track page views
const trackPageView = (path) => {
    trackEvent('page_view', { page_path: path });
};
// Render the React app
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>);
// Setup analytics tracking (only in browser environment)
if (typeof window !== 'undefined') {
    // Track initial page view
    trackPageView(window.location.pathname);
    // Track navigation changes
    window.addEventListener('popstate', () => {
        trackPageView(window.location.pathname);
    });
}

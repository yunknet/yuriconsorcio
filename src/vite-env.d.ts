/// <reference types="vite/client" />

/** Scripts de terceiros que podem existir na página (Meta Pixel, Google Analytics/GTM). */
interface Window {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  opera?: string;
}

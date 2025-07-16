import { logger } from './logger';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private isSupported =
    typeof window !== 'undefined' && 'performance' in window;

  constructor() {
    if (this.isSupported) {
      this.setupObservers();
    }
  }

  private setupObservers() {
    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        logger.info('LCP measured', { lcp: lastEntry.startTime });
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // FID (First Input Delay)
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        entries.forEach((entry: PerformanceEntry) => {
          const firstInputEntry = entry as PerformanceEntry & {
            processingStart: number;
          };
          this.metrics.fid = firstInputEntry.processingStart - entry.startTime;
          logger.info('FID measured', { fid: this.metrics.fid });
        });
      }).observe({ type: 'first-input', buffered: true });

      // CLS (Cumulative Layout Shift)
      new PerformanceObserver(entryList => {
        let clsValue = 0;
        const entries = entryList.getEntries();
        entries.forEach((entry: PerformanceEntry) => {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput: boolean;
            value: number;
          };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        });
        this.metrics.cls = clsValue;
        logger.info('CLS measured', { cls: clsValue });
      }).observe({ type: 'layout-shift', buffered: true });
    }

    // Page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.measurePageLoad();
      }, 0);
    });
  }

  private measurePageLoad() {
    if (!this.isSupported) return;

    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.ttfb = navigation.responseStart - navigation.fetchStart;

      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded =
        navigation.domContentLoadedEventEnd - navigation.fetchStart;

      logger.info('Page load metrics', {
        loadTime,
        domContentLoaded,
        ttfb: this.metrics.ttfb,
      });
    }
  }

  // Measure React component render time
  measureRender<T>(componentName: string, renderFn: () => T): T {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();

    logger.debug(`${componentName} render time`, {
      renderTime: end - start,
    });

    return result;
  }

  // Measure async operation
  async measureAsync<T>(
    operationName: string,
    asyncFn: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await asyncFn();
      const end = performance.now();

      logger.info(`${operationName} completed`, {
        duration: end - start,
      });

      return result;
    } catch (error) {
      const end = performance.now();

      logger.error(`${operationName} failed`, error);
      logger.info(`${operationName} duration (failed)`, {
        duration: end - start,
      });

      throw error;
    }
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Report metrics (call this when you want to send metrics to analytics)
  reportMetrics(userId?: string) {
    const metrics = this.getMetrics();
    logger.info('Performance metrics report', metrics, userId);

    // In production, send to analytics service
    // analytics.track('performance_metrics', metrics, userId);
  }
}

export const performanceMonitor = new PerformanceMonitor();

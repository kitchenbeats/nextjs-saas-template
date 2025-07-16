type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private sessionId = this.generateSessionId();

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    data?: unknown
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      sessionId: this.sessionId,
    };
  }

  private log(
    level: LogLevel,
    message: string,
    data?: unknown,
    userId?: string
  ) {
    const entry = this.formatMessage(level, message, data);
    if (userId) entry.userId = userId;

    // Console logging in development
    if (this.isDevelopment) {
      const consoleMethod = level === 'debug' ? 'log' : level;
      console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data || '');
    }

    // In production, send to monitoring service
    if (!this.isDevelopment) {
      this.sendToMonitoring(entry);
    }
  }

  private sendToMonitoring(entry: LogEntry) {
    // Example: Send to monitoring service
    // fetch('/api/logging', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(entry),
    // });

    // Placeholder to avoid unused variable warning
    void entry;
  }

  debug(message: string, data?: unknown, userId?: string) {
    this.log('debug', message, data, userId);
  }

  info(message: string, data?: unknown, userId?: string) {
    this.log('info', message, data, userId);
  }

  warn(message: string, data?: unknown, userId?: string) {
    this.log('warn', message, data, userId);
  }

  error(message: string, error?: Error | unknown, userId?: string) {
    const errorData =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error;

    this.log('error', message, errorData, userId);
  }

  // Performance monitoring
  time(label: string) {
    if (this.isDevelopment) {
      console.time(label);
    }
  }

  timeEnd(label: string) {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  }

  // User action tracking
  trackUserAction(action: string, data?: unknown, userId?: string) {
    this.info(`User action: ${action}`, data, userId);
  }

  // API call tracking
  trackApiCall(
    endpoint: string,
    method: string,
    duration: number,
    status: number,
    userId?: string
  ) {
    const data = { endpoint, method, duration, status };
    if (status >= 400) {
      this.error(`API call failed: ${method} ${endpoint}`, data, userId);
    } else {
      this.info(`API call: ${method} ${endpoint}`, data, userId);
    }
  }
}

export const logger = new Logger();

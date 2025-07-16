'use client';

import ErrorDisplay from '@/components/ui/ErrorDisplay';
import { logger } from '@/utils/monitoring/logger';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  const handleRetry = () => {
    logger.info('User clicked retry on error page');
    router.refresh();
  };

  const handleGoHome = () => {
    logger.info('User clicked go home from error page');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <ErrorDisplay
          title="Oops! Something went wrong"
          message="We're sorry, but something unexpected happened. Please try again or go back to the home page."
          onRetry={handleRetry}
        />
        <div className="mt-4 text-center">
          <button
            onClick={handleGoHome}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}

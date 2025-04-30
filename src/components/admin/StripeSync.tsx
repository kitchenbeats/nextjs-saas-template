'use client';

import { useState } from 'react';
import { getPlansConfig } from '@/utils/stripe/config';

export default function StripeSync() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Record<string, { productId: string; priceId: string }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const plansConfig = getPlansConfig();
  
  const handleSync = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setResult(null);
      
      const response = await fetch('/api/admin/sync-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync plans');
      }
      
      setResult(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Stripe Plan Sync</h2>
      
      <p className="text-gray-600 mb-6">
        This will create or update products and prices in Stripe based on the plans configured in your application.
        Make sure your Stripe API keys are properly set up before proceeding.
      </p>
      
      <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="font-medium mb-2">Plans to be synced:</h3>
        <ul className="space-y-2">
          {Object.entries(plansConfig).map(([planId, plan]) => (
            plan.price > 0 && (
              <li key={planId} className="flex justify-between">
                <span className="font-medium">{plan.name}</span>
                <span>${plan.price}/{plan.interval || 'month'}</span>
              </li>
            )
          ))}
        </ul>
      </div>
      
      <button
        onClick={handleSync}
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Syncing...' : 'Sync Plans to Stripe'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded">
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Sync Result:</h3>
          <div className="p-3 bg-green-100 border border-green-200 text-green-800 rounded">
            <p>Plans successfully synced with Stripe!</p>
            <details className="mt-2">
              <summary className="cursor-pointer">View details</summary>
              <pre className="mt-2 p-2 bg-gray-100 overflow-x-auto text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
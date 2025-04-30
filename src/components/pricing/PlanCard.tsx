'use client';

import { useState } from 'react';
import { Plan } from '@/utils/stripe/config';
import { useUser } from '@/utils/providers/userProvider';
import { useStripeCheckout } from '@/utils/hooks/useStripeCheckout';

interface PlanCardProps {
  plan: Plan;
  planId: string; // Kept for API compatibility but not used
  isCurrentPlan?: boolean;
}

export default function PlanCard({ plan, isCurrentPlan = false }: PlanCardProps) {
  const { user } = useUser();
  const [localError, setLocalError] = useState<string | null>(null);
  
  // Use the custom checkout hook for Stripe operations
  const { 
    createCheckoutSession, 
    createBillingPortalSession, 
    isLoading, 
    error: checkoutError 
  } = useStripeCheckout({
    successUrl: `${window.location.origin}/account?checkout=success`,
    cancelUrl: `${window.location.origin}/pricing?checkout=canceled`,
    returnUrl: `${window.location.origin}/account`,
  });
  
  // Combined error state from local and checkout errors
  const error = localError || checkoutError;

  // Function to handle subscription checkout
  const handleSubscribe = async () => {
    if (!user) {
      // Redirect to login page if not logged in
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    
    // Free plan doesn't require Stripe checkout
    if (plan.price === 0) {
      try {
        setLocalError(null);
        // Handle free plan selection (could be a separate API endpoint)
        const response = await fetch('/api/subscription/select-free-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to select free plan');
        }
        
        // Redirect to account page
        window.location.href = `${window.location.origin}/account?plan=free`;
      } catch (err) {
        console.error('Error selecting free plan:', err);
        setLocalError(err instanceof Error ? err.message : 'Failed to select free plan');
      }
      return;
    }
    
    try {
      if (!plan.stripePriceId) {
        throw new Error('No price ID available for this plan');
      }
      
      const sessionUrl = await createCheckoutSession(plan.stripePriceId);
      window.location.href = sessionUrl;
    } catch (err) {
      console.error('Error during checkout:', err);
      // Error is already set by the hook
    }
  };
  
  // Function to handle subscription management
  const handleManageSubscription = async () => {
    if (!user) return;
    
    try {
      const sessionUrl = await createBillingPortalSession();
      window.location.href = sessionUrl;
    } catch (err) {
      console.error('Error accessing billing portal:', err);
      // Error is already set by the hook
    }
  };
  
  return (
    <div className={`rounded-lg border p-6 ${isCurrentPlan ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      {isCurrentPlan && (
        <div className="mb-4 bg-blue-500 text-white text-xs font-medium py-1 px-2 rounded-full inline-block">
          Current Plan
        </div>
      )}
      
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="text-gray-500 mb-4">{plan.description}</p>
      
      <div className="mb-6">
        <span className="text-3xl font-bold">${plan.price}</span>
        {plan.interval && <span className="text-gray-500">/{plan.interval}</span>}
      </div>
      
      <div className="space-y-2 mb-6">
        {Object.entries(plan.features).map(([key, value]) => (
          <div key={key} className="flex items-start">
            <svg 
              className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>
              {typeof value === 'boolean' 
                ? key.replace(/_/g, ' ') 
                : Array.isArray(value)
                  ? `${key.replace(/_/g, ' ')}: ${value.join(', ')}`
                  : `${key.replace(/_/g, ' ')}: ${value}`
              }
            </span>
          </div>
        ))}
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-sm text-red-700 rounded">
          {error}
        </div>
      )}
      
      {isCurrentPlan ? (
        <button
          onClick={handleManageSubscription}
          disabled={isLoading}
          className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Manage Subscription'}
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={isLoading || !plan.stripePriceId}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : plan.price === 0 ? 'Get Started' : 'Subscribe'}
        </button>
      )}
    </div>
  );
}
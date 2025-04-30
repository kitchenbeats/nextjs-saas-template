'use client';

import { ReactNode } from 'react';
import { useFeature } from '@/utils/hooks/useFeature';
import Link from 'next/link';

interface FeatureGuardProps {
  children: ReactNode;
  feature: string;
  fallback?: ReactNode;
  value?: number | boolean | string;
  showUpgrade?: boolean;
}

export default function FeatureGuard({
  children,
  feature,
  fallback,
  value = true,
  showUpgrade = true,
}: FeatureGuardProps) {
  const { hasAccess, plan, plansWithAccess } = useFeature(feature, value);
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Get plans that have this feature
  const availablePlans = plansWithAccess();
  const recommendedPlan = availablePlans.length > 0 ? availablePlans[0] : null;
  
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-lg bg-gray-50 text-center">
      <svg
        className="w-12 h-12 text-gray-400 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V6a3 3 0 00-3-3H9a3 3 0 00-3 3v9m9-10.5v.75a.75.75 0 0 0 1.5 0V4.5h.75a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 0 0 1.5H12Z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Feature Not Available
      </h3>
      <p className="text-gray-500 mb-4">
        The {feature.replace(/_/g, ' ')} feature is not available on your current plan ({plan?.name || 'Free'}).
      </p>
      
      {availablePlans.length > 0 && (
        <div className="text-gray-500 mb-4">
          <p>Available on the following plans:</p>
          <ul className="mt-2 space-y-1">
            {availablePlans.map(plan => (
              <li key={plan.id} className="font-medium">
                {plan.id === recommendedPlan?.id ? (
                  <span className="text-blue-600">✓ {plan.name} (Recommended)</span>
                ) : (
                  <span>{plan.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showUpgrade && (
        <Link
          href={`/pricing${recommendedPlan ? `?plan=${recommendedPlan.id}` : ''}`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {recommendedPlan ? `Upgrade to ${recommendedPlan.name}` : 'View Plans'}
        </Link>
      )}
    </div>
  );
}
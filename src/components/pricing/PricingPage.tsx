'use client';

import PlanCard from './PlanCard';
import { useProfile } from '@/utils/hooks/useProfile';
import { useUser } from '@/utils/providers/userProvider';
import { useYearlyPricing } from '@/utils/hooks/useYearlyPricing';

export default function PricingPage() {
  const { 
    billingInterval, 
    setBillingInterval, 
    getAdjustedPlans 
  } = useYearlyPricing();
  
  const { user } = useUser();
  const { data: profile } = useProfile(user?.id);

  // Get current plan
  const currentPlanId = profile?.active_plan || 'free';
  
  // Use the yearly pricing hook to get adjusted plans
  const adjustedPlansConfig = getAdjustedPlans();
  
  // Filter and organize plans
  const sortedPlans = Object.entries(adjustedPlansConfig)
    .sort(([, planA], [, planB]) => (planA.price || 0) - (planB.price || 0));
  
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Choose the right plan for you
        </h2>
        <p className="mt-3 text-xl text-gray-500">
          Start with a free account, upgrade when you need more.
        </p>
      </div>
      
      {/* Billing interval toggle */}
      {sortedPlans.some(([, plan]) => plan.price > 0) && (
        <div className="mt-8 flex justify-center">
          <div className="relative bg-gray-100 p-1 rounded-full flex space-x-2">
            <button
              onClick={() => setBillingInterval('month')}
              className={`${
                billingInterval === 'month'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200'
              } py-2 px-4 rounded-full transition-colors`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`${
                billingInterval === 'year'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200'
              } py-2 px-4 rounded-full transition-colors`}
            >
              Yearly
              <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      )}
      
      {/* Plans grid */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {sortedPlans.map(([planId, plan]) => (
          <PlanCard
            key={planId}
            plan={plan}
            planId={planId}
            isCurrentPlan={planId === currentPlanId}
          />
        ))}
      </div>
      
      {/* FAQ */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h3>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-3">Can I change plans later?</h4>
            <p className="text-gray-500">
              Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated automatically.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-3">How do I cancel my subscription?</h4>
            <p className="text-gray-500">
              You can cancel your subscription from your account settings. You&apos;ll continue to have access until the end of your billing period.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-3">Is there a free trial?</h4>
            <p className="text-gray-500">
              We offer a free plan with basic features. You can upgrade to a paid plan when you need more features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
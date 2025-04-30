import { useState, useCallback } from 'react';
import { getPlansConfig, type Plan } from '../stripe/config';

// Constants for pricing calculations
const YEARLY_DISCOUNT_PERCENT = 20; // 20% discount for yearly
const MONTHS_IN_YEAR = 12;

export type BillingInterval = 'month' | 'year';

export type YearlyPricingResult = {
  billingInterval: BillingInterval;
  setBillingInterval: (interval: BillingInterval) => void;
  getAdjustedPrice: (plan: Plan) => number;
  getSavingsAmount: (plan: Plan) => number;
  getSavingsPercent: () => number;
  getAdjustedPlans: () => Record<string, Plan>;
};

export function useYearlyPricing(): YearlyPricingResult {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  
  // Calculate the adjusted price for a plan based on the billing interval
  const getAdjustedPrice = useCallback((plan: Plan): number => {
    // Safety check for null/undefined price
    if (!plan || typeof plan.price !== 'number') {
      return 0;
    }
    
    if (billingInterval === 'month' || plan.price === 0) {
      return plan.price;
    }
    
    // Apply yearly discount
    const yearlyPrice = plan.price * MONTHS_IN_YEAR;
    const discountAmount = (yearlyPrice * YEARLY_DISCOUNT_PERCENT) / 100;
    return Math.round((yearlyPrice - discountAmount) / MONTHS_IN_YEAR);
  }, [billingInterval]);
  
  // Calculate the savings amount for a plan when using yearly billing
  const getSavingsAmount = useCallback((plan: Plan): number => {
    // Safety check for null/undefined price
    if (!plan || typeof plan.price !== 'number') {
      return 0;
    }
    
    if (billingInterval === 'month' || plan.price === 0) {
      return 0;
    }
    
    const yearlyPrice = plan.price * MONTHS_IN_YEAR;
    const discountAmount = (yearlyPrice * YEARLY_DISCOUNT_PERCENT) / 100;
    return Math.round(discountAmount / MONTHS_IN_YEAR);
  }, [billingInterval]);
  
  // Get the savings percentage
  const getSavingsPercent = useCallback((): number => {
    return YEARLY_DISCOUNT_PERCENT;
  }, []);
  
  // Get plans with adjusted pricing
  const getAdjustedPlans = useCallback((): Record<string, Plan> => {
    const plansConfig = getPlansConfig();
    const adjustedPlans: Record<string, Plan> = {};
    
    for (const [planId, plan] of Object.entries(plansConfig)) {
      // Create a copy of the plan with adjusted pricing
      adjustedPlans[planId] = {
        ...plan,
        price: getAdjustedPrice(plan),
        interval: billingInterval,
      };
    }
    
    return adjustedPlans;
  }, [billingInterval, getAdjustedPrice]);
  
  return {
    billingInterval,
    setBillingInterval,
    getAdjustedPrice,
    getSavingsAmount,
    getSavingsPercent,
    getAdjustedPlans,
  };
}
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from './env';

// Get Stripe API version from environment variable or use a default
const STRIPE_API_VERSION = process.env.STRIPE_API_VERSION || '2024-04-10';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION as Stripe.LatestApiVersion,
  appInfo: {
    name: 'Themer',
    version: '1.0.0',
  },
});

// Load plans from the JSON config
import plansConfig from '@/config/plans.json';

export type FeatureValue = number | string | boolean | string[];

export interface Plan {
  name: string;
  description: string;
  price: number;
  stripePriceId: string | null;
  interval?: 'month' | 'year';
  features: Record<string, FeatureValue>;
}

export type PlansConfig = Record<string, Plan>;

// Return a typed version of the plans config
export function getPlansConfig(): PlansConfig {
  return plansConfig as PlansConfig;
}

// Get a specific plan by its ID
export function getPlan(planId: string): Plan | undefined {
  const plans = getPlansConfig();
  return plans[planId];
}

// Helper to determine if a user has access to a specific feature
export function hasAccess(
  userPlanId: string | undefined | null,
  featureName: string,
  requestedValue: number | boolean = true
): boolean {
  if (!userPlanId) return false;
  
  const plan = getPlan(userPlanId);
  if (!plan) return false;
  
  const featureValue = plan.features[featureName];
  
  // If feature doesn't exist in the plan
  if (featureValue === undefined) return false;
  
  // Handle different feature value types
  if (typeof featureValue === 'boolean') {
    return featureValue === true;
  }
  
  if (typeof featureValue === 'number' && typeof requestedValue === 'number') {
    return featureValue >= requestedValue;
  }
  
  if (featureValue === 'unlimited') {
    return true;
  }
  
  if (Array.isArray(featureValue) && typeof requestedValue === 'string') {
    return featureValue.includes(requestedValue);
  }
  
  return false;
}

interface StripeSyncResult {
  productId: string;
  priceId: string;
}

type StripeSyncResults = Record<string, StripeSyncResult>;

// Create products and prices in Stripe from our plans config
export async function syncPlansToStripe(currency = 'usd'): Promise<StripeSyncResults> {
  const plans = getPlansConfig();
  const results: StripeSyncResults = {};

  try {
    for (const [planId, plan] of Object.entries(plans)) {
      // Skip the free plan as it doesn't need a Stripe product
      if (planId === 'free') continue;

      try {
        // 1. Create or update the product in Stripe
        const product = await stripe.products.create({
          id: `themer_${planId}`,
          name: plan.name,
          description: plan.description,
          metadata: {
            planId,
          },
          features: Object.entries(plan.features)
            .map(([key, value]) => {
              // Format feature for display
              if (typeof value === 'boolean') {
                return value ? key.replace('_', ' ') : null;
              }
              if (Array.isArray(value)) {
                return `${key.replace('_', ' ')}: ${value.join(', ')}`;
              }
              return `${key.replace('_', ' ')}: ${value}`;
            })
            .filter(Boolean) as string[],
        }, {
          idempotencyKey: `product_${planId}_${Date.now()}`,
        });

        // 2. Create a price for the product
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: plan.price * 100, // Convert to cents
          currency,
          recurring: {
            interval: plan.interval || 'month',
          },
          metadata: {
            planId,
          },
        }, {
          idempotencyKey: `price_${planId}_${Date.now()}`,
        });

        results[planId] = {
          productId: product.id,
          priceId: price.id,
        };
      } catch (error) {
        console.error(`Error creating product/price for plan ${planId}:`, error);
        throw error;
      }
    }

    return results;
  } catch (error) {
    console.error('Error syncing plans to Stripe:', error);
    throw error;
  }
}
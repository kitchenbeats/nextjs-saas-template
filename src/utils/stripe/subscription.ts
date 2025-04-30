import { stripe } from './config';
import { getOrCreateCustomer } from './customer';
import { createClient } from '../supabase/server';

// Get the active subscription for a user
export async function getActiveSubscription(userId: string) {
  const supabase = await createClient();
  
  // First query the database for the subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  return subscription;
}

// Create a checkout session for a subscription
export async function createCheckoutSession({
  userId,
  priceId,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  // Get or create a Stripe customer for the user
  const customer = await getOrCreateCustomer(userId);
  
  // Create a checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    subscription_data: {
      metadata: {
        userId,
      },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
  });
  
  return session;
}

// Create a billing portal session for managing subscription
export async function createBillingPortalSession({
  userId,
  returnUrl,
}: {
  userId: string;
  returnUrl: string;
}) {
  // Get or create a Stripe customer for the user
  const customer = await getOrCreateCustomer(userId);
  
  // Create a billing portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: returnUrl,
  });
  
  return session;
}

import type Stripe from 'stripe';

// Define types for the subscription data
interface SubscriptionData {
  id: string;
  user_id: string;
  status: string;
  price_id: string;
  plan_id: string;
  quantity: number;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

// Handle subscription changes (called by webhook)
export async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Extract the userId from the subscription metadata
  const userId = subscription.metadata?.userId;
  
  if (!userId) {
    console.error('No userId found in subscription metadata');
    return;
  }
  
  // Get the subscription items to determine the plan
  const subscriptionItems = subscription.items.data;
  
  if (!subscriptionItems || subscriptionItems.length === 0) {
    console.error('No subscription items found');
    return;
  }
  
  const subscriptionItem = subscriptionItems[0];
  const priceId = subscriptionItem.price.id;
  
  try {
    // Get the price metadata to determine the planId
    const price = await stripe.prices.retrieve(priceId);
    const planId = price.metadata?.planId || 'unknown';
    
    const supabase = await createClient();
    
    // Prepare subscription data
    const subscriptionData: SubscriptionData = {
      id: subscription.id,
      user_id: userId,
      status: subscription.status,
      price_id: priceId,
      plan_id: planId,
      quantity: subscriptionItem.quantity || 1,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      created_at: new Date(subscription.created * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Use a transaction to ensure both operations succeed or fail together
    const { error: transactionError } = await supabase.rpc(
      'update_subscription_and_profile',
      {
        p_subscription_data: subscriptionData,
        p_user_id: userId,
        p_plan_id: planId,
        p_is_active: subscription.status === 'active'
      }
    );
    
    if (transactionError) {
      throw new Error(`Transaction failed: ${transactionError.message}`);
    }
    
    return { success: true, subscriptionId: subscription.id, planId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error handling subscription change: ${errorMessage}`);
    throw error;
  }
}
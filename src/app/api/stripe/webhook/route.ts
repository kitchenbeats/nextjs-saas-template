import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe/config';
import { handleSubscriptionChange } from '@/utils/stripe/subscription';
import { headers } from 'next/headers';
import { STRIPE_WEBHOOK_SECRET } from '@/utils/stripe/env';

// Edge runtime is required for NextResponse and Web API
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  // Get the raw request body as a buffer
  const rawBody = await req.text();
  
  // Get the Stripe signature from the headers
  const signature = headers().get('stripe-signature');
  
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }
  
  // Verify the webhook signature
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`⚠️ Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook signature verification failed` }, { status: 400 });
  }
  
  // Handle different webhook event types
  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Verify that the object is a Stripe Subscription
        if (!subscription || 
            typeof subscription !== 'object' || 
            subscription.object !== 'subscription') {
          throw new Error('Invalid subscription object received');
        }
        
        await handleSubscriptionChange(subscription);
        break;
      }
      
      // Handle payment failures
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        if (!invoice || typeof invoice !== 'object' || invoice.object !== 'invoice') {
          throw new Error('Invalid invoice object received');
        }
        
        // Extract customer and notify them of failed payment
        const customerId = invoice.customer as string;
        if (customerId) {
          // In production, you should send an email notification
          console.log(`Payment failed for invoice ${invoice.id} (customer: ${customerId})`);
          // await notifyCustomerOfFailedPayment(customerId, invoice.id);
        }
        break;
      }
      
      // Handle trial ending soon
      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object;
        if (!subscription || 
            typeof subscription !== 'object' || 
            subscription.object !== 'subscription') {
          throw new Error('Invalid subscription object received');
        }
        
        // Notify customer their trial is ending soon (3 days before)
        const customerId = subscription.customer as string;
        if (customerId) {
          console.log(`Trial ending soon for subscription ${subscription.id} (customer: ${customerId})`);
          // await notifyCustomerOfTrialEnding(customerId, subscription.id);
        }
        break;
      }
      
      // Handle failed payment method
      case 'payment_method.attached':
      case 'payment_method.updated':
      case 'payment_method.detached': {
        const paymentMethod = event.data.object;
        if (!paymentMethod || 
            typeof paymentMethod !== 'object' || 
            paymentMethod.object !== 'payment_method') {
          throw new Error('Invalid payment method object received');
        }
        
        // Update payment method information in your database if needed
        const customerId = paymentMethod.customer as string;
        if (customerId) {
          console.log(`Payment method ${event.type} for customer: ${customerId}`);
          // await updateCustomerPaymentMethod(customerId, paymentMethod);
        }
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error handling webhook event:', errorMessage);
    return NextResponse.json(
      { error: 'Error handling webhook event', details: errorMessage },
      { status: 500 }
    );
  }
}
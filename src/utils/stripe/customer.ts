import { stripe } from './config';
import { createClient } from '../supabase/server';

// Create or retrieve a Stripe customer for a Supabase user
export async function getOrCreateCustomer(userId: string, email?: string) {
  // First check if the user already has a customer ID in the database
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();
  
  // If they have a customer ID, retrieve the customer from Stripe
  if (profile?.stripe_customer_id) {
    const customer = await stripe.customers.retrieve(profile.stripe_customer_id);
    
    // If the customer exists in Stripe, return it
    if (customer && !customer.deleted) {
      return customer;
    }
    
    // If the customer doesn't exist in Stripe or is deleted, we'll create a new one
  }
  
  // Otherwise, create a new customer in Stripe
  // We need the user's email, so fetch it if not provided
  if (!email) {
    const { data } = await supabase.auth.getUser();
    email = data.user?.email;
    
    if (!email) {
      throw new Error('User email required to create a Stripe customer');
    }
  }
  
  // Create the customer in Stripe
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });
  
  // Save the customer ID to the user's profile
  await supabase
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId);
  
  return customer;
}
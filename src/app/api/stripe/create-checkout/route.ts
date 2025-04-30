import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createCheckoutSession } from '@/utils/stripe/subscription';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // 1. Get the user from the request
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // 2. Parse the request body
    const { priceId, successUrl, cancelUrl } = await req.json();
    
    if (!priceId || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // 3. Create the checkout session
    const session = await createCheckoutSession({
      userId: user.id,
      priceId,
      successUrl,
      cancelUrl,
    });
    
    // 4. Return the session URL
    return NextResponse.json({ sessionUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
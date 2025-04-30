import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createBillingPortalSession } from '@/utils/stripe/subscription';

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
    const { returnUrl } = await req.json();
    
    if (!returnUrl) {
      return NextResponse.json(
        { error: 'Missing returnUrl' },
        { status: 400 }
      );
    }
    
    // 3. Create the billing portal session
    const session = await createBillingPortalSession({
      userId: user.id,
      returnUrl,
    });
    
    // 4. Return the session URL
    return NextResponse.json({ sessionUrl: session.url });
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    return NextResponse.json(
      { error: 'Error creating billing portal session' },
      { status: 500 }
    );
  }
}
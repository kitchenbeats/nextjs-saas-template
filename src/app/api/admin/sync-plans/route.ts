import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { syncPlansToStripe } from '@/utils/stripe/config';

export async function POST() {
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
    
    // 2. Check if the user is an admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // 3. Sync the plans to Stripe
    const results = await syncPlansToStripe();
    
    // 4. Update the plan configuration in the database
    const { error } = await supabase
      .from('config')
      .upsert({
        key: 'stripe_plans',
        value: results,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      });
    
    if (error) {
      throw error;
    }
    
    // 5. Return the results
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error syncing plans to Stripe:', error);
    return NextResponse.json(
      { error: 'Error syncing plans to Stripe' },
      { status: 500 }
    );
  }
}
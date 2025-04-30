import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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

    // Verify free plan exists
    // This is a good safety check to prevent setting an invalid plan
    const { data: configData } = await supabase
      .from('config')
      .select('value')
      .eq('key', 'stripe_plans')
      .single();

    const plans = configData?.value || {};
    if (!plans.free) {
      // Check local config instead if no DB config is available
      const { data: planCheck } = await supabase
        .from('profiles')
        .select('id')
        .eq('active_plan', 'free')
        .limit(1);
      
      if (!planCheck || planCheck.length === 0) {
        return NextResponse.json(
          { error: 'Free plan is not available' },
          { status: 400 }
        );
      }
    }
    
    // 2. Update the user's plan
    const { error } = await supabase
      .from('profiles')
      .update({
        active_plan: 'free',
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);
    
    if (error) {
      throw error;
    }
    
    // 3. Return success
    return NextResponse.json({
      success: true,
      plan: 'free',
    });
  } catch (error) {
    console.error('Error selecting free plan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Error selecting free plan', details: errorMessage },
      { status: 500 }
    );
  }
}
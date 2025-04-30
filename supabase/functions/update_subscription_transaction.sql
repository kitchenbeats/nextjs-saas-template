-- Function to update subscription and profile in a transaction
CREATE OR REPLACE FUNCTION public.update_subscription_and_profile(
  p_subscription_data JSONB,
  p_user_id UUID,
  p_plan_id TEXT,
  p_is_active BOOLEAN
) RETURNS VOID AS $$
BEGIN
  -- Begin transaction
  BEGIN
    -- First, update or insert the subscription data
    INSERT INTO public.subscriptions (
      id, 
      user_id, 
      status, 
      price_id, 
      plan_id, 
      quantity,
      current_period_start, 
      current_period_end, 
      cancel_at_period_end, 
      created_at, 
      updated_at
    )
    VALUES (
      p_subscription_data->>'id',
      p_user_id,
      p_subscription_data->>'status',
      p_subscription_data->>'price_id',
      p_plan_id,
      (p_subscription_data->>'quantity')::INTEGER,
      (p_subscription_data->>'current_period_start')::TIMESTAMP WITH TIME ZONE,
      (p_subscription_data->>'current_period_end')::TIMESTAMP WITH TIME ZONE,
      (p_subscription_data->>'cancel_at_period_end')::BOOLEAN,
      (p_subscription_data->>'created_at')::TIMESTAMP WITH TIME ZONE,
      (p_subscription_data->>'updated_at')::TIMESTAMP WITH TIME ZONE
    )
    ON CONFLICT (id) DO UPDATE SET
      status = EXCLUDED.status,
      price_id = EXCLUDED.price_id,
      plan_id = EXCLUDED.plan_id,
      quantity = EXCLUDED.quantity,
      current_period_start = EXCLUDED.current_period_start,
      current_period_end = EXCLUDED.current_period_end,
      cancel_at_period_end = EXCLUDED.cancel_at_period_end,
      updated_at = EXCLUDED.updated_at;
    
    -- Then, update the profile's active plan
    UPDATE public.profiles
    SET 
      active_plan = CASE WHEN p_is_active THEN p_plan_id ELSE 'free' END,
      updated_at = NOW()
    WHERE id = p_user_id;
    
    -- If either operation fails, the transaction will be rolled back
  END;
END;
$$ LANGUAGE plpgsql;
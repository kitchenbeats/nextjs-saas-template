import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../supabase/client';

interface ProfileData {
  id: string;
  full_name?: string;
  avatar_url?: string;
  stripe_customer_id?: string;
  active_plan?: string;
  [key: string]: string | undefined;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (newData: ProfileData) => {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(newData)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: (data) => {
      // Invalidate profile queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
    },
  });
}
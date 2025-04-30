import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { createClient } from '../supabase/client';

export function getProfileById(userId: string) {
  const supabase = createClient();
  return {
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
  };
}

export function useProfile(userId?: string | null) {
  return useQuery({
    ...getProfileById(userId || ''),
    enabled: !!userId,
  });
}
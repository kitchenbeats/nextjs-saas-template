import { Metadata } from 'next';
import StripeSync from '@/components/admin/StripeSync';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin - Plans',
  description: 'Manage subscription plans',
};

export default async function PlansAdminPage() {
  // Check if user is admin
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin') {
    redirect('/');
  }
  
  // Get latest Stripe sync status
  const { data: config } = await supabase
    .from('config')
    .select('value, updated_at')
    .eq('key', 'stripe_plans')
    .single();
  
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Subscription Plans Admin</h1>
        <p className="text-gray-500 mt-2">
          Manage your application&apos;s subscription plans and sync them with Stripe.
        </p>
      </div>
      
      {config && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-sm font-medium text-blue-800">Last Sync Status</h2>
          <p className="text-sm text-blue-600 mt-1">
            Last synchronized on {new Date(config.updated_at).toLocaleString()}
          </p>
        </div>
      )}
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <StripeSync />
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Plans Configuration</h2>
          <p className="text-gray-600 mb-4">
            To modify the subscription plans, edit the config file at:
            <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
              src/config/plans.json
            </code>
          </p>
          
          <p className="text-sm text-gray-500">
            After making changes, you&apos;ll need to sync the updated plans with Stripe using the button above.
          </p>
        </div>
      </div>
    </div>
  );
}
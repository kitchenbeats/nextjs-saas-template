import { useUser } from '../providers/userProvider';
import { useProfile } from './useProfile';
import { hasAccess, getPlan, getPlansConfig } from '../stripe/config';

// Hook to check if a user has access to a specific feature
export function useFeature(featureName: string, requestedValue: number | boolean | string = true) {
  const { user } = useUser();
  const { data: profile } = useProfile(user?.id);
  
  const userPlanId = profile?.active_plan || 'free';
  const plan = getPlan(userPlanId);
  
  // Simplified access check
  let accessGranted = false;
  try {
    accessGranted = hasAccess(userPlanId, featureName, requestedValue);
  } catch (error) {
    console.error(`Error checking feature access for ${featureName}:`, error);
    // Default to no access on error
    accessGranted = false;
  }
  
  // Get a list of plans that provide access to this feature
  const getPlansWithAccess = () => {
    const plansConfig = getPlansConfig();
    return Object.entries(plansConfig)
      .filter(([, planData]) => {
        const feature = planData.features[featureName];
        if (feature === undefined) return false;
        
        if (typeof requestedValue === 'boolean' && typeof feature === 'boolean') {
          return feature === requestedValue;
        }
        
        if (typeof requestedValue === 'number' && (typeof feature === 'number' || feature === 'unlimited')) {
          return feature === 'unlimited' || (typeof feature === 'number' && feature >= requestedValue);
        }
        
        if (typeof requestedValue === 'string' && Array.isArray(feature)) {
          return feature.includes(requestedValue);
        }
        
        return false;
      })
      .map(([id, planData]) => ({ id, name: planData.name }));
  };
  
  return {
    hasAccess: accessGranted,
    planId: userPlanId,
    plan,
    plansWithAccess: getPlansWithAccess,
  };
}
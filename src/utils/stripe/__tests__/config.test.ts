import { describe, it, expect } from 'vitest';
import { getPlan, hasAccess, getPlansConfig } from '../config';

describe('Stripe Config', () => {
  describe('getPlan', () => {
    it('returns correct plan for valid plan ID', () => {
      const freePlan = getPlan('free');
      expect(freePlan).toBeDefined();
      expect(freePlan?.name).toBe('Free');
      expect(freePlan?.price).toBe(0);
    });

    it('returns undefined for invalid plan ID', () => {
      const invalidPlan = getPlan('invalid');
      expect(invalidPlan).toBeUndefined();
    });
  });

  describe('hasAccess', () => {
    it('grants access to free plan features', () => {
      expect(hasAccess('free', 'projects', 3)).toBe(true);
      expect(hasAccess('free', 'projects', 5)).toBe(false);
      expect(hasAccess('free', 'ai_generation')).toBe(false);
    });

    it('grants access to pro plan features', () => {
      expect(hasAccess('pro', 'projects', 20)).toBe(true);
      expect(hasAccess('pro', 'ai_generation')).toBe(true);
      expect(hasAccess('pro', 'export_formats', 'svg')).toBe(true);
    });

    it('handles unlimited features', () => {
      expect(hasAccess('team', 'projects', 1000)).toBe(true);
      expect(hasAccess('team', 'templates', 'unlimited')).toBe(true);
    });

    it('returns false for non-existent plan', () => {
      expect(hasAccess('invalid', 'projects')).toBe(false);
    });

    it('returns false for non-existent feature', () => {
      expect(hasAccess('free', 'nonexistent')).toBe(false);
    });
  });

  describe('getPlansConfig', () => {
    it('returns all plans', () => {
      const plans = getPlansConfig();
      expect(plans).toBeDefined();
      expect(plans.free).toBeDefined();
      expect(plans.pro).toBeDefined();
      expect(plans.team).toBeDefined();
      expect(plans.enterprise).toBeDefined();
    });
  });
});

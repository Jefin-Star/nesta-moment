import { PricingTier } from '../types';

export const PRICING_TIERS: PricingTier[] = [
  {
    period: '1 Month',
    durationMonths: 1,
    discountPercentage: 0,
    parkourFee: 2000,
    calisthenicsFee: 2000,
    yogaFee: 2500,
    wingChunFee: 2500,
    savingsNote: 'Standard monthly commitment',
    isPopular: false,
  },
  {
    period: '3 Months',
    durationMonths: 3,
    discountPercentage: 10,
    parkourFee: 5400,
    calisthenicsFee: 5400,
    yogaFee: 6750,
    wingChunFee: 6750,
    savingsNote: 'Save 10% vs monthly rate',
    isPopular: true,
  },
  {
    period: '6 Months',
    durationMonths: 6,
    discountPercentage: 10,
    parkourFee: 10800,
    calisthenicsFee: 10800,
    yogaFee: 13500,
    wingChunFee: 13500,
    savingsNote: 'Lock in half-year rates',
    isPopular: false,
  },
  {
    period: '1 Year',
    durationMonths: 12,
    discountPercentage: 10,
    parkourFee: 21600,
    calisthenicsFee: 21600,
    yogaFee: 27000,
    wingChunFee: 27000,
    savingsNote: 'Full annual movement commitment',
    isPopular: false,
  },
];

export const MEMBERSHIP_PERKS = [
  {
    title: 'Expert Hands-On Coaching',
    description: 'Certified coaches actively spotting, correcting biomechanics, and ensuring safety.',
  },
  {
    title: 'Open Studio Practice Jams',
    description: 'Access to supervised open jam sessions to drill techniques and progress safely.',
  },
  {
    title: 'Clear Session Allocations',
    description: '12 sessions/month for Parkour & Yoga; 8 high-impact 2-2.5h sessions for Calisthenics.',
  },
  {
    title: 'Facility Amenities',
    description: 'Custom calisthenics rigs, crash mats, change rooms, clean hydration.',
  },
];

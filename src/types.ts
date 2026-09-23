export type DisciplineId = 'parkour' | 'calisthenics' | 'yoga' | 'wing-chun';

export type AgeCategory = 'kids' | 'adults' | 'all';

export interface DisciplineInfo {
  id: DisciplineId;
  name: string;
  tagline: string;
  targetAudience: 'Kids & Adults' | 'Adults Only' | 'All Ages';
  ageCategory: AgeCategory;
  monthlyFee: number;
  sessionsPerMonth: number;
  sessionDuration: string;
  scheduleDetails?: string;
  scheduleDays?: string;
  description: string;
  philosophy: string;
  benefits: string[];
  keyElements: string[];
  imageUrl: string;
  secondaryImageUrl: string;
  accentColor: string;
  badgeText: string;
}

export interface PricingTier {
  period: '1 Month' | '3 Months' | '6 Months' | '1 Year';
  durationMonths: number;
  discountPercentage?: number;
  parkourFee: number;
  calisthenicsFee: number;
  yogaFee: number;
  wingChunFee: number;
  savingsNote?: string;
  isPopular?: boolean;
}

export interface ScheduleSession {
  id: string;
  disciplineId: DisciplineId;
  disciplineName: string;
  title: string;
  targetGroup: 'Kids' | 'Adults';
  isKids: boolean;
  isAdults: boolean;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlot: string; // e.g. "5:30 PM - 6:30 PM"
  timeOfDay: 'morning' | 'evening';
  duration: string; // e.g. "1 hour", "1.5 hours", "2 - 2.5 hours"
  location: string;
  level: string;
  highlights: string;
}

export interface ContactInfo {
  whatsappNumber: string;
  whatsappFormatted: string;
  whatsappUrl: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  location: string;
  city: string;
  mapEmbedUrl?: string;
  googleMapsUrl?: string;
}

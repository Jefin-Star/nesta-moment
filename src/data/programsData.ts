import { DisciplineInfo, ContactInfo } from '../types';

// The verified authentic studio photo uploaded for Nesta Movement Studio
export const UPLOADED_STUDIO_PHOTO = '/340d29bb-86d1-4808-b30f-7921d91256db.jpg';

export const CONTACT_INFO: ContactInfo = {
  whatsappNumber: '+91 9447330287',
  whatsappFormatted: '+91 9447330287',
  whatsappUrl: 'https://wa.me/919447330287',
  email: 'nestamovementstudio@gmail.com',
  instagramHandle: 'Instagram',
  instagramUrl: 'https://instagram.com/nesta_movement',
  location: 'NESTA MOVEMENT, Thiruvananthapuram, Kerala',
  city: 'Thiruvananthapuram, Kerala',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.7403431096773!2d76.9292378!3d8.5289834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05b96e7f323d63%3A0x5374e7496fecb453!2sNESTA%20MOVEMENT!5e1!3m2!1sen!2sin!4v1790077474581!5m2!1sen!2sin',
  googleMapsUrl:
    'https://www.google.com/maps/place/NESTA+MOVEMENT/@8.5289834,76.9292378,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05b96e7f323d63:0x5374e7496fecb453!8m2!3d8.5289834!4d76.9292378!16s%2Fg%2F11w4458999',
};

export const DISCIPLINES: DisciplineInfo[] = [
  {
    id: 'parkour',
    name: 'Parkour',
    tagline: 'Art of Displacement & Effortless Obstacle Mastery',
    targetAudience: 'Kids & Adults',
    ageCategory: 'all',
    monthlyFee: 2000,
    sessionsPerMonth: 12,
    sessionDuration: 'Kids: 60 mins | Adults: 90 mins',
    scheduleDays: 'Kids: Mon/Wed 5:30 PM, Fri 5 PM, Sat/Sun 10:30 AM • Adults: Mon/Wed 7:30 PM, Fri 8 PM',
    scheduleDetails: '12 sessions per month with segregated age tracks',
    description:
      'Train to navigate urban and architectural obstacles with fluid efficiency, spatial intelligence, and total body command. Our structured curriculum covers precision landings, rolls, vaults, wall climbs, rail balance, and dynamic flow.',
    philosophy:
      'Parkour is not about recklessness; it is the discipline of overcoming physical and mental obstacles. We cultivate calm risk-evaluation, joint resilience, and creative spatial freedom.',
    benefits: [
      'Joint durability & biomechanically sound landing mechanics',
      'Explosive plyometric power and multi-planar agility',
      'Spatial awareness, 3D perception, and fear mitigation',
      'Cognitive resilience and decisive problem-solving on the fly',
    ],
    keyElements: [
      'Safety Rolls & Impact Dissipation',
      'Speed, Lazy, Kong & Kash Vaults',
      'Tic-Tac, Cat Leap & Wall Runs',
      'Balance Beam & Rail Flow Work',
    ],
    imageUrl: 'https://static.actu.fr/uploads/2018/08/AdobeStock_160391988.jpeg',
    secondaryImageUrl: UPLOADED_STUDIO_PHOTO,
    accentColor: 'from-blue-600 to-cyan-500',
    badgeText: 'Dedicated Kids & Adults Tracks',
  },
  {
    id: 'calisthenics',
    name: 'Calisthenics',
    tagline: 'Pure Relative Bodyweight Mastery & Deep Strength',
    targetAudience: 'Adults Only',
    ageCategory: 'adults',
    monthlyFee: 2000,
    sessionsPerMonth: 8,
    sessionDuration: '2 - 2.5 hours deep dive per session',
    scheduleDays: 'Mon 6:30 PM, Tue 7 AM, Sat 7 AM, Sun 8:30 AM',
    scheduleDetails: '8 extended sessions per month (2-2.5h deep dive per class)',
    description:
      'Master your own bodyweight with progressive gymnastic strength, bar dynamics, and joint longevity. Our signature extended 2 to 2.5-hour sessions provide deep coaching across fundamental strength, advanced isometric holds (planche, front lever), handstand balance, muscle-ups, and mobility recovery.',
    philosophy:
      'True power is the effortless mastery of one’s own gravity. Through progressive overload, tendon conditioning, and patience, we unlock elite physical strength without reliance on external machines.',
    benefits: [
      'Uncompromising relative strength-to-weight ratio',
      'Straight-arm scapular and connective tendon conditioning',
      'Mastery of iconic skills: Muscle-ups, Handstands, Levers',
      'Total core compression and posterior chain integration',
    ],
    keyElements: [
      'Muscle-Up & Bar Skill Dynamics',
      'Handstand Balance & Press-to-Handstand',
      'Front Lever, Back Lever & Planche Progressions',
      'Gymnastic Rings & Weighted Calisthenics',
    ],
    imageUrl: 'https://cdn.betterme.world/articles/wp-content/uploads/2026/04/military-calisthenics-workout-for-men.jpg',
    secondaryImageUrl: UPLOADED_STUDIO_PHOTO,
    accentColor: 'from-amber-500 to-orange-600',
    badgeText: 'Adults Only • 2 - 2.5h Deep Dive',
  },
  {
    id: 'yoga',
    name: 'Yoga',
    tagline: 'Somatic Breath, Fascial Release & Kinetic Alignment',
    targetAudience: 'Adults Only',
    ageCategory: 'adults',
    monthlyFee: 2500,
    sessionsPerMonth: 12,
    sessionDuration: '60 minutes (Morning & Evening options)',
    scheduleDays: 'Morning: Tue/Wed/Thu 6:30 AM • Evening: Tue/Thu/Sat 6:00 PM',
    scheduleDetails: '12 sessions per month, morning and evening batches',
    description:
      'Decompress the spine, open tight kinetic chains, and restore equilibrium. Designed for athletes and movement seekers, our yoga sessions blend dynamic Vinyasa flow, Hatha structural alignment, somatic breathwork, and deep restorative mobility.',
    philosophy:
      'Yoga is the counterbalance to intense exertion. By calming the sympathetic nervous system, restoring fascial glide, and cultivating mindful presence, we build sustainable longevity into every movement.',
    benefits: [
      'Enhanced thoracic, hip, and ankle mobility',
      'Spinal decompression and postural alignment correction',
      'Parasympathetic nervous system regulation & stress relief',
      'Injury prevention through balanced antagonist muscle activation',
    ],
    keyElements: [
      'Pranayama (Breath Control & Lung Capacity)',
      'Dynamic Vinyasa Flow & Hip Openers',
      'Inversion & Spinal Health Sequences',
      'Deep Fascial Release & Mindfulness Rest',
    ],
    imageUrl: 'https://media.istockphoto.com/id/1281947349/photo/yoga-men-workout-in-studio-in-front-of-a-window.jpg?s=170667a&w=0&k=20&c=fyZD1lyR9eTgGANjB0TcUKt2Xj7M-6eQmhzCTVBnvPY=',
    secondaryImageUrl: UPLOADED_STUDIO_PHOTO,
    accentColor: 'from-emerald-500 to-teal-600',
    badgeText: 'Adults Only • Morning & Evening Tracks',
  },
  {
    id: 'wing-chun',
    name: 'Wing Chun',
    tagline: 'Traditional Martial Discipline & Centerline Mastery',
    targetAudience: 'Adults Only',
    ageCategory: 'adults',
    monthlyFee: 2500,
    sessionsPerMonth: 4,
    sessionDuration: '2 hours (Every Friday, 6:00 PM – 8:00 PM)',
    scheduleDays: 'Every Friday • 6:00 PM – 8:00 PM',
    scheduleDetails: '4 sessions per month, held every Friday from 6 to 8 PM',
    description:
      'Experience the refined science of Southern Chinese Kung Fu. Wing Chun emphasizes economy of motion, tactile sensitivity (Chi Sau - sticky hands), simultaneous defense and counter-strike, and unwavering centerline discipline under pressure.',
    philosophy:
      'Simplicity, directness, and efficiency over brute force. Wing Chun teaches you to redirect opposing momentum, remain rooted, and maintain mental stillness in chaotic situations.',
    benefits: [
      'Tactile reflex sensitivity and neuromuscular coordination',
      'Unshakeable centerline balance, rooting, and core stability',
      'Practical close-quarters defensive instincts and calm under stress',
      'Deep martial discipline, posture refinement, and focus',
    ],
    keyElements: [
      'Siu Nim Tao & Chum Kiu Hand Forms',
      'Chi Sau (Tactile Sticky Hands & Sensitivity Drill)',
      'Muk Yan Jong (Wooden Dummy Practice & Conditioning)',
      'Direct Footwork, Stances & Centerline Trapping',
    ],
    imageUrl: 'https://static0.moviewebimages.com/wordpress/wp-content/uploads/2023/05/donnie-yen-in-ip-man-4.jpg?&fit=crop&w=1200&h=675',
    secondaryImageUrl: UPLOADED_STUDIO_PHOTO,
    accentColor: 'from-rose-600 to-red-500',
    badgeText: 'Adults Only • 4 Sessions/Mo (Fridays 6–8 PM)',
  },
];

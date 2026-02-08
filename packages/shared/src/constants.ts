/**
 * رحلتك معنا - Your Journey With Us
 * Mauritanian Taxi App - Pricing & Constants
 * Heritage of Chinguetti (شنقيط)
 */

export const APP_NAME = 'رحلتك معنا'; // Your Journey With Us
export const APP_NAME_EN = 'Your Journey With Us';

// Pricing in New Ouguiya (MRU) - الأوقية الجديدة
export const PRICING = {
  PER_KM: 30.0,              // قيمة الكيلومتر
  PER_MINUTE: 1.25,          // قيمة الدقيقة
  OPEN_TRACK_PER_KM: 12.5,   // المسار المفتوح - كيلومتر
  OPEN_TRACK_PER_MINUTE: 10.5, // المسار المفتوح - دقيقة
  MIN_TRIP_START: 100.0,     // الحد الأدنى لبداية الرحلة
  CANCELLATION_FEE: 100.0,   // رسوم إلغاء الحجز
  APP_FEE_PERCENT: 7,        // رسوم التطبيق 7%
} as const;

export const MAURITANIAN_STATES = [
  'نواكشوط', 'نواكشوط الغربية', 'نواكشوط الجنوبية', 'نواكشوط الشمالية',
  'إنشيري', 'آدرار', 'تيرس زمور', 'الداخلة', 'وادي الناقة',
  'تكانت', 'الحوض الشرقي', 'الحوض الغربي', 'العصابة', 'كوركول',
  'براكنة', 'ترارزة', 'لبراكنة', 'غورغول', 'كيدي ماغا',
  'ولاية غيديماغا'
] as const;

export type MauritanianState = typeof MAURITANIAN_STATES[number];

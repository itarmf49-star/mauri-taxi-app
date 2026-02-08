import { PRICING } from './constants';

export interface FareCalculation {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  subtotal: number;
  appFee: number;
  total: number;
  isOpenTrack: boolean;
}

/**
 * Calculate taxi fare based on Mauritanian pricing rules
 * @param distanceKm - Distance in kilometers
 * @param durationMinutes - Duration in minutes
 * @param isOpenTrack - Whether it's an open track ride
 */
export function calculateFare(
  distanceKm: number,
  durationMinutes: number,
  isOpenTrack: boolean = false
): FareCalculation {
  const baseFare = PRICING.MIN_TRIP_START;

  let distanceFare: number;
  let timeFare: number;

  if (isOpenTrack) {
    distanceFare = distanceKm * PRICING.OPEN_TRACK_PER_KM;
    timeFare = durationMinutes * PRICING.OPEN_TRACK_PER_MINUTE;
  } else {
    distanceFare = distanceKm * PRICING.PER_KM;
    timeFare = durationMinutes * PRICING.PER_MINUTE;
  }

  const subtotal = baseFare + distanceFare + timeFare;
  const appFee = subtotal * (PRICING.APP_FEE_PERCENT / 100);
  const total = subtotal + appFee;

  return {
    baseFare,
    distanceFare,
    timeFare,
    subtotal,
    appFee,
    total: Math.round(total * 100) / 100,
    isOpenTrack,
  };
}

export { PRICING };

export interface Ride {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  driverId?: string;
  pickup: Location;
  destination: Location;
  status: RideStatus;
  fare?: number;
  distanceKm?: number;
  durationMinutes?: number;
  isOpenTrack: boolean;
  createdAt: string;
  updatedAt: string;
  state: string;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export type RideStatus =
  | 'pending'      // Waiting for driver
  | 'accepted'     // Driver accepted
  | 'in_progress'  // Trip started
  | 'completed'    // Trip finished
  | 'cancelled';   // Cancelled

export interface Driver {
  id: string;
  name: string;
  phone: string;
  carMark: string;
  carModel: string;
  plateNumber: string;
  location: Location;
  isAvailable: boolean;
  rating: number;
  balance: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location?: Location;
}

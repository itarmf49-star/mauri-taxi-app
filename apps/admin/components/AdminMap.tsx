'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface RidePoint {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  type: 'pickup' | 'destination' | 'driver';
}

interface AdminMapProps {
  rides: Array<{ id: string; pickup: { lat: number; lng: number }; destination: { lat: number; lng: number } }>;
  drivers?: Array<{ id: string; location: { lat: number; lng: number }; carMark: string }>;
  height?: string;
}

const carIcon = {
  path: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z',
  fillColor: '#5D4E37',
  fillOpacity: 1,
  strokeWeight: 2,
  strokeColor: '#D4A574',
  scale: 1.2,
};

export function AdminMap({ rides, drivers = [], height = '400px' }: AdminMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    if (!apiKey) return;

    new Loader({ apiKey, version: 'weekly' }).load().then(() => {
      if (!mapRef.current) return;
      const m = new google.maps.Map(mapRef.current, {
        center: { lat: 18.0735, lng: -15.9582 },
        zoom: 12,
      });
      setMap(m);
    });
  }, []);

  useEffect(() => {
    if (!map) return;

    const bounds = new google.maps.LatLngBounds();

    rides.forEach((ride) => {
      new google.maps.Marker({ position: ride.pickup, map, label: 'A', icon: { path: google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: '#22c55e', fillOpacity: 1 } });
      new google.maps.Marker({ position: ride.destination, map, label: 'B', icon: { path: google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: '#ef4444', fillOpacity: 1 } });
      bounds.extend(ride.pickup);
      bounds.extend(ride.destination);
    });

    drivers.forEach((d) => {
      const marker = new google.maps.Marker({ position: d.location, map, icon: carIcon, title: d.carMark });
      bounds.extend(d.location);
    });

    if (rides.length > 0 || drivers.length > 0) map.fitBounds(bounds, 50);
  }, [map, rides, drivers]);

  return (
    <div ref={mapRef} style={{ height }} className="w-full rounded-xl overflow-hidden border-2 border-chinguetti-stone" />
  );
}

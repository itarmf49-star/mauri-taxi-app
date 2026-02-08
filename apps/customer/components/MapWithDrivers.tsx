'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Driver {
  id: string;
  name: string;
  phone: string;
  carMark: string;
  location: { lat: number; lng: number };
}

interface MapWithDriversProps {
  drivers: Driver[];
  pickup?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  onCallDriver?: (phone: string) => void;
  height?: string;
}

// Custom car marker SVG
const carIcon = {
  path: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
  fillColor: '#5D4E37',
  fillOpacity: 1,
  strokeWeight: 2,
  strokeColor: '#D4A574',
  scale: 1.5,
};

export function MapWithDrivers({
  drivers,
  pickup,
  destination,
  onCallDriver,
  height = '400px',
}: MapWithDriversProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    if (!apiKey) {
      console.warn('Google Maps API key not set. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local');
      return;
    }

    const loader = new Loader({ apiKey, version: 'weekly' });
    loader.load().then(() => {
      if (!mapRef.current) return;
      const m = new google.maps.Map(mapRef.current, {
        center: { lat: 18.0735, lng: -15.9582 }, // Nouakchott
        zoom: 13,
        styles: [
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#a3ccff' }] },
          { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5e6d3' }] },
        ],
      });
      setMap(m);
    });
  }, []);

  useEffect(() => {
    if (!map) return;

    markers.forEach((m) => m.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    drivers.forEach((driver) => {
      const marker = new google.maps.Marker({
        position: driver.location,
        map,
        icon: carIcon,
        title: `${driver.carMark} - ${driver.name}`,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2 min-w-[180px]">
            <p class="font-bold text-chinguetti-mosque">${driver.carMark}</p>
            <p>${driver.name}</p>
            ${onCallDriver ? `<a href="tel:${driver.phone}" class="text-chinguetti-terracotta font-semibold block mt-2">${driver.phone}</a>` : ''}
          </div>
        `,
      });
      marker.addListener('click', () => infoWindow.open(map, marker));
      newMarkers.push(marker);
    });

    if (pickup) {
      const pickupMarker = new google.maps.Marker({
        position: pickup,
        map,
        label: { text: 'A', color: 'white' },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#22c55e',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
      });
      newMarkers.push(pickupMarker);
    }

    if (destination) {
      const destMarker = new google.maps.Marker({
        position: destination,
        map,
        label: { text: 'B', color: 'white' },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
      });
      newMarkers.push(destMarker);
    }

    setMarkers(newMarkers);

    const bounds = new google.maps.LatLngBounds();
    drivers.forEach((d) => bounds.extend(d.location));
    if (pickup) bounds.extend(pickup);
    if (destination) bounds.extend(destination);
    if (drivers.length > 0 || pickup || destination) {
      map.fitBounds(bounds, 50);
    }
  }, [map, drivers, pickup, destination]);

  return (
    <div
      ref={mapRef}
      style={{ height }}
      className="w-full rounded-xl overflow-hidden border-2 border-chinguetti-stone shadow-lg"
    />
  );
}

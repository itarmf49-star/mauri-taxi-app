'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { MapWithDrivers } from '@/components/MapWithDrivers';
import { useLanguage } from './providers/LanguageProvider';
import { calculateFare, PRICING } from '@moshwar/shared';
import { MAURITANIAN_STATES } from '@moshwar/shared';

// Mock drivers for demo
const MOCK_DRIVERS = [
  { id: '1', name: 'أحمد ولد محمد', phone: '+22212345678', carMark: 'تويوتا', location: { lat: 18.08, lng: -15.96 } },
  { id: '2', name: 'محمد ولد سيدي', phone: '+22223456789', carMark: 'نيسان', location: { lat: 18.07, lng: -15.95 } },
  { id: '3', name: 'عبد الله ولد الطالب', phone: '+22234567890', carMark: 'هيونداي', location: { lat: 18.06, lng: -15.97 } },
];

export default function CustomerPage() {
  const { t } = useLanguage();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [state, setState] = useState('');
  const [isOpenTrack, setIsOpenTrack] = useState(false);
  const [estimatedKm, setEstimatedKm] = useState(5);
  const [estimatedMin, setEstimatedMin] = useState(15);
  const [selectedDriver, setSelectedDriver] = useState<typeof MOCK_DRIVERS[0] | null>(null);

  const fare = calculateFare(estimatedKm, estimatedMin, isOpenTrack);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <section className="bg-white/90 rounded-xl p-4 shadow-lg mb-4 border border-chinguetti-sand">
          <h2 className="text-lg font-bold text-chinguetti-mosque mb-3">{t.bookRide}</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-chinguetti-stone mb-1">{t.pickupLocation}</label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="نواكشوط، الحي..."
                className="w-full px-3 py-2 rounded-lg border border-chinguetti-stone/50 focus:ring-2 focus:ring-chinguetti-terracotta"
              />
            </div>
            <div>
              <label className="block text-sm text-chinguetti-stone mb-1">{t.destination}</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="الوجهة..."
                className="w-full px-3 py-2 rounded-lg border border-chinguetti-stone/50 focus:ring-2 focus:ring-chinguetti-terracotta"
              />
            </div>
            <div>
              <label className="block text-sm text-chinguetti-stone mb-1">{t.selectState}</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-chinguetti-stone/50"
              >
                <option value="">{t.selectState}</option>
                {MAURITANIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isOpenTrack}
                onChange={(e) => setIsOpenTrack(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">{t.openTrack}</span>
            </label>
          </div>
        </section>

        <section className="mb-4">
          <MapWithDrivers
            drivers={MOCK_DRIVERS}
            pickup={pickup ? { lat: 18.0735, lng: -15.9582 } : undefined}
            destination={destination ? { lat: 18.08, lng: -15.95 } : undefined}
            onCallDriver={handleCall}
          />
        </section>

        <section className="bg-white/90 rounded-xl p-4 shadow-lg mb-4 border border-chinguetti-sand">
          <h2 className="text-lg font-bold text-chinguetti-mosque mb-3">{t.availableDrivers}</h2>
          <div className="space-y-2">
            {MOCK_DRIVERS.map((driver) => (
              <div
                key={driver.id}
                className="flex justify-between items-center p-3 rounded-lg bg-chinguetti-desert border border-chinguetti-sand"
              >
                <div>
                  <p className="font-bold text-chinguetti-mosque">{driver.carMark}</p>
                  <p className="text-sm text-chinguetti-stone">{driver.name}</p>
                </div>
                <a
                  href={`tel:${driver.phone}`}
                  className="px-4 py-2 bg-chinguetti-terracotta text-white rounded-lg hover:bg-chinguetti-mosque transition"
                >
                  {t.callDriver}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/90 rounded-xl p-4 shadow-lg border border-chinguetti-sand">
          <h2 className="text-lg font-bold text-chinguetti-mosque mb-3">{t.estimatedFare}</h2>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-sm">{t.distance} ({t.km})</label>
              <input
                type="number"
                value={estimatedKm}
                onChange={(e) => setEstimatedKm(Number(e.target.value))}
                min={0}
                step={0.5}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm">{t.duration} ({t.min})</label>
              <input
                type="number"
                value={estimatedMin}
                onChange={(e) => setEstimatedMin(Number(e.target.value))}
                min={0}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <p><span className="text-chinguetti-stone">حد أدنى:</span> {PRICING.MIN_TRIP_START} {t.mru}</p>
            <p><span className="text-chinguetti-stone">فرق المسافة:</span> {fare.distanceFare.toFixed(2)} {t.mru}</p>
            <p><span className="text-chinguetti-stone">فرق الوقت:</span> {fare.timeFare.toFixed(2)} {t.mru}</p>
            <p><span className="text-chinguetti-stone">رسوم التطبيق 7%:</span> {fare.appFee.toFixed(2)} {t.mru}</p>
          </div>
          <p className="text-xl font-bold text-chinguetti-mosque mt-2">
            الإجمالي: {fare.total.toFixed(2)} {t.mru}
          </p>
        </section>
      </main>
    </div>
  );
}

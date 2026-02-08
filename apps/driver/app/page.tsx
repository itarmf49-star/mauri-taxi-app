'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { useLanguage } from './providers/LanguageProvider';
import { PRICING } from '@moshwar/shared';

const MOCK_RIDES = [
  { id: '1', customerName: 'عمر ولد أحمد', customerPhone: '+22211111111', pickup: 'نواكشوط - تفرغ زينة', destination: 'المطار', distanceKm: 12, durationMin: 25, isOpenTrack: false, fare: 460 },
  { id: '2', customerName: 'خديجة بنت محمد', customerPhone: '+22222222222', pickup: 'نواكشوط - الرياض', destination: 'ولاية انشيري', distanceKm: 150, durationMin: 120, isOpenTrack: true, fare: 2640 },
];

export default function DriverPage() {
  const { t } = useLanguage();
  const [balance] = useState(1250);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 max-w-2xl mx-auto">
        <section className="bg-white/90 rounded-xl p-4 shadow-lg mb-4 border border-chinguetti-sand">
          <h2 className="text-lg font-bold text-chinguetti-mosque mb-2">{t.myBalance}</h2>
          <p className="text-2xl font-bold text-chinguetti-terracotta">{balance.toFixed(2)} {t.mru}</p>
          <p className="text-sm text-chinguetti-stone mt-2">{t.mauritanianBanking}</p>
          <button className="mt-2 px-4 py-2 bg-chinguetti-terracotta text-white rounded-lg hover:bg-chinguetti-mosque">
            {t.withdraw}
          </button>
        </section>

        <section className="bg-white/90 rounded-xl p-4 shadow-lg mb-4 border border-chinguetti-sand">
          <h2 className="text-lg font-bold text-chinguetti-mosque mb-3">{t.newRides}</h2>
          <div className="space-y-4">
            {MOCK_RIDES.map((ride) => (
              <div key={ride.id} className="p-4 rounded-lg bg-chinguetti-desert border border-chinguetti-sand">
                <div className="flex justify-between mb-2">
                  <p className="font-bold">{ride.customerName}</p>
                  <a href={`tel:${ride.customerPhone}`} className="text-chinguetti-terracotta font-semibold">
                    {t.callCustomer}
                  </a>
                </div>
                <p className="text-sm"><span className="text-chinguetti-stone">{t.pickupLocation}:</span> {ride.pickup}</p>
                <p className="text-sm"><span className="text-chinguetti-stone">{t.destination}:</span> {ride.destination}</p>
                <p className="text-sm">{ride.distanceKm} {t.km} • {ride.durationMin} {t.min}</p>
                <p className="text-lg font-bold text-chinguetti-mosque mt-2">{ride.fare} {t.mru}</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 bg-green-600 text-white rounded-lg">{t.acceptRide}</button>
                  <button className="flex-1 py-2 bg-red-600 text-white rounded-lg">{t.rejectRide}</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/90 rounded-xl p-4 shadow-lg border border-chinguetti-sand">
          <h2 className="text-lg font-bold text-chinguetti-mosque mb-2">شنقيط - {t.price}</h2>
          <div className="text-sm space-y-1 text-chinguetti-stone">
            <p>ك/كم: {PRICING.PER_KM} {t.mru}</p>
            <p>ك/دقيقة: {PRICING.PER_MINUTE} {t.mru}</p>
            <p>مسار مفتوح ك/كم: {PRICING.OPEN_TRACK_PER_KM} {t.mru}</p>
            <p>مسار مفتوح ك/دقيقة: {PRICING.OPEN_TRACK_PER_MINUTE} {t.mru}</p>
            <p>حد أدنى: {PRICING.MIN_TRIP_START} {t.mru}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

'use client';

import { Header } from '@/components/Header';
import { AdminMap } from '@/components/AdminMap';
import { useLanguage } from '../providers/LanguageProvider';

const MOCK_RIDES = [
  { id: '1', customerName: 'عمر ولد أحمد', pickup: { lat: 18.0735, lng: -15.9582 }, destination: { lat: 18.09, lng: -15.95 }, status: 'pending', fare: 460 },
  { id: '2', customerName: 'خديجة بنت محمد', pickup: { lat: 18.07, lng: -15.96 }, destination: { lat: 18.12, lng: -15.94 }, status: 'in_progress', fare: 1200 },
];

const MOCK_DRIVERS = [
  { id: '1', name: 'أحمد', carMark: 'تويوتا', location: { lat: 18.08, lng: -15.96 } },
  { id: '2', name: 'محمد', carMark: 'نيسان', location: { lat: 18.06, lng: -15.97 } },
];

export default function RidesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-chinguetti-mosque mb-4">{t.allRides}</h1>
        <AdminMap rides={MOCK_RIDES} drivers={MOCK_DRIVERS} height="300px" />
        <div className="mt-4 bg-white/90 rounded-xl p-4 shadow-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-chinguetti-stone">
                <th className="text-right py-2">الرحلة</th>
                <th className="text-right py-2">العميل</th>
                <th className="text-right py-2">{t.rideStatus}</th>
                <th className="text-right py-2">{t.price}</th>
                <th className="text-right py-2">{t.assignDriver}</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RIDES.map((ride) => (
                <tr key={ride.id} className="border-b border-chinguetti-sand">
                  <td className="py-2">{ride.id}</td>
                  <td className="py-2">{ride.customerName}</td>
                  <td className="py-2">{ride.status}</td>
                  <td className="py-2">{ride.fare} {t.mru}</td>
                  <td className="py-2">
                    <select className="rounded border border-chinguetti-stone/50 px-2 py-1">
                      <option value="">{t.assignDriver}</option>
                      {MOCK_DRIVERS.map((d) => (
                        <option key={d.id} value={d.id}>{d.carMark} - {d.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

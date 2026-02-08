'use client';

import { Header } from '@/components/Header';
import { useLanguage } from '../providers/LanguageProvider';

const MOCK_DRIVERS = [
  { id: '1', name: 'أحمد ولد محمد', phone: '+22212345678', carMark: 'تويوتا', plate: 'ن و ك 1234', isAvailable: true, balance: 1250 },
  { id: '2', name: 'محمد ولد سيدي', phone: '+22223456789', carMark: 'نيسان', plate: 'ن و ك 5678', isAvailable: false, balance: 800 },
];

export default function DriversPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-chinguetti-mosque mb-4">{t.manageDrivers}</h1>
        <div className="bg-white/90 rounded-xl p-4 shadow-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-chinguetti-stone">
                <th className="text-right py-2">السائق</th>
                <th className="text-right py-2">{t.carMark}</th>
                <th className="text-right py-2">اللوحة</th>
                <th className="text-right py-2">الحالة</th>
                <th className="text-right py-2">{t.myBalance}</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DRIVERS.map((d) => (
                <tr key={d.id} className="border-b border-chinguetti-sand">
                  <td className="py-2">{d.name}</td>
                  <td className="py-2">{d.carMark}</td>
                  <td className="py-2">{d.plate}</td>
                  <td className="py-2">{d.isAvailable ? 'متاح' : 'مشغول'}</td>
                  <td className="py-2">{d.balance} {t.mru}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

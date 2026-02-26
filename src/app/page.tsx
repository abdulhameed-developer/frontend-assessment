// File: src/app/page.tsx
import { Header } from '@/components/layout/Header';
import { DashboardContainer } from '@/components/dashboard/DashboardContainer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DashboardContainer />
    {/* </body> */}
    </div>
  );
}
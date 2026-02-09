import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard-layout';

export function DashboardPage() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

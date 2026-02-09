import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientesPage } from './pages/clientes-page';
import { ProdutosPage } from './pages/produtos-page';
import { ContratosPage } from './pages/contratos-page';
import { ProtectedRoute } from './components/protected-route';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="clientes" replace />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="produtos" element={<ProdutosPage />} />
        <Route path="contratos" element={<ContratosPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

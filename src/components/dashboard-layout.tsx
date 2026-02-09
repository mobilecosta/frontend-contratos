import type { PropsWithChildren } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth-context';

export function DashboardLayout({ children }: PropsWithChildren) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand">
          Gestão de Contratos
        </Link>
        <nav>
          <NavLink to="/clientes">Clientes</NavLink>
          <NavLink to="/produtos">Produtos</NavLink>
          <NavLink to="/contratos">Contratos</NavLink>
        </nav>
        <button onClick={handleLogout} className="secondary">
          Sair
        </button>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}

import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page.component';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.component';
import { ClientesPage } from './pages/clientes-page/clientes-page.component';
import { ProdutosPage } from './pages/produtos-page/produtos-page.component';
import { ContratosPage } from './pages/contratos-page/contratos-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: '',
    canActivate: [authGuard],
    component: DashboardPage,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      { path: 'clientes', component: ClientesPage },
      { path: 'produtos', component: ProdutosPage },
      { path: 'contratos', component: ContratosPage }
    ]
  },
  { path: '**', redirectTo: '' }
];

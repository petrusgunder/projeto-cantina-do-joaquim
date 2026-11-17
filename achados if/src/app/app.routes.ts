import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { AuthService } from './services/authService';

const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = await auth.esperarUsuario();
  return user ? true : router.createUrlTree(['/login']);
};

const guestGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = await auth.esperarUsuario();
  return user ? router.createUrlTree(['/tabs/cardapio']) : true;
};

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'cadastro',
    canActivate: [guestGuard],
    loadComponent: () => import('./cadastro/cadastro.page').then(m => m.CadastroPage),
  },
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'cardapio',
        loadComponent: () => import('./cardapio/cardapio.page').then(m => m.CardapioPage),
      },
      {
        path: 'comanda',
        loadComponent: () => import('./comanda/comanda.page').then(m => m.ComandaPage),
      },
      {
        path: '',
        redirectTo: 'cardapio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'pagamento',
    canActivate: [authGuard],
    loadComponent: () => import('./pagamento/pagamento.page').then(m => m.PagamentoPage),
  },
  {
    path: '',
    redirectTo: 'tabs/cardapio',
    pathMatch: 'full',
  },
];
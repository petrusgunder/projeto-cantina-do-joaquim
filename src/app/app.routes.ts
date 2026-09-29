import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then(m => m.CadastroPage),
  },
  {
    path: 'tabs',
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
    loadComponent: () => import('./pagamento/pagamento.page').then(m => m.PagamentoPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

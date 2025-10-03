import { Routes } from '@angular/router';
import { Home } from './pages/user/home/home';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Profile } from './pages/user/profile/profile';
import { Collection } from './pages/user/collection/collection';
import { DetailGame } from './pages/user/detail-game/detail-game';

import { ShoppingCart } from './pages/user/shopping-cart/shopping-cart';
import { AddMonny } from './pages/user/history/add-monny/add-monny';
import { BuyGram } from './pages/user/history/buy-gram/buy-gram';
import { HomeAdmin } from './pages/admin/home-admin/home-admin';
import { Add } from './pages/admin/home-admin/add/add';
import { Edit } from './pages/admin/home-admin/edit/edit';
import { Delete } from './pages/admin/home-admin/delete/delete';
import { ProfileAdmin } from './pages/admin/profile-admin/profile-admin';
import { Wallet } from './pages/user/wallet/wallet';
import { CallApi } from './pages/call-api/call-api';

export const routes: Routes = [
  // User-path
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'collection', component: Collection },
  { path: 'detail-game', component: DetailGame },
  { path: 'wallet', component: Wallet },
  { path: 'shopping', component: ShoppingCart },
  {
    path: 'history',
    children: [
      { path: 'add-monney', component: AddMonny },
      { path: 'buy-gram', component: BuyGram },
    ],
  },
  // admin-path
  {
    path: 'home-admin',
    component: HomeAdmin,
    children: [
      { path: 'add', component: Add },
      { path: 'edit', component: Edit },
      { path: 'delete', component: Delete },
    ],
  },
  { path: 'profile-admin', component: ProfileAdmin },
  {path: 'call-api', component: CallApi},
];

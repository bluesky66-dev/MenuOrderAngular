import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import {CardListComponent} from './pages/card-list/card-list.component';
import {MyOrderComponent} from './pages/my-order/my-order.component';
import {OrdersAllComponent} from './pages/orders-all/orders-all.component';
import {AddVendorComponent} from './pages/add-vendor/add-vendor.component';
import {VendorListComponent} from './pages/vendor-list/vendor-list.component';
import {AddItemComponent} from './pages/add-item/add-item.component';
import {ItemListComponent} from './pages/item-list/item-list.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'card-list', component: CardListComponent },
  { path: 'my-order', component: MyOrderComponent },
  { path: 'orders-all', component: OrdersAllComponent },
  { path: 'add-vendor', component: AddVendorComponent },
  { path: 'vendor-list', component: VendorListComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

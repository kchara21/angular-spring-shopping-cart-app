import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  {
    path: 'administration',
    loadChildren: () =>
      import('./administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./my-cart/my-cart.module').then((m) => m.MyCartModule),
  },
  {
    path: 'sales',
    loadChildren: () => import('./sale/sale.module').then((m) => m.SaleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}

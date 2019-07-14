import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CanDeactivateGuard } from './shared/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {breadcrumb: 'home'}
  },
  {
    path: 'pizza',
    loadChildren: './pizza/pizza.module#PizzaModule'    
  },
  {
    path: 'order',
    loadChildren: './order/order.module#OrderModule'
  },
  {
    path: 'customize',
    loadChildren: './customize/customize.module#CustomizeModule'
  },
  {
    path: 'chicken',
    loadChildren: './chicken/chicken.module#ChickenModule'
  },
  {
    path: 'chicken-customizer',
    loadChildren: './chicken-customizer/chicken-customizer.module#ChickenCustomizerModule'
  },
  {
    path: 'salads',
    loadChildren: './salads/salads.module#SaladsModule'
  },
  {
    path: 'salad-customizer',
    loadChildren: './salad-customizer/salad-customizer.module#SaladCustomizerModule'
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  },
  {
    path: 'product-customizer',
    loadChildren: './product-customizer/product-customizer.module#ProductCustomizerModule'
  },
  {
    path: 'list-orders',
    loadChildren: './list-order/list-order.module#ListOrderModule'
  },
  {
    path: 'display-order',
    loadChildren: './display-order/display-order.module#DisplayOrderModule'
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ 
    CanDeactivateGuard
  ]
})
export class AppRoutingModule { }

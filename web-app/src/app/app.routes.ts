import { Routes } from '@angular/router';

import { BillListComponent } from './bills/bill-list/bill-list';
import { CustomerListComponent } from './customers/customer-list/customer-list';
import { ProductListComponent } from './products/product-list/product-list';
import { BillDetailsComponent } from './bills/bill-details/bill-details';

export const routes: Routes = [

  {
    path: 'bills',
    component: BillListComponent
  },

  {
    path: 'bills/:id',
    component: BillDetailsComponent
  },

  {
    path: 'customers',
    component: CustomerListComponent
  },

  {
    path: 'products',
    component: ProductListComponent
  },

  {
    path: '',
    redirectTo: 'bills',
    pathMatch: 'full'
  }

];
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'signup', component: CustomerComponent}
    ])
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

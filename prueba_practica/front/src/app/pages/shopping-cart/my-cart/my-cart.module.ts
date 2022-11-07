import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCartRoutingModule } from './my-cart-routing.module';
import { MyCartComponent } from './my-cart.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalMyCartComponent } from './modal-my-cart/modal-my-cart.component';

@NgModule({
  declarations: [MyCartComponent, ModalMyCartComponent],
  imports: [
    CommonModule,
    MyCartRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class MyCartModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';
import { MaterialModule } from '../../../material/material.module';

@NgModule({
  declarations: [SaleComponent],
  imports: [CommonModule, SaleRoutingModule, MaterialModule],
})
export class SaleModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalAdministrationComponent } from './modal-administration/modal-administration.component';

@NgModule({
  declarations: [AdministrationComponent, ModalAdministrationComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AdministrationModule {}

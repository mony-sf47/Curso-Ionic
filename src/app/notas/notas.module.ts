import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NotasItemsPage } from './notas-items/notas-items.page';
import { NotaItemComponent } from './notas-items/nota-item/nota-item.component';
import { NotasDetailPage } from './notas-detail/notas-detail.page';

@NgModule({
  declarations: [
    NotasItemsPage,
    NotaItemComponent,
    NotasDetailPage
  ],
  imports: [
    CommonModule,
    NotasRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder
  ]
})
export class NotasModule { }

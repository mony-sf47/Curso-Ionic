import { CatalogDetailPage } from './catalog-detail/catalog-detail.page';
import { CatalogItemComponent } from './catalog-items/catalog-item/catalog-item.component';
import { CatalogService } from './catalog.service';
import { CatalogItemsPage } from './catalog-items/catalog-items.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CatalogItemsPage,
    CatalogItemComponent,
    CatalogDetailPage
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [
    CatalogService,
    FormBuilder
  ]
})
export class CatalogModule { }

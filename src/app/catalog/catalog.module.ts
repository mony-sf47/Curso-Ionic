import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CatalogRoutingModule } from "./catalog-routing.module";
import { IonicModule } from "@ionic/angular";

import { CatalogItemsPage } from "./catalog-items/catalog-items.page";
import { CatalogItemComponent } from "./catalog-items/catalog-item/catalog-item.component";

import { CatalogService } from "./catalog.service";
import { ReactiveFormsModule } from "@angular/forms";
import { CatalogDetailPage } from "./catalog-detail/catalog-detail.page";

@NgModule({
  declarations: [CatalogItemsPage, CatalogItemComponent, CatalogDetailPage],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [CatalogService]
})
export class CatalogModule {}

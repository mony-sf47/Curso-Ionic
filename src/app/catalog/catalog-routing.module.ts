import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CatalogItemsPage } from "./catalog-items/catalog-items.page";
import { CatalogDetailPage } from "./catalog-detail/catalog-detail.page";
import { CatalogItemsResolver } from "./catalog.resolver";

const routes: Routes = [
  {
    path: "catalog",
    component: CatalogItemsPage
    //runGuardsAndResolvers: "always",
    //resolve: { data: CatalogItemsResolver }
  },
  { path: "catalog/:id", component: CatalogDetailPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {}

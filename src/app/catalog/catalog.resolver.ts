import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { CatalogService } from "./catalog.service";
import { CatalogData } from "./types";
import { LoadingController } from "@ionic/angular";
import { tap } from "rxjs/operators";

@Injectable()
export class CatalogItemsResolver implements Resolve<CatalogData> {
  loading: any;

  constructor(
    private catalogService: CatalogService,
    private loadingController: LoadingController
  ) {}

  resolve() {
    this.presentLoading();

    return this.catalogService.getCatalogItems().pipe(
      tap(ev => {
        this.loadingController.dismiss();
      })
    );
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please wait...",
      duration: 1000
    });
    return await this.loading.present();
  }
}

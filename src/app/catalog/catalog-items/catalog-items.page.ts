import { Component, OnInit } from "@angular/core";
import { CatalogItem } from "../types";
import { CatalogService } from "../catalog.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-catalog-items",
  templateUrl: "./catalog-items.page.html",
  styleUrls: ["./catalog-items.page.scss"]
})
export class CatalogItemsPage implements OnInit {
  items: CatalogItem[] = [];

  constructor(
    private catalogService: CatalogService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    this.catalogService.getCatalogItems().subscribe(
      res => {
        console.log(res);
        this.items = res.data;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
}

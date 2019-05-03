import { LoadingController } from '@ionic/angular';
import { CatalogService } from '../catalog.service';
import { CatalogItem } from '../type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-items',
  templateUrl: './catalog-items.page.html',
  styleUrls: ['./catalog-items.page.scss'],
})
export class CatalogItemsPage implements OnInit {
  items: CatalogItem[] = [];

  constructor(
    private catalogService: CatalogService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getCatalogItems();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getCatalogItems() {
    this.catalogService.getCatalogItems().subscribe(
      data => (this.items = data.data),
      err => console.log(err)
    );
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading'
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

import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NotaItem } from '../type';
import { NotasService } from 'src/app/services/notas.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-notas-items',
  templateUrl: './notas-items.page.html',
  styleUrls: ['./notas-items.page.scss'],
})
export class NotasItemsPage implements OnInit {

  items: NotaItem[] = [];

  constructor(
    private notaService: NotasService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.consultarNotas();
  }

  ionViewWillEnter() {
    this.getData();
  }

  consultarNotas() {
    this.notaService.consultarNotas().subscribe(
      data => {
        this.items = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.notaService.consultarNotas().subscribe(
      data => {
        this.items = data;
        loading.dismiss();
      },
      error => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

}

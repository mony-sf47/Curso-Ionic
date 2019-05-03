import { Params, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController, LoadingController, ActionSheetController, Platform, IonDatetime } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notas-detail',
  templateUrl: './notas-detail.page.html',
  styleUrls: ['./notas-detail.page.scss'],
})
export class NotasDetailPage implements OnInit {

  params: Params;
  form: FormGroup;
  
  accion: string;
  isLabelActive: Boolean = false;
  eliminar: Boolean;

  SubmitAction: () => void;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController,
    private notaService: NotasService
  ) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
    const id = this.route.snapshot.paramMap.get('id');

    if(id === 'add') {
      this.accion = 'Agregar Nota';
      this.eliminar = false;
      this.SubmitAction = () => {
        this.sendData(
          this.notaService.agregarNota(this.form.value),
          'Cargando...',
          'Nota agregada exitosamente',
          '/notas',
          'Error al agregar la nota'
        );
      };
    } else if(id !== null && id.toString() !== '') {
      this.getData(id);
      this.accion = 'Editar Nota';
      this.eliminar = true;
      this.SubmitAction = () => {
        this.sendData(
          this.notaService.editarNota(id, this.form.value),
          'Cargando...',
          'Nota actualizada exitosamente',
          '/notas',
          'Error al actualizar la nota'
        );
      };
    }

    this.form = this.formBuilder.group({
      Id: new FormControl(' '),
      Titulo: new FormControl('', Validators.required),
      Contenido: new FormControl('', [Validators.required, Validators.maxLength(180)]),
      FechaCreacion: new FormControl(new Date())
    });
  }

  toggleIcon(event) {
    this.isLabelActive = !this.isLabelActive;
  }

  async getData(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.notaService.consultarNota(id).subscribe(
      data => {
        this.form.patchValue({
          Id: id,
          Titulo: data.Titulo,
          Contenido: data.Contenido,
        });
        loading.dismiss();
      },
      error => {
        loading.dismiss();
      }
    );
  }

  async sendData(dataObservable: Observable<any>, loadingMessage: string, 
    successMessage: string, redirectRoute: string, 
    failureMessage: string) {
      const loading = await this.loadingController.create({
        message: loadingMessage
      });
      await loading.present();
      dataObservable.subscribe(
        data => {
          this.presentToast(successMessage);
          this.router.navigateByUrl(redirectRoute);
          loading.dismiss();
        },
        error => {
          this.presentToast(failureMessage);
          loading.dismiss();
        }
      );
  }

  eliminarNota(id: string) {
    this.notaService.eliminarNota(id).subscribe(
      data => {
        this.presentToast('Nota eliminada exitosamente');
        this.router.navigateByUrl('/notas');
      },
      error => {
        this.presentToast('Error al eliminar la nota');
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async onSubmit() {
    this.SubmitAction();
  }

}

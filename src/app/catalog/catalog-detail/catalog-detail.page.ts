import { CatalogType, CatalogBrand, CatalogItem, Image } from './../type';
import { CatalogService } from '../catalog.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, LoadingController, ActionSheetController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.page.html',
  styleUrls: ['./catalog-detail.page.scss'],
})
export class CatalogDetailPage implements OnInit {
  params: Params;
  form: FormGroup;

  title: string;

  types: CatalogType[];
  brands: CatalogBrand[];

  SubmitAction: () => void;

  img: Image = {
    name: '',
    path: '',
    filePath: ''
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController,
    private catalogService: CatalogService,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private ref: ChangeDetectorRef,
    private filePath: FilePath) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;

    this.getCatalogTypes();
    this.getCatalogBrands();

    const id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.getData(id);
      this.title = 'Update Item';
      this.SubmitAction = () => {
        this.sendData(
          this.catalogService.updateProduct(this.form.value),
          'Loading...',
          'Item sucessfully updated',
          '/catalog',
          'Error updating item'
        );
      };
    } else {
      this.title = 'Add Item';
      this.SubmitAction = () => {
        this.sendData(
          this.catalogService.addProduct(
            this.form.value,
            this.img.blob,
            this.img.name
          ),
          'Loading...',
          'Item sucessfully added',
          '/catalog',
          'Error adding item'
        );
      };
    }

    this.form = this.formBuilder.group({
      Id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Price: new FormControl('', [Validators.required, Validators.min(0)]),
      CatalogBrandId: new FormControl(this.brands, Validators.required),
      CatalogTypeId: new FormControl(this.types, Validators.required),
      PictureFileName: new FormControl('1.png')
    });
  }

  getCatalogTypes() {
    this.catalogService.getCatalogTypes().subscribe(
      data => (this.types = data),
      err => console.log(err)
    );
  }

  getCatalogBrands() {
    this.catalogService.getCatalogBrands().subscribe(
      data => (this.brands = data),
      err => console.log(err)
    );
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android')
        && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
      ) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(
            imagePath.lastIndexOf('/') + 1,
            imagePath.lastIndexOf('?')
          );
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(
          correctPath,
          currentName,
          this.createFileName()
        );
      }
    });
  }

  createFileName() {
    let d = new Date(),
        n = d.getTime(),
        newFileName = n + '.jpg';
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        success => {
          this.updateStoredImage(newFileName);
        },
        error => {
          this.presentToast('Error while storing file');
        }
      );
  }

  updateStoredImage(name) {
    let filePath = this.file.dataDirectory + name;
    let resPath = this.pathForImage(filePath);
    this.img = {
      name: name,
      path: resPath,
      filePath: filePath
    };
    this.ref.detectChanges();
  }

  deleteImage(imgEntry) {
    let correctPath = imgEntry.filePath.substr(
      0, imgEntry.filePath.lastIndexOf('/') + 1);
    this.file.removeFile(correctPath, imgEntry.name).then(
      res => {
        this.presentToast('File removed.');
        this.img = {
          name: '',
          path: '',
          filePath: ''
        }
      }
    );
  }

  readFile(file: any): Promise<Blob> {
    const reader = new FileReader();

    return new Promise(
      (resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(new DOMException('Problem parsing input file.'));
        };

        reader.onloadend = () => {
          const imgBlob = new Blob([reader.result], { type: file.type });
          resolve(imgBlob);
        };

        reader.readAsArrayBuffer(file);
      }
    );
  }

  async onSubmit() {
    if (this.img.name !== '') {
      await this.startUpload(this.img);
    }
    this.SubmitAction();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async sendData(dataObservable: Observable<any>, loadingMessage: string,
    successMessage: string, redirectRoute: string, failureMessage: string) {
      const loading = await this.loadingController.create({
        message: loadingMessage
      });
      await loading.present();
      dataObservable.subscribe(
        () => {
          this.presentToast(successMessage);
          this.router.navigateByUrl(redirectRoute);
          loading.dismiss();
        },
        err => {
          this.presentToast(failureMessage);
          console.log(err);
          loading.dismiss();
        }
      );
  }

  async getData(id: string) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.catalogService.getCatalogItem(id).subscribe(
      data => {
        this.form.patchValue({
          Id: id,
          Name: data.name,
          Description: data.description,
          Price: data.price,
          CatalogBrandId: data.catalogBrandId,
          CatalogTypeId: data.catalogTypeId,
          PictureFileName: data.PictureFileName
        });
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async getFile(fileEntry) {
    try {
      return await new Promise(
        (resolve, reject) => {
          return fileEntry.file(resolve, reject);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async startUpload(imgEntry: Image) {
    const entry = await this.file.resolveLocalFilesystemUrl(
      imgEntry.filePath);
    const file = await this.getFile(entry);
    this.img.blob = await this.readFile(file);
  }

}

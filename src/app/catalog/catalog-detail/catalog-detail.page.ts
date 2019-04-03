import { Component, OnInit } from "@angular/core";
import { CatalogService } from "../catalog.service";
import { CatalogBrand, CatalogType } from "../types";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { ToastController, LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-catalog-detail",
  templateUrl: "./catalog-detail.page.html",
  styleUrls: ["./catalog-detail.page.scss"]
})
export class CatalogDetailPage implements OnInit {
  types: CatalogType[];
  brands: CatalogBrand[];

  form: FormGroup;

  Title: string;
  SubmitAction: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private service: CatalogService,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.service
      .getCatalogTypes()
      .subscribe(data => (this.types = data), err => console.log(err));

    this.service
      .getCatalogBrands()
      .subscribe(data => (this.brands = data), err => console.log(err));

    this.form = this.formBuilder.group({
      Id: new FormControl(""),
      Name: new FormControl("", Validators.required),
      Description: new FormControl("", Validators.required),
      Price: new FormControl("", [Validators.required, Validators.min(0)]),
      CatalogBrandId: new FormControl(this.brands, Validators.required),
      CatalogTypeId: new FormControl(this.types, Validators.required),
      PictureFileName: new FormControl("1.png")
    });

    const id = this.route.snapshot.paramMap.get("id");
    if (!isNaN(Number(id))) {
      this.getData(id);
      this.Title = "Update Item";
      this.SubmitAction = () =>
        this.sendData(
          this.service.updateProduct(this.form.value),
          "Loading...",
          "Item sucessfully updated",
          "/catalog",
          "Error updating item"
        );
    } else {
      this.Title = "Add Item";
      this.SubmitAction = () =>
        this.sendData(
          this.service.addProduct(this.form.value),
          "Loading...",
          "Item sucessfully added",
          "/catalog",
          "Error adding item"
        );
    }
  }

  async getData(id: string) {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    this.service.getCatalogItem(id).subscribe(
      data => {
        console.log(data);
        this.form.patchValue({
          Id: id,
          Name: data.name,
          Description: data.description,
          Price: data.price,
          CatalogBrandId: data.catalogBrandId,
          CatalogTypeId: data.catalogTypeId,
          PictureFileName: data.pictureFileName
        });
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  onSubmit() {
    this.SubmitAction();
  }

  async sendData(
    dataObservable: Observable<any>,
    loadingMessage: string,
    successMessage: string,
    redirectRoute: string,
    failureMessage: string
  ) {
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
        console.error(err);
        loading.dismiss();
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
}

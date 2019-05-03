import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotasItemsPage } from './notas-items/notas-items.page';
import { NotasDetailPage } from './notas-detail/notas-detail.page';

const routes: Routes = [
  { path: "notas", component: NotasItemsPage, canActivate: [AuthGuard] },
  { path: "notas/:id", component: NotasDetailPage, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasRoutingModule { }

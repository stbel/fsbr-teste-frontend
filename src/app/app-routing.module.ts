import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessoGridComponent } from './cadastro/processo-grid/processo-grid.component';
import { ProcessoFormComponent } from './cadastro/processo-form/processo-form.component';
import { ProcessoViewComponent } from './cadastro/processo-view/processo-view.component';

const routes: Routes = [
  {path: 'processos', component: ProcessoGridComponent},
  {path: 'processos/:processoId/editar', component: ProcessoFormComponent},
  {path: 'processos/:processoId/visualizar', component: ProcessoViewComponent},
  {path: '**', redirectTo: 'processos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

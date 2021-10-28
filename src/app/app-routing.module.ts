import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewEmployeeComponent} from "./components/view-employee/view-employee.component";

const routes: Routes = [
  {
    path: '',
    component: ViewEmployeeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

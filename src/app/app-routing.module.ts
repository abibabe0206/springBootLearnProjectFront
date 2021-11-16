import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from "./components/employees/employee.component";
import {AddAndModifyEmployeesComponent} from "./components/addAnd-modify-employees/addAnd-modify-employees.component";

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'employee/addEmployee',
    component: AddAndModifyEmployeesComponent
  },
  {
    path: 'employee/editEmployee/:id',
    component: AddAndModifyEmployeesComponent
  },

  // otherwise redirect to list of employees
  { path: '**', redirectTo: 'employee' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

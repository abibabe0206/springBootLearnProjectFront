import { Component, OnInit } from '@angular/core';
import {Employees} from "../../model/employees";
import {EmployeeService} from "../../services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  public emp: any;
  public employees: Employees[] = [];
  public editEmployee: Employees | undefined;
  public deleteEmployee: any;

  constructor(
    private employeesService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees() {
    this.employeesService.getEmployees()
      .subscribe(
        (resp: Employees[]) => {
          this.employees = resp;
          console.log(this.employees);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
  }

  public onAddEmployee(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeesService.createEmployee(addForm.value).subscribe(
      (response: Employees) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employees): void {
    this.employeesService.updateEmployee(employee).subscribe(
      (response: Employees) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeesService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employees[] = [];
    // @ts-ignore
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employees, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-addAnd-modify-employees',
  templateUrl: './addAnd-modify-employees.component.html',
  styleUrls: ['./addAnd-modify-employees.component.css']
})
export class AddAndModifyEmployeesComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  id: string;
  // @ts-ignore
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeServices: EmployeeService
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;


    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      jobTitle: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.employeeServices.getEmployeeById(this.id)
        .pipe(first())
        .subscribe(employee =>this.form.patchValue(employee));
    }

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createEmployee();
    } else {
      this.updateEmployee();
    }

  }

  private createEmployee() {
    this.employeeServices.createEmployee(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: error => {
          alert(error.message);
          this.loading = false;
          this.form.reset();
        }
      })
  }

  private updateEmployee() {
    this.employeeServices.updateEmployee(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: error => {
          alert(error.message);
          this.loading = false;
          this.form.reset();
        }
      })
  }

}

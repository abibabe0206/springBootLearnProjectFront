import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {empty, Observable} from "rxjs";
import {Employees} from "../model/employees";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(
    @Inject('BASE_URL') private url: string,
    private http: HttpClient,
    private router: Router
    ) { }


  /**
   * Get All Employees
   */
  public getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(`${this.url}`);
  }

  /**
   * Create a new employee
   */
  public createEmployee(employeesInfo: Employees): Observable<Employees> {
    if (employeesInfo) {
      return this.http.post<Employees>(`${this.url}`, employeesInfo);
    } else {
      return empty();
    }
  }

  /**
   * update an employee
   */
  public updateEmployee(employeesInfo: Employees): Observable<Employees> {
    if (employeesInfo) {
      return this.http.put<Employees>(`${this.url}/update`, employeesInfo);
    } else {
      return empty();
    }
  }

  /**
   * Deleting an employee
   */
  public deleteEmployee(employeesId: number): Observable<void>  {
    if (employeesId) {
      return this.http.delete<void>(`${this.url}/${employeesId}`);
    } else {
      return empty();
    }
  }


}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndModifyEmployeesComponent } from '../components/addAnd-modify-employees/addAnd-modify-employees.component';

describe('AddAndModifyEmployeesComponent', () => {
  let component: AddAndModifyEmployeesComponent;
  let fixture: ComponentFixture<AddAndModifyEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAndModifyEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAndModifyEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

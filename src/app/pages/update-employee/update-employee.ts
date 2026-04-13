import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphqlService } from '../../services/graphql';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-employee.html'
})
export class UpdateEmployeeComponent implements OnInit {

  private fb = inject(FormBuilder);
  private gql = inject(GraphqlService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  id: string = '';
  employee: any;

  form = this.fb.group({
    designation: [''],
    salary: ['']
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.gql.getEmployeeById(this.id).subscribe((res: any) => {

      console.log("UPDATE DATA:", res);

      this.employee = res?.data?.searchEmployeeByEid?.employee;

      if (this.employee) {
        this.form.patchValue({
          designation: this.employee.designation,
          salary: this.employee.salary
        });

        this.cdr.detectChanges();
      }
    });
  }

  update() {
    const data: any = {};

    if (this.form.value.designation) {
      data.designation = this.form.value.designation;
    }

    if (this.form.value.salary) {
      data.salary = Number(this.form.value.salary);
    }

    this.gql.updateEmployee(this.id, data).subscribe((res: any) => {
      if (res.data.updateEmployeeByEid.success) {
        this.router.navigate(['/employees']);
      }
    });
  }
}
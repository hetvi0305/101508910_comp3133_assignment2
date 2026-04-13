import { Component, inject, OnInit } from '@angular/core';
import { GraphqlService } from '../../services/graphql';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-employees',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employees.html'
})
export class EmployeesComponent implements OnInit {

  private gql = inject(GraphqlService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  employees: any[] = [];
  searchTerm: string = '';

  load() {
  this.gql.getEmployees().subscribe((res: any) => {

    console.log("DATA:", res);

    this.employees = res?.data?.getAllEmployees?.employees || [];

    this.cdr.detectChanges();
  });
}

  ngOnInit() {
  this.load();
}

  loadEmployees() {
    this.gql.getEmployees().subscribe((res: any) => {
      this.employees = res.data.getAllEmployees.employees;
    });
  }

  search() {
  console.log("SEARCH TERM:", this.searchTerm);

  this.gql.searchEmployees(this.searchTerm).subscribe((res: any) => {
    console.log("SEARCH RESPONSE:", res);

    this.employees =
      res?.data?.searchEmployeeByDesignationOrDepartment?.employees || [];

    console.log("RESULT:", this.employees);

    this.cdr.detectChanges();
  });
}
  
  delete(id: string) {
    this.gql.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
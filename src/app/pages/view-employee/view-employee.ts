import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { GraphqlService } from '../../services/graphql';
import { CommonModule } from '@angular/common';
import { gql } from 'apollo-angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-employee.html'
})
export class ViewEmployeeComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private gqlService = inject(GraphqlService);
  private cdr = inject(ChangeDetectorRef);

  employee: any;

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  this.gqlService.getEmployeeById(id!).subscribe((res: any) => {

    console.log("VIEW RESPONSE:", res);

    this.employee =
      res?.data?.searchEmployeeByEid?.employee || null;

    console.log("EMPLOYEE:", this.employee);

    this.cdr.detectChanges();
  });
}
}
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.html'
})
export class AddEmployeeComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  selectedFile: File | null = null;

  form = this.fb.group({
    first_name: [''],
    last_name: [''],
    email: [''],
    gender: ['Male'],
    designation: [''],
    salary: [''],
    date_of_joining: [''],
    department: ['']
  });

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  add() {
    const formData = new FormData();

    const operations = {
      query: `
        mutation($file: Upload!) {
          addEmployee(
            first_name: "${this.form.value.first_name}"
            last_name: "${this.form.value.last_name}"
            email: "${this.form.value.email}"
            gender: "${this.form.value.gender}"
            designation: "${this.form.value.designation}"
            salary: ${Number(this.form.value.salary)}
            date_of_joining: "${this.form.value.date_of_joining}"
            department: "${this.form.value.department}"
            employee_photo: $file
          ) {
            success
            message
            employee {
              employee_photo
            }
          }
        }
      `,
      variables: {
        file: null
      }
    };

    const map = {
      "0": ["variables.file"]
    };

    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify(map));

    if (this.selectedFile) {
      formData.append('0', this.selectedFile);
    }

    this.http.post('http://localhost:4000/graphql', formData, {
      headers: {
        'apollo-require-preflight': 'true'
      }
    }).subscribe((res: any) => {
      console.log(res);

      if (res.data.addEmployee.success) {
        this.router.navigate(['/employees']).then(() => {
        window.location.reload();
      });
      }
    });
  }
}
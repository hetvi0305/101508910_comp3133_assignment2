import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../services/graphql';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private gql = inject(GraphqlService);
  private router = inject(Router);

  form = this.fb.group({
  username: ['', Validators.required],
  password: ['', Validators.required]
});

  login() {
    const { username, password } = this.form.value;

    this.gql.login(username!, password!).subscribe((res: any) => {
      if (res.data.login.success) {
        localStorage.setItem('token', res.data.login.token);
        this.router.navigate(['/employees']);
      }
    });
  }
}
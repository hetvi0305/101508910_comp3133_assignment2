import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { GraphqlService } from '../../services/graphql';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.html'
})
export class SignupComponent {

  private fb = inject(FormBuilder);
  private gql = inject(GraphqlService);
  private router = inject(Router);

form = this.fb.group({
  username: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});

  signup() {
    const { username, email, password } = this.form.value;

    this.gql.signup(username!, email!, password!).subscribe((res: any) => {
      if (res.data.signup.success) {
        this.router.navigate(['/']);
      }
    });
  }
}
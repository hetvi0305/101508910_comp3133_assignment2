import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { EmployeesComponent } from './pages/employees/employees';
import { AddEmployeeComponent } from './pages/add-employee/add-employee';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
    { path: 'add', component: AddEmployeeComponent, canActivate: [authGuard] },

    { path: 'update/:id', component: UpdateEmployeeComponent, canActivate: [authGuard] },

    { path: 'view/:id', component: ViewEmployeeComponent, canActivate: [authGuard] }
];
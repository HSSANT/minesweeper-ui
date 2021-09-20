import { Routes } from "@angular/router";
import { LoginComponent } from "../pages/auth/login/login.component";
import { RegisterComponent } from "../pages/auth/register/register.component";

export const AuthRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signin', component: RegisterComponent },
]
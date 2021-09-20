import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GlobalModule } from "./global.module";
import { AuthRoutes } from "../routes/auth.routes"
import { LoginComponent } from "../pages/auth/login/login.component";
import { RegisterComponent } from "../pages/auth/register/register.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        GlobalModule,
        RouterModule.forChild(AuthRoutes)
    ]
})
export class AuthModule {}
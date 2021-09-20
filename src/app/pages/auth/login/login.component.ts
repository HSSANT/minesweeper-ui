import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    
    public form: FormGroup
    public errors: string[]

    public loading: boolean = false
    public hasErrors: boolean = false

    constructor(
        private router: Router,
        private service: AuthService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            username: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required])],
        })  
    }

    login() {
        if(this.form.valid && !this.loading) {
            this.loading = true
            this.errors = []
            this.hasErrors = false
            this.service
                .login({
                    username: this.form.controls.username.value,
                    password: this.form.controls.password.value
                })
                .finally(() => {
                    this.loading = false
                })
                .then((response: any) => {
                    if(response.data) {
                        this.service
                            .changeCurrentUser(
                                response.data
                            )
                        this.router 
                            .navigate([
                                'minesweeper'
                            ])
                    } else {
                        this.hasErrors = true
                        this.errors.push("Wrong Credentials!")
                    }
                })
                .catch((error) => {
                    this.hasErrors = true
                    this.errors
                        .push(error.error.message)
                })
        }
    }
}
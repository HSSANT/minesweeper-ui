import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

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
            password2: [null, Validators.compose([Validators.required])]
        }, { validators: this.matchPasswords })   
    }

    matchPasswords(group: FormGroup) {
        return group.get('password').value == 
            group.get('password2').value ? null : 
                { noMatch: true }  
    }

    register() {
        if(this.form.valid && !this.loading) {
            this.loading = true
            this.errors = []
            this.hasErrors = false
            this.service
                .register({
                    username: this.form.controls.username.value,
                    password: this.form.controls.password.value
                })
                .finally(() => {
                    this.loading = false
                })
                .then((response: any) => {
                    if(response.data) {
                        this.router 
                            .navigate([
                                'auth',
                                'login'
                            ])
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
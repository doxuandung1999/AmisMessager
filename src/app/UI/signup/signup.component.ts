import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, delay } from 'rxjs/operators';
import {AccountService} from "../../service/accountService";
import { AlertService } from 'src/app/service/alter-accountService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
    loading = false;
    submitted = false;
    checkError = false;
    test : string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            UserEmail: ['', Validators.required],
            UserName: ['', Validators.required],
            PhoneNumber: ['', Validators.required],
            Password: ['', [Validators.required, Validators.minLength(6)]],
            PasswordConfirms:['', [Validators.required, Validators.minLength(6)]]
            
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    
    onSubmit() {
        

        this.submitted = true;

        // reset khi ấn password
        this.alertService.clear();

        // dừng nếu form ko hợp lệ
        if (this.form.invalid) {
            this.checkError = false;
            return;
        }

        this.loading = true;
       
        console.log(this.form.value);
        // gọi đến service register
        this.accountService.register(this.form.value)
            // pipe lấy đối tượng đầu tiên
            .pipe(first())
            .pipe(delay(500))
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    
                    this.router.navigate(['/signIn'], { relativeTo: this.route });
                },
                error => {
                    
                    this.alertService.error(error.error.message);
                    this.loading = false;
                  this.test = error.error.message;
                  if(this.test != null){
                      this.checkError = true;
                  }
                  
                    
                });
                
    }
}

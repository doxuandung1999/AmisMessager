import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, delay } from 'rxjs/operators';
import {AccountService} from "../../service/accountService";
import { AlertService } from 'src/app/service/alter-accountService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {StringeeService} from "../../service/stringee.service";
import { from } from 'rxjs';


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
    checkConfirm = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private http: HttpClient,
        private stringeeService : StringeeService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            UserEmail: ['', [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]],
            UserName: ['', Validators.required],
            PhoneNumber: ['', [Validators.required , Validators.pattern("((09|03|07|08|05)+([0-9]{8}))")]],
            Password: ['', [Validators.required, Validators.minLength(6)]],
            PasswordConfirms:['', [Validators.required, Validators.minLength(6)] ]
            
        });
        if(this.f.PasswordConfirms.value == null){
            this.checkConfirm = false;
        }
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
        // if(this.f.Password.value != this.f.PasswordConfirms.value){
        //     this.checkConfirm = true;
        //     return;   
        // }
        if(this.test == null && this.f.Password.value != this.f.PasswordConfirms.value ){
            this.checkConfirm = true;
            return;
          }
       
        
      
        // console.log(this.f.Password.value);

        this.loading = true;
       
        console.log(this.form.value);
        // gọi đến service register
        this.accountService.register(this.form.value)
            // pipe lấy đối tượng đầu tiên
            .pipe(first())
            .pipe(delay(500))
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    let self = this;
                    this.router.navigate(['/signIn'], { relativeTo: this.route });
                    this.stringeeService.Connect(data['token']);
                    // update profile lên stringee
                    this.stringeeService.stringeeClient.on('connect', (res) => {
                      
                      this.stringeeService.listentUpdate(data['token']);
                    });
                    
                  
                  

                   
                },
                error => {
                    
                    // this.alertService.error(error.error.message);
                    this.loading = false;
                  this.test = error.error.message;
                  if(this.test != null){
                      this.checkError = true;
                    //   this.checkConfirm = false;
                  }
                            
                });

               
                
    }
}

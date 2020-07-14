import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, delay } from 'rxjs/operators';
import {AccountService} from "../../service/accountService";
import { AlertService } from 'src/app/service/alter-accountService';


@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            UserEmail: ['', Validators.required],
            Password: ['', Validators.required]
        });

        // return ra đường dẫn mặc định
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/message/2';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset lại thông báo khi ấn submit
        this.alertService.clear();

        // dùng nếu form ko hợp lệ
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.form.value)
        // pipe lấy đối tượng đầu tiên
            .pipe(first())
            .pipe(delay(500))
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        
    }
}

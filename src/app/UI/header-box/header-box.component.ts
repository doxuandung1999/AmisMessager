import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
// import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { AccountService } from "../../service/accountService";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from "../../service/file.service";
import {PostFileService} from "../../service/post-file.service";
// import { UserState, getLogin } from 'src/app/reducer';

@Component({
  selector: 'app-header-box',
  templateUrl: './header-box.component.html',
  styleUrls: ['./header-box.component.scss']
})
export class HeaderBoxComponent implements OnInit {
  users: User[];
  username: string;
  useremail: string;
  phone: string;
  form: FormGroup;
  filePath: any;


  checkOpenProfile = false;

  constructor(private router: Router, private accountService: AccountService,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private postFileService : PostFileService) {

  }

  ngOnInit(): void {
    this.username = this.accountService.userValue.name;
    this.useremail = this.accountService.userValue.email;
    this.phone = this.accountService.userValue.phone;


    this.form = this.formBuilder.group({
      UserName: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required, Validators.pattern("((09|03|07|08|05)+([0-9]{8}))")]],
      avatar: ['']
    });

  }


  logout() {

    this.accountService.logout();
    window.location.reload();

  }

  // thay avatar
  processImg(fileInput: any) {
    // lấy file đầu tiên
    const file: File = fileInput.files[0];

    const render = new FileReader();
    render.addEventListener('load', async (event: any) => {
      // với FormData, chúng ta có thể submit dữ liệu lên server thông qua AJAX như là đang submit form bình thường.
      var formData = new FormData();
      formData.set("file", file);

      this.fileService.saveFileToServer(formData, this.accountService.userValue.token).subscribe(data => {
        this.filePath = data;
        console.log(data);
      });


    });
    render.readAsDataURL(file);
  }


  onProfile() {
    this.checkOpenProfile = true;
  }
  outProfile() {
    this.checkOpenProfile = false;
  }
  onSubmit() {

  }


}

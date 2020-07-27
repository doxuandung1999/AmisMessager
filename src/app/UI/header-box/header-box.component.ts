import { Component, OnInit } from '@angular/core';
// import { User } from 'src/app/model/user/user';
import { User2 } from "../../model/user/user2";
// import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { AccountService } from "../../service/accountService";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from "../../service/file.service";
import { PostFileService } from "../../service/post-file.service";
import { first } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import {StringeeService} from "../../service/stringee.service";
import {UserUpdate} from "../../model/user/userUpdate";
// import { UserState, getLogin } from 'src/app/reducer';

@Component({
  selector: 'app-header-box',
  templateUrl: './header-box.component.html',
  styleUrls: ['./header-box.component.scss']
})
export class HeaderBoxComponent implements OnInit {
  users: User2[];
  username: string;
  useremail: string;
  avatar : string;
  phone: string;
  form: FormGroup;
  filePath: any;
  updateUser: UserUpdate;
  id: any;
  update = false;
  submitted = false;
  user : User2;


  checkOpenProfile = false;

  constructor(private router: Router, private accountService: AccountService,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private postFileService: PostFileService,
    private route : ActivatedRoute,
    private stringeeService : StringeeService) {

  }

  ngOnInit(): void {
    this.user  = this.accountService.userValue;
    this.username = this.accountService.userValue.name;
    this.avatar = this.accountService.userValue.avatar;
    this.useremail = this.accountService.userValue.email;
    this.phone = this.accountService.userValue.phone;
    this.id = this.accountService.userValue.id;
    this.route.paramMap.subscribe(x => {
      // this.test();
    });




    this.form = this.formBuilder.group({
      UserName: [this.accountService.userValue.name],
      PhoneNumber: [this.accountService.userValue.phone, [Validators.pattern("((09|03|07|08|05)+([0-9]{8}))")]]

    });

  }


  logout() {

    this.accountService.logout();
    window.location.reload();

  }
  get f() { return this.form.controls; }

  // thay avatar
  processImg(fileInput: any) {
    // lấy file đầu tiên
    const file: File = fileInput.files[0];

    // với FormData, chúng ta có thể submit dữ liệu lên server thông qua AJAX như là đang submit form bình thường.
    var formData = new FormData();
    formData.set("file", file);

    this.fileService.saveFileToServer(formData, this.accountService.userValue.token).subscribe(data => {
      this.filePath = data.filename;

    });
  }

  onProfile() {
    this.checkOpenProfile = true;
  }
  outProfile() {
    this.checkOpenProfile = false;
    this.filePath = null;
  }
  
  onSubmit() {

    this.updateUser = new UserUpdate();
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
      
        this.updateUser.userName = this.f.UserName.value;
        this.updateUser.PhoneNumber = this.f.PhoneNumber.value;
        if(this.filePath != null){
          this.updateUser.userAvatar = this.filePath;
        }else{
          this.updateUser.userAvatar = this.accountService.userValue.avatar;
        }
        
        this.updateUser.userId = this.id;
        this.updateUser.userEmail = this.useremail;
        
        let sefl = this;
        
         
        this.accountService.update(this.updateUser).pipe(first()).subscribe(data => {  
          
             window.location.reload();
        });

          // update profile lên stringee
          this.stringeeService.stringeeClient.on('connect', (res) => {
                      
            this.stringeeService.listentUpdate(this.accountService.userValue.token);
          });
        
  }
  

}

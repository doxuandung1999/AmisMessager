import { Component, OnInit } from '@angular/core';
import { StringeeService } from "../../service/stringee.service";
import { AccountService } from "../../service/accountService";
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferIdUserService } from "../../service/transferIdUser.service";
import { MessageTransferService } from "../../service/MessageTransfer.service";
import { idUserTransferService } from "../../service/idUserService.service";
import {userNameService} from "../../service/userName.service";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  convasation: any; // mảng chưa danh sách các conversation
  messages: any; // mảng chứa tin nhắn của 1 conversation
  idUser: any; // id người đang đăng nhập
  idUrl: any;
  userInfor: any;
  token : any;
  loading = true;

  constructor(private stringeeService: StringeeService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private transferIdUserService: TransferIdUserService,
    private messageTransferService: MessageTransferService,
    private idUserTransferService: idUserTransferService,
    private userNameService : userNameService,
    private router: Router,
    private spiner : NgxSpinnerService) { }

  ngOnInit(): void {

    // this.test();
    
    this.token = this.accountService.userValue.token;
    this.stringeeService.Connect(this.accountService.userValue.token);

    this.idUser = this.stringeeService.getCurrentUserIdFromAccessToken(this.accountService.userValue.token);
    let sefl = this;
    this.spiner.show();
    this.stringeeService.stringeeClient.on('connect', (res) => {
     
      setTimeout(() => {
        // delay 
        this.spiner.hide();
        this.getConv();
        this.stringeeService.listentUpdate(this.token);
       this.loading = false;
      }, 3000)
     
      
    });
    
    
 

  }


  // lấy danh sách các conversation
  getConv() {
    let self = this;
    this.stringeeService.getLastConversation((status, code, message, convs) => {
      this.convasation = convs;
      for (let parti of convs[0].participants) {
        if (parti.userId != this.idUser) {
          // this.transferIdUserService.changeIdUser(parti.userId);
          //lấy id của conversation đầu tiên để đẩy lên route
          this.router.navigate(['/home/convasation/' + convs[0].id]).then(() => {
            //nếu thành công thì sẽ thực hiện lấy messages
            this.getLastMessage();
          });
          this.accountService.getById(parti.userId).subscribe(users => {
            this.userInfor = users;
            this.userNameService.transferUsername(this.userInfor.userName);
            this.userNameService.transferEmail(this.userInfor.userEmail);
            this.userNameService.transferPhone(this.userInfor.phoneNumber);
          });
          

          // console.log(this.userInfor.userName);

          // self.idUserInfor = parti.userId;
          break;

        }
      }



    });
  }
  // test(){
  //   console.log(this.idUserInfor);
  // }
  // lấy các message cuối cùng
  getLastMessage() {
    this.idUrl = this.route.snapshot.paramMap.get('id');
    this.stringeeService.getLastMessage(this.idUrl, (status, code, message, msgs) => {
      this.messages = msgs;


    });

  }
 



}

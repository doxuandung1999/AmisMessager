import { Component, OnInit } from '@angular/core';
import { StringeeService } from "../../service/stringee.service";
import { AccountService } from "../../service/accountService";
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferIdUserService } from "../../service/transferIdUser.service";
import { MessageTransferService } from "../../service/MessageTransfer.service";
import { idUserTransferService } from "../../service/idUserService.service";


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
  idUserInfor: any;
  token : any;

  constructor(private stringeeService: StringeeService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private transferIdUserService: TransferIdUserService,
    private messageTransferService: MessageTransferService,
    private idUserTransferService: idUserTransferService,
    private router: Router) { }

  ngOnInit(): void {



    this.token = this.accountService.userValue.token;
    this.stringeeService.Connect(this.accountService.userValue.token);

    this.idUser = this.stringeeService.getCurrentUserIdFromAccessToken(this.accountService.userValue.token);
    let sefl = this;
    this.stringeeService.stringeeClient.on('connect', (res) => {
      this.getConv();
      this.stringeeService.listentUpdate(this.token);
    });
    
  

  }

  // lấy danh sách các conversation
  getConv() {
    let self = this;
    this.stringeeService.getLastConversation((status, code, message, convs) => {
      this.convasation = convs;


      for (let parti of convs[0].participants) {
        if (parti.userId != this.idUser) {

          //lấy id của conversation đầu tiên để đẩy lên route
          this.router.navigate(['/home/convasation/' + convs[0].id]).then(() => {
            //nếu thành công thì sẽ thực hiện lấy messages
            this.getLastMessage();
          });


          this.transferIdUserService.changeIdUser(parti.userId);
          break;

        }
      }



    });
  }
  // lấy các message cuối cùng
  getLastMessage() {
    this.idUrl = this.route.snapshot.paramMap.get('id');
    this.stringeeService.getLastMessage(this.idUrl, (status, code, message, msgs) => {
      this.messages = msgs;


    });

  }
 



}

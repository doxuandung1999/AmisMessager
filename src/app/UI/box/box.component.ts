import { Component, OnInit } from '@angular/core';
import { StringeeService } from "../../service/stringee.service";
import { AccountService } from "../../service/accountService";
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {TransferIdUserService} from "../../service/transferIdUser.service";
import {MessageTransferService} from "../../service/MessageTransfer.service";
import {idUserTransferService} from "../../service/idUserService.service";


@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  convasation: any; // mảng chưa danh sách các conversation
  messages: any; // mảng chứa tin nhắn của 1 conversation
  idUser: any; // id người đang đăng nhập
  idUrl : any;

  constructor(private stringeeService: StringeeService,
    private accountService: AccountService,
    private route: ActivatedRoute,
   private transferIdUserService: TransferIdUserService,
   private messageTransferService : MessageTransferService,
   private idUserTransferService : idUserTransferService,
   private router: Router) { }

  ngOnInit(): void {

    this.idUrl = this.route.snapshot.paramMap.get('id');
    
    
    this.stringeeService.Connect(this.accountService.userValue.token);

    this.idUser = this.stringeeService.getCurrentUserIdFromAccessToken(this.accountService.userValue.token);
    this.stringeeService.stringeeClient.on('connect', (res) => {
      this.getConv();
      // this.getLastMessage();
    });

    


  }

  // lấy danh sách các conversation
  getConv() {
    this.stringeeService.getLastConversation((status, code, message, convs) => {
      this.convasation = convs;
      
      
        for (let parti of convs[0].participants){
          if (parti.userId != this.idUser) {

            //lấy id của conversation đầu tiên để đẩy lên route
          this.router.navigate(['/home/convarsation/' + convs[0].id]).then(()=>{
            //nếu thành công thì sẽ thực hiện lấy messages
            this.getLastMessage();
          });


            this.idUserTransferService.changeConvid(parti.userId);
            break;
            
          }
        }
       
      
      console.log(convs);
    });
  }
  // lấy các message cuối cùng
  getLastMessage() {
    
    this.stringeeService.getLastMessage(this.idUrl, (status, code, message, msgs) => {
      this.messages = msgs;
      // console.log(this.idUrl);
      // this.messageTransferService.changeMessage(msgs);
      
    });

  }





}

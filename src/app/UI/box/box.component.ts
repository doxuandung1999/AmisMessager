import { Component, OnInit } from '@angular/core';
import {StringeeService} from "../../service/stringee.service";
import {AccountService} from "../../service/accountService";
import { from } from 'rxjs';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  constructor(private stringeeService : StringeeService ,
    
              private accountService : AccountService) { }

  ngOnInit(): void {
    this.stringeeService.Connect(this.accountService.userValue.token);
   
 
  }


}

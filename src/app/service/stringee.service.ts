import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import {AccountService} from "./accountService";

import { Alert, AlertType } from '../model/alter-account';

@Injectable({ providedIn: 'root' })
export class StringeeService {
    stringeeClient = new StringeeClient();
    constructor(private accountService : AccountService) { 

    }
    connect(){
        this.stringeeClient.on('connect', function () {
            console.log('++++++++++++++ connected to StringeeServer');
          });

          // get jwt cho stringee
          this.stringeeClient.connect(this.accountService.userValue.token);
    }
    


}
import { Time } from '@angular/common';

export class Friend{
    id:number;
    name : string;
    avatar : string;
    status : boolean;
    lastMassage : string;
    time : string;
    timeActive : string;
    noRep : number;
    senderId : number;
    number : string;
    email : string;
    
    constructor(id: number, name: string , avatar : string,
        status:boolean,lastMassage:string,time : string,
        nRep : number , senderId : number , number:string , email:string) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.status = status;
        this.lastMassage = lastMassage;
        this.time = time;
        this.noRep = this.noRep;
        this.senderId = senderId; 
        this.number = number;
        this.email = email;
      }
}

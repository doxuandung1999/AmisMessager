import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { AccountService } from "./accountService";
import { User2 } from "../model/user/user2";

import { Alert, AlertType } from '../model/alter-account';

@Injectable({ providedIn: 'root' })
export class StringeeService {
    stringeeClient = new StringeeClient();
    stringeeChat = new StringeeChat(this.stringeeClient);
    constructor(private accountService: AccountService) {

    }
    Connect(Access_token: string) {
        this.stringeeClient.connect(Access_token);
        console.log("sucess");
    }
    // lắng nghe sự kiện connect
    listenConnect(Access_token: string) {
        let seft = this;
        this.stringeeClient.on('connect', function (res) {
            // this.renderLastConversationsAndMessages();
            // this.realTimeUpdate();
            // this.initEvents();
            let userId = seft.getCurrentUserIdFromAccessToken(Access_token);
            seft.stringeeChat.getUsersInfo([userId], function (status, code, msg, users) {
                let user = users[0];
                if (!user) {
                    let username = seft.getCurrentUsernameFromAccessToken(Access_token);
                    // let avatar = this.getCurrentUserAvatarFromAccessToken(Access_token);
                    let useremail = seft.getCurrentUserEmailFromAccessToken(Access_token);
                    let phone = seft.getCurrentPhoneNumberFromAccessToken(Access_token);
                    let updateUserData = {
                        display_name: username,
                        avatar_url: "",
                        email: useremail

                    }
                    seft.updateUserInfo(updateUserData);
                }
            })
            // seft.getLastMessage();
        });
    }

    // Hàm cập nhật thông tin một user , up date lên stringee
    updateUserInfo(data) {

        this.stringeeChat.updateUserInfo(data, function (res) {
            console.log(res)
        });
    }
    // Hàm giải mã token
    decodeToken(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    // Hàm lấy userId hiện tại của người dùng đăng nhập
    getCurrentUserIdFromAccessToken(token) {
        let decodedToken = this.decodeToken(token);
        return decodedToken.userId;
    }
    // Hàm lấy userName hiện tại của người dùng đăng nhập
    getCurrentUsernameFromAccessToken(token) {
        let decodedToken = this.decodeToken(token);
        return decodedToken.userName;
    }
    //hàm lấy email hiện tại của người dùng đăngg nhập
    getCurrentUserEmailFromAccessToken(token) {
        let decodedToken = this.decodeToken(token);
        return decodedToken.userEmail;
    }
    // hàm lấy phone của người dùng đăng nhập
    getCurrentPhoneNumberFromAccessToken(token) {
        let decodedToken = this.decodeToken(token);
        return decodedToken.phoneNumber;
    }
    test() {
        console.log(this.getCurrentUserEmailFromAccessToken(this.accountService.userValue.token));
    }

    // tạo cuộc trò chuyện 
    creatAConversation(id) {
        var userIds = [id];
        var options = {
            //   name: "Your conversation name",
            isDistinct: true,
            isGroup: false
        };
        this.stringeeChat.createConversation(userIds, options, (status, code, message, conv) => {
            console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(conv));
        });

    }

    // lấy các cuộc trò chuyện
    // renderLastConversationsAndMessages() {
    //     var count = 50;
    //     var isAscending = false;

    //     this.stringeeChat.getLastConversations(count, isAscending, function (status, code, message, convs) {
            
    //     });
    // }


    getLastConversation(callback: any) {
        let seft = this;
        // this.stringeeClient.on('connect', function (res) {
        //     var count = 25;
        //     var isAscending = false;
        //     seft.stringeeChat.getLastConversations(count, isAscending, callback);
        // });
        var count = 25;
            var isAscending = false;
            seft.stringeeChat.getLastConversations(count, isAscending, callback);
       
    }

    // gửi tin nhắn dạng text
    sendTextMessage(convId, message) {
        var txtMsg = {
            type: 1,
            convId: convId,
            message: {
                content: message,
                metadata: {
                    key: 'value'
                }
            }
        };

        this.stringeeChat.sendMessage(txtMsg, function (status, code, message, msg) {
            console.log(status + code + message + "msg result " + JSON.stringify(msg));
        });

    }

    // lấy tin nhắn của 1 cuộc trò chuyện
    getLastMessage(convid , call:any){
        var convId = convid;
        var count = 50;
        var isAscending = true;
        this.stringeeChat.getLastMessages(convId, count, isAscending, call);

    }





}
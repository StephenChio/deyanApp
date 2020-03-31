import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-friend-verification',
  templateUrl: './friend-verification.page.html',
  styleUrls: ['./friend-verification.page.scss'],
})
export class FriendVerificationPage implements OnInit {

  constructor(private globalVar: globalVar, private http: HttpClient, private common: Common) { }
  verificationMsg: any;
  ngOnInit() { }
  // VerificationConfirm() {
  //   console.log(this.verificationMsg);
  //   this.common.presentAlertConfirm("确认是否发送验证消息",this.sendVerification,this.verificationMsg);

  // }

  /**
   * 发送好友验证消息
   */
  sendVerification() {
    let path = globalVar.baseUrl + "/addressList/sendVerification";
    if (this.verificationMsg == null) {
      this.verificationMsg = "";
    }
    if (this.verificationMsg.length >= 30) {
      this.common.presentAlert("请勿输入超过30个字")
      return;
    }
    const body = new HttpParams()
      .set("verificationMsg", this.verificationMsg)
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("fWechatId", localStorage.getItem("fWechatId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        if (data["respCode"] == globalVar.successCode) {
          localStorage.setItem("token", data["token"]);
          this.common.presentAlert(data["respMsg"])
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
}

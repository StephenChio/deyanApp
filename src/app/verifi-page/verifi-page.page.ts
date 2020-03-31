import { Component, OnInit } from '@angular/core';
import { globalVar } from 'src/globalVar';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Common } from '../Common/common';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators'
import { interval } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-verifi-page',
  templateUrl: './verifi-page.page.html',
  styleUrls: ['./verifi-page.page.scss'],
})
export class VerifiPagePage implements OnInit {

  constructor(private actionSheetController: ActionSheetController, private router: Router, private activatedRoute: ActivatedRoute, private globalVar: globalVar, private http: HttpClient, private common: Common) { }
  phone: any;
  verifiCode: any
  isSend = false;
  paracont = "发送验证码";
  disabledClick: any;
  useVerifiCode = true;
  usePassword = false;
  password: any;
  salt:any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      // console.log(data.phone)
      this.phone = data.phone;
    });
  }
  countDown(time: any) {
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(60));
    takeFourNumbers.subscribe(
      x => {
        this.paracont = (60 - x) + "秒后可重发";
        this.disabledClick = true;
      },
      error => { },
      () => {
        this.paracont = "重新发送验证码";
        this.disabledClick = false;
      });
  }
  getVerifiCode() {
    let path = globalVar.baseUrl + "/getVerifiCode"
    const body = new HttpParams()
      .set("phone", this.phone)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == globalVar.successCode) {
          this.isSend = true;
          this.countDown(60);
        }
        else {
          this.common.presentAlert(data["respMsg"]);
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert);
        }
      );
  }
  login() {
    if (!this.isSend && this.useVerifiCode) {
      this.common.presentAlert("请先发送验证码")
      return;
    }
    let loginType = null;
    if (this.useVerifiCode) {
      if (this.verifiCode == null || this.verifiCode.length !== 6) {
        this.common.presentAlert("请正确填写验证码")
        return;
      }
      loginType = "verifiCode"
    }
    else {
      if (this.password == null || this.password.length >= 31) {
        this.common.presentAlert("请正确填写密码")
        return;
      }
      loginType = "password"
      this.password  = this.common.addSalt(this.password,localStorage.getItem("salt"));
    }
    let path = globalVar.baseUrl + "/login"
    const body = new HttpParams()
      .set("phone", this.phone)
      .set("verifiCode", this.verifiCode)
      .set("password", this.password)
      .set("loginType", loginType)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == globalVar.successCode) {
          localStorage.setItem("token", data["token"]);
          var data = data["data"];
          // console.log(data)
          // const user_token = {wechatId:data["wechatId"],time:new Date}
          localStorage.setItem("userName", data["userName"]);
          localStorage.setItem("wechatId", data["wechatId"]);
          localStorage.setItem("imgPath", data["imgPath"]);
          localStorage.setItem("phone", data["phone"]);
          localStorage.setItem("title", data["title"]);
          localStorage.setItem("money", data["money"]);
          localStorage.setItem("userLevel", data["userLevel"]);
          localStorage.setItem("points", data["points"]);
          localStorage.setItem("experience", data["experience"]);
          localStorage.setItem("backgroundImg", data["backgroundImg"]);
          localStorage.setItem("sex", data["sex"]);
          localStorage.setItem("position", data["position"]);
          localStorage.setItem("sign", data["sign"])
          // console.log(data);
          localStorage.setItem("hasPassword", data["hasPassword"]);
          if (data["hasPassword"] == false) {
            this.router.navigate(['/set-password'],
              {
                queryParams: { hasPassword: data["hasPassword"] }
              }
            )
          }
          else {
            this.router.navigate(['/'])
          }
        }
        else {
          this.common.presentAlert(data["respMsg"]);
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert);
        }
      );
  }
  getMoreOptions() {
    this.common.presentAlert(globalVar.comingSoon)
  }
  findPassword() {
    this.common.presentAlert(globalVar.comingSoon)
  }
  emergencyFreeze() {
    this.common.presentAlert(globalVar.comingSoon)
  }
  async changeVerifiWay() {
    let msg = null;
    if (this.useVerifiCode) {
      msg = globalVar.loginWithPass
    }
    else {
      msg = globalVar.loginWithCode
    }
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: msg,
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          // console.log(this.useVerifiCode + "|" + this.usePassword)
          if (this.useVerifiCode) {
            this.useVerifiCode = false;
            this.usePassword = true;
          }
          else {
            this.useVerifiCode = true;
            this.usePassword = false;
          }
        }
      }, {
        text: '取消',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}

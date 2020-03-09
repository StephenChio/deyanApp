import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Md5 } from "ts-md5";


@Injectable()
export class Common {
  constructor(private Md5: Md5, private globalVar: globalVar, private http: HttpClient, private alertController: AlertController) {

  }
  /**
   * 
   * @param password 加盐
   * @param salt 
   */
  addSalt(password: any, salt: any): any {
    return Md5.hashStr(password + salt);
  }
  /**
   * 
   * @param phone 获得盐
   */
  getSalt(phone: any) {
    let path = globalVar.baseUrl + "/idSalt/getSalt"
    const body = new HttpParams()
      .set("phone", phone)
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data["respCode"] == "00") {
          localStorage.setItem("salt",data["data"]);
        }
        else {
          this.presentAlert(data["respMsg"]);
        }
      },
        error => {
          this.presentAlert(globalVar.busyAlert);
        }
      );
  }
  /**
   * 
   * @param msg 通用弹出通知组件
   */
  log(msg: any) {
    console.log(msg)
  }
  isEmpty(T: any): boolean {
    if (T == undefined || T == null || T == "") {
      return true;
    }
    else {
      return false
    }
  }

  async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: '确认',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlertConfirm(msg: any, callBack: any, callbackParam: any) {
    const alert = await this.alertController.create({
      header: '请确认!',
      message: msg,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            callBack(callbackParam);
          }
        }
      ]
    });
    await alert.present();
  }
  /**
   * 获取32位随机码
   * @param len 
   */
  getRandomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  /**
  * 
  * @param msg 退出账号
  */
  async quit(msg: any) {
    const alert = await this.alertController.create({
      header: '确认',
      message: msg,
      buttons: [{
        text: 'OK',
        handler: (blah) => {
          localStorage.removeItem("backgroundImg");
          localStorage.removeItem("fUserName");
          localStorage.removeItem("fWechatId");
          localStorage.removeItem("hasPassword");
          localStorage.removeItem("imgPath");
          localStorage.removeItem("phone");
          localStorage.removeItem("userName");
          localStorage.removeItem("wechatId");
          localStorage.removeItem("title");
          localStorage.removeItem("money");
          localStorage.removeItem("userLevel");
          localStorage.removeItem("points");
          localStorage.removeItem("experience");
          localStorage.removeItem("sex");
          localStorage.removeItem("position");
          localStorage.removeItem("sign")
          localStorage.removeItem("token");
          localStorage.removeItem("salt");
          window.location.href = "login"
        }
      }]
    });
    await alert.present();
  }
}
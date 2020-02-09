import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-setting',
  templateUrl: './sign-setting.page.html',
  styleUrls: ['./sign-setting.page.scss'],
})
export class SignSettingPage implements OnInit {

  constructor(private router:Router,private http: HttpClient, private globalVar: globalVar, private common: Common) { }
  sign:any;
  ngOnInit() {
    this.sign = localStorage.getItem("sign")
  }
  updateSign(){
    let path = globalVar.baseUrl + "/userInfo/updateSex"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
      .set("sign", this.sign);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if(data["respCode"]=="00"){
          localStorage.setItem("sign", this.sign);
          this.router.navigate(['/more-setting'])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
}

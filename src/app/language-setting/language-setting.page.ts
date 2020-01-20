import { Component, OnInit } from '@angular/core';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-language-setting',
  templateUrl: './language-setting.page.html',
  styleUrls: ['./language-setting.page.scss'],
})
export class LanguageSettingPage implements OnInit {

  constructor(private http: HttpClient, private globalVar: globalVar, private common: Common) { }
  languageList = ['中文', 'English', '日本语']
  motherLanguage: any
  firstLanguage: any
  secondLanguage: any
  thirdLanguage: any
  ngOnInit() {
    this.getLanguageSetting();
  }
  getLanguageSetting() {
    let path = globalVar.baseUrl + "/userLanguage/getLanguageSetting"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit("登陆超时,请重新登陆");
        // this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if(data["respCode"]!="00"){
          this.common.presentAlert(data["respMsg"])
          return;
        }
        data = data["data"];
        this.motherLanguage = data["motherLanguage"];
        this.firstLanguage = data["firstLanguage"];
        this.secondLanguage = data["secondLanguage"];
        this.thirdLanguage = data["thirdLanguage"];
        // console.log(data)
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
  updateLanguageSetting() {
    let path = globalVar.baseUrl + "/userLanguage/updateLanguageSetting"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
      .set("motherLanguage", this.motherLanguage)
      .set("firstLanguage", this.firstLanguage)
      .set("secondLanguage", this.secondLanguage)
      .set("thirdLanguage", this.thirdLanguage);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit("登陆超时,请重新登陆");
        this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
      },
        error => {
          this.common.presentAlert("服务器繁忙,请重试")
        })
  }
  switchMotherLanguage() {
    // alert(this.motherLanguage)
  }
  switchFirstLanguage() {
    // alert(this.firstLanguage)
  }
  switchSecondLanguage() {
    if (this.firstLanguage == null) {
      this.common.presentAlert("请先选择第一外语")
      this.secondLanguage = null;
      return;
    }
    // alert(this.secondLanguage)
  }
  switchThirdLanguage() {
    if (this.firstLanguage == null) {
      this.common.presentAlert("请先选择第一外语")
      this.thirdLanguage = null;
      return;
    }
    if (this.secondLanguage == null) {
      this.common.presentAlert("请先选择第二外语")
      this.thirdLanguage = null;
      return;
    }
    // alert(this.thirdLanguage)
  }
}

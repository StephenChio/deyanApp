import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sex-setting',
  templateUrl: './sex-setting.page.html',
  styleUrls: ['./sex-setting.page.scss'],
})
export class SexSettingPage implements OnInit {

  constructor(private router:Router,private http: HttpClient, private globalVar: globalVar, private common: Common) { }
  sex: any;
  public form = [
    { text:'男', val: 'male', isChecked: true },
    { text:'女', val: 'female', isChecked: false },
    { text:'其他',val: 'other', isChecked: false }
  ];
  ngOnInit() {
    this.sex = localStorage.getItem("sex")
    for (var i = 0; i < this.form.length; i++) {
      if (this.form[i].val == this.sex) {
        this.form[i].isChecked = true;
      }
      else{
        this.form[i].isChecked = false;
      }
    }
  }
  updateSex(){
    let path = globalVar.baseUrl + "/userInfo/updateSex"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
      .set("sex", this.sex);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        this.common.presentAlert(data["respMsg"])
        if (data["respCode"] == globalVar.successCode) {
          localStorage.setItem("token", data["token"]);
          localStorage.setItem("sex", this.sex);
          this.router.navigate(['/more-setting'])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
  change(item:any) {
    // console.log(123)
    // if(item.isChecked!=true)return;
    this.sex = item.val;
    for (var i = 0; i < this.form.length; i++) {
      if (this.form[i].text == item.text) {
        this.form[i].isChecked = true;
      }
      else{
        this.form[i].isChecked = false;
      }
    }
  }
}

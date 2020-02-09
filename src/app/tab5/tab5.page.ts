import { Component, OnInit } from '@angular/core';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private router:Router,private http:HttpClient,private common:Common,private globalVar:globalVar) { }
  imgPath:any;
  baseUrl:any;
  date:any;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.imgPath = localStorage.getItem("imgPath");
    this.getDate();
  }
  getDate(){
    let path = globalVar.baseUrl + "/userInfo/getDate"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.date = data["data"]
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert);
        }
      );
  }
  toQuestionPage(){
    this.router.navigate(['/question-page'])
  }
  toAllQuestionPage(){
    this.router.navigate(['/all-question-page'])
  }
}

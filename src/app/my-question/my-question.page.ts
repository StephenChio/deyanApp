import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-my-question',
  templateUrl: './my-question.page.html',
  styleUrls: ['./my-question.page.scss'],
})
export class MyQuestionPage implements OnInit {

  constructor(private router: Router, private http: HttpClient, private common: Common, private globalVar: globalVar) { }
  baseUrl:any;
  questionList = []
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.getMyQuestion()
  }
  doRefresh(event){
    this.getMyQuestion()
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  getMyQuestion() {
    let path = globalVar.baseUrl + "/questionList/getMyQuestion"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        // this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.questionList = data["data"]
          console.log(this.questionList)
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
}
